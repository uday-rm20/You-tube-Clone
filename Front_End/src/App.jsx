import { useState } from 'react';
import './App.css';
import Navbar from './Component/Navbar';
import Home from './Pages/home';
import Video from './Pages/video';
import { Route, Routes } from 'react-router-dom';
import Channel from './Pages/channel';
import VideoUpload from './Pages/videoUpload';
import SignUp from './Pages/signUp';
import axios from 'axios';

function App() {
  const [sideNavbar, setSideNavbar] = useState(true);
  const [searchQuery, setSearchQuery] = useState("");  /*State for search query*/

  const setSideNavbarFunc = (value) => {
    setSideNavbar(value);
  };

  return (
    <div className="App">
      <Navbar setSearchQuery={setSearchQuery} sideNavbar={sideNavbar} setSideNavbarFunc={setSideNavbarFunc} />
      <Routes>
        <Route path="/" element={<Home sideNavbar={sideNavbar} searchQuery={searchQuery} />} />
        <Route path="/watch/:id" element={<Video />} />
        <Route path="/user/:id" element={<Channel sideNavbar={sideNavbar} />} />
        <Route path="/:id/upload" element={<VideoUpload />} />
        <Route path="/signup/" element={<SignUp />} />
      </Routes>
    </div>
  );
}

export default App;
