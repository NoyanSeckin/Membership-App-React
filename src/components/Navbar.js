import React from 'react';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import FitnessCenterIcon from '@mui/icons-material/FitnessCenter';
import {Container} from '@mui/material'
import { Link } from "react-router-dom";

const brandStyle = {
  flexGrow: 1, 
  color: 'warning.dark', 
  fontWeight: '600' 
}

const iconStyle = {
  alignSelf: 'center',
  color: 'warning.dark', 
}

const linkStyle = {
  display: 'flex', 
  gap: '0.3rem'
}

const authBtnStyle = {
  bgcolor: 'warning.dark', 
  color: '#fff ', 
  px: 3.5,
  fontSize: '15px',
}

export default function Navbar() {
  return (
    <Box sx={{ flexGrow: 1 }}>
      <AppBar position="static" sx={{bgcolor: '#000'}}>
        <Container maxWidth='xl'>
        <Toolbar disableGutters sx={{justifyContent: 'space-between'}}>
            <Link to='/' style={linkStyle}>
            <FitnessCenterIcon sx={iconStyle}/>
              <Typography variant="h6" component="div" sx={brandStyle}>
                STEEL GYM
            </Typography>
            </Link>
          <Button sx={authBtnStyle}>Giriş Yap</Button>
        </Toolbar>
        </Container>
      </AppBar>
    </Box>
  );
}
