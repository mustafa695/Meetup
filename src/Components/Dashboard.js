import React from "react";
import { Steps, Button, message } from "antd";
import Profile from "./Profile";
import Step2 from "./Step2";
import Step3 from "./Step3";
import { useState, useEffect } from "react";
import Step4 from "./Step4";
import { db, dbs, storage } from "../config/firebase-config";
import { useHistory } from "react-router";
import { auth } from "../config/firebase-config";
const Dashboard = (props) => {
  const [uid, setUid] = useState("");

  const [nickName, setNickName] = useState("");
  const [fullName, setFullName] = useState("");
  const [phoneNo, setPhoneNo] = useState("");
  const [image1, setImage1] = useState("");
  const [image2, setImage2] = useState("");
  const [image3, setImage3] = useState("");
  const [coffe, setCoffe] = useState("");
  const [juice, setJuice] = useState("");
  const [cocktail, setCockTail] = useState("");
  const [durationValue, setDurationValue] = useState("");
  const [position, setPosition] = useState();
  const [allImages, setAllImages] = useState([]);
  const [urls, setUrls] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(false)

  const onPositionChangeHandler = (e) => {
    setPosition({
      lat: e.latLng.lat(),
      lng: e.latLng.lng(),
    });
  };
  useEffect(() => {
    auth.onAuthStateChanged((user) => {
      setUid(user.uid);
      setFullName(user.displayName);
    });

    navigator.geolocation.getCurrentPosition(function (position) {
      setPosition({
        lat: position.coords.latitude,
        lng: position.coords.longitude,
      });
    });
  }, []);

  //actions

  const { Step } = Steps;

  const steps = [
    {
      title: "Profile Screen",
      content: (
        <Profile
          nickName={nickName}
          setNickName={setNickName}
          phoneNo={phoneNo}
          setPhoneNo={setPhoneNo}
        />
      ),
    },
    {
      title: "Second",
      content: (
        <Step2
          setImage1={setImage1}
          setImage2={setImage2}
          setImage3={setImage3}
        />
      ),
    },
    {
      title: "Third",
      content: (
        <Step3
          coffe={coffe}
          setCoffe={setCoffe}
          juice={juice}
          setJuice={setJuice}
          cocktail={cocktail}
          setCockTail={setCockTail}
          setDurationValue={setDurationValue}
        />
      ),
    },
    {
      title: "Last",
      content: (
        <Step4
          position={position}
          onPositionChangeHandler={onPositionChangeHandler}
        />
      ),
    },
  ];
  const [current, setCurrent] = React.useState(0);

  const next = () => {
    setCurrent(current + 1);
    setAllImages([image1, image2, image3]);
  };
  
  const prev = () => {
    setCurrent(current - 1);
  };

  let i = 0;
  let arrImage = [];
  function recurse() {
    setLoading(true);
    console.log({ i });
    if (allImages.length) {
      let item = allImages[i];

      let storageRef = storage.ref(`images/${item.name}`);

      storageRef.put(item).then(() => {
        storageRef.getDownloadURL().then((url) => {
          console.log(url);

          arrImage.push(url);

          if (i + 1 < allImages.length) {
            i++;
            recurse(allImages[i]);
          } else {
            console.log("done", arrImage);
            i = 0;
            submitData(arrImage);
          }
        });
      });
    }
  }
  let history = useHistory();

  const submitData = async (urls) => {

    setLoading(true);
    let input = {
      uid,
      fullName,
      nickName,
      phoneNo,
      coffe,
      juice,
      cocktail,
      durationValue,
      position,
      arrImage,

    };
    dbs
      .collection("firedata")
      .add(input)
      .then(function (docRef) {
       
        setLoading(false);
        history.push("/dashboard");
      })
      .catch(function (error) {
        console.error("Error adding Tutorial: ", error);
      });
  
  };

  return (
    <>
      <div className="container">
        <h1 className="main_title">Welcome To Dashboard</h1>
        {loading ? (
          <div class="overlay">
            <div class="overlay__inner">
              <div class="overlay__content">
                <span class="spinner"></span>
              </div>
            </div>
          </div>
        ) : (
          ""
        )}
        <Steps current={current}>
          {steps.map((item) => (
            <Step key={item.title} title={item.title} />
          ))}
        </Steps>
        <div className="steps-content">{steps[current].content}</div>
        <div className="steps-action">
          {current < steps.length - 1 && (
            <Button type="primary" onClick={() => next()} disabled={(nickName.length && phoneNo.length) ? false: true}>
              Next
            </Button>
          )}
          {current === steps.length - 1 && (
            <Button
              type="primary"
              onClick={() =>
                recurse(
                  nickName,
                  phoneNo,
                  coffe,
                  juice,
                  cocktail,
                  durationValue,
                  position,
                  urls
                )
              }
            >
              Done
            </Button>
          )}
          {current > 0 && (
            <Button style={{ margin: "0 8px" }} onClick={() => prev()}>
              Previous
            </Button>
          )}
        </div>
      </div>
    </>
  );
};

export default Dashboard;
