import React, { useState, useMemo, useEffect } from "react";
// import TinderCard from '../react-tinder-card/index'
import TinderCard from "react-tinder-card";
import { db, dbs } from "../config/firebase-config";
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
  // const [senderId, setSenderId] = useState("");
  const [meetupAccept, setMeetupAccept] = useState("");
  const [meetupModal, setMeetupModal] = useState(false);
  const [meetCondtion, setMeetCondition] = useState([]);
  const swiped = (direction, nameToDelete) => {
    console.log("removing: " + nameToDelete);
    setLastDirection(direction);
  };
  // let meetupModal = false;
  const outOfFrame = (name) => {
    console.log(name + " left the screen!");
  };
  useEffect(() => {
    let temp = [];
    let id = localStorage.getItem("userId");
    setUid(id);
    setLoading(true);
    dbs
      .collection("firedata")
      .get()
      .then((snapshot) => {
        snapshot.docs.map((doc) => {
          temp.push(doc.data(), doc.id);
        });
        setUserData(temp);
        setCharacters(temp);
        setLoading(false);
      });
    
  }, []);

  const sendRequest = (reciever_id) => {
    let input = { reciever_id, uid, meetUp: false, reject: false };
    dbs
      .collection("meeting")
      .add(input)
      .then(function (docRef) {
        message.success("Request Send Sucessfully...");
      })
      .catch(function (error) {
        console.error("Error adding Request: ", error);
      });
  };

  let test = userData
    ?.filter((item) => item?.uid === uid)
    .map((item) => {
      return currentData.push(
        {
          cocktail: item?.cocktail.length > 0 ? item?.cocktail : "",
        },
        { juice: item?.juice.length > 0 ? item?.juice : "" },
        { coffe: item?.coffe.length > 0 ? item?.coffe : "" },
        {
          duration: item?.durationValue.length > 0 ? item?.durationValue : "",
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


  //meetup

  useEffect(() => {
    let temp = [];
    dbs
      .collection("meeting")
      .where("reciever_id", "==", uid)
      .get()
      .then((snapshot) => {
        snapshot.docs.map((res) => {
          temp.push({ data: res.data(), docId: res.id });
        });
        setMeetCondition(temp);
      })
      .catch((err) => console.log(err));
  }, [uid]);



  console.log(uid, "userid");

  return (
    <>
      <div className="row" style={{marginTop:'5%'}}>
        <div className="col-sm-12">
          <div className="pos-r" style={{ position: "absolute", left: "38%" }}>
            <div className="cardContainer">
              {loading ? (
                <div className="d-flex justify-content-center">
                  <div class="spinner-border"></div>
                </div>
              ) : (
                ""
              )}
              {beverages.map((beverage) => {
                return (
                  userData &&
                  userData
                    .filter(
                      (item) =>
                        item.uid !== uid &&
                        (item?.cocktail ===
                          (beverage.cocktail === undefined
                            ? "Cocktail"
                            : beverage.cocktail) ||
                          item?.juice ===
                            (beverage.juice === undefined
                              ? "Juice"
                              : beverage.juice) ||
                          item?.coffe ===
                            (beverage.coffe === undefined
                              ? "Coffe"
                              : beverage.coffe)) &&
                        item?.durationValue ===
                          (beverage.duration === undefined
                            ? ""
                            : beverage.duration)
                    )
                    .map((data, ind) => {
                      return (
                        <TinderCard
                          className="swipe"
                          key={ind}
                          onSwipe={(dir) => swiped(dir, data?.nickName)}
                          onCardLeftScreen={() => outOfFrame(data?.nickName)}
                        >
                          <div
                            style={{
                              backgroundImage: `url(${data?.arrImage[1]})`,
                            }}
                            className="card"
                          >
                            <button
                              className="btn btn-dark"
                              onClick={() => sendRequest(data?.uid)}
                            >
                              <FaUserFriends size={20} />
                            </button>
                            <h3>
                              {data?.fullName}
                              <h5>{data?.nickName}</h5>
                            </h3>
                          </div>
                        </TinderCard>
                      );
                    })
                );
              })}
            </div>
          </div>
        </div>
      </div>

      <div className="container"></div>
    </>
  );
}

export default CardView;
