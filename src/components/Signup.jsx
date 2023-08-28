import React, { useState } from 'react'
import { Input, Button } from 'antd';
import swal from 'sweetalert';
import { createUserWithEmailAndPassword, updateProfile } from "firebase/auth";
import { auth } from '../firebase';
import { useNavigate } from 'react-router-dom';
import './style.css'

function Signup() {
    const [values, setValues] = useState({
        name: "",
        email: "",
        password: "",
    });

    const [errorMessage, SeterrorMessage] = useState("")
    const navigate = useNavigate();
    const [emailmsg, SetemailMsg] = useState();
    const [passmsg, SetpassMsg] = useState();

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
        setValues((prev) => ({ ...prev, password: e.target.value }))

        let pass = /^[A-Za-z]\w{7,14}$/;

        if (values.password.match(pass)) {
            SetpassMsg("Correct Password")
        } else {
            SetpassMsg("Your Password must contain  7 to 16 characters including characters, numeric digits, underscore and first character must be a letter")
        }

    }

    const handleSubmit = () => {
        if (!values.name || !values.email || !values.password) {
            swal("Opps!", "Please fill all data", "error");
        }


        createUserWithEmailAndPassword(auth, values.email, values.password, values.name)
            .then(async (userCredential) => {
                const user = userCredential.user;
                swal("Hurrah!", "You successfully register", "success");
                await updateProfile(user, {
                    displayName: values.name
                })
                navigate("/");
                console.log(user)
            })
            .catch((err) => {
                console.log(err)
                SeterrorMessage(err.message)
            });

    }

    return (
        <div className='main'>
            <h1>SignUp</h1>
            <div>
                <Input placeholder="Enter your name" onChange={(event) => setValues((prev) => ({ ...prev, name: event.target.value }))} />
                <Input placeholder="Enter your email" onChange={handleEmail} />
                <p className={emailmsg == "Valid email address!" ? "validcolor" : "errorcolor"}>{emailmsg}</p>
                <Input placeholder="Enter your password" onChange={handlePassword} />
                <p className={passmsg == "Correct Password" ? "validcolor" : "errorcolor"}>{passmsg}</p>
                <div className='error'>{errorMessage}</div>
            </div>
            <Button type="primary" onClick={handleSubmit}>Sign Up</Button>
        </div>
    )
}

export default Signup