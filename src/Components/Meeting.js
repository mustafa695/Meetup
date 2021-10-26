import { message } from 'antd';
import { useHistory } from 'react-router';
import { auth } from '../config/firebase-config';
import { db } from '../config/firebase-config';
import { useEffect, useState } from 'react';
import Header from './Header';
// import Slider from 'react-slick';
import CardView from '../Components/CardView'
function Meeting() {
  const [userData, setUserData] = useState([]);
  const [senderId, setSenderId] = useState();
  const [meet, setMeet] = useState([]);
  const [uid, setUid] = useState('');
 
  let history = useHistory();
  useEffect(() => {
    db.child('firedata')
      .get()
      .then((snapshot) => {
        if (snapshot.exists()) {
          setUserData(snapshot.val());
        } else {
          setUserData();
        }
      });
      let id = localStorage.getItem('userId');
       setUid(id);
  }, []);
  useEffect(() => {
  
    auth.onAuthStateChanged((user) => {
      setSenderId(user.uid)
    })
  }, [])
  const logout = () => {
    auth.signOut().then(() => {
      localStorage.clear();
      history.push('/');
      message.success('Logout Successfully...');
    });
  };

 
  return (
    <>
      <Header />
      
      <div className="container">
        <button className="btn btn-danger p-abs" onClick={logout}>
          Logout
        </button>
        <h1 className="text-center my-4">Meetings</h1>

        <CardView/>
      </div>
    </>
  );
}

export default Meeting;
