import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { ThemeProvider, createTheme, CssBaseline } from '@mui/material';
import Navbar from './components/Navbar';
import Home from './pages/Home';
import MaxFlowPage from './pages/MaxFlowPage';
import MaximumMatchingPage from './pages/MaximumMatchingPage';
import './App.css';

// Create a custom theme
const theme = createTheme({
  palette: {
    primary: {
      main: '#2196f3', // Blue
    },
    secondary: {
      main: '#ff9800', // Orange
    },
  },
});

function App() {
  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <Router>
        <div className="App">
          <Navbar />
          <main style={{ height: 'calc(100vh - 64px)' }}>
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/maxflow" element={<MaxFlowPage />} />
              <Route path="/maximum-matching" element={<MaximumMatchingPage />} />
            </Routes>
          </main>
        </div>
      </Router>
    </ThemeProvider>
  );
}

export default App;
