import {Box, Button, Grid, Typography, Paper,} from '@mui/material'
import {getFirestore, doc, updateDoc} from 'firebase/firestore'
import { useNavigate } from 'react-router-dom'

import DetailsContext from '../contexts/DetailsContext'
import React, {useContext, useState} from 'react'
import MainInfoForm from './MainInfoForm'
import Modal from './Modal'
import { convertNumberToDate, renderEitherIcon,  renderBorderTopColor} from '../Utils'

const errorBtnStyle = {
  bgcolor: 'danger.main',
  color: '#fff',
  fontWeight: 700,
  '&:hover': {bgcolor: 'warning.dark'}
}

const correctBtnStyle = {
  ...errorBtnStyle,
  bgcolor: 'danger.main', 
  flexShrink: 1, 
  position: 'absolute',
  right: 0,
  py: 0,
  top: '32px',
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
  const navigate = useNavigate()
  // membercard comp sets detailsContext
  const {detailsContext, setDetailsContext} = useContext(DetailsContext);
  const user = detailsContext;

  const [isCorrect, setIsCorrect] = useState(false);
  const [correctInput, setCorrectInput] = useState(user.period)
  const [isDeleteModal, setIsDeleteModal] = useState(false);

  const sessionUsers = JSON.parse(sessionStorage.getItem('all-users'));
  
  const db = getFirestore();
  const membersRef = doc(db, 'Members', 'members');

  async function deleteUser() {
    const stayingUsers = sessionUsers.filter(localUser => localUser.id !== user.id)
    updateDoc(membersRef, {
      membersArray: stayingUsers
    });
    navigate('/members');
  }
  
  async function updateUser(updatedUser){
    // change the updated user
    console.log(user.period);
    const notUpdatedUsers = sessionUsers.filter(localUser => localUser.id !== user.id);
    const updatedUsers = [...notUpdatedUsers, {...updatedUser, period: convertNumberToDate(updatedUser.period), id: user.id}]

   
    setCorrectInput(updatedUser.period);
    // update detailsContext to display changes
    setDetailsContext({ 
      ...user,
       ...updatedUser, 
       period: updatedUser.period
    });
    // update db and sessionStorage
    sessionStorage.setItem('all-users', JSON.stringify(updatedUsers))
    updateDoc(membersRef, {
      membersArray:  updatedUsers
    })
  }


  
  function handleCorrectInput(e){
    setCorrectInput(e.target.value);
  }

  function handleCorrect(){
    if(correctInput >= 0){
      const updatedUser = {...user, period: Number(correctInput)}
      setIsCorrect(false);
      // change correctInput to date
      updateUser({...updatedUser, id: user.id})
    }
  }

  const initialValues = {
    name: user.name,
    phone: user.phone,
    gender: user.gender,
    period: ''
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

  const renderDeleteUserBtn = () =>(
    <Button sx={errorBtnStyle} onClick={()=> setIsDeleteModal(true)}>
      Üyeyi Sil
    </Button>
  )

  function renderLeftGrid(){
    return(
      <Grid item md={6} sx={{display: 'flex', flexDirection: 'column', alignItems: 'center'}}>
        <Typography variant='h4' sx={{fontWeight: '600'}}>Üye Bilgileri</Typography>
        <Paper elevation={5}
        sx={{...leftGridPaperStyle, borderTopColor: renderBorderTopColor(user.period)}}>
          
          {renderEitherIcon(user.gender)}
          {renderDetail('Ad-Soyad', user.name)}
          {renderDetail('Telefon Numarası', user.phone)}
          {renderDetail('Cinsiyet', genderToTurkish(user.gender))}
          {renderRemainingTime()}
          {renderDeleteUserBtn()}
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
      <Modal isModal={isDeleteModal} setIsModal={setIsDeleteModal} action={deleteUser}/>
     </>     
  )
}
