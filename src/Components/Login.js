import { useHistory } from 'react-router';
import { Row, Col } from 'reactstrap';
import { faceBookProvider } from '../config/authMethods';
import socialMediaAuth from './Auth';
import { auth } from '../config/firebase-config'
import { message } from 'antd';
function Login() {
  let history = useHistory();
  const loginWithFB = async (provider) => {
    const res = await socialMediaAuth(provider);
    console.log(res, 'Result');
    if(res.multiFactor.user){
      auth.onAuthStateChanged((user) => {
        history.push('/home')
        localStorage.setItem('userId', user?.uid);
        message.success('Login Successfully..')
      })
      
    }
    else{
      message.warn("Something Wen Wrong...")
    }
  };

  return (
    <div className="container" id="login">
      <Row  style={{height:'600px',alignItems:'center'}}>
        <Col md={3}></Col>
        <Col md={6}>
            <div className="card">
                <h1 className="text-center">Login With Facebook</h1>
                <button className="fb-btn" onClick={() => loginWithFB(faceBookProvider)}>
                    Facebook
                </button>
            </div>
         
        </Col>
        <Col md={3}></Col>
      </Row>
    </div>
  );
}

export default Login;
