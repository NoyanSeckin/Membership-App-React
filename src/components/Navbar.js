import * as React from 'react';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import FitnessCenterIcon from '@mui/icons-material/FitnessCenter';
import {Container} from '@mui/material'

export default function ButtonAppBar() {
  return (
    <Box sx={{ flexGrow: 1 }}>
      <AppBar position="static" sx={{bgcolor: '#000'}}>
        <Container maxWidth='xl'>
        <Toolbar>
          <FitnessCenterIcon sx={{color: 'warning.dark'}}/>
          <Typography variant="h6" component="div" sx={{ flexGrow: 1, color: 'warning.main' }}>
            STEEL GYM
          </Typography>
          <Button sx={{bgcolor: 'warning.dark', color: '#fff ', px: 3.5}}>Login</Button>
        </Toolbar>
        </Container>
      </AppBar>
    </Box>
  );
}
