import {Box, Container, Paper, Typography} from '@mui/material'
import {doc, getDoc, getFirestore} from 'firebase/firestore'

import React, {useState, useEffect} from 'react'
import MemberCard from '../components/MemberCard'

export default function Members() {
  const [activeNav, setActiveNav] = useState('Tüm Üyeler');
  const [allUsers, setAllUsers] = useState([]);
  const sessionUsers = JSON.parse(sessionStorage.getItem('all-users'));

  useEffect(()=> {
    fetchUsersFromDb()
  },[])

  // function setUsers(){
  //   if(sessionUsers !== null){
  //     setAllUsers(sessionUsers);
  //   } else{
  //     fetchUsersFromDb();
  //   }
  // }


  async function fetchUsersFromDb(){
    const db = getFirestore();
    const membersRef = doc(db, 'Members', 'members');
    const response = await getDoc(membersRef);
    // sort membersarray, from longest period to lowest
    const membersArraySorted = response.data().membersArray?.sort((a,b) => b.period.seconds - a.period.seconds);
    setAllUsers(membersArraySorted);
    // use session storage to update user data in userdetail page
    sessionStorage.setItem('all-users', JSON.stringify(membersArraySorted));
  }
  
  function renderNavs(){
    const navs = ['Tüm Üyeler', 'Aktif Üyeler', 'Süresi Dolan Üyeler'];
    return navs.map(nav => (
      <Typography variant='h5' onClick={()=> setActiveNav(nav)}
      className={nav === activeNav && 'active-nav'}
      sx={{fontWeight: '700', '&:hover': {cursor: 'pointer'}}}>
        {nav}
      </Typography>
    ))
  }

  function renderCards(){
   return allUsers?.map(user => (
    <MemberCard user={user} activeNav={activeNav} />
   ))
  }
  return (
    <Box sx={{bgcolor: 'mainBg', minHeight: '120vh'}}>
      <Container maxWidth='xl' sx={{pt: 5}}>
        <Paper sx={{p: 3, borderRadius: '8px'}}>
          <Box sx={{display: 'flex', gap: 3}}>
            {renderNavs()}
          </Box>
          <Box sx={{display: 'flex', mt: 3, flexWrap: 'wrap', gap: 3}}>
            {renderCards()}
            </Box>
        </Paper>
      </Container>
    </Box>
  )
}
