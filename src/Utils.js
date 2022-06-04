import WomanIcon from '@mui/icons-material/Woman';
import ManIcon from '@mui/icons-material/Man';
import {CardContent }from '@mui/material'
const iconStyle = {
  fontSize: '45px',
  bgcolor: 'primary.main',
  borderRadius: '50px',
  px: 1.5,
  py: 1.5,
  opacity: 0.7
}

const iconsContainerStyle = {
  display: 'flex', 
  justifyContent: 'center', 
  pb: 0
}

export const convertNumberToDate = (value) => {
  const aMonthInMiliSeconds = (86400 * 30  * 1000);
  const today = Date.now();
  const period = Number(value);
  const periodInMiliSeconds = (period / 30 ) * aMonthInMiliSeconds;
  return new Date((today + periodInMiliSeconds));
}

export const renderEitherIcon = (gender) =>  (
  <CardContent sx={iconsContainerStyle}>
    {gender === 'male' ? 
    <ManIcon sx={iconStyle}/>
    : <WomanIcon sx={{...iconStyle, bgcolor: 'pink'}}/>}
  </CardContent>
)

export function calculateRemainingTime(seconds){
  const currentDateInSeconds = Date.now() / 1000;
  const oneDayInSeconds = 86400;
  return Math.ceil((seconds - currentDateInSeconds) / oneDayInSeconds);
}