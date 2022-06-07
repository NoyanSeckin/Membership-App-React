import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import FitnessCenterIcon from '@mui/icons-material/FitnessCenter';
import { Container} from '@mui/material'
import { Link } from "react-router-dom";
import {getAuth, signInWithEmailAndPassword, signOut, onAuthStateChanged} from 'firebase/auth'
import React, {useState, useEffect, useContext} from 'react';
import SignInModal from './SignInModal'
import AuthContext from '../contexts/AuthContext';
import AlertComponent from './AlertComponent';

const brandStyle = {
  flexGrow: 1, 
  color: 'danger.dark', 
  fontWeight: '600' 
}

const iconStyle = {
  alignSelf: 'center',
  color: 'danger.dark', 
}

const linkStyle = {
  display: 'flex', 
  gap: '0.3rem'
}

const authBtnStyle = {
  bgcolor: 'danger.dark', 
  color: '#fff ', 
  px: 3.5,
  fontSize: '15px',
  '&:hover': {bgcolor: 'danger.main'}
}

export default function Navbar() {
  const {authContext, setAuthContext} = useContext(AuthContext)

  const [isSignInModal, setIsSignInModal] = useState(false);
  // const [signInErrorText, setSignInErrorText] = useState('');

  const [isAlert, setIsAlert] = useState(false);
  const [alertObject, setAlertObject]= useState({})
  
  const openSignInModal = ()=> setIsSignInModal(true)

  const auth = getAuth();

  useEffect(() => {
  onAuthStateChanged(auth, (user)=> {
    setAuthContext(Boolean(user))
  })
  }, []);

  function setAuthErrMessage(errorMessage){
    let errorText;
    if(errorMessage.includes('wrong-password')){
      errorText = 'Hatalı şifre girdiniz.';
    } else if(errorMessage.includes('user-not-found')){
      errorText = 'Hatalı email girdiniz';
    }
    setAlertObject({text: errorText, type: 'error'})
    setIsAlert(true);
  } 

  function handleSignInSuccess(){
    setIsSignInModal(false);
    setAlertObject({type: 'success', text: 'Giriş başarılı !'})
    setIsAlert(true);
  }

  async function signInUser(email, password){
    signInWithEmailAndPassword(auth, email, password).then(cred =>  handleSignInSuccess()).catch(err => setAuthErrMessage(err.message))
  }

  async function signOutUser(){
    signOut(auth);
    setAlertObject({type: 'success', text: 'Çıkış başarılı!'})
    setIsAlert(true);
  }

  const renderAuthBtn = () => (
    <>
     {
     authContext ?  
     <Button onClick={signOutUser} sx={authBtnStyle}>Çıkış Yap</Button>
     :
     <Button onClick={openSignInModal} sx={authBtnStyle}>Giriş Yap</Button>
    }
    </>
  )
    function renderAlert() {
      // error alert is displayed in signIn modal and success in modal
      return (
      <AlertComponent isAlert={isAlert} setIsAlert={setIsAlert} alertText={alertObject.text} alertType={alertObject.type} 
      customStyle={
        alertObject.type === 'error' 
        &&
        {right: '0px', top: '-65px', width: {xs: '310px', md: '355px'}} 
      }/>
      )
    }

    const renderSignInModal = () => (
      <SignInModal isModal={isSignInModal} setIsModal={setIsSignInModal} signInUser={signInUser} authContext={authContext} renderAlert={alertObject.type === 'error' && renderAlert}/>
    )

  return (
    <Box sx={{ flexGrow: 1 }}>
      <AppBar position="static" sx={{bgcolor: '#000'}}>
        <Container maxWidth='xl'>
        <Toolbar disableGutters sx={{justifyContent: 'space-between'}}>
            <Link to='/' style={linkStyle}>
            <FitnessCenterIcon sx={iconStyle}/>
              <Typography variant="h6" component="div" sx={brandStyle}>
                STEEL GYM
            </Typography>
            </Link>
          {renderAuthBtn()}

        </Toolbar>
        </Container>
      </AppBar>
     {renderSignInModal()}
     {renderAlert()}
    </Box>
  );
}
