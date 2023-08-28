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

  const navigate = useNavigate();

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
        <Input placeholder="Enter your email" onChange={(event) =>
          setValues((prev) => ({ ...prev, email: event.target.value }))
        } />
        <Input placeholder="Enter your password" onChange={(event) =>
          setValues((prev) => ({ ...prev, pass: event.target.value }))
        } />
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