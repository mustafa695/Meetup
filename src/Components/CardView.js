import React, { useState, useMemo, useEffect } from "react";
// import TinderCard from '../react-tinder-card/index'
import TinderCard from "react-tinder-card";
import { db } from "../config/firebase-config";
import { FaUserFriends } from "react-icons/fa";
import { message } from "antd";

const alreadyRemoved = [];
// let charactersState = dbs // This fixes issues with updating characters state forcing it to use the current state and not the state that was active when the card was created.
const currentData = [];
function CardView() {
  const [userData, setUserData] = useState([]);
  const [characters, setCharacters] = useState([]);
  const [lastDirection, setLastDirection] = useState("");
  const [loading, setLoading] = useState(false);
  const [uid, setUid] = useState("");
  const [meet, setMeet] = useState({});
  // const [senderId, setSenderId] = useState("");
  const [meetupAccept, setMeetupAccept] = useState("");
  const [meetupModal, setMeetupModal] = useState(false);
  const swiped = (direction, nameToDelete) => {
    console.log("removing: " + nameToDelete);
    setLastDirection(direction);
  };
  // let meetupModal = false;
  const outOfFrame = (name) => {
    console.log(name + " left the screen!");
  };

  useEffect(() => {
    let id = localStorage.getItem("userId");
    setUid(id);
    setLoading(true);
    db.child("firedata")
      .get()
      .then((snapshot) => {
        if (snapshot.exists()) {
          setUserData(snapshot.val());
          setCharacters(snapshot.val());

          setLoading(false);
        } else {
          setUserData();
          setLoading(false);
        }
      });
  }, []);

  useEffect(() => {
    setLoading(true);
    db.child("meetings")
      .get()
      .then((snapshot) => {
        if (snapshot.exists()) {
          console.log("----");
          setMeet(snapshot.val());
          setLoading(false);
        } else {
          console.log("----else");
          setLoading(false);
          setMeet(null);
        }
      });
  }, []);

  // useEffect(() => {
  //  let reciever = Object.keys(meet).filter(m => meet[m].reciever_id == uid)
  //  setRecId([...recId, reciever.uid])
  // }, [meet])
  
  const sendRequest = (reciever_id) => {
    let meetup = { reciever_id, uid, meetup: false };
    db.child("meetings").push(meetup, (err) => {
      if (err) {
        console.log(err, "form firebase");
      } else {
        message.success("Your Request Send Succesfully!");
      
      }
    });
  };
  
  useEffect(() => {
    
    let meetUps = Object.keys(meet).filter(c => meet[c]?.reciever_id === uid && meet[c]?.meetup === false);
   
    meetUps.length ? setMeetupModal(true) : setMeetupModal(false)
  }, [meet]);

  let test = Object.keys(userData)
    .filter((item) => userData[item].uid === uid)
    .map((item) => {
      
      currentData.push(
        {
          cocktail:
            userData[item].cocktail.length > 0 ? userData[item].cocktail : "",
        },
        { juice: userData[item].juice.length > 0 ? userData[item].juice : "" },
        { coffe: userData[item].coffe.length > 0 ? userData[item].coffe : "" },
        {
          duration:
            userData[item].durationValue.length > 0
              ? userData[item].durationValue
              : "",
        }
      );
    });
  var beverages = currentData.reduce((unique, o) => {
    if (
      !unique.some(
        (obj) =>
          obj.duration === o.duration &&
          obj.juice === o.juice &&
          obj.coffe === o.coffe &&
          obj.cocktail === o.cocktail
      )
    ) {
      unique.push(o);
    }
    return unique;
  }, []);


  // let senderId = Object?.keys(meet).map((i) => meet[i]?.uid)
  let meets =  Object?.keys(meet).map((j) => meet[j]?.meetup)
  let senderId = Object?.keys(meet).map((i) => meet[i]?.uid);
  console.log(senderId,'---------- ids');

  const acceptRequest = (id) => {
  
    db.child('meetings').child(id).update({
      meetup: true
    })
    .then(() => {
      
      message.success('Successfully Accepted....!')
      db.child("meetings")
      .get()
      .then((snapshot) => {
        if (snapshot.exists()) {
          setMeet(snapshot.val())
        } else {
         console.log('not found')
        }
      });
    })
    .catch((e) => console.log(e))
  }

  //rejected request
  const rejectRequest = (id) => {
  
    db.child('meetings').child(id).update({
      meetup: "reject"
    })
    .then(() => {
      
      message.success('Request Rejected....!')
      db.child("meetings")
      .get()
      .then((snapshot) => {
        if (snapshot.exists()) {
          setMeet(snapshot.val())
        } else {
         console.log('not found')
        }
      });
    })
    .catch((e) => console.log(e))
  }

console.log(uid,'userid');
  return (
    <>
      <div className="row">
        <div className="col-md-8">
          <div className="pos-r">
            <div className="cardContainer">
              {loading ? (
                <div className="d-flex justify-content-center">
                  <div class="spinner-border"></div>
                </div>
              ) : (
                ""
              )}

              {beverages.map((beverage) => {
                return Object.keys(userData)
                  .filter(
                    (item) =>
                      userData[item].uid !== uid &&
                      (userData[item].cocktail ===
                        (beverage.cocktail === undefined
                          ? "Cocktail"
                          : beverage.cocktail) ||
                        userData[item].juice ===
                          (beverage.juice === undefined
                            ? "Juice"
                            : beverage.juice) ||
                        userData[item].coffe ===
                          (beverage.coffe === undefined
                            ? "Coffe"
                            : beverage.coffe)) &&
                      userData[item].durationValue ===
                        (beverage.duration === undefined
                          ? ""
                          : beverage.duration)
                  )
                  .map((item) => {
                    return (
                      <TinderCard
                        className="swipe"
                        key={userData[item].nickName}
                        onSwipe={(dir) => swiped(dir, userData[item].nickName)}
                        onCardLeftScreen={() =>
                          outOfFrame(userData[item].nickName)
                        }
                      >
                        <div
                          style={{
                            backgroundImage: `url(${userData[item].arrImage[1]})`,
                          }}
                          className="card"
                        >
                          <button
                            className="btn btn-dark"
                            onClick={() => sendRequest(userData[item].uid)}
                          >
                            <FaUserFriends size={20} />
                          </button>
                          <h3>
                            {userData[item].fullName}
                            <h5>{userData[item].nickName}</h5>
                          </h3>
                        </div>
                      </TinderCard>
                    );
                  });
              })}
            </div>
          </div>
        </div>
            
        <div className="col-md-4">
          <div className="request text-center">
            <h1>You Have New Meetup</h1>
            {meetupModal ? (
              <>
                <div style={{width:'100%'}}>
                  {
                  
                  // Object.keys(meet).filter(m => meet[m].reciever_id == uid)
                  // .map(rec => {
                    
                  //   return(
                  //     Object.keys(userData).filter(u => userData[u].request == rec)
                  //     .map(o => console.log(o,'==============='))
                  //   )
                  // })
                 
                    
                   senderId.map(s => {
             
                     return(
                       
                      Object.keys(userData).filter(u => userData[u].uid === s)
                      .map((u) => {
                        return(
                            
                           Object.keys(meet).filter(m => meet[m].uid === userData[u].uid && meet[m].meetup === false)
                           .map((item) => {
                             return(
                              <>
                                <img
                                  src={userData[u].arrImage[1]}
                                  alt="noImage"
                                  className="img-request"
                                />
                                <h2>{userData[u].fullName}</h2>
                                
                                <button className="btn btn-success" onClick={() => acceptRequest(item)}>Accept</button>
                                <button onClick={() => rejectRequest(item)}
                                  className="btn btn-danger"
                                  style={{ marginLeft: "0.8rem" }}
                               >
                                 Reject
                               </button>
                             </>
                             )
                           })
                          
                        )
                      })
                     )
                   })
                  



                  }
                </div>
              </>
            ) : (
              "No Meetup Found..."
            )}
          </div>
        </div>
      </div>
    </>
  );
}

export default CardView;
