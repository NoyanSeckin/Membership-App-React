import {Container, Box, Button, Grid, Paper, Typography} from '@mui/material'
import SupervisorAccountIcon from '@mui/icons-material/SupervisorAccount';
import AddIcon from '@mui/icons-material/Add';
import {Link} from 'react-router-dom'
import React from 'react'

const paperStyle = {
  minHeight: '400px',
  width: '50%',
  minWidth: '300px',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  transition: '500ms ease-in-out',
  '&:hover': {
    px: {xs: 0, sm: 1.5},
    py: {xs: 0, sm: 1.5},
    cursor: 'pointer',
  }
}

const gridItemStyle = {
  display: 'flex', 
  flexDirection: 'column', 
  alignItems: 'center',
  gap: 3
}

const iconStyle = {
  fontSize: '70px'
}

export default function Home() {

  function renderLeftGrid(){
    return(
      <Grid item md={6} sx={gridItemStyle}>
        <Typography variant='h5' sx={{fontWeight: 'bold'}}>
          Mevcut Üyeleri Gör
        </Typography>
        <Link to='/members'>
        <Paper elevation={7} sx={{...paperStyle, bgcolor: 'primary.main'}}>
          <SupervisorAccountIcon sx={iconStyle}/>
        </Paper>
        </Link>
      </Grid>
    )
  }

  function renderRightGrid(){
    return(
      <Grid item md={6} sx={gridItemStyle}>
        <Typography variant='h5' sx={{fontWeight: 'bold'}}>
          Yeni Üye Ekle
        </Typography>
        <Link to='/newmember'>
        <Paper elevation={7} sx={{...paperStyle, bgcolor: 'secondary.main'}}>
          <AddIcon sx={iconStyle}/>
        </Paper>
        </Link>
      </Grid>
    )
  }

  function renderGrid(){
    return(
      <Grid container sx={{pt: 10}}>
        {renderLeftGrid()}
        {renderRightGrid()}
      </Grid>
    )
  }

  return (
    <Box sx={{bgcolor: 'mainBg', minHeight: '100vh'}}>
      <Container maxWidth='xl'>
      {renderGrid()}
    </Container>
    </Box>
  )
}
