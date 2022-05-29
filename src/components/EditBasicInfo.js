import {Box, Button, Grid, Typography} from '@mui/material'
import DetailsContext from '../contexts/DetailsContext'
import React, {useContext, useState} from 'react'
import MainInfoForm from '../components/MainInfoForm'

const correctBtnStyle = {
  bgcolor: 'danger.main', 
  color: '#fff',
  flexShrink: 1, 
  position: 'absolute',
  fontWeight: 700,
  right: 0,
  py: 0,
  top: '32px',
  '&:hover': {bgcolor: 'warning.dark'}
}

export default function EditBasicInfo() {
  // membercard comp sets detailsContext
  const {detailsContext, setDetailsContext} = useContext(DetailsContext);
  const user = detailsContext;

  const [isCorrect, setIsCorrect] = useState(false);
  const [correctInput, setCorrectInput] = useState(user.period)

  function handleCorrectInput(e){
    setCorrectInput(e.target.value);
  }

  function handleCorrect(){
    if(correctInput >= 0){
      setIsCorrect(false);
      setDetailsContext({...user, period: correctInput});
    }
  }

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

  function renderRemainingTime(){
    if(isCorrect){
      return(
        <Box sx={{position: 'relative'}}>
          <Typography variant='h5' sx={{fontWeight: 600}}>
            Kalan Üyelik Süresi
          </Typography>
          <input className='correct-input' type="number" value={correctInput} onChange={(e)=> handleCorrectInput(e)} />
          <Button onClick={handleCorrect}
          variant='contained' sx={{...correctBtnStyle, bgcolor: 'primary.main', '&:hover': {bgcolor: 'primary.light'}}}>Tamamla</Button>
        </Box>
      )
    }
    else
    return(
      <Box sx={{position: 'relative'}}>
        {renderDetail('Kalan Üyelik Süresi', user.period + ' gün')}
        <Button onClick={()=> setIsCorrect(true)}
        variant='contained' sx={correctBtnStyle}>Düzelt</Button>
      </Box>
    )
  }

  function renderLeftGrid(){
    return(
      <Grid item md={6} sx={{display: 'flex', justifyContent: 'center'}}>
        <Box sx={{display: 'flex', flexDirection: 'column', gap: 2, mt: 4}}>
          <Typography variant='h4' sx={{fontWeight: '600'}}>Üye Bilgileri</Typography>
          {renderDetail('Ad-Soyad', user.name)}
          {renderDetail('Telefon Numarası', user.phone)}
          {renderDetail('Cinsiyet', genderToTurkish(user.gender))}
          {renderRemainingTime()}
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
     <>
      {renderGrid()}
     </>     
  )
}
