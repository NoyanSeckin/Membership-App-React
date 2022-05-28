import {Box, Typography, Button, Container, Paper} from '@mui/material'
import { Formik} from 'formik';
import * as Yup from 'yup';
import { v4 as uuidv4 } from 'uuid';
import {app} from '../firebase/init' 
import {doc, updateDoc, getFirestore, arrayUnion} from 'firebase/firestore'
import React from 'react'
import SelectComponent from '../components/SelectComponent'
import RadioComponent from '../components/RadioComponent'

const containerStyle = {
  bgcolor: 'mainBg', 
  minHeight: '120vh'
}

const formContainerStyle = {
  borderRadius: '8px',
  display: 'flex',
  flexDirection: 'column',
  gap: 4,
  width: '55%',
  maxWidth: '500px',
  pt: 4,
  pb: 2,
  px: 3,
  borderTop: '50px #2c387e solid'
}

const formStyle = {
  display: 'flex', 
  alignItems: 'center',
  flexDirection: 'column',
  paddingTop: '5rem',
  gap: '2rem'
}

const submitBtnStyle = {
  color: '#fff',
  py: 1.3, 
  width: '100%', 
  fontSize: '16px'
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

  const yupObject = {
    name: Yup.string().required(),
    phone: Yup.number(),
    gender: Yup.string().required(),
    period: Yup.string().required()
  }

  const inputInfos = {
    name: {label: 'Ad-Soyad', placeholder: 'Ad-Soyad giriniz', type: 'text'},
    phone: {label: 'Telefon', placeholder: 'Telefon giriniz', type: 'number'},
  }

  function renderInputs(values, handleChange){
    return Object.entries(inputInfos).map(info => {
      const propName = info.at(0);
      const propValue = info.at(1);
      return(
      <Box key={propName}
      sx={{display: 'flex', flexDirection: 'column'}}>
        <label htmlFor={propName}>{propValue.label}</label>
        <input name={propName} type={propValue.type} id={propName} onChange={handleChange} value={values.propName}/>
      </Box>
      )
   })
  }

  function renderFormContent(values, handleChange){
    return(
      <Paper elevation={6} sx={formContainerStyle}>
        {renderInputs(values, handleChange)}
        <SelectComponent value={values.gender} handleChange={handleChange}/>
        <RadioComponent value={values.period} handleChange={handleChange}/>
        <Button variant='contained' type='submit' sx={submitBtnStyle}>
          Üye Oluştur
        </Button>
      </Paper>
    )
  }

  function renderFormHeader(){
    return (
      <Typography variant='h4' sx={{fontWeight: '600'}}>
        Kayıt Formu
      </Typography>
    )
  }

  function renderForm(){
    return(
      <Formik 
      initialValues={initialValues}
      validationSchema={
        Yup.object(yupObject)
      }
      onSubmit={(values, {resetForm})=> {
        addMember(values);
      }}>
        {({values, errors, handleSubmit, handleChange})=> (
          <form style={formStyle} onSubmit={handleSubmit}>
            {renderFormHeader()}
            {renderFormContent(values, handleChange)}
          </form>
        )}
      </Formik>
    )
  }
  return (
    <Box sx={containerStyle}>
     <Container maxWidth='xl'>
      {renderForm()}
     </Container>
    </Box>
  )
}
