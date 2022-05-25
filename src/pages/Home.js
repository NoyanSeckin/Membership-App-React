import {Container, Box, Button, Grid, Paper, Typography} from '@mui/material'
import SupervisorAccountIcon from '@mui/icons-material/SupervisorAccount';
import AddIcon from '@mui/icons-material/Add';

import React from 'react'

const paperStyle = {
  minHeight: '400px',
  width: '50%',
  minWidth: '300px',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center'
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
        <Paper sx={{...paperStyle, bgcolor: 'primary.main'}}>
          <SupervisorAccountIcon sx={iconStyle}/>
        </Paper>
      </Grid>
    )
  }

  function renderRightGrid(){
    return(
      <Grid item md={6} sx={gridItemStyle}>
        <Typography variant='h5' sx={{fontWeight: 'bold'}}>
          Yeni Üye Ekle
        </Typography>
        <Paper sx={{...paperStyle, bgcolor: 'secondary.main'}}>
          <AddIcon sx={iconStyle}/>
        </Paper>
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
    <Container maxWidth='xl'>
      {renderGrid()}
    </Container>
  )
}
