import {Container, Box, Button, Grid, Paper, Typography} from '@mui/material'
import SupervisorAccountIcon from '@mui/icons-material/SupervisorAccount';
import AddIcon from '@mui/icons-material/Add';
import {useNavigate} from 'react-router-dom'
import React, {useContext, useState} from 'react'
import AlertComponent from '../components/AlertComponent';
import AuthContext from '../contexts/AuthContext';


const paperStyle = {
  minHeight: '400px',
  width: '50%',
  minWidth: '300px',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  transition: '500ms ease-in-out',
  '&:hover': {
    px: {xs: 0, sm: 1.5},
    py: {xs: 0, sm: 1.5},
    cursor: 'pointer',
  }
}

const gridItemStyle = {
  display: 'flex', 
  flexDirection: 'column', 
  alignItems: 'center',
  gap: 3,
}

const iconStyle = {
  fontSize: '70px'
}

export default function Home() {
  const navigate = useNavigate()
  
  const {authContext} = useContext(AuthContext)

  const alertObject = {text: 'Lütfen giriş yapın', type: 'error'}
  const [isAlert, setIsAlert] = useState(false);

  function handleNavigate(path) {
    if(authContext){
      navigate(path);
    } else {
      setIsAlert(true)
    }
  }

  function renderLeftGrid(){
    return(
      <Grid item md={6} xs={12} sx={gridItemStyle}>
        <Typography variant='h5' sx={{fontWeight: 'bold'}}>
          Mevcut Üyeleri Gör
        </Typography>
        <Paper onClick={()=> handleNavigate('/members')}
        elevation={7} sx={{...paperStyle, bgcolor: 'primary.main'}}>
          <SupervisorAccountIcon sx={iconStyle}/>
        </Paper>
      </Grid>
    )
  }

  function renderRightGrid(){
    return(
      <Grid item md={6} xs={12} sx={{...gridItemStyle, mt: {xs: 4, md: 0}}}>
        <Typography variant='h5' sx={{fontWeight: 'bold'}}>
          Yeni Üye Ekle
        </Typography>
        <Paper onClick={()=> handleNavigate('/newmember')}
        elevation={7} sx={{...paperStyle, bgcolor: 'secondary.main'}}>
          <AddIcon sx={iconStyle}/>
        </Paper>
      </Grid>
    )
  }

  function renderGrid(){
    return(
      <Grid container sx={{pt: {xs: 3, md: 10}}}>
        {renderLeftGrid()}
        {renderRightGrid()}
      </Grid>
    )
  }

  const renderAlert = ()=> (
    <AlertComponent isAlert={isAlert} setIsAlert={setIsAlert} alertText={alertObject.text} alertType={alertObject.type}/>
  )

  return (
    <Box sx={{bgcolor: 'mainBg', minHeight: '100vh', pb: {xs: 4, md: 0}}}>
      <Container maxWidth='xl'>
      {renderGrid()}
      {renderAlert()}
    </Container>
    </Box>
  )
}
