
   
import Backdrop from '@mui/material/Backdrop';
import Box from '@mui/material/Box';
import Modal from '@mui/material/Modal';
import Fade from '@mui/material/Fade';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';

import  React, {useState} from 'react';

const style = {
  bgcolor: '#fff',
  borderRadius: '8px',
  boxShadow: '0px 3px 12px #1E36482E',
  left: '50%',
  position: 'absolute',
  px: 2,
  py: 2,
  top: '50%',
  transform: 'translate(-50%, -50%)',
  width: {xs: '310px', md: '355px'},
  zIndex: 3,
};

const loginButton = {
  backgroundColor: 'primary.light', 
  borderRadius: '8px', 
  color: '#fff', 
  fontSize: '18px', 
  width: '100%',
  '&:hover': {bgcolor: 'primary.main'}
}

  const closeButton = {
    background: '#f0f8ff', 
    borderRadius: '8px', 
    color: 'warning.dark', 
    fontSize: '18px', 
    mr: 1,
    width: '100%',
  }

export default function SignInModal({isModal, setIsModal, signInUser, renderAlert}) {

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleEmail = (e) => setEmail(e.target.value);
  const handlePassword = (e) => setPassword(e.target.value);
  
  const handleClose = () => setIsModal(false);

  function renderInput(label, value, type, handleChange, ){
    return(
      <>
          <label style={{display: 'block'}} htmlFor={type}>{label}</label>
          <input className='sign-in-input' type={type} value={value} onChange={(e)=> handleChange(e)}/>
      </>
    )
  }

  const renderBtns = ()=> (
       <Box sx={{display: 'flex'}}>
        <Button sx={closeButton} onClick={handleClose}>Vazgeç</Button>
        <Button onClick={()=> signInUser(email, password)} sx={loginButton}>Giriş</Button>
      </Box>
  ) 

  function renderForm(){
    return(
      <form onSubmit={(e)=> e.preventDefault()}>
        {renderInput('Email', email, email, handleEmail)}
        {renderInput('Şifre', password, 'password', handlePassword)}
        {renderBtns()}
     </form>
    )
  }

  function renderHeader(){
    return(
      <Typography id="transition-modal-title" variant="h5" sx={{fontWeight: '700', fontSize: '25px', mb:3}}>
        Admin Girişi 
      </Typography>
    )
  }
  return (
    <Box>
      <Modal
        aria-labelledby="transition-modal-title"
        aria-describedby="transition-modal-description"
        open={isModal}
        onClose={handleClose}
        closeAfterTransition
        disableAutoFocus
        BackdropComponent={Backdrop}
        BackdropProps={{
          timeout: 500,
          style:{opacity: 0.7, backgroundColor: '#4B9CE2'}
        }}
      >
        <Fade in={isModal}>
          <Box sx={style}>
            {renderHeader()}
            {renderForm()}
            {renderAlert && renderAlert()}
          </Box> 
        </Fade>
      </Modal>
    </Box>
  );
}