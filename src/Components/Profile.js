import { Input } from 'antd';

function Profile(props) {
  return (
    <>
      <h3 className="text-center">Profile Screen</h3>
      <div className="profile_form">
        <label>Nick Name:</label>
        <Input
          placeholder="Enter Your Nick Name"
          className="mb-4"
          required
          value={props.nickName}
          onChange={(e) => props.setNickName(e.target.value)}
        />
        <label>Phone No:</label>
        <Input
          type="number"
          placeholder="Enter Your Phone Number"
          value={props.phoneNo}
          required
          onChange={(e) => props.setPhoneNo(e.target.value)}
          className="mb-4"
        />
      </div>
    </>
  );
}

export default Profile;
