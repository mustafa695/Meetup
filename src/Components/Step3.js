import { Checkbox } from "antd";

function Step3(props){
    return(
        <>
        <h3 className="text-center">Select Beverages</h3>
        <div className="profile_form">
        <Checkbox value='Coffee' onChange={(e) => props.setCoffe(e.target.value)}>
            Coffee
        </Checkbox><br /><br />
        <Checkbox value='Juice' onChange={(e) => props.setJuice(e.target.value)}>
            Juice
        </Checkbox><br /><br />
        <Checkbox value='Cocktail' onChange={(e) => props.setCockTail(e.target.value)}>
            Cocktail
        </Checkbox><br /><br />

        <p style={{fontSize:'20px'}}>Duration Of Meetings</p>

        <select className="option_box" onChange={(e) => props.setDurationValue(e.target.value)}>
        <option value="" selected disabled>
              Select Duration Time...
        </option>
            <option value="30">30</option>
            <option value="60">60</option>
            <option value="120">120</option>
           
        </select>
        </div>
        
        </>
    );
}

export default Step3