import {Button, Card, CardActions, CardContent, Typography} from '@mui/material'

import { useNavigate } from 'react-router-dom';

import { renderEitherIcon, calculateRemainingTime, renderBorderTopColor } from '../Utils';
import React from 'react'

const headerStyle = {
  fontWeight: '600'
}

const cardStyle ={
  borderTop: '25px solid',
  minWidth: '240px',
  borderRadius: '8px'
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

export default function MemberCard({user, activeNav, searchInput}) {
  const navigate = useNavigate();


  function handleClick(remainingTime){
  const userDetail = {...user, period: remainingTime};
  sessionStorage.setItem('user-detail', JSON.stringify(userDetail))
    navigate('/userdetail');
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

  function renderCardActions(remainingTime){
    return(
      <CardActions sx={{mt: -1.2}}>
        <Button onClick={()=> handleClick(remainingTime)}
        variant='outlined'
        sx={detailBtnStyle}> 
          Detaylara Git
        </Button>
      </CardActions>
    )
  }

  function decideCondition(remainingTime){
    let condition;
    if(activeNav === 'Tüm Üyeler'){
      condition = true;
    } else if (activeNav === 'Aktif Üyeler'){
      condition = remainingTime > 0;
    } else condition = remainingTime <= 0;
    return condition;
  }

  function searchCondition(){
    if(searchInput){
      return  user.name.toLowerCase().includes(searchInput )  ?  true :  false;
    } else return true
  }
  

  function renderCard(){
    const remainingTime = calculateRemainingTime(user.period.seconds);
    const condition = decideCondition(remainingTime);
    const search = searchCondition(); 
    return  search && condition && (
      <Card sx={{...cardStyle, borderTopColor: renderBorderTopColor(remainingTime)}}>
        {renderEitherIcon(user.gender)}
        {renderCardContent(remainingTime)}
        {renderCardActions(remainingTime)}
      </Card>
    )
  }

  return (
    <>
      {renderCard()}
    </>
  )
}
