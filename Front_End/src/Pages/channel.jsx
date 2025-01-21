import React, { useEffect, useState } from "react";
import './channel.css';
import SideNavbar from "../Component/SideNavbar";
import PlayArrowIcon from '@mui/icons-material/PlayArrow';
import { Link, useParams } from "react-router-dom";
import axios from "axios";

const Channel = ({ sideNavbar }) => {

    const { id } = useParams();
    const [data, setData] = useState([]);
    const [user, setUser] = useState(null);

    const fetchProfileData = async () => {
        try {
            const response = await axios.get(`http://localhost:5100/api/${id}/channel`);
            console.log(response);
            setData(response.data.video);
            setUser(response.data.video[0]?.user);
        } catch (err) {
            console.error(err);
        }
    };

    useEffect(() => {
        fetchProfileData();
    }, [id]);

    /*Show loading or fallback UI if data is not ready*/
    if (!user || !data.length) {
        return <div>Loading...</div>;
    }

    return (
        <div className="profile">
            <SideNavbar sideNavbar={sideNavbar} />

            <div className={sideNavbar ? "profile_Page" : "profile_page_inactive"}>
                <div className="profile_Top_section">
                    <div className="profile_Top_section_profile">
                        <img 
                            className="profile_top_section_img" 
                            src={user?.profilePic || "fallback-image-url.jpg"} 
                            alt="profile pic" 
                        />
                    </div>
                    <div className="profile_top_section_about">
                        <div className="profile_top_section_about_name">{user?.channelName}</div>
                        <div className="profile_top_section_info">
                            {user?.userName} {data.length} videos
                        </div>
                        <div className="profile_top_section_info">
                            {user?.about}
                        </div>
                    </div>
                </div>
                <div className="profile_videos">
                    <div className="profile_videos_title">Videos &nbsp; <PlayArrowIcon /> </div>

                    <div className="profileVideos">
                        {data.map((item, key) => (
                            <Link to={`/watch/${item._id}`} className="profileVideo_block" key={item._id || key}>
                                <div className="profileVideo_block_thumbnail">
                                    <img 
                                        src={item?.thumbnail} 
                                        alt="thumbnail" 
                                        className="profileVideo_block_thumbnail_img" 
                                    />
                                </div>
                                <div className="profileVideo_block_detail">
                                    <div className="profilevideo_block_detail_name">{item?.title}</div>
                                    <div className="profileVideo_block_detail_about">Created at {item?.createdAt.slice(0, 10)}</div> {/* slicing to get requried characters */}
                                </div>
                            </Link>
                        ))}
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Channel;
