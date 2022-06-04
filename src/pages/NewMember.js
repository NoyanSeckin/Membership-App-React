import {Box, Container} from '@mui/material'
import { v4 as uuidv4 } from 'uuid';
import {app} from '../firebase/init' 
import {doc, updateDoc, getFirestore, arrayUnion} from 'firebase/firestore'
import React from 'react'
import MainInfoForm from '../components/MainInfoForm'
import {convertNumberToDate} from '../Utils'

const containerStyle = {
  bgcolor: 'mainBg', 
  minHeight: '120vh'
}

export default function NewMember() {

  async function AddMember(values){
    const db = getFirestore();
    const membersRef = doc(db, 'Members', 'members')
    const userObject = {...values, id: uuidv4()};
    userObject.period = convertNumberToDate(userObject.period)
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
      <MainInfoForm initialValues={initialValues} formHeader={formHeader} btnText={btnText} radioLabel={radioLabel} submitAction={AddMember}/>
     </Container>
    </Box>
  )
}
