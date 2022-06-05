import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import FitnessCenterIcon from '@mui/icons-material/FitnessCenter';
import {Container} from '@mui/material'
import { Link } from "react-router-dom";
import {getAuth, signInWithEmailAndPassword, signOut, onAuthStateChanged} from 'firebase/auth'
import React, {useState, useEffect, useContext} from 'react';
import SignInModal from './SignInModal'
import AuthContext from '../contexts/AuthContext';

const brandStyle = {
  flexGrow: 1, 
  color: 'warning.dark', 
  fontWeight: '600' 
}

const iconStyle = {
  alignSelf: 'center',
  color: 'warning.dark', 
}

const linkStyle = {
  display: 'flex', 
  gap: '0.3rem'
}

const authBtnStyle = {
  bgcolor: 'danger.main', 
  color: '#fff ', 
  px: 3.5,
  fontSize: '15px',
  '&:hover': {bgcolor: 'danger.dark'}
}

export default function Navbar() {
  const {authContext, setAuthContext} = useContext(AuthContext)

  const [isSignInModal, setIsSignInModal] = useState(false)
  const openSignInModal = ()=> setIsSignInModal(true)

  const auth = getAuth();

  useEffect(() => {
  onAuthStateChanged(auth, (user)=> {
    setAuthContext(Boolean(user))
  })
  }, []);



  async function signInUser(email, password){
    signInWithEmailAndPassword(auth, email, password).then(cred => {
    }).catch(err => console.log(err))
  }

  async function signOutUser(){
    signOut(auth);
    console.log('signed out');
  }

  const renderAuthBtn = () => (
    <div>
     {
     authContext ?  
     <Button onClick={signOutUser} sx={authBtnStyle}>Çıkış Yap</Button>
     :
     <Button onClick={openSignInModal} sx={authBtnStyle}>Giriş Yap</Button>
    }
    </div>
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
      <SignInModal isModal={isSignInModal} setIsModal={setIsSignInModal} signInUser={signInUser}/>
    </Box>
  );
}
