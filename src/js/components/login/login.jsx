import React, { useState, useEffect } from 'react';
import { Link, Navigate, useNavigate } from 'react-router-dom';
import loginDB from '../../../../services/loginDB';
import './login.scss';

const Login = (props) => {
    const [username,setUsername] = useState();
    const [password,setPassword] = useState();
    let navigate = useNavigate();
    useEffect( () => {
        loginDB.init().then(() => {console.log("Login DB")});
    });

    const onLoginClick = e => {
        e.preventDefault();
        loginDB.getUser().then((users) => {
            if(users.length == 0){
                alert("Please Register before Logging in");
            }
            for(let user of users) {
                if(user.username == username) {
                    if(user.password == loginDB.getHashedPassword(password,user.salt)) {
                        localStorage.setItem("isAuthenticated","true");
                        if(localStorage.getItem("isAuthenticated")){
                            navigate("/todoapp");
                        }
                    }
                    else{
                        alert("Username or Password Incorrect");
                    }
                } else {
                    alert("Username or Password Incorrect");
                }
            }
        });
    }

    return (
        <div className='login'>
            <h1>LOGIN</h1>
            <form className='login-form' onSubmit={onLoginClick}>
                <label>
                    <p>Username</p>
                    <input type="text" required onChange={(e) => setUsername(e.target.value)} />
                </label>
                <label>
                    <p>Password</p>
                    <input type="password" required onChange={(e) => setPassword(e.target.value)} />
                </label>
                <div>
                    <button type="submit">Login</button>
                </div>
            </form>
            <h4>New User? <Link to="/">Register here</Link></h4>
        </div>
    );
};

export default Login;
