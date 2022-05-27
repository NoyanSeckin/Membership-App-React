import {Box, Typography, Button, Container, Paper} from '@mui/material'
import { Formik} from 'formik';
import * as Yup from 'yup';

import React from 'react'

const formContainerStyle = {
  borderRadius: '8px',
  display: 'flex',
  flexDirection: 'column',
  width: '55%',
  maxWidth: '500px',
  py: 2,
  px: 3,
}

const formStyle = {
  display: 'flex', 
  alignItems: 'center',
  flexDirection: 'column',
  paddingTop: '5rem',
  gap: '2rem'
}

export default function AddMember() {
  
  const initialValues = {
    name: '',
    lastName: '',
    phone: '',
    weight: null,
    height: null,
    // gender: '',
  }

  const yupObject = {
    name: Yup.string().required(),
    lastName: Yup.string().required(),
    phone: Yup.number(),
    weight: Yup.number(),
    height: Yup.number(),
    // gender: Yup.string()
  }

  const inputInfos = {
    name: {label: 'İsim', placeholder: 'İsim giriniz', type: 'text'},
    lastName: {label: 'Soyisim', placeholder: 'Soyisim giriniz', type: 'text'},
    phone: {label: 'Telefon', placeholder: 'Telefon giriniz', type: 'number'},
    weight: {label: 'Kilo', placeholder: 'Kilo giriniz', type: 'number'},
    height: {label: 'Boy', placeholder: 'Boy ölçüsü giriniz', type: 'number'},
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

  function renderForm(){
    return(
      <Formik 
      initialValues={initialValues}
      validationSchema={
        Yup.object(yupObject)
      }
      onSubmit={(values, {resetForm})=> {
        console.log(values)
      }}>
        {({values, errors, handleSubmit, handleChange})=> (
          <form style={formStyle} onSubmit={handleSubmit}>
              <Typography variant='h4'>
                Yeni Kayıt
              </Typography>
            <Paper elevation={6} sx={formContainerStyle}>
              {renderInputs(values, handleChange)}
              <Button variant='contained' type='submit' sx={{width: '100%'}}>
                Üye Oluştur
              </Button>
            </Paper>
          </form>
        )}
      </Formik>
    )
  }
  return (
    <Container maxWidth='xl'>
      {renderForm()}
    </Container>
  )
}
