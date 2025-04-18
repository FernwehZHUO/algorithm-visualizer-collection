import React from 'react';
import { Box, Typography, Button } from '@mui/material';
import config from '../config';

const MaxFlowPage: React.FC = () => {
  return (
    <Box sx={{ display: 'flex', flexDirection: 'column', height: '100vh' }}>
      <Box sx={{ p: 2, backgroundColor: 'primary.main', color: 'white' }}>
        <Typography variant="h6">Max Flow Algorithm Visualization</Typography>
      </Box>
      <Box sx={{ flexGrow: 1, position: 'relative' }}>
        {/* 
         * 在开发环境中，这个iframe会显示一个错误，因为maxflow应用实际上没有运行在端口3001上。
         * 在实际部署时，您需要确保maxflow应用正确部署并且可访问。
         * 现在我们可以添加一个备用消息。
         */}
        <iframe 
          src={config.maxFlowUrl}
          style={{
            width: '100%',
            height: '100%',
            border: 'none',
            position: 'absolute',
            top: 0,
            left: 0
          }}
          title="Max Flow Visualization"
        />
        <Box 
          sx={{
            position: 'absolute',
            top: '50%',
            left: '50%',
            transform: 'translate(-50%, -50%)',
            textAlign: 'center',
            p: 3,
            backgroundColor: 'rgba(255, 255, 255, 0.9)',
            borderRadius: 2,
            maxWidth: '80%',
            boxShadow: 3
          }}
        >
          <Typography variant="h5" gutterBottom>
            Maxflow应用未启动
          </Typography>
          <Typography paragraph>
            要查看Max Flow Algorithm Visualization，请确保应用程序已在端口3001上启动。
          </Typography>
          <Box sx={{ mb: 2, mt: 2, p: 2, bgcolor: 'info.light', borderRadius: 1 }}>
            <Typography variant="subtitle1" sx={{ mb: 1, fontWeight: 'bold' }}>
              方法1：单独启动Maxflow应用
            </Typography>
            <Typography component="div" sx={{ textAlign: 'left' }}>
              <pre style={{ margin: '10px 0', padding: '10px', backgroundColor: '#f5f5f5', borderRadius: '4px', overflow: 'auto' }}>
                cd ../maxflow<br/>
                npm install<br/>
                set PORT=3001 && npm start
              </pre>
            </Typography>
          </Box>
          
          <Box sx={{ mt: 2, p: 2, bgcolor: 'success.light', borderRadius: 1 }}>
            <Typography variant="subtitle1" sx={{ mb: 1, fontWeight: 'bold' }}>
              方法2：一键启动所有应用（推荐）
            </Typography>
            <Typography paragraph sx={{ textAlign: 'left' }}>
              返回Hub主目录并运行：
            </Typography>
            <Typography component="div" sx={{ textAlign: 'left' }}>
              <pre style={{ margin: '10px 0', padding: '10px', backgroundColor: '#f5f5f5', borderRadius: '4px', overflow: 'auto' }}>
                cd algorithm-visualizer-hub<br/>
                npm run start:concurrent
              </pre>
            </Typography>
          </Box>
          
          <Button 
            variant="contained" 
            color="primary" 
            sx={{ mt: 3 }}
            onClick={() => window.location.href = '/'}
          >
            返回主页
          </Button>
        </Box>
      </Box>
    </Box>
  );
};

export default MaxFlowPage; 