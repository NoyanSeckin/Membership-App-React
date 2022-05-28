import {Box, Button, Card, CardActions, CardContent, Typography} from '@mui/material'
import WomanIcon from '@mui/icons-material/Woman';
import ManIcon from '@mui/icons-material/Man';
import React from 'react'

const headerStyle = {
  fontWeight: '600'
}

const iconStyle = {
  fontSize: '45px',
  bgcolor: 'primary.main',
  borderRadius: '50px',
  px: 1.5,
  py: 1.5,
  opacity: 0.7
}

const cardStyle ={
  borderTop: '25px solid',
  minWidth: '240px',
  borderRadius: '8px'
}

const iconsContainerStyle = {
  display: 'flex', 
  justifyContent: 'center', 
  pb: 0
}

const detailBtnStyle = {
  borderColor: 'textColor',
  color: 'textColor', 
  fontSize: '17px', 
  fontWeight: 700, 
  width: '100%', 
  '&:hover': {
    borderColor: '#000'
  }
}

export default function MemberCard({user}) {

  function renderTopBorderColor(period){
    let color;
    if(period > 7){
      color = 'primary.main'
    }else if(period < 7 && period >= 4){
      color = 'warning.main'
    } else color = 'warning.dark';
    return color;
  }

  function renderEitherIcon(gender){
    return(
       <CardContent sx={iconsContainerStyle}>
          {gender === 'male' ? 
          <ManIcon sx={iconStyle}/>
         : <WomanIcon sx={{...iconStyle, bgcolor: 'pink'}}/>}
        </CardContent>
    )
  }

  function renderCard(){
    const currentDateInSeconds = Date.now() / 1000;
    const oneDayInSeconds = 86400;
    const remainingTime = Math.ceil(((user.period.seconds- currentDateInSeconds) / oneDayInSeconds));
    return(
      <Card key={user.id} sx={{...cardStyle, borderTopColor: renderTopBorderColor(remainingTime)}}>
        {renderEitherIcon(user.gender)}
        <CardContent>
          <Box sx={{display: 'flex', flexDirection: 'column'}}>
            <Typography variant='h6' sx={headerStyle}>
              Üye Adı
            </Typography>
            <Typography>
              {user.name}
            </Typography>
            <Typography variant='h6' sx={headerStyle}>
              Kalan Üyelik Süresi
            </Typography>
            <Typography>
             {remainingTime} gün
            </Typography>
          </Box>
        </CardContent>
        <CardActions>
          <Button variant='outlined'
          sx={detailBtnStyle}> 
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
