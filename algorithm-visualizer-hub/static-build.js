/**
 * 静态构建脚本
 * 
 * 此脚本将构建所有三个应用程序并将它们合并为一个静态网站，
 * 以便部署到GitHub Pages或任何静态Web服务器。
 */

const { execSync } = require('child_process');
const fs = require('fs');
const path = require('path');

// 项目路径配置
const paths = {
  root: path.resolve(__dirname, '..'),
  hub: path.resolve(__dirname),
  maxflow: path.resolve(__dirname, '..', 'maxflow'),
  maximumMatching: path.resolve(__dirname, '..', 'maximum-matching-graph'),
  
  // 输出目录
  output: path.resolve(__dirname, 'static-build'),
  
  // 子应用程序在static-build中的路径
  maxflowDest: path.resolve(__dirname, 'static-build', 'maxflow'),
  maximumMatchingDest: path.resolve(__dirname, 'static-build', 'maximum-matching'),
};

// 确保输出目录存在
function ensureDirExists(dir) {
  if (!fs.existsSync(dir)) {
    fs.mkdirSync(dir, { recursive: true });
    console.log(`创建目录: ${dir}`);
  }
}

// 构建hub应用程序
function buildHub() {
  console.log('\n正在构建hub应用...');
  try {
    // 更新配置以指向相对路径
    const configPath = path.join(paths.hub, 'src', 'config.ts');
    const configContent = `// 静态部署配置
const config = {
  // URL为相对路径以便在静态站点中工作
  maxFlowUrl: '/maxflow/index.html',
  maximumMatchingUrl: '/maximum-matching/index.html',
};

export default config;`;
    fs.writeFileSync(configPath, configContent);
    console.log('已更新hub配置为静态路径');
    
    // 构建hub应用
    execSync('npm run build', { cwd: paths.hub, stdio: 'inherit' });
    console.log('Hub应用构建成功');
    
    // 将构建结果移动到static-build目录
    const buildDir = path.join(paths.hub, 'build');
    if (fs.existsSync(buildDir)) {
      fs.cpSync(buildDir, paths.output, { recursive: true });
      console.log(`已将Hub构建结果复制到 ${paths.output}`);
    }
  } catch (error) {
    console.error('构建Hub应用时出错:', error);
    process.exit(1);
  }
}

// 构建maxflow应用程序
function buildMaxflow() {
  console.log('\n正在构建Maxflow应用...');
  try {
    if (fs.existsSync(paths.maxflow)) {
      ensureDirExists(paths.maxflowDest);
      execSync('npm run build', { cwd: paths.maxflow, stdio: 'inherit' });
      
      // 将构建结果复制到目标目录
      const maxflowBuild = path.join(paths.maxflow, 'build');
      if (fs.existsSync(maxflowBuild)) {
        fs.cpSync(maxflowBuild, paths.maxflowDest, { recursive: true });
        console.log(`已将Maxflow构建结果复制到 ${paths.maxflowDest}`);
      }
    } else {
      console.warn('Maxflow目录不存在，跳过构建');
    }
  } catch (error) {
    console.error('构建Maxflow应用时出错:', error);
  }
}

// 构建maximum-matching应用程序
function buildMaximumMatching() {
  console.log('\n正在构建Maximum Matching应用...');
  try {
    if (fs.existsSync(paths.maximumMatching)) {
      ensureDirExists(paths.maximumMatchingDest);
      execSync('npm run build', { cwd: paths.maximumMatching, stdio: 'inherit' });
      
      // 将构建结果复制到目标目录
      const mmBuild = path.join(paths.maximumMatching, 'build');
      if (fs.existsSync(mmBuild)) {
        fs.cpSync(mmBuild, paths.maximumMatchingDest, { recursive: true });
        console.log(`已将Maximum Matching构建结果复制到 ${paths.maximumMatchingDest}`);
      }
    } else {
      console.warn('Maximum Matching目录不存在，跳过构建');
    }
  } catch (error) {
    console.error('构建Maximum Matching应用时出错:', error);
  }
}

// 创建一个提示文件，说明如何启动应用
function createReadmeFile() {
  const readmeContent = `# 算法可视化集合 - 静态部署

此目录包含了预构建的静态文件，可部署到任何静态Web服务器。

## 部署说明

1. 将此目录中的所有文件上传到您的Web服务器
2. 确保您的Web服务器配置正确处理SPA路由（对于React Router）

对于GitHub Pages，您可以：
- 将此目录推送到GitHub仓库的gh-pages分支
- 在仓库设置中启用GitHub Pages

## 本地测试

您可以使用任何静态服务器测试此构建，例如：

\`\`\`
npx serve
\`\`\`

`;
  fs.writeFileSync(path.join(paths.output, 'README.md'), readmeContent);
  console.log('\n已创建静态部署说明文件');
}

// 主函数
async function main() {
  console.log('开始构建静态部署包...');
  
  // 确保输出目录存在
  ensureDirExists(paths.output);
  
  // 构建所有应用
  buildHub();
  buildMaxflow();
  buildMaximumMatching();
  
  // 创建说明文件
  createReadmeFile();
  
  console.log('\n完成! 静态构建位于:', paths.output);
  console.log('您可以将此目录部署到任何静态Web服务器。');
}

// 执行主函数
main().catch(error => {
  console.error('构建过程出错:', error);
  process.exit(1);
}); 