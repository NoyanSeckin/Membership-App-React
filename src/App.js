import { BrowserRouter, Routes, Route} from "react-router-dom";
import {ThemeProvider} from '@mui/material/styles';
import {GlobalTheme} from './theme/GlobalTheme'

import Home from './pages/Home'
import NewMember from './pages/NewMember';
import Members from './pages/Members';
import Navbar from './components/Navbar'

function App() {
  return (
    <div className="App">
      <ThemeProvider theme={GlobalTheme}>
        <BrowserRouter>
          <Navbar/>
          <Routes>
            <Route path={'/'} element={<Home/>} />
            <Route path={'/newmember'} element={<NewMember/>} />
            <Route path={'/members'} element={<Members/>} />
          </Routes>
        </BrowserRouter>
      </ThemeProvider>
    </div>
  );
}

export default App;
