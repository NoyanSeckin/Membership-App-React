import { Formik} from 'formik';
import * as Yup from 'yup';

import React from 'react'

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
            
          </form>
        )}
      </Formik>
    )
  }
  return (
    <div>
      {renderForm()}
    </div>
  )
}
