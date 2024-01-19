import React from 'react';
import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import IconButton from '@mui/material/IconButton';
import ListAltIcon from '@mui/icons-material/ListAlt'; // For the list of redirections
import AddCircleOutlineIcon from '@mui/icons-material/AddCircleOutline'; // For creating a new rule
import TestIcon from '@mui/icons-material/Science'; // Icon for testing redirections (Science icon used as an example)
import InfoIcon from '@mui/icons-material/Info'; // For the About page

// Additional imports for navigation (if using react-router-dom)
import { Link } from 'react-router-dom';

function Navbar() {
  return (
    <AppBar position="static">
      <Toolbar>
        <img src="/redirections_manager_logo.png" alt="Redirections Manager Logo" style={{ height: '40px', marginRight: '10px' }} />
        <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
          Redirections Manager
        </Typography>
        <Link to="/redirections" style={{ color: 'inherit' }}>
          <IconButton color="inherit" aria-label="List of Redirections">
            <ListAltIcon />
          </IconButton>
        </Link>
        <Link to="/create" style={{ color: 'inherit' }}>
          <IconButton color="inherit" aria-label="Create New Rule">
            <AddCircleOutlineIcon />
          </IconButton>
        </Link>
        <Link to="/test" style={{ color: 'inherit' }}>
          <IconButton color="inherit" aria-label="Test Redirection">
            <TestIcon />
          </IconButton>
        </Link>
        <Link to="/about" style={{ color: 'inherit' }}>
          <IconButton color="inherit" aria-label="About">
            <InfoIcon />
          </IconButton>
        </Link>
      </Toolbar>
    </AppBar>
  );
}

export default Navbar;
