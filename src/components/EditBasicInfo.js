import {Box, Button, Grid, Typography, Paper} from '@mui/material'
import {getFirestore, doc, updateDoc} from 'firebase/firestore'

import DetailsContext from '../contexts/DetailsContext'
import React, {useContext, useState} from 'react'
import MainInfoForm from '../components/MainInfoForm'
import { convertNumberToDate, renderEitherIcon, calculateRemainingTime} from '../Utils'

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

const leftGridPaperStyle = {
  borderTop: '25px solid',
  borderRadius: '8px',
  display: 'flex', 
  flexDirection: 'column', 
  gap: 2, 
  mt: 4, 
  px: 6,
  py: 3,
}

export default function EditBasicInfo() {
  // membercard comp sets detailsContext
  const {detailsContext, setDetailsContext} = useContext(DetailsContext);
  const user = detailsContext;

  const sessionUsers = JSON.parse(sessionStorage.getItem('all-users'));
  
  const db = getFirestore();
  const membersRef = doc(db, 'Members', 'members');
  
  async function updateUser(updatedUser){
    // change the updated user
    const notUpdatedUsers = sessionUsers.filter(localUser => localUser.id !== updatedUser.id);
    const updatedUsers = [...notUpdatedUsers, updatedUser]

    const newRemaniningTime = calculateRemainingTime(updatedUser.period.getTime() / 1000)
    // update correcIinput to avoid displaying old value if iscorrect
    setCorrectInput(newRemaniningTime);
    // update detailsContext to display changes
    setDetailsContext({ 
      ...user,
       ...updatedUser, 
       period: newRemaniningTime
    });
    // update db and sessionStorage
    sessionStorage.setItem('all-users', JSON.stringify(updatedUsers))
    updateDoc(membersRef, {
      membersArray:  updatedUsers
    })
  }

  const [isCorrect, setIsCorrect] = useState(false);
  const [correctInput, setCorrectInput] = useState(user.period)
  
  function handleCorrectInput(e){
    setCorrectInput(e.target.value);
  }

  function handleCorrect(){
    if(correctInput >= 0){
      const updatedUser = {...user, period: correctInput}
      setIsCorrect(false);
      // change correctInput to date
      const newPeriodDate = convertNumberToDate(correctInput);
      updateUser({...updatedUser, period: newPeriodDate})
    }
  }

  const initialValues = {
    name: user.name,
    phone: user.phone,
    gender: user.gender,
    period: '0'
  }

  const btnText = 'Üye Bilgilerini Güncelle'
  const radioLabel = 'Üyelik süresi ekle'

  function renderDetail(header, text){
    return(
      <Box>
        <Typography variant='h6' sx={{fontWeight: '600'}}>{header}</Typography>
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
        <Box sx={{position: 'relative',}}>
          <Typography variant='h6' sx={{fontWeight: 600}}>
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
      <Grid item md={6} sx={{display: 'flex', flexDirection: 'column', alignItems: 'center'}}>
        <Typography variant='h4' sx={{fontWeight: '600'}}>Üye Bilgileri</Typography>
        <Paper elevation={5}
        sx={{...leftGridPaperStyle, borderTopColor: user.borderColor}}>
          
          {renderEitherIcon(user.gender)}
          {renderDetail('Ad-Soyad', user.name)}
          {renderDetail('Telefon Numarası', user.phone)}
          {renderDetail('Cinsiyet', genderToTurkish(user.gender))}
          {renderRemainingTime()}
        </Paper>
      </Grid>
    )
  }

  function renderRightGrid(){
    return(
      <Grid item md={6}>
        {<MainInfoForm submitAction={updateUser}
        initialValues={initialValues} btnText={btnText} radioLabel={radioLabel} existingUserPeriod={user.period}/>}
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
