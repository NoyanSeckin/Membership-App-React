import {Box, Button, Card, CardActions, CardContent, Typography} from '@mui/material'
import WomanIcon from '@mui/icons-material/Woman';
import ManIcon from '@mui/icons-material/Man';
import React from 'react'

const headerStyle = {
  fontWeight: '600'
}

const iconStyle = {
  fontSize: '45px',
  bgcolor: 'pink',
  borderRadius: '8px',
  px: 2,
  py: 1.5,
  textAlign: 'center'
}

export default function MemberCard() {

  function renderCard(){
    return(
      <Card>
        <ManIcon sx={iconStyle}/>
        <CardContent>
          <Box sx={{display: 'flex', flexDirection: 'column'}}>
            <Typography variant='h6' sx={headerStyle}>
              Üye Adı
            </Typography>
            <Typography>
              Ismail Erkut
            </Typography>
            <Typography variant='h6' sx={headerStyle}>
              Kalan Üyelik Süresi
            </Typography>
            <Typography>
              5 gün
            </Typography>
          </Box>
        </CardContent>
        <CardActions>
          <Button variant='contained'
          sx={{width: '100%'}}> 
            Detaylara Git
          </Button>
        </CardActions>
      </Card>
    )
  }

  return (
    <>
      {renderCard()}
    </>
  )
}
