import Login from './Components/Login';
import Dashboard from './Components/Dashboard';
import './App.css';
import {
  BrowserRouter as Router,
  Switch,
  Route
} from "react-router-dom";
import Meeting from './Components/Meeting';
import { useState } from 'react';
import { auth } from './config/firebase-config'
import { useEffect } from 'react';


function App() {

  const [cuurentUser, setCurrentUser] = useState('');
  console.log(cuurentUser,'--user name');

  useEffect(() => {
    if(localStorage.getItem('userId')) {
      auth.onAuthStateChanged((user) => {
        setCurrentUser(user.displayName)
        
      })
    }
    else{
      setCurrentUser('');
    }
 
}, [])
  return (
      <Router>
        <Switch>
          <Route exact path="/">
           <Login/>
          </Route>
          <Route path="/home">
            <Dashboard />
          </Route>
          <Route path="/dashboard">
            <Meeting />
          </Route>
        </Switch>
      </Router>
    
    
  );
}

export default App;
