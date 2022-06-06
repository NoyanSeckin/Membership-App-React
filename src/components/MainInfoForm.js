import {Box, Typography, Button,  Paper} from '@mui/material'
import { Formik} from 'formik';
import * as Yup from 'yup';

import React from 'react'
import SelectComponent from './SelectComponent'
import RadioComponent from './RadioComponent'

const formContainerStyle = {
  borderRadius: '8px',
  display: 'flex',
  flexDirection: 'column',
  gap: 3,
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
  gap: '2rem',
  position: 'relative'
}

const submitBtnStyle = {
  color: '#fff',
  py: 1.3, 
  width: '100%', 
  fontSize: '16px',
  mt: -1.3
}

export default function MainInfoForm({initialValues, formHeader, btnText, radioLabel, submitAction, existingUserPeriod, remainingTime}) {

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

  function renderInputs(values, errors, handleChange){
    return Object.entries(inputInfos).map(info => {
      const propName = info.at(0);
      const propValue = info.at(1);
      return(
      <Box key={propName}
      sx={{display: 'flex', flexDirection: 'column'}}>
        <label htmlFor={propName}>
          {propValue.label} 
          <span className='form-warning-span'>{errors[propName]}</span>
        </label>
        <input name={propName} placeholder={propValue.placeholder}
        type={propValue.type} id={propName} onChange={handleChange} value={values[propName]}/>
      </Box>
      )
   })
  }

  function renderFormContent(values, errors, handleChange){
    return(
      <Paper elevation={6} sx={formContainerStyle}>
        {renderInputs(values, errors, handleChange)}
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
        console.log(values.period);
        if(existingUserPeriod){
          // if values.period also selected add that to the  existing period
          const newValue = values.period ? Number(values.period) + existingUserPeriod : existingUserPeriod;
          console.log(values.period);
          submitAction({...values, period: newValue})
        } else  submitAction(values);
       
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
  return (
     <>
      {renderForm()}
     </>
  )
}
