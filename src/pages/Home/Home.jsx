import React, { useState } from "react";
import Sidebar from "../../components/Sidebar/Sidebar";
import AnotherSideBar from "../../components/Sidebar/AnotherSideBar.jsx";
import { useOutletContext } from "react-router-dom";
import Feed from "../../components/Feed/Feed.jsx";

const Home = () => {
  const isAlternateSidebar = useOutletContext();
  const [category, setCategory] = useState(0);

  return (
    <div className="home-container ">
      {isAlternateSidebar ? (
        <AnotherSideBar category={category} setCategory={setCategory} />
      ) : (
        <Sidebar category={category} setCategory={setCategory} />
      )}

      <Feed isSidebarCollapsed={isAlternateSidebar} category={category} />
    </div>
  );
};

export default Home;
