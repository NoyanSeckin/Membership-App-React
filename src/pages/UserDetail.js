import {Box, Container, Typography} from '@mui/material'

import React, {useState} from 'react'
import EditBasicInfo from '../components/EditBasicInfo'
import AdvancedInfo from '../components/AdvancedInfo'
const navStyle = {
  fontWeight: '700', 
  fontSize: {xs: '0.9rem', sm: '1.2rem', md: '1.5rem'},
  '&:hover': {cursor: 'pointer'},
}

export default function UserDetail() {
  
  const [activeNav, setActiveNav] = useState('Üye Bilgileri')

  const navs = ['Üye Bilgileri', 'Gelişmiş']
  const renderNavs = () => (
    navs.map(nav => 
      <Typography sx={navStyle}
      onClick={()=> setActiveNav(nav)}
      className={activeNav === nav && 'active-nav'}>
        {nav}
    </Typography>)
  )

  function renderActiveComp() {
    if(activeNav === 'Üye Bilgileri'){
      return  <EditBasicInfo/>
    }else return <AdvancedInfo/>
  }

  return (
    <Box sx={{bgcolor: 'mainBg', minHeight: '120vh'}}>
      <Container maxWidth='xl' sx={{pt: 5}}>
        <Box sx={{display: 'flex', justifyContent: 'center', mb: -1.5, gap: 5}}>
          {renderNavs()}
        </Box>
        {renderActiveComp()}
      </Container>
    </Box>
  )
}
