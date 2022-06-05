import * as React from 'react';
import Backdrop from '@mui/material/Backdrop';
import Box from '@mui/material/Box';
import Modal from '@mui/material/Modal';
import Fade from '@mui/material/Fade';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';

const style = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: '355px',
  height: '171px',
  bgcolor: '#fff',
  borderRadius: '8px',
  boxShadow: '0px 3px 12px #1E36482E',
  textAlign: 'center',
  zIndex: 33,
};

const actionBtnStyle = {
  color: '#fff',
   bgcolor: 'error.light', 
   fontWeight: 700, 
   fontSize: '18px',
    borderRadius: '8px', 
    px: 5,
    '&:hover': {bgcolor: 'error.main'}
  }

  const declineBtnStyle = {
    color: 'primary', 
    background: '#f0f8ff', 
    fontSize: '18px', 
    fontWeight: '700', 
    borderRadius: '8px', 
    px: 5, 
    mr: 1
  }

export default function BuyModal({isModal, setIsModal, action}) {
  
  const handleClose = () => setIsModal(false);

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
          style:{opacity: 0.7, background: '#f44336'}
        }}
      >
        <Fade in={isModal}>
          <Box sx={style}>
            <Typography id="transition-modal-title" variant="h5" sx={{fontWeight: '700', fontSize: '25px', mt: 2.5}}>
              Üye Sil
            </Typography>
            <Typography id="transition-modal-description" sx={{ my: 1.7, color: '#555555' }}>
             Üyeyi silmek istiyor musunuz?
            </Typography>
            <Button sx={declineBtnStyle}onClick={handleClose}>Vazgeç</Button>
            <Button onClick={action} sx={actionBtnStyle}>Üyeyi Sil</Button>
          </Box> 
        </Fade>
      </Modal>
    </Box>
  );
}