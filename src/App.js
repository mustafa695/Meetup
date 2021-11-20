import Login from "./Components/Login";
import Dashboard from "./Components/Dashboard";
import "./App.css";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import { dbs } from './config/firebase-config';
import Meeting from "./Components/Meeting";
import { useState } from "react";
import { auth } from "./config/firebase-config";
import { useEffect } from "react";
import Accepted from "./Components/Accepted";
import Rejected from "./Components/Rejected";
import AcceptedRequests from "./Components/AcceptedRequests";
import Detail from "./Components/Detail";

function App() {
  const [cuurentUser, setCurrentUser] = useState("");
  const [mId, setMId] = useState("");
  const [myData, setMydata] = useState([]);
  console.log(cuurentUser, "--user name");

  useEffect(() => {
    let m_id = localStorage.getItem("userId");
    setMId(m_id);
    if (localStorage.getItem("userId")) {
      auth.onAuthStateChanged((user) => {
        setCurrentUser(user.displayName);
      });
    } else {
      setCurrentUser("");
    }
    let temp = [];
    dbs
      .collection("firedata")
      .where("uid", "==", m_id)
      .get()
      .then((snapshot) => {
        snapshot.docs.map((res) => {
          temp.push(res.data())
        })
        setMydata(temp)
      })
  }, [mId]);

  return (
    <Router>
      <Switch>
        <Route exact path="/">
          <Login />
        </Route>
        <Route path="/home">
          <Dashboard />
        </Route>
        <Route path="/dashboard">
          <Meeting />
        </Route>
        <Route path="/accept-meetup">
          <Accepted />
        </Route>
        <Route path="/request-accepeted">
          <AcceptedRequests />
        </Route>
        <Route path="/reject-meetup">
          <Rejected />
        </Route>
        <Route path="/request-view/:id">
          <Detail myData={myData}/>
        </Route>
      </Switch>
    </Router>
  );
}

export default App;
