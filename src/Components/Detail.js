import React, { useEffect, useState } from "react";
import { useParams } from "react-router";
import { dbs } from "../config/firebase-config";
import Slider from "react-slick";
import Header from "./Header";
import {
  withScriptjs,
  withGoogleMap,
  GoogleMap,
  Marker,
  Polyline,
  lineSymbol,
} from "react-google-maps";
import { compose, withProps } from "recompose";

const MyMapComponent = compose(
  withProps({
    googleMapURL:
      "https://maps.googleapis.com/maps/api/js?v=3.exp&libraries=geometry,drawing,places&key=AIzaSyDyHw1ODJ-q3HKSneTCp6N66sKaLLjx-84",
    loadingElement: <div style={{ height: `100%` }} />,
    containerElement: <div style={{ height: `400px` }} />,
    mapElement: <div style={{ height: `100%` }} />,
  }),
  withScriptjs,
  withGoogleMap
)((props) => (
  <GoogleMap
    defaultZoom={10}
    defaultCenter={{ lat: props.position?.lat, lng: props.position?.lng }}
  >
    <Marker position={{ lat: props.position?.lat, lng: props.position?.lng }} />
    <Marker position={{ lat: props.myData?.lat, lng: props.myData?.lng }} />
    <Polyline
      path={[
        { lat: props.position?.lat, lng: props.position?.lng },
        { lat: props.myData?.lat, lng: props.myData?.lng },
      ]}
      geodesic={true}
      options={{
        strokeColor: "#ff2527",
        strokeOpacity: 0.75,
        strokeWeight: 2,
        icons: [
          {
            icon: lineSymbol,
            offset: "0",
            repeat: "20px",
          },
        ],
      }}
    />
  </GoogleMap>
));

const Detail = (props) => {
  const [singleData, setSingleData] = useState([]);
  const [loading, setLoading] = useState(false);
  const { id } = useParams();
  

  const settings = {
    dots: false,
    fade: true,
    arrow: true,
    infinite: true,
    speed: 1000,
    slidesToShow: 1,
    slidesToScroll: 1,
  };

  useEffect(() => {
    setLoading(true);
    let temp = [];
    dbs
      .collection("firedata")
      .where("uid", "==", id)
      .get()
      .then((snapshot) => {
        snapshot.docs.map((data) => {
          temp.push(data.data());
        });
        setLoading(false);
        setSingleData(temp);
      })
      .catch((err) => console.log(err));
  }, [id]);
 
  return (
    <div>
      <Header />
      <div className="container" style={{ marginTop: "2%" }}>
        <h1
          className="text-center text-uppercase"
          style={{ fontWeight: "900" }}
        >
          Meetup Detail
        </h1>
        <div className="row" id="single_View" style={{ marginTop: "5%" }}>
          {loading && <div class="spinner-border text-primary"></div>}
          <div className="col-sm-6">
            {singleData?.map((item) => {
              return (
                <>
                  {/* <img src={item?.arrImage[1]} alt="noImage" /> */}
                  <Slider {...settings}>
                    {item?.arrImage?.map((images) => {
                      return (
                        <div>
                          <img
                            src={images}
                            alt="noImage"
                            className="slides_images"
                          />
                        </div>
                      );
                    })}
                  </Slider>
                  <h3 className="text-center my-2">{item?.fullName}</h3>
                  <h2 className="mt-4">User Info:</h2>
                  <hr />
                  <h4>
                    <b>Contact No:</b> {item?.phoneNo}
                  </h4>
                  <h4 className="mt-3">
                    <b>Beverages:</b>
                  </h4>
                  <ul>
                    <li>{item?.cocktail && item?.cocktail}</li>
                    <li>{item?.coffe && item?.coffe}</li>
                    <li>{item?.juice && item?.juice}</li>
                  </ul>
                  <h4 className="mt-3">
                    <b>Time Duration:</b> {item?.durationValue}
                  </h4>
                  <div className="mb-4">

                    <MyMapComponent
                      position={{ lat: item?.position?.lat, lng: item?.position?.lng }}
                      onPositionChangeHandler={props.onPositionChangeHandler}
                      myData={props.myData[0]?.position}
                    />
                  </div>
                </>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Detail;
