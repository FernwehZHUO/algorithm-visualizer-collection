import React from 'react';
import { 
  Container, 
  Typography, 
  Grid, 
  Card, 
  CardContent, 
  CardActions, 
  Button,
  Box
} from '@mui/material';
import { Link } from 'react-router-dom';
import ShareIcon from '@mui/icons-material/Share';
import CompareArrowsIcon from '@mui/icons-material/CompareArrows';

const Home: React.FC = () => {
  return (
    <Container sx={{ py: 8 }}>
      <Typography variant="h3" component="h1" gutterBottom align="center">
        Algorithm Visualization Projects
      </Typography>
      <Typography variant="h5" component="h2" gutterBottom align="center" color="textSecondary" paragraph>
        Interactive visualizations for network flow and graph matching algorithms
      </Typography>
      
      <Grid container spacing={4} sx={{ mt: 4 }}>
        <Grid sx={{ gridColumn: { xs: 'span 12', sm: 'span 6' } }}>
          <Card sx={{ height: '100%', display: 'flex', flexDirection: 'column' }}>
            <Box sx={{ p: 3, display: 'flex', justifyContent: 'center' }}>
              <ShareIcon sx={{ fontSize: 80, color: 'primary.main' }} />
            </Box>
            <CardContent sx={{ flexGrow: 1 }}>
              <Typography gutterBottom variant="h5" component="h2">
                Max Flow Visualization
              </Typography>
              <Typography>
                Interactive visualization of maximum flow algorithms including Ford-Fulkerson, 
                Edmonds-Karp, and Push-Relabel algorithms on directed graphs.
              </Typography>
            </CardContent>
            <CardActions>
              <Button 
                component={Link} 
                to="/maxflow" 
                size="large" 
                color="primary" 
                variant="contained" 
                fullWidth
              >
                Launch Max Flow Visualizer
              </Button>
            </CardActions>
          </Card>
        </Grid>
        
        <Grid sx={{ gridColumn: { xs: 'span 12', sm: 'span 6' } }}>
          <Card sx={{ height: '100%', display: 'flex', flexDirection: 'column' }}>
            <Box sx={{ p: 3, display: 'flex', justifyContent: 'center' }}>
              <CompareArrowsIcon sx={{ fontSize: 80, color: 'secondary.main' }} />
            </Box>
            <CardContent sx={{ flexGrow: 1 }}>
              <Typography gutterBottom variant="h5" component="h2">
                Maximum Matching Visualization
              </Typography>
              <Typography>
                Interactive visualization of maximum matching algorithms for bipartite graphs,
                with step-by-step execution and visual representation.
              </Typography>
            </CardContent>
            <CardActions>
              <Button 
                component={Link} 
                to="/maximum-matching" 
                size="large" 
                color="secondary" 
                variant="contained" 
                fullWidth
              >
                Launch Maximum Matching Visualizer
              </Button>
            </CardActions>
          </Card>
        </Grid>
      </Grid>
    </Container>
  );
};

export default Home; 