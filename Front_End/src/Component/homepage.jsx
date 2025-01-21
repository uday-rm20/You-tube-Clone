import React, { useEffect, useState } from "react";
import './homepage.css';
import { Link } from 'react-router-dom';
import axios from 'axios';

const HomePage = ({ searchQuery, sideNavbar }) => {
  const [data, setData] = useState([]); /*  state variable for data  */
  
  
  useEffect(() => {
    axios.get('http://localhost:5100/api/allvideo') /* axios is used to make API calls to your server endpoints */
      .then(res => {
        setData(res.data.videos);
      })
      .catch(err => {
        console.log(err);
      });
  }, []);

  /*filter the data based on search query*/

  const filteredData = data.filter(item => {
    return item.title.toLowerCase().includes(searchQuery.toLowerCase());
  });

  const options = ["All", "Gaming", "Geo-Politics", "India", "Mixes", "RPG Games", "Comedy", "Coding", "Indian Food", "Anime", "K-POP", "React", "Front End", "Back End", "Trailers", "Kapil Sharma Show", "K Drama", "Telugu songs", "Hindi Songs"];
  /* homepage layout with video grid */
  return (
    <div className={sideNavbar ? "homePage" : "fullHomePage"}>
      <div className="homePage_options">
        {options.map((item, index) => (
          <div key={index} className="homePage_option">{item}</div>
        ))}
      </div>

      <div className={sideNavbar ? "home_mainPage" : "home_mainPagewithoutsideBar"}>
        {filteredData.map((item) => (
          <Link key={item._id} to={`/watch/${item._id}`} className="youtube_Video">
            <div className="youtube_thumbnailBox">
              <img src={item.thumbnail} alt="Thumbnail" className="youtube_thumbnailPic" />
            </div>
            <div className="youtubeTitleBox">
              <div className="youtubeTitleBoxProfile">
                <img src={item?.user?.profilePic} alt="profile" className="youtube_thumbnail_profile" />
              </div>
              <div className="youtubeTitleBox_Title">
                <div className="youtube_videoTitle">{item?.title}</div>
                <div className="youtube_channelName">{item?.user?.channelName}</div> 
                <div className="youtube_video_views">{item.like} likes</div>
              </div>
              
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
};

export default HomePage;

/*Optional chaining (?) helps to access deeply nested properties of an object */
