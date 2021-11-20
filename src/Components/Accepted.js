import React, { useEffect, useState } from "react";
import Header from "./Header";
import { db, dbs } from "../config/firebase-config";
import { message } from "antd";

const Accepted = () => {
  const [userData, setUserData] = useState([]);
  const [meetCondtion, setMeetCondition] = useState([]);
  const [uid, setUid] = useState("");

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
  
  const againFectch = () => {
    let temp =[];
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
  }

  const acceptRequest = (id) => {
    dbs
      .collection("meeting")
      .doc(id)
      .update({
        meetUp: true,
      })
      .then((res) => {
        message.success("Request has been accepted...");
        againFectch()
      });
  };

  const rejectRequest = (id) => {
    dbs
      .collection("meeting")
      .doc(id)
      .update({
        reject: true,
      })
      .then((res) => {
        message.success("Request has been rejected...");
        againFectch()
      });
  };
  return (
    <div>
      <Header />
      <div className="container">
        <h1
          style={{
            textAlign: "center",
            margin: "3.5rem 0 0",
            fontWeight: "500",
            color: "rgb(133 132 132)",
          }}
        >
          New Requests Found...
        </h1>
        <hr style={{ width: "40%", margin: "20px auto 50px" }} />
        {meetCondtion?.map((m) => {
          return userData
            ?.filter((u) => u.uid == m?.data?.uid)
            .map((data) => {
              return (
                <>
                  {(m?.data?.meetUp === false && m?.data?.reject === false) && (
                    <div className="card-for-request">
                      <div className="mb-4 text-center">
                        <img
                          src={data?.arrImage[1]}
                          style={{
                            width: "140px",
                            height: "140px",
                            borderRadius: "55%",
                            objectFit: "cover",
                          }}
                        />
                        <h3>{data?.nickName}</h3>
                        <button
                          className="btn btn-primary"
                          onClick={() => acceptRequest(m?.docId)}
                        >
                          Accept
                        </button>
                        <button
                          className="btn btn-warning"
                          style={{ marginLeft: "5px" }}
                          onClick={() => rejectRequest(m?.docId)}
                        >
                          Reject
                        </button>
                      </div>
                    </div>
                  )}
                </>
              );
            });
        })}
      </div>
    </div>
  );
};

export default Accepted;
