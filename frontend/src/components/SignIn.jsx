import React, {useState, useContext} from "react";
// import "./SignIn.css";
import "../css/SignIn.css";
import {Link, useNavigate} from "react-router-dom";
import { toast } from 'react-toastify';
import { LoginContext } from "../context/LoginContext";

function SignIn () {
    const {setUserLogin}=useContext(LoginContext)
    const navigate = useNavigate();
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");

    //Toast Functions
  const notifyA = (msg) => toast.error(msg)
  const notifyB = (msg) => toast.success(msg)

  const emailRegex = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;

    const postData = () => {
        //checking email
        if(!emailRegex.test(email)){
          notifyA("Invalid email")
          return
        }
        // Sending data to server
        fetch("/signin", {
          method:"post",
          headers:{
            "Content-Type":"application/json"
          },
          body: JSON.stringify({
              email: email,
              password: password
          })
        }).then(res=>res.json())
          .then(data =>{
            if(data.error){
              notifyA(data.error)
            }else{
              notifyB("Signed In Successfully")
              console.log(data)
              localStorage.setItem("jwt", data.token)
              localStorage.setItem("user", JSON.stringify(data.user))
              setUserLogin(true)
              navigate("/")
            }
            console.log(data)})
      }


    return (
        <div className="signIn">
           <div>
                <div className="loginForm">
                    <img className="signUpLogo1" src="https://1000logos.net/wp-content/uploads/2017/02/Logo-Instagram-1.png" alt="" />
                    <div>
                        <input type="email" name="email" id="email" value={email} placeholder="Email" onChange={(e) => {setEmail(e.target.value)}} />
                    </div>
                    <div>
                        <input type="password" name="password" id="password" value={password} placeholder="Password" onChange={(e) => {setPassword(e.target.value)}} />
                    </div>
                    <input type="submit" id="login-btn" onClick={() =>{postData()}} value="Sign In"/>
                </div>
                <div className="loginForm2">
                    Don't have an account ?
                    <Link to="/signup">
                    <span style={{color: "blue", cursor: "pointer"}}>Sign Up</span>
                    </Link>
                </div>
           </div>
        </div>
    );
}

export default SignIn;