import React from 'react';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import FitnessCenterIcon from '@mui/icons-material/FitnessCenter';
import {Container} from '@mui/material'
import { Link } from "react-router-dom";

export default function Navbar() {
  return (
    <Box sx={{ flexGrow: 1 }}>
      <AppBar position="static" sx={{bgcolor: '#000'}}>
        <Container maxWidth='xl'>
        <Toolbar disableGutters sx={{justifyContent: 'space-between'}}>
            <Link to='/' style={{display: 'flex', gap: '0.3rem'}}>
            <FitnessCenterIcon sx={{color: 'warning.dark', alignSelf: 'center'}}/>
              <Typography variant="h6" component="div" sx={{ flexGrow: 1, color: 'warning.main' }}>
                STEEL GYM
            </Typography>
            </Link>
          <Button sx={{bgcolor: 'warning.dark', color: '#fff ', px: 3.5}}>Login</Button>
        </Toolbar>
        </Container>
      </AppBar>
    </Box>
  );
}
