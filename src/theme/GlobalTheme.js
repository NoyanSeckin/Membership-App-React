import {createTheme} from '@mui/material/styles'

export const GlobalTheme = createTheme({
  palette: {
    primary: {
      main: '#4B9CE2',
      dark: '#2c387e',
      light: '#29b6f6'
    },
    secondary: {
      main: '#46AF32',
      dark: '#357a38',
      light: '#76ff03'
    },
    danger: {
      main: '#f44336',
      light: '#f6685e',
      dark: '#aa2e25'
    },  
    textColor: '#525252',
    mainBg: '#f2f2f2'
  },
  components:{
    MuiButton: {
      styleOverrides: {
        root: {
          textTransform: 'none'
        }
      }
    },
  },
  typography: {
    fontFamily: 'Nunito, sans-serif',
  },
})