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

    const handleEmail = (event) => {
        setValues((prev) => ({ ...prev, email: event.target.value }))
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
                <Input placeholder="Enter your password" onChange={(event) => setValues((prev) => ({ ...prev, password: event.target.value }))} />
                <div className='error'>{errorMessage}</div>
            </div>
            <Button type="primary" onClick={handleSubmit}>Sign Up</Button>
        </div>
    )
}

export default Signup