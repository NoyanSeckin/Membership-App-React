import {Box, Container} from '@mui/material'
import { v4 as uuidv4 } from 'uuid';
import {app} from '../firebase/init' 
import {doc, updateDoc, getFirestore, arrayUnion} from 'firebase/firestore'
import React from 'react'
import MainInfoForm from '../components/MainInfoForm'

const containerStyle = {
  bgcolor: 'mainBg', 
  minHeight: '120vh'
}

export default function AddMember() {

  function turnNumberToDate(value){
    const aMonthInMiliSeconds = (86400 * 30  * 1000);
    const today = Date.now();
    const period = Number(value);
    const periodInMiliSeconds = (period / 30 ) * aMonthInMiliSeconds;
    return new Date((today + periodInMiliSeconds));
  }

  async function addMember(values){
    const db = getFirestore();
    const membersRef = doc(db, 'Members', 'members')
    const userObject = {...values, id: uuidv4()};
    userObject.period = turnNumberToDate(userObject.period)
    updateDoc(membersRef, {
      membersArray: arrayUnion(userObject)
    })
  }
  
  const initialValues = {
    name: '',
    phone: '',
    gender: '',
    period: '30',
  }

  const formHeader = 'Kayıt Formu'
  const btnText = 'Üye Oluştur'
  const radioLabel = 'Üyelik Süresi'

  return (
    <Box sx={containerStyle}>
     <Container maxWidth='xl' sx={{pt: 5}}>
      <MainInfoForm initialValues={initialValues} formHeader={formHeader} btnText={btnText} radioLabel={radioLabel} submitAction={addMember}/>
     </Container>
    </Box>
  )
}
