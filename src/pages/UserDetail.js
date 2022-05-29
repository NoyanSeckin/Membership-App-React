import {Box, Button, Container, Grid, Paper, Typography} from '@mui/material'

import DetailsContext from '../contexts/DetailsContext'
import React, {useContext} from 'react'
import MainInfoForm from '../components/MainInfoForm'

export default function UserDetail() {
  // membercard comp sets detailsContext
  const {detailsContext} = useContext(DetailsContext);
  const user = detailsContext;
  console.log(detailsContext)

  const initialValues = {
    name: user.name,
    phone: user.phone,
    gender: user.gender,
    period: '30'
  }

  const btnText = 'Üye Bilgilerini Güncelle'
  const radioLabel = 'Üyelik süresi ekle'

  function renderDetail(header, text){
    return(
      <Box>
        <Typography variant='h5' sx={{fontWeight: '600'}}>{header}</Typography>
        <Typography>{text || 'Belirtilmemiş'}</Typography>
      </Box>
    )
  }

  function genderToTurkish(gender){
    return gender === 'male' ? 'Erkek' : 'Kadın';
  }

  function renderLeftGrid(){
    return(
      <Grid item md={6} sx={{display: 'flex', justifyContent: 'center'}}>
        <Box sx={{display: 'flex', flexDirection: 'column', gap: 2, mt: 4}}>
          <Typography variant='h4' sx={{fontWeight: '600'}}>Üye Bilgileri</Typography>
          {renderDetail('Ad-Soyad', user.name)}
          {renderDetail('Telefon Numarası', user.phone)}
          {renderDetail('Cinsiyet', genderToTurkish(user.gender))}
          {renderDetail('Kalan Üyelik Süresi', user.period + ' gün')}
        </Box>
      </Grid>
    )
  }

  function renderRightGrid(){
    return(
      <Grid item md={6}>
        {<MainInfoForm initialValues={initialValues} btnText={btnText} radioLabel={radioLabel}/>}
      </Grid>
    )
  }

  function renderGrid(){
    return(
      <Grid container>
        {renderLeftGrid()}
        {renderRightGrid()}
      </Grid>
    )
  }

  return (
    <Box sx={{bgcolor: 'mainBg', minHeight: '120vh'}}>
      <Container maxWidth='xl'>
        <Paper sx={{px: 5, py: 3}}>
          {renderGrid()}
        </Paper>
      </Container>
    </Box>
  )
}
