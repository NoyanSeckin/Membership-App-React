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
import ProtectedRoutes from "./routes/ProtectedRoutes";
function App() {
  const [detailsContext, setDetailsContext] = useState({});
  const [authContext, setAuthContext] = useState();
  return (
    <div className="App">
      <ThemeProvider theme={GlobalTheme}>
        <AuthContext.Provider value={{authContext, setAuthContext}}>
        <DetailsContext.Provider value={{detailsContext, setDetailsContext}}>
          <BrowserRouter>
            <Navbar/>
            <Routes>
              <Route path={'/'} element={<Home/>} />
              <Route element={<ProtectedRoutes/>}>
                <Route path={'/newmember'} element={<NewMember/>} />
                <Route path={'/members'} element={<Members/>} />
                <Route path={'/userdetail'} element={<UserDetail/>}/>
              </Route>  
            </Routes>
          </BrowserRouter>
        </DetailsContext.Provider>
        </AuthContext.Provider>
      </ThemeProvider>
    </div>
  );
}

export default App;
