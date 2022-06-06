import {Box} from '@mui/material'
import React from 'react'

export default function SearchWidget({input, setInput}) {

  const renderInput = () => (
    <input placeholder='Kullanıcı Ara' 
    value={input} onChange={(e)=> setInput(e.target.value)}
    className='search-input' type="text" />
  )
  console.log('Search widget rendered');
  return (
    <Box sx={{mt: 2}}>
      {renderInput()}
      </Box>
  )
}
