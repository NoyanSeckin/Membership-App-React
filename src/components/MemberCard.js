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

const cardContentStyle = {
  display: 'flex', 
  flexDirection: 'column'
}

export default function MemberCard({user, activeNav}) {

  function renderTopBorderColor(period){
    let color;
    if(period > 7){
      color = 'secondary.dark'
    }else if(period < 7 && period > 0){
      color = 'warning.light'
    } else color = 'danger.main';
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

  function renderCardText(header, text){
    return(
      <>
        <Typography variant='h6' sx={headerStyle}>
          {header}
        </Typography>
        <Typography>
          {text}
        </Typography>
      </>
    )
  }

  function renderCardContent(remainingTime){
    return(
      <CardContent sx={cardContentStyle}>
        {renderCardText('Üye Adı', user.name)}
        {renderCardText('Kalan Üyelik Süresi', remainingTime + ' gün')}
     </CardContent>
    )
  }

  function renderCardActions(){
    return(
      <CardActions>
        <Button variant='outlined'
        sx={detailBtnStyle}> 
          Detaylara Git
        </Button>
      </CardActions>
    )
  }

  function calculateRemainingTime(){
    const currentDateInSeconds = Date.now() / 1000;
    const oneDayInSeconds = 86400;
    return Math.ceil(((user.period.seconds- currentDateInSeconds) / oneDayInSeconds))
  }

  function decideCondition(remainingTime){
    let condition;
    if(activeNav === 'Tüm Üyeler'){
      condition = true;
    } else if (activeNav === 'Aktif Üyeler'){
      condition = remainingTime > 0;
    } else condition = remainingTime < 0;
    return condition;
  }

  function renderCard(){
    const remainingTime = calculateRemainingTime();
    const condition = decideCondition(remainingTime);
    return condition && (
      <Card key={user.id} sx={{...cardStyle, borderTopColor: renderTopBorderColor(remainingTime)}}>
        {renderEitherIcon(user.gender)}
        {renderCardContent(remainingTime)}
        {renderCardActions()}
      </Card>
    )
  }

  return (
    <>
      {renderCard()}
    </>
  )
}
