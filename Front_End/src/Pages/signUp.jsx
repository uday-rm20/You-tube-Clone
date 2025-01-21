import React, { useState } from "react";
import './signUp.css';
import YouTubeIcon from '@mui/icons-material/YouTube';
import { Link, Navigate, useNavigate } from "react-router-dom";
import axios from "axios";
import { toast, ToastContainer } from 'react-toastify';
import CircularProgress from '@mui/material/CircularProgress';
import Box from '@mui/material/Box';


const SignUp = () => {

    const [uploadedImageUrl, setUploadedImageUrl] = useState("https://yt3.ggpht.com/f_cHcSywRfXfmAPJRCtRGyIXfXpL8_s94AVAkvRddf1v8QwDZdNlRcw3E078saoGx0ixDuHC=s88-c-k-c0x00ffffff-no-rj");
    const [signUpField, setSignUpField] = useState({ "channelName": "", "userName": "", "password": "", "about": "", "profilePic": uploadedImageUrl });
    const [progressBar, setProgressBar] = useState(false);
    const navigate = useNavigate();

    const handleInputField = (event, name) => {
        setSignUpField({
            ...signUpField, [name]: event.target.value
        })
    }
    console.log(signUpField);
    const uploadImage = async (e) => {
        const files = e.target.files;
        const data = new FormData();
        data.append('file', files[0]);
        data.append('upload_preset', 'youtube-clone');
        try {
            setProgressBar(true);
            const response = await axios.post("https://api.cloudinary.com/v1_1/dyn9pcwsk/image/upload", data)
            setProgressBar(false);
            const imageUrl = response.data.url;
            setUploadedImageUrl(imageUrl);
            setSignUpField({
                ...signUpField, "profilePic": imageUrl
            })


        } catch (err) {
            console.log(err)
        }

    }

    const handleSignup = async () => {
        setProgressBar(true);
        axios.post(`http://localhost:5100/auth/signUp`, signUpField).then((res) => {
            toast.success(res.data.message);
            setProgressBar(false);
            navigate('/');
        }).catch(err => {
            
            setProgressBar(false);
            toast.error(err);
        })

    }

    return (
        <div className="signUp">
            <div className="sign_card">
                <div className="signup_title">
                    <YouTubeIcon sx={{ fontSize: "54px", color: "red" }} className="login_youtubeImage" />
                    SignUp
                </div>
                <div className="signup_inputs">
                    <input type="text" className="signup_inputs_imp" value={signUpField.channelName} onChange={(e) => { handleInputField(e, "channelName") }} placeholder="Channel Name" />
                    <input type="text" className="signup_inputs_imp" value={signUpField.userName} onChange={(e) => { handleInputField(e, "userName") }} placeholder="User Name" />
                    <input type="password" className="signup_inputs_imp" value={signUpField.password} onChange={(e) => { handleInputField(e, "password") }} placeholder="Password" />
                    <input type="text" className="signup_inputs_imp" value={signUpField.about} onChange={(e) => { handleInputField(e, "about") }} placeholder="About your Channel" />
                    <div className="image_upload_signup">
                        <input type="file" onChange={(e) => uploadImage(e)} />
                        <div className="image_upload_signup_div">
                            <img src={uploadedImageUrl} alt="" className="iamge_default_signup" />
                        </div>
                    </div>
                    <div className="signbtns">
                        <div className="signupbtn" onClick={handleSignup}>SignUp</div>
                        <Link to={'/'} className="signupbtn">Home page</Link>
                    </div>
                    {
                        progressBar && <Box sx={{ display: 'flex' }}>
                            <CircularProgress />
                        </Box>
                    }

                </div>
            </div>
            <ToastContainer />
        </div>
    )
}

export default SignUp;