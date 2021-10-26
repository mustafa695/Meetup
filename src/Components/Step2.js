import React from 'react';
function Step2(props) {
  
  return (
    <>
      <h2 className="text-center">Uplading Images</h2>
      <div className="profile_form">
        <label>Image One:</label>
        <input
          type="file"
          className="form-control mb-4"
          onChange={(e) => props.setImage1(e.target.files[0])}
        />
        <label>Image Two:</label>
        <input
          type="file"
          className="form-control mb-4"
          onChange={(e) => props.setImage2(e.target.files[0])}
        />
        <label>Image Three:</label>
        <input
          type="file"
          className="form-control mb-4"
          onChange={(e) => props.setImage3(e.target.files[0])}
        />

      
      </div>
    </>
  );
}

export default Step2;
