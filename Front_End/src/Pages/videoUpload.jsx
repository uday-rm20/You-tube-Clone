import React, { useState, useEffect } from "react";
import './videoUpload.css';
import YouTubeIcon from '@mui/icons-material/YouTube';
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import { Box, CircularProgress } from "@mui/material";


const VideoUpload = () => {
    const [inputField, setInputField] = useState({ "title": "", "description": "", "videoLink": "", "thumbnail": "", "videoType": "" });
    const [loader, setLoader] = useState(false);
    const navigate = useNavigate();
    const handleOnChangeInput = (event, name) => {
        setInputField({
            ...inputField, [name]: event.target.value
        })
    }


    const uploadImage = async (e, type) => {
        setLoader(true);
        const files = e.target.files;
        const data = new FormData();
        data.append('file', files[0]);
        data.append('upload_preset', 'youtube-clone');
        try {
            const response = await axios.post(`https://api.cloudinary.com/v1_1/dyn9pcwsk/${type}/upload`, data)
            const url = response.data.url;
            setLoader(false);
            let val = type === "image" ? "thumbnail" : "videoLink"
            setInputField({
                ...inputField, [val]: url
            })

        } catch (err) {
            setLoader(false);
            console.log(err)
        }

    }

    console.log(inputField);

    useEffect(() => {
        let isLogin = localStorage.getItem("userId");
        if (isLogin == null) {
            navigate('/');
        }

    }, [])


    const handleSubmitFunc = async () => {
        setLoader(true);
        await axios.post(`http://localhost:5100/api/video`, inputField, { withCredentials: true }).then((response) => {
            console.log(response);
            setLoader(false);
            navigate('/');
        }).catch(err => {
            console.log(err);
            setLoader(false);
        })
    }

    return (
        <div className="videoUpload">
            <div className="uploadBox">
                <div className="uploadVideoTitle"><YouTubeIcon sx={{ fontSize: "54px", color: "red" }} /> Upload Video </div>
                <div className="uploadForm">
                    <input type="text" value={inputField.title} onChange={(e) => { handleOnChangeInput(e, "title") }} placeholder="Title of video" className="uploadFormInputs" />
                    <input type="text" value={inputField.description} onChange={(e) => { handleOnChangeInput(e, "description") }} placeholder="Description" className="uploadFormInputs" />
                    <input type="text" value={inputField.videoType} onChange={(e) => { handleOnChangeInput(e, "videoType") }} placeholder="Category" className="uploadFormInputs" />
                    <div>Thumbnail <input type="file" accept="image" onChange={(e) => uploadImage(e, "image")} /></div>
                    <div>Video <input type="file" accept="video/mp4, video/webm, video/*" onChange={(e) => uploadImage(e, "video")} /></div>
                    {
                        loader && <Box sx={{display: 'flex'}}>
                            <CircularProgress/>
                        </Box>
                    }
                </div>
               
                <div className="uploadbutton">
                    <div className="uploadbtn-form" onClick={handleSubmitFunc}>Upload</div>
                    <Link to={'/'} className="uploadbtn-form">Home</Link>
                </div>
            </div>
        </div>
    )
}

export default VideoUpload;