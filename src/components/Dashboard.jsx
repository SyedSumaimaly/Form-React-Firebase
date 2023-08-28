import React from 'react'
import { Button } from 'antd';
import { signOut } from "firebase/auth";
import { auth } from '../firebase';
import { useNavigate } from 'react-router-dom';


function Dashboard(props) {
    const navigate = useNavigate();

    const singOut = () => {
        signOut(auth).then(() => {
            navigate("/")
        }).catch((error) => {
            console.log(error)
        });
    }

    return (
        <div className='dashboard'>
            <h1>Dashboard</h1>
            <h2>{`Welcome ${props.name}`}</h2>

            <Button type="primary" onClick={singOut}>Sign out</Button>
        </div>
    )
}

export default Dashboard