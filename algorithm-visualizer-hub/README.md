# Algorithm Visualizer Hub

统一的算法可视化项目入口页面。

## 概述

此项目作为多个算法可视化工具的中心枢纽：

1. **最大流可视化器（Max Flow Visualizer）**：可视化网络流算法，包括Ford-Fulkerson、Edmonds-Karp和Push-Relabel。
2. **最大匹配可视化器（Maximum Matching Visualizer）**：可视化二分图的最大匹配算法。

## 项目结构

该项目由三个独立的React应用程序组成：

- **algorithm-visualizer-hub**：主要登陆页面，链接到两个可视化工具。
- **maxflow**：最大流算法可视化器。
- **maximum-matching-graph**：最大匹配算法可视化器。

## 入门指南

### 先决条件

- Node.js（v14或更新版本）
- npm（v6或更新版本）

### 安装

1. 克隆包含全部三个项目的仓库
2. 为每个项目安装依赖：

```bash
# 为hub安装依赖
cd algorithm-visualizer-hub
npm install

# 为maxflow安装依赖
cd ../maxflow
npm install

# 为maximum-matching-graph安装依赖
cd ../maximum-matching-graph
npm install
```

## 运行应用程序

我们提供了三种方式运行应用程序：

### 选项1：使用Concurrently一键启动所有应用（推荐）

从algorithm-visualizer-hub目录中运行：

```bash
npm run start:concurrent
```

这是最简单的方式！该命令将：
1. 在端口3000上启动hub应用
2. 在端口3001上启动maxflow应用
3. 在端口3002上启动maximum-matching-graph应用
4. 自动配置所有端口和连接

### 选项2：使用setup-and-run.js脚本

从algorithm-visualizer-hub目录中运行：

```bash
npm run start:all
```

这将会：
1. 配置每个应用程序在特定端口上运行
2. 并行启动所有三个应用程序
3. 通过中央枢纽提供统一的体验

### 选项3：单独运行应用程序

您也可以单独运行每个应用程序：

```bash
# 启动hub（默认端口3000）
cd algorithm-visualizer-hub
npm start

# 启动maxflow（配置在端口3001上运行）
cd ../maxflow
set PORT=3001 && npm start  # 在macOS/Linux上使用export PORT=3001

# 启动maximum-matching-graph（配置在端口3002上运行）
cd ../maximum-matching-graph
set PORT=3002 && npm start  # 在macOS/Linux上使用export PORT=3002
```

## 部署到静态网站

项目提供了一个静态构建脚本，可以将所有应用打包成一个静态网站：

```bash
# 从algorithm-visualizer-hub目录运行
npm run build:static
```

这将:
1. 构建hub应用并更新配置为相对路径
2. 构建maxflow和maximum-matching-graph应用
3. 将所有构建结果合并到`static-build`目录中
4. 创建一个README文件，说明如何部署

构建完成后，您可以：
1. 本地测试构建结果：`npm run serve:static`
2. 将`static-build`目录部署到任何静态Web服务器
3. 或作为GitHub Pages部署（将目录内容推送到gh-pages分支）

## 使用方法

1. 打开浏览器并导航到http://localhost:3000
2. 从登陆页面，您可以访问任一可视化工具
3. 当您点击工具时，您将看到相应应用程序的内容

**注意**：如果maxflow或maximum-matching-graph应用未运行，hub将显示一个说明性消息，指导您如何启动相应的应用程序。

## 实现细节

Hub应用使用iframe嵌入其他应用，而不是重定向到它们。这种方法的优势：

1. **更好的用户体验** - 用户不会离开主应用，保持了统一的界面
2. **容错处理** - 即使某个应用未启动，也能显示有用的错误信息
3. **更简单的部署** - 可以单独部署各应用，并简单地更新iframe的URL

## 配置

如果需要更改端口或URL，请编辑algorithm-visualizer-hub项目中的`src/config.ts`文件。

## 开发说明

- 每个项目仍然是具有自己代码库的独立应用程序
- hub提供统一的入口点，无需修改原始项目
- 对于部署，您可以单独部署每个应用程序，并更新hub的config文件中的URL，或使用`build:static`命令创建统一的静态部署
