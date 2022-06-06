import {Box, Button, Typography} from '@mui/material'
import {getFirestore, doc, updateDoc} from 'firebase/firestore'
import { useNavigate } from 'react-router-dom'

import DetailsContext from '../contexts/DetailsContext'
import React, {useContext, useState} from 'react'
import MainInfoForm from './MainInfoForm'
import Modal from './Modal'
import { convertNumberToDate} from '../Utils'

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
  left: '110px',
  py: 0,
  top: '35px',
}

const inputBtnStyle = {
  bgcolor: 'primary.main', 
  left: '92px',
  '&:hover': {bgcolor: 'primary.light'}
}

const deleteBtnStyle = {
  position: 'absolute',
  right: '5px',
  top: '-305px',
  px: 2,
  color: 'danger.main',
  borderColor: 'danger.main',
  fontSize: '16px',
  '&:hover': {borderColor: 'danger.main'}
}

const remainingTimeContainer = {
  position: 'relative', 
  pl: 1, 
  height: '50px',
  mt: -1
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

  const renderRemainingHeader = () => (
    <Typography sx={{fontWeight: 600}} variant='h6'>Kalan Üyelik Süresi</Typography>
  )

  const renderDeleteUserBtn = () =>(
    <Button variant='outlined' sx={{...deleteBtnStyle}} onClick={()=> setIsDeleteModal(true)}>
      Üyeyi Sil
    </Button>
  )
    const renderCorrectInput = () => (
      <>
        <input className='correct-input' type="number" value={correctInput} onChange={(e)=> handleCorrectInput(e)} />
        <Button onClick={handleCorrect}
        variant='contained' sx={{...correctBtnStyle, ...inputBtnStyle}}>Tamamla</Button>
      </>
    )

    const renderRemainingTimeInfo = () => (
      <>
        <Typography sx={{mt: 0.5}}>{user.period + ' gün'}</Typography>
        <Button onClick={()=> setIsCorrect(true)}
        variant='contained' sx={correctBtnStyle}>Düzelt</Button>
      </>
    )

  const renderRemainingTime = () => (
        <Box sx={remainingTimeContainer}>
          {renderRemainingHeader()}
          {isCorrect ? renderCorrectInput() : renderRemainingTimeInfo()}
          {renderDeleteUserBtn()}
        </Box>
      )

  const renderForm = () => (
        <MainInfoForm submitAction={updateUser}
        initialValues={initialValues} btnText={btnText} radioLabel={radioLabel} existingUserPeriod={user.period}
        formHeader={'Üye Bilgileri'} remainingTime={renderRemainingTime}/>
    )

    const renderModal =  ()=> (
      <Modal isModal={isDeleteModal} setIsModal={setIsDeleteModal} action={deleteUser}/>
    )

    return (
     <>
      {renderForm()}
      {renderModal()}
     </>     
  )
}
