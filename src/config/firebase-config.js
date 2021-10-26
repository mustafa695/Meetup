import firebase from 'firebase/compat/app'

const firebaseConfig = {
    apiKey: "AIzaSyBKy1wLQAFSVEJxJz5ufWKKqUUe1AFN-OA",
    authDomain: "coffee-6efbc.firebaseapp.com",
    projectId: "coffee-6efbc",
    storageBucket: "coffee-6efbc.appspot.com",
    messagingSenderId: "9946515917",
    appId: "1:9946515917:web:3a336fbe1355b5f1a25c84",
    measurementId: "G-GMWN9D3TEB"
  };
  
  // Initialize Firebase
 firebase.initializeApp(firebaseConfig);
 
 const db = firebase.database().ref()
 const storage = firebase.storage()
 const auth = firebase.auth();
 export {
  firebase,
  db,
  storage,
  auth
}