import React, { useState } from "react";
import './login.css';
import YouTubeIcon from '@mui/icons-material/YouTube';
import { Link } from "react-router-dom";
import axios from "axios";
import { toast, ToastContainer } from 'react-toastify';
import CircularProgress from '@mui/material/CircularProgress';
import Box from '@mui/material/Box';

const Login = ({ setLoginModel }) => {
    const [loginField, setLoginField] = useState({ "userName": "", "password": "" });
    const [progressBar, setProgressBar] = useState(false);
    /* updates the loginField  */
    const handleOnChangeInput = (event, name) => {
        setLoginField({
            ...loginField, [name]: event.target.value
        })

    }
    /* local storage is used to save the JWT token details to authenticate the user */

    const handleLoginFunc = async () => {
        setProgressBar(true);
        axios.post(`http://localhost:5100/auth/login`, loginField,{withCredentials: true} ).then((response) => {

            setProgressBar(false);
            localStorage.setItem("token", response.data.token);
            localStorage.setItem("userId", response.data.user._id);
            localStorage.setItem("userProfilePic", response.data.user.profilePic);
            window.location.reload();

        }).catch(err => {
            toast.error("Invalid Credentials")
            console.log(err);
            setProgressBar(false);
        })

    }
    return (
        <div className="login">
            <div className="login_card">
                <div className="titleCard_login">
                    <YouTubeIcon sx={{ fontSize: "54px", color: "red" }} className="login_youtubeImage" />
                    Login
                </div>
                <div className="loginCredentials">
                    <div className="usernameLogin">
                        <input className="usernameloginUser" value={loginField.userName} onChange={(e) => handleOnChangeInput(e, "userName")} placeholder="UserName" type="text" />
                    </div>
                    <div className="usernameLogin">
                        <input className="usernameloginUser" value={loginField.password} onChange={(e) => handleOnChangeInput(e, "password")} placeholder="Password" type="text" />
                    </div>
                </div>
                <div className="loginbutton">
                    <div className="loginbtn" onClick={handleLoginFunc}>Login</div> 
                    <Link to={'/signup'} onClick={() => setLoginModel()} className="loginbtn">SignUp</Link>
                    <div className="loginbtn" onClick={() => setLoginModel()}>Cancel</div>
                </div>
            
                <br />
                <br />
                {
                    progressBar && <Box sx={{ display: 'flex' }}>
                        <CircularProgress />
                    </Box>
                }
            </div>
            <ToastContainer />
        </div>

    )
}

export default Login;

/* eventhandling is used to call various  async function  */