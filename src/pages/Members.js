import {Box, Container, Paper, Typography} from '@mui/material'
import {doc, getDoc, getFirestore} from 'firebase/firestore'

import React, {useState, useEffect} from 'react'
import MemberCard from '../components/MemberCard'

export default function Members() {
  const [activeNav, setActiveNav] = useState('Tüm Üyeler');
  
  function renderNavs(){
    const navs = ['Tüm Üyeler', 'Aktif Üyeler', 'Süresi Geçen Üyeler'];
    return navs.map(nav => (
      <Typography variant='h5' onClick={()=> setActiveNav(nav)}
      className={nav === activeNav && 'active-nav'}
      sx={{fontWeight: '700', '&:hover': {cursor: 'pointer'}}}>
        {nav}
      </Typography>
    ))
  }

  function renderCards(){
   return <MemberCard/>
  }
  return (
    <Box sx={{bgcolor: 'mainBg', minHeight: '120vh'}}>
      <Container maxWidth='xl' sx={{pt: 5}}>
        <Paper sx={{p: 3, borderRadius: '8px'}}>
          <Box sx={{display: 'flex', gap: 3}}>
            {renderNavs()}
          </Box>
          <Box sx={{display: 'flex'}}>
            {renderCards()}
            </Box>
        </Paper>
      </Container>
    </Box>
  )
}
