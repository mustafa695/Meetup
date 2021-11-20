import React, { useEffect, useState } from "react";
import { useHistory } from "react-router";
import { dbs } from "../config/firebase-config";
import Header from "./Header";

const Rejected = () => {
  const [userData, setUserData] = useState([]);
  const [meetCondtion, setMeetCondition] = useState([]);
  const [uid, setUid] = useState("");
  let history = useHistory();
  useEffect(() => {
    let temp = [];
    dbs
      .collection("firedata")
      .get()
      .then((snapshot) => {
        snapshot.docs.map((doc) => {
          temp.push(doc.data());
        });
        setUserData(temp);
      });
  }, []);

  useEffect(() => {
    let id = localStorage.getItem("userId");
    setUid(id);

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


  console.log(meetCondtion, "---------");
  return (
    <div>
      <Header />
      <div className="container">
        <h1 className="text-center" style={{margin:'3% 0'}}>Rejected Requests</h1>
        <div className="row">
          {meetCondtion?.map((m) => {
            return userData
              ?.filter((u) => u.uid == m?.data?.uid && m?.data?.reject === true)
              .map((item) => {
                return (
                  <div className="col-md-6">
                    <div className="accept-cards">
                      <img
                        src={item?.arrImage[1]}
                        style={{
                          width: "150px",
                          height: "140px",
                          borderRadius: "55%",
                          objectFit: "cover",
                        }}
                      />
                      <h3>{item?.nickName}</h3>
                      <h5>Contact Info: {item?.phoneNo}</h5>
                    </div>
                  </div>
                );
              });
          })}
        </div>
      </div>
    </div>
  );
};

export default Rejected;
