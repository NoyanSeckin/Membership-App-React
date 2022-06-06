import * as React from 'react';
import Box from '@mui/material/Box';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';

export default function BasicSelect({handleChange, value, error}) {
  // const [gender, setGender] = React.useState('');

  // const handleChange = (event) => {
  //   setGender(event.target.value);
  // };

  return (
    <Box sx={{ minWidth: 120, height: '60px' }}>
      <FormControl fullWidth>
        <InputLabel sx={{fontSize: '18px'}} id="demo-simple-select-label">Cinsiyet</InputLabel>
        <Select
          labelId="demo-simple-select-label"
          name='gender'
          id="gender"
          value={value}
          label="gender"
          onChange={handleChange}
          sx={{fontSize: '19px'}}
        >
          <MenuItem value={'male'}>Erkek</MenuItem>
          <MenuItem value={'female'}>Kadın</MenuItem>
        </Select>
      </FormControl>
      <span style={{marginTop: '0.4rem'}} className='form-warning-span'>{error}</span>
    </Box>
  );
}
