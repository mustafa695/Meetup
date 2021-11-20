import { useEffect } from 'react';
import {
  withScriptjs,
  withGoogleMap,
  GoogleMap,
  Marker,
} from 'react-google-maps';
import { compose, withProps } from 'recompose';

const MyMapComponent = compose(
  withProps({
    googleMapURL:
      'https://maps.googleapis.com/maps/api/js?v=3.exp&libraries=geometry,drawing,places&key=AIzaSyDyHw1ODJ-q3HKSneTCp6N66sKaLLjx-84',
    loadingElement: <div style={{ height: `100%` }} />,
    containerElement: <div style={{ height: `400px` }} />,
    mapElement: <div style={{ height: `100%` }} />,
  }),
  withScriptjs,
  withGoogleMap
)((props) => (
  <GoogleMap defaultZoom={10} defaultCenter={props.position}>
    <Marker
      position={props.position}
      draggable={true}
      // onDragEnd={props.getLocation}
      onClick={(e) => props.onPositionChangeHandler(e)}
    />
  </GoogleMap>
));

function Step4(props) {

  return (
    <>
      <h3 className="text-center">Choose Your Location</h3>
      <div className="mb-4">
        <MyMapComponent
          position={props.position}
          onPositionChangeHandler={props.onPositionChangeHandler}
        />
        {/* <props.WrappedMap
                    googleMapURL="https://maps.googleapis.com/maps/api/js?v=3.exp&libraries=geometry,drawing,places&key=AIzaSyDyHw1ODJ-q3HKSneTCp6N66sKaLLjx-84"
                    loadingElement={<div style={{ height: `100%` }} />}
                    containerElement={<div style={{ height: `400px` }} />}
                    mapElement={<div style={{ height: `100%` }} />}
                /> */}
      </div>
    </>
  );
}

export default Step4;
