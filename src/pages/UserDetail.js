import {Box, Button, Container, Grid, Paper, Typography} from '@mui/material'

import DetailsContext from '../contexts/DetailsContext'
import React, {useContext} from 'react'

export default function UserDetail() {
  // membercard comp sets detail value
  const {detailsContext} = useContext(DetailsContext);
  const user = detailsContext;
  console.log(detailsContext)

  function renderDetail(header, text){
    return(
      <Box>
        <Typography variant='h5' sx={{fontWeight: '600'}}>{header}</Typography>
        <Typography>{text}</Typography>
      </Box>
    )
  }

  function genderToTurkish(gender){
    return gender === 'male' ? 'Erkek' : 'Kadın';
  }

  function renderLeftGrid(){
    return(
      <Grid item md={6} sx={{display: 'flex', flexDirection: 'column', gap: 2}}>
        <Typography variant='h4' sx={{fontWeight: '600'}}>Üye Bilgileri</Typography>
        {renderDetail('Ad-Soyad', user.name)}
        {renderDetail('Telefon Numarası', user.phone)}
        {renderDetail('Cinsiyet', genderToTurkish(user.gender))}


        
      </Grid>
    )
  }

  function renderGrid(){
    return(
      <Grid container>
        {renderLeftGrid()}
      </Grid>
    )
  }

  return (
    <Box sx={{bgcolor: 'mainBg', minHeight: '120vh'}}>
      <Container maxWidth='xl'>
        <Paper sx={{p: 3}}>
          {renderGrid()}
        </Paper>
      </Container>
    </Box>
  )
}
