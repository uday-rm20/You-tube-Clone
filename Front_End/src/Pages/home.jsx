import React from "react";
import SideNavbar from "../Component/SideNavbar";
import HomePage from "../Component/homepage";
import './home.css';

const Home = ({ sideNavbar, searchQuery }) => {
  return (
    <div className="home">
      <SideNavbar sideNavbar={sideNavbar} />
      <HomePage sideNavbar={sideNavbar} searchQuery={searchQuery} /> {/* passing  searchQuery here to check chamge in search bar  */}
    </div>
  );
};

export default Home;
