import React, { useEffect } from 'react';
import { Box, CircularProgress, Typography } from '@mui/material';
import config from '../config';

const MaxFlowRedirect: React.FC = () => {
  useEffect(() => {
    // Set a brief timeout to display the loading message before redirecting
    const timer = setTimeout(() => {
      window.location.href = config.maxFlowUrl;
    }, 1500);

    return () => clearTimeout(timer);
  }, []);

  return (
    <Box
      sx={{
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        height: '80vh',
      }}
    >
      <CircularProgress size={60} />
      <Typography variant="h5" sx={{ mt: 4 }}>
        Redirecting to Max Flow Visualizer...
      </Typography>
    </Box>
  );
};

export default MaxFlowRedirect; 