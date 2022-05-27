import {Box, Typography, Button, Container} from '@mui/material'
import { Formik} from 'formik';
import * as Yup from 'yup';

import React from 'react'

const formContainerStyle = {
  display: 'flex',
  justifyContent: 'center',
  
}

export default function AddMember() {
  
  const initialValues = {
    name: '',
    surname: '',
    address: '',
    phone: '',
    weight: '',
    height: '',
  }

  const yupObject = {
    name: Yup.string().required(),
    surname: Yup.string().required(),
    address: Yup.string(),
    phone: Yup.string(),
    weight: Yup.number(),
    height: Yup.number(),
    gender: Yup.bool()
  }

  function renderForm(){
    return(
      <Formik 
      initialValues={initialValues}
      validationSchema={
        Yup.object(yupObject)
      }
      onSubmit={(values, {resetForm})=> {

      }}>
        {({values, errors, handleSubmit, handleChange})=> (
          <form onSubmit={handleSubmit}>
            <Box sx={formContainerStyle}>

            </Box>
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
