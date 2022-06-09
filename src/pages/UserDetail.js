import {Box, Container} from '@mui/material'

import React from 'react'
import EditBasicInfo from '../components/EditBasicInfo'

export default function UserDetail() {
  return (
    <Box sx={{bgcolor: 'mainBg', minHeight: '120vh'}}>
      <Container maxWidth='xl' sx={{pt: 5}}>
          <EditBasicInfo/>
      </Container>
    </Box>
  )
}
