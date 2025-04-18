import React from 'react';
import { Box, Typography } from '@mui/material';
import config from '../config';

const MaximumMatchingPage: React.FC = () => {
  return (
    <Box sx={{ display: 'flex', flexDirection: 'column', height: '100vh' }}>
      <Box sx={{ p: 2, backgroundColor: 'secondary.main', color: 'white' }}>
        <Typography variant="h6">Maximum Matching Algorithm Visualization</Typography>
      </Box>
      <Box sx={{ flexGrow: 1, position: 'relative' }}>
        {/* 
         * 在开发环境中，这个iframe会显示一个错误，因为maximum-matching应用实际上没有运行在端口3002上。
         * 在实际部署时，您需要确保maximum-matching应用正确部署并且可访问。
         * 现在我们可以添加一个备用消息。
         */}
        <iframe 
          src={config.maximumMatchingUrl}
          style={{
            width: '100%',
            height: '100%',
            border: 'none',
            position: 'absolute',
            top: 0,
            left: 0
          }}
          title="Maximum Matching Visualization"
        />
        <Box 
          sx={{
            position: 'absolute',
            top: '50%',
            left: '50%',
            transform: 'translate(-50%, -50%)',
            textAlign: 'center',
            p: 3,
            backgroundColor: 'rgba(255, 255, 255, 0.8)',
            borderRadius: 2,
            maxWidth: '80%'
          }}
        >
          <Typography variant="h5" gutterBottom>
            Maximum Matching应用未启动
          </Typography>
          <Typography paragraph>
            要查看Maximum Matching Algorithm Visualization，请确保应用程序已在端口3002上启动。
          </Typography>
          <Typography>
            您可以通过以下方式启动它：
            <pre style={{ textAlign: 'left', margin: '10px 0' }}>
              cd ../maximum-matching-graph<br/>
              npm install<br/>
              set PORT=3002 && npm start
            </pre>
          </Typography>
        </Box>
      </Box>
    </Box>
  );
};

export default MaximumMatchingPage; 