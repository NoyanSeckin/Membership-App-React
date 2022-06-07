import Alert from '@mui/material/Alert';

import React,{useEffect} from 'react';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import ErrorIcon from '@mui/icons-material/Error';
export default function AlertComponent({isAlert, setIsAlert, alertText, alertType, customStyle}) {
  const returnEither = (error, success) => (
    alertType === 'error'  ? error : success
    ) 

  const alertStyle = {
    bgcolor: returnEither('danger.main', '#F1FFF0'),
    borderRadius:' 8px',
    boxShadow:' 0px 3px 12px #1E36482E',
    color: returnEither('#fff', '#46af32'),
    fontSize: '16px',
    position:{xs:  'fixed', md: 'absolute'},
    zIndex: 5,
    mr: 3,
    py: 1.3,
    left: {xs: '0', md: 'auto'},
    mx: {xs: 'auto', md: 0},
    right: {xs: '0', md: '5px'},
    top: {xs: '55px', md: '75px'},
    width: {xs: '260px', md: '321px'},
    ...customStyle
  }
  
  function handleClose(){
    setTimeout(() => {
      setIsAlert(false);
    }, 3000);
  }
  // test

  useEffect(()=> {
    if(isAlert){
      handleClose()
    }
  }, [isAlert])

  function renderAlert() {
    return(isAlert &&
    <Alert icon={returnEither(<ErrorIcon/>, <CheckCircleIcon/>)} variant="filled" 
    sx={alertStyle} >
      {alertText}
    </Alert>)
  }
  return (
    <>
     {renderAlert()}
    </>
  );
}