import React from "react";
import './SideNavbar.css';
import HomeIcon from '@mui/icons-material/Home';
import VideoCameraBackIcon from '@mui/icons-material/VideoCameraBack';
import SubscriptionsIcon from '@mui/icons-material/Subscriptions';
import ChevronRightIcon from '@mui/icons-material/ChevronRight';
import HistoryIcon from '@mui/icons-material/History';
import PlaylistPlayIcon from '@mui/icons-material/PlaylistPlay';
import WatchLaterIcon from '@mui/icons-material/WatchLater';
import ThumbUpIcon from '@mui/icons-material/ThumbUp';
import WhatshotIcon from '@mui/icons-material/Whatshot';
import MusicNoteIcon from '@mui/icons-material/MusicNote';
import SportsEsportsIcon from '@mui/icons-material/SportsEsports';
import LiveTvIcon from '@mui/icons-material/LiveTv';
import NewspaperIcon from '@mui/icons-material/Newspaper';
import EmojiEventsIcon from '@mui/icons-material/EmojiEvents';
import LocalMoviesIcon from '@mui/icons-material/LocalMovies';
import { Link } from "react-router-dom";

const SideNavbar = ({sideNavbar}) => {
    return (
        <div className={sideNavbar?"home-sideNavbar":"homeSideNavbarHide"}>
            <div className="home_sideNavbarTop">
                <div className={"home_sideNavbarTopOption"}>
                    <HomeIcon />
                    <Link to={'/'} className="home_sideNavbarTopOptionTitle">
                    <div >Home</div>
                    </Link>
                    
                </div>
                <div className={"home_sideNavbarTopOption"}>
                    <VideoCameraBackIcon />
                    <div className="home_sideNavbarTopOptionTitle">Shorts</div>
                </div>
                <div className={"home_sideNavbarTopOption"}>
                    <SubscriptionsIcon />
                    <div className="home_sideNavbarTopOptionTitle">Subscription</div>
                </div>
            </div>
            <div className="home_sideNavbarMiddle">
                <div className={"home_sideNavbarTopOption"}>
                    <div className="home_sideNavbarTopOptionTitle">You</div>
                    <ChevronRightIcon />
                </div>
                <div className={"home_sideNavbarTopOption"}>
                    <HistoryIcon />
                    <div className="home_sideNavbarTopOptionTitle">History</div>
                </div>
                <div className={"home_sideNavbarTopOption"}>
                    <PlaylistPlayIcon />
                    <div className="home_sideNavbarTopOptionTitle">Playlist</div>
                </div>
                <div className={"home_sideNavbarTopOption"}>
                    <WatchLaterIcon />
                    <div className="home_sideNavbarTopOptionTitle">WatchLater</div>
                </div>
                <div className={"home_sideNavbarTopOption"}>
                    <ThumbUpIcon />
                    <div className="home_sideNavbarTopOptionTitle">Liked videos</div>
                </div>
            </div>
            <div className="home_sideNavbarBottom">
                <div className={"home_sideNavbarTopOption"}>
                    <div className="home_sideNavbarTopOptionTitle">Explore</div>
                </div>
                <div className={"home_sideNavbarTopOption"}>
                    <WhatshotIcon/>
                    <div className="home_sideNavbarTopOptionTitle">Trending</div>
                </div>
                <div className={"home_sideNavbarTopOption"}>
                    <MusicNoteIcon/>
                    <div className="home_sideNavbarTopOptionTitle">Music</div>
                </div>
                <div className={"home_sideNavbarTopOption"}>
                    <SportsEsportsIcon/>
                    <div className="home_sideNavbarTopOptionTitle">Gaming</div>
                </div>
                <div className={"home_sideNavbarTopOption"}>
                    <LiveTvIcon/>
                    <div className="home_sideNavbarTopOptionTitle">Live</div>
                </div>
                <div className={"home_sideNavbarTopOption"}>
                    <NewspaperIcon/>
                    <div className="home_sideNavbarTopOptionTitle">News</div>
                </div>
                <div className={"home_sideNavbarTopOption"}>
                    <EmojiEventsIcon/>
                    <div className="home_sideNavbarTopOptionTitle">Sports</div>
                </div>
                <div className={"home_sideNavbarTopOption"}>
                    <LocalMoviesIcon/>
                    <div className="home_sideNavbarTopOptionTitle">Movies</div>
                </div>
            </div>
        </div>
    )
}

export default SideNavbar;