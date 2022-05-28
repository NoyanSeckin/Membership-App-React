import * as React from 'react';
import Box from '@mui/material/Box';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';

export default function BasicSelect({handleChange, value}) {
  // const [gender, setGender] = React.useState('');

  // const handleChange = (event) => {
  //   setGender(event.target.value);
  // };

  return (
    <Box sx={{ minWidth: 120 }}>
      <FormControl fullWidth>
        <InputLabel id="demo-simple-select-label">Cinsiyet</InputLabel>
        <Select
          labelId="demo-simple-select-label"
          name='gender'
          id="gender"
          value={value}
          label="gender"
          onChange={handleChange}
        >
          <MenuItem value={'male'}>Erkek</MenuItem>
          <MenuItem value={'female'}>Kadın</MenuItem>
        </Select>
      </FormControl>
    </Box>
  );
}
