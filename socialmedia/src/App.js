import Home from "./pages/home/Home";
import Login from "./pages/login/Login";
import Profile from "./pages/profile/Profile";
import Register from "./pages/register/Register";
import {React} from "react-router-dom";
import Topbar from "./components/topbar/Topbar";

import { useContext } from "react";
import { AuthContext } from "./context/AuthContext";

import {

  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";


function App() {
  const  {user} = useContext(AuthContext);
  return (
    <Router>
      <Routes>
      <Route exact path="/" element={user ? <Home/> : <Register/>} />
      {/* <Route exact path="/" element={ <Home/> } /> */}
           
      
       <Route path="/login" element={user ? <Navigate to="/" /> : <Login />}  />
       {/* <Route path="/login" element={ <Login />}  />
      <Route path="/register" element={ <Register />}/> */}

      <Route path="/register"
          element={user ? <Navigate to="/" /> : <Register />}
      />
        
      <Route path="/profile/:username" element={<Profile />}/>
     
    </Routes>
  </Router>
      );
}

export default App;