import {Box, Typography, Button,  Paper} from '@mui/material'
import { Formik} from 'formik';
import * as Yup from 'yup';

import React, {useState} from 'react'
import SelectComponent from './SelectComponent'
import RadioComponent from './RadioComponent'
import AlertComponent from './AlertComponent'

const formContainerStyle = {
  borderRadius: '8px',
  display: 'flex',
  flexDirection: 'column',
  gap: 3,
  width: {xs: '88%', md: '55%'},
  maxWidth: '500px',
  pt: 4,
  pb: 2,
  px: 3,
  borderTop: '40px #2c387e solid'
}

const formStyle = {
  display: 'flex', 
  alignItems: 'center',
  flexDirection: 'column',
  gap: '2rem',
  position: 'relative',
}

const submitBtnStyle = {
  color: '#fff',
  py: 1.3, 
  width: '100%', 
  fontSize: '16px',
  mt: -1.3
}

export default function MainInfoForm({initialValues, formHeader, btnText, radioLabel, submitAction, existingUserPeriod, remainingTime, alertText, isResetForm}) {

  const [isAlert, setIsAlert] = useState(false);

  const yupObject = {
    name: Yup.string().required('Ad-Soyad boş bırakılamaz'),
    phone: Yup.number(),
    gender: Yup.string().required('Lütfen cinsiyet seçiniz.'),
    period: Yup.string()
  }

  const inputInfos = {
    name: {label: 'Ad-Soyad', placeholder: 'Ad-Soyad giriniz', type: 'text'},
    phone: {label: 'Telefon', placeholder: 'Telefon giriniz', type: 'text'},
  }

const renderInput = (name, value, error, handleChange, customError) => (
  <Box sx={{display: 'flex', flexDirection: 'column', height: '80px'}}>
    <label htmlFor={name}>
        {inputInfos[name].label}
    </label>
    <input type="text" placeholder={inputInfos[name].placeholder} name={name} id={name} onChange={handleChange} 
    value={value}/>
    <span className='form-warning-span'>
      {error && (customError ||  error)}
    </span>
  </Box>
)

  function renderFormContent(values, errors, handleChange){
    return(
      <Paper elevation={6} sx={formContainerStyle}>
        {renderInput('name', values.name, errors.name, handleChange)}
        {renderInput('phone', values.phone, errors.phone, handleChange, 'Yalnızca rakam giriniz.')}
        <SelectComponent value={values.gender} handleChange={handleChange} error={errors.gender}/>
        {remainingTime && remainingTime()}
        <RadioComponent label={radioLabel} value={values.period} handleChange={handleChange}/>
        <Button variant='contained' type='submit' sx={submitBtnStyle}>
          {btnText}
        </Button>
      </Paper>
    )
  }

  function renderFormHeader(){
    return (
      <Typography variant='h4' sx={{fontWeight: '600'}}>
        {formHeader}
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
        if(existingUserPeriod){
          // if values.period also selected add that to the  existing period
          const newValue = values.period ? Number(values.period) + existingUserPeriod : existingUserPeriod;
          submitAction({...values, period: newValue})
        } else  submitAction({...values, period: Number(values.period)});
        setIsAlert(true);
        isResetForm && resetForm();
       
      }}>
        {({values, errors, handleSubmit, handleChange})=> (
          <form style={formStyle} onSubmit={handleSubmit}>
            {renderFormHeader()}
            {renderFormContent(values, errors, handleChange)}
          </form>
        )}
      </Formik>
    )
  }
  
  const renderAlert = () => (
    <AlertComponent isAlert={isAlert} setIsAlert={setIsAlert} type={'success'} alertText={alertText}/>
  )
  return (
     <>
      {renderForm()}
      {renderAlert()}
     </>
  )
}
