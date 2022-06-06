import React, {useState} from 'react';
import {Box} from '@mui/material'
import Radio from '@mui/material/Radio';
import RadioGroup from '@mui/material/RadioGroup';
import FormControlLabel from '@mui/material/FormControlLabel';
import FormControl from '@mui/material/FormControl';
import FormLabel from '@mui/material/FormLabel';

export default function RadioComponent({handleChange, value, label}) {

  const [isOther, setIsOther] = useState(false)


  const closeOtherInput = () => setIsOther(false);
  const openOtherInput = () => setIsOther(true);

  return (
    <FormControl sx={{ml: 1}}>
      <FormLabel id="demo-row-radio-buttons-group-label">{label}</FormLabel>
      <RadioGroup
        row
        aria-labelledby="demo-row-radio-buttons-group-label"
        name="period"
        id={isOther ? 'none' : 'period'}
        value={value}
        onChange={handleChange}
        >
        <FormControlLabel value={'30'} control={<Radio />} label="1 Ay" 
        onClick={closeOtherInput}/>
        <FormControlLabel value={'90'} control={<Radio />} label="3 Ay" 
        onClick={closeOtherInput}/>
        <FormControlLabel
        value='' control={<Radio />} label="Diğer" onClick={openOtherInput} />
      </RadioGroup>
      <Box sx={{display: isOther ? 'inline' : 'none'}}>
          <input value={value} style={{boxSizing: 'padding-box'}} type="string" id={isOther ? 'period' : 'none'} onChange={handleChange}/>
        </Box>
    </FormControl>
  );
}
