import {Box, Container, Typography} from '@mui/material'
import {doc, getDoc, getFirestore} from 'firebase/firestore'

import React, {useState, useEffect} from 'react'
import MemberCard from '../components/MemberCard'
import SearchWidget from '../components/SearchWidget'

const navStyle = {
  fontWeight: '700', 
  fontSize: {xs: '0.9rem', md: '1.5rem'},
  '&:hover': {cursor: 'pointer'},
}

const cardsContainer = {
  display: 'flex', 
  mt: 3, 
  flexWrap: 'wrap', 
  gap: 3,
  justifyContent: {xs: 'center', md: 'start'}
}

export default function Members() {
 
  const [activeNav, setActiveNav] = useState('Tüm Üyeler');
  const [allUsers, setAllUsers] = useState([]);
  const [searchInput, setSearchInput] = useState("");

  useEffect(()=> {
    fetchUsersFromDb()
  },[])

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
      sx={navStyle}>
        {nav}
      </Typography>
    ))
  }
  function renderCards(){
   return allUsers?.map((user, index) => (
    <MemberCard  user={user} activeNav={activeNav} searchInput={searchInput}/> 
   ))
  }
  return (
    <Box sx={{bgcolor: 'mainBg', minHeight: '120vh'}}>
      <Container maxWidth='xl' sx={{pt: 5,}}>
          <Box sx={{display: 'flex', gap: 3}}>
            {renderNavs()}
          </Box>
          <SearchWidget input={searchInput} setInput={setSearchInput}/>
          <Box sx={cardsContainer}>
            {renderCards()}
          </Box>
      </Container>
    </Box>
  )
}
