import {Box, Container, Paper} from '@mui/material'
import React from 'react'
import EditBasicInfo from '../components/EditBasicInfo'

export default function UserDetail() {
  

  return (
    <Box sx={{bgcolor: 'mainBg', minHeight: '120vh'}}>
      <Container maxWidth='xl'>
        <Paper sx={{px: 5, py: 3}}>
          <EditBasicInfo/>
        </Paper>
      </Container>
    </Box>
  )
}
