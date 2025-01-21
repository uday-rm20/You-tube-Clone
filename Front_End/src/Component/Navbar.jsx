import React, { useState, useEffect } from "react";
import "./Navbar.css";
import MenuIcon from '@mui/icons-material/Menu';
import YouTubeIcon from '@mui/icons-material/YouTube';
import SearchIcon from '@mui/icons-material/Search';
import KeyboardVoiceIcon from '@mui/icons-material/KeyboardVoice';
import VideoCallIcon from '@mui/icons-material/VideoCall';
import PersonIcon from '@mui/icons-material/Person';
import { Link, useNavigate } from 'react-router-dom';
import Login from "./login";
import axios from "axios";

const Navbar = ({ setSideNavbarFunc, sideNavbar, setSearchQuery }) => {

    const [userpic, setUserPic] = useState("https://upload.wikimedia.org/wikipedia/commons/thumb/b/bc/Unknown_person.jpg/694px-Unknown_person.jpg"); /* default profilePic */
    const [navbarModel, setNavbarModel] = useState(false);
    const [login,setLogin] = useState(false);
    const [isLoggedIn, setIsLoggedIn] = useState(false);
    const [query, setQuery] = useState("");  /*local state for the search query*/
    const navigate = useNavigate();

    const handleClickModel = () => {
        setNavbarModel(prev => !prev);
    }
    const sideNavbarFunc = () => {
        setSideNavbarFunc(!sideNavbar);

    }
    const handleChannel = () => {
        let userId = localStorage.getItem("userId");
        navigate(`/user/${userId}`);
        setNavbarModel(false);
    }

    const setLoginModel=(val)=>{
        setLogin(false);
    }

    const handleSearchChange = (e) => {
        setQuery(e.target.value);
        setSearchQuery(e.target.value);  /*passing  the query to the parent*/ 
    };

    const onclickOfPopUpOption = (button) => {
        setNavbarModel(false);
        if(button==="login"){
            setLogin(true);

        }else{
            localStorage.clear();
            getLogoutFunc();
            setTimeout(() => {
                navigate('/')
                window.location.reload();
            }, 2000);

        }

    }

    const getLogoutFunc = async() => {
        axios.post("http://localhost:5100/auth/logout", {}, {withCredentials: true}).then((response) => {
            console.log("Logged Out")
        }).catch(err => {
            console.log(err);

        })
    }

    useEffect(() => {
        let userProfilePiic = localStorage.getItem("userProfilePic");
        setIsLoggedIn(localStorage.getItem("userId")!==null?true:false);
        if(userProfilePiic!==null){
            setUserPic(userProfilePiic);
        }

    },[])
    return (
        <div className="navbar">
            <div className="navbar-left">
                {/* Hamburger Icon */}
                <div className="navbarHamberger" onClick={sideNavbarFunc}>
                    <MenuIcon sx={{ color: "white", fontSize: "34px" }} />
                </div>

                {/* YouTube Logo and Title */}
                <Link to={'/'} className="navbar_youtubeImg">
                    <YouTubeIcon sx={{ fontSize: "34px", color: "red" }} className="navbar_youtubeImage" />
                    <div className="navbar_utubeTitle">YouTube</div>
                </Link>
            </div>
            <div className="navbar-center">
                <div className="navbar_searchBox">
                    <input type="text" placeholder="Search" className="navbar_searchBoxInput" onChange={handleSearchChange} />
                    <div className="navbar_searchIconBox"><SearchIcon sx={{ fontSize: "28px", color: "white" }} /></div>
                </div>
                <div className="navbar_mic">
                    <KeyboardVoiceIcon />
                </div>
            </div>
            <div className="navbar-right">
                <Link to={'/4862/upload'}>
                    <VideoCallIcon sx={{ fontSize: "40px", cursor: "pointer", color: "white" }} />
                </Link>

                <img onClick={handleClickModel} src={userpic} className="navbar-right-logo" alt="logo" />
                {navbarModel &&
                    <div className="navbar-model">
                        {isLoggedIn && <div className="navbar-model-option" onClick={handleChannel}>Channel</div> }
                        
                        {isLoggedIn && <div className="navbar-model-option" onClick={() => onclickOfPopUpOption("logout")}>Logout</div>}
                        {!isLoggedIn && <div className="navbar-model-option" onClick={() => onclickOfPopUpOption("login")}>Login</div>}
                    </div>
                }

            </div>
            {
              login && <Login setLoginModel={setLoginModel}/>
            } {/* conditonal rendering */}
        </div>
    );
};

export default Navbar;

