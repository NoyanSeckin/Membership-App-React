import { BrowserRouter, Routes, Route} from "react-router-dom";
import {ThemeProvider} from '@mui/material/styles';
import {GlobalTheme} from './theme/GlobalTheme'

import React, {useState} from 'react'
import DetailsContext from "./contexts/DetailsContext";
import AuthContext from "./contexts/AuthContext";
import Home from './pages/Home'
import NewMember from './pages/NewMember';
import Members from './pages/Members';
import Navbar from './components/Navbar'
import UserDetail from "./pages/UserDetail";

function App() {
  const [detailsContext, setDetailsContext] = useState({});
  const [authContext, setAuthContext] = useState(false);

  return (
    <div className="App">
      <ThemeProvider theme={GlobalTheme}>
        <AuthContext.Provider>
        <DetailsContext.Provider value={{detailsContext, setDetailsContext}}>
          <BrowserRouter>
            <Navbar/>
            <Routes>
              <Route path={'/'} element={<Home/>} />
              <Route path={'/newmember'} element={<NewMember/>} />
              <Route path={'/members'} element={<Members/>} />
              <Route path={'/userdetail'} element={<UserDetail/>}/>
            </Routes>
          </BrowserRouter>
        </DetailsContext.Provider>
        </AuthContext.Provider>
      </ThemeProvider>
    </div>
  );
}

export default App;
