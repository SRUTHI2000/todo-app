import React,{ useEffect, useState } from 'react';
import './signup.scss';
import { useDispatch, useSelector } from 'react-redux';
import { Link, Navigate, useNavigate } from 'react-router-dom';
import loginDB from '../../../../services/loginDB';

const Signup = () => {
    const [username,setUsername] = useState();
    const [password,setPassword] = useState();
    let navigate = useNavigate();

    useEffect( () => {
        loginDB.init().then(() => {console.log("Login DB")});
    });

    const onSignupClick = (e) => {
        e.preventDefault();
        loginDB.addUser(username,password).then(console.log("User added"));
        navigate('/login');
    };

    return(
        <div className='signup'>
            <h1>SIGN UP</h1>
            <form className='signup-form' onSubmit={onSignupClick}>
                <label>
                    <p>Username</p>
                    <input type="text" required onChange={(e) => setUsername(e.target.value)}/>
                </label>
                <label>
                    <p>Password</p>
                    <input type="password" required onChange={(e) => setPassword(e.target.value)}/>
                </label>
                <div>
                    <button type="submit">Register</button>
                </div>
            </form>
            <h4>Already Registered? <Link to="/login">Login here</Link></h4>
        </div>
    );
};

export default Signup;