import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import FitnessCenterIcon from '@mui/icons-material/FitnessCenter';
import {Container} from '@mui/material'
import { Link } from "react-router-dom";
import {getAuth, signInWithEmailAndPassword, signOut, onAuthStateChanged} from 'firebase/auth'
import React, {useState, useEffect} from 'react';
import SignInModal from './SignInModal'

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
  bgcolor: 'warning.dark', 
  color: '#fff ', 
  px: 3.5,
  fontSize: '15px',
}

export default function Navbar() {
  const [isSignInModal, setIsSignInModal] = useState(true)

  const openLoginModal = ()=> setIsSignInModal(true)

  const auth = getAuth();

  useEffect(() => {
  console.log(auth);
  onAuthStateChanged(auth, (user)=> {
    console.log('auth changecd', user);
    if(user){
      
    }
  })
  }, [auth]);

  async function signInUser(email, password){
    signInWithEmailAndPassword(auth, email, password).then(cred => {
      // setAuthentication(cred.user.email)
    }).catch(err => console.log(err))
  }

  async function signOutUser(){
    signOut(auth);
  }

  const renderAuth = () => (
    <div>
      <Button onClick={openLoginModal} sx={authBtnStyle}>Giriş Yap</Button>
      <Button onClick={signOutUser}>Çıkış Yap</Button>
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
          {renderAuth()}

        </Toolbar>
        </Container>
      </AppBar>
      <SignInModal isModal={isSignInModal} setIsModal={setIsSignInModal} signInUser={signInUser}/>
    </Box>
  );
}
