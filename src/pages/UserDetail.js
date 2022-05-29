import {Box, Container, Paper} from '@mui/material'
import {getFirestore, doc, updateDoc, arrayUnion} from 'firebase/firestore'

import React from 'react'
import EditBasicInfo from '../components/EditBasicInfo'

export default function UserDetail() {
  
  const db = getFirestore();
  const membersRef = doc(db, 'Members', 'members');
  
  async function updateUser(user){
    const allUsers = JSON.parse(sessionStorage.getItem('all-users'));
    const userIndex = allUsers.findIndex(allUser => allUser.id === user.id);
    allUsers[userIndex] = user;
    console.log(allUsers[userIndex])
  }

  return (
    <Box sx={{bgcolor: 'mainBg', minHeight: '120vh'}}>
      <Container maxWidth='xl'>
        <Paper sx={{px: 5, py: 3}}>
          <EditBasicInfo updateUser={updateUser}/>
        </Paper>
      </Container>
    </Box>
  )
}
