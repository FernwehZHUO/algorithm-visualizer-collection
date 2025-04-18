import React from 'react';
import { AppBar, Toolbar, Typography, Button, Box } from '@mui/material';
import { Link } from 'react-router-dom';
import config from '../config';

const Navbar: React.FC = () => {
  return (
    <AppBar position="static">
      <Toolbar>
        <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
          <Link to="/" style={{ color: 'white', textDecoration: 'none' }}>
            Algorithm Visualizer Hub
          </Link>
        </Typography>
        <Box>
          <Button color="inherit" component={Link} to="/">
            Home
          </Button>
          <Button 
            color="inherit" 
            href={config.maxFlowUrl}
            target="_blank"
            rel="noopener noreferrer"
          >
            Max Flow
          </Button>
          <Button 
            color="inherit" 
            href={config.maximumMatchingUrl}
            target="_blank"
            rel="noopener noreferrer"
          >
            Maximum Matching
          </Button>
        </Box>
      </Toolbar>
    </AppBar>
  );
};

export default Navbar; 