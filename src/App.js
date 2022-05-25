import { BrowserRouter, Routes, Route} from "react-router-dom";

import Home from './pages/Home'
import NewMember from './pages/NewMember';
import Members from './pages/Members';

function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <Routes>
          <Route path={'/'} element={<Home/>} />
          <Route path={'/newmember'} element={<NewMember/>} />
          <Route path={'/members'} element={<Members/>} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
