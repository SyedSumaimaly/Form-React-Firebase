import React, { useState } from 'react'
import { Input, Button } from 'antd';
import './style.css'
import {
  Link
} from "react-router-dom";
import { signInWithEmailAndPassword } from "firebase/auth";
import { auth } from '../firebase';
import { useNavigate } from 'react-router-dom';
import swal from 'sweetalert';



function Login() {
  const [values, setValues] = useState({
    email: "",
    pass: "",
  });

  const [errorMsg, setErrorMsg] = useState("");
  const [emailmsg, SetemailMsg] = useState();
  const [passmsg, SetpassMsg] = useState();
  const navigate = useNavigate();

  const handleEmail = (event) => {
    setValues((prev) => ({ ...prev, email: event.target.value }))
    let patt = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
    if (values.email.match(patt)) {
      SetemailMsg("Valid email address!")
    } else (
      SetemailMsg("Your Email must contain English letters, Digits (0-9) and Special Characters")
    )
  }

  const handlePassword = (e) => {
    setValues((prev) => ({ ...prev, pass: e.target.value }))

    let passreg = /^[A-Za-z]\w{7,14}$/;

    if (values.pass.match(passreg)) {
      SetpassMsg("Correct Password");
    } else {
      SetpassMsg("Your Password must contain 7 to 16 charactersc including numeric digits, underscore and first character must be a letter")
    }

  }

  const handleLogin = () => {
    if (!values.email || !values.pass) {
      swal("Opps!", "Please fill all data", "error");
      return;
    }

    signInWithEmailAndPassword(auth, values.email, values.pass)
      .then(async (res) => {
        navigate("/dashboard");
      })
      .catch((err) => {
        setErrorMsg(err.message);
        console.log(errorMsg)
      });
  };




  return (
    <div className='maintwo'>
      <h1>Login</h1>
      <div>
        <Input placeholder="Enter your email" onChange={handleEmail} />
        <p className={emailmsg == "Valid email address!" ? "validcolor" : "errorcolor"}>{emailmsg}</p>
        <Input placeholder="Enter your password" onChange={handlePassword} />
        <p className={passmsg == "Correct Password" ? "validcolor" : "errorcolor"}>{passmsg}</p>
      </div>
      <div className='error'>
        {errorMsg}
      </div>
      <Button type="primary" onClick={handleLogin}>Login</Button>
      <a><Link className='createaccount' to="/Signup">Create account</Link></a>
    </div>
  )
}

export default Login;