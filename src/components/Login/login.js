import React from "react";
import './login.css';
import { facebookSignIn } from "../../config/firebase";
import  {useNavigate}  from "react-router-dom";
import { FacebookLoginButton } from "react-social-login-buttons";

// import Home from "../Home/home";

function Login() {
  
  // const navigate = useNavigate()
  const signInWithFacebook = async () => {
    try {
      await facebookSignIn();
      alert("SignUp Successfull");
      // navigate("../Home");
    } catch (e) {
      console.log(e.message);
    }
  };

    return(
        <>
        {/* <button onClick={signInWithFacebook}>Login with fb</button> */}
        <div className="body">
          {/* <h1>Q-App </h1> */}
          <div className="hero">
        <div className="static-txt">Q-App using</div>
        <ul className="dynamic-txt">
            <li><span>FIREBASE</span></li>
            <li><span>CSS</span></li>
            <li><span>REACT</span></li>
        </ul>
    </div>
          <div className="login-button">
        <FacebookLoginButton onClick={signInWithFacebook} />
          </div>
          <div className="main-img">
            <img src="https://mvixdigitalsignage.com/wp-content/uploads/2021/05/queuefeatured-1920x533.png" />
          </div>
        </div>
        </>
    )
}

export default Login