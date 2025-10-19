import React, { useState } from "react";
import { Outlet } from "react-router-dom";
import Navbar from "./components/Navbar/Navbar.jsx";

function App() {
  const [isAlternateSidebar, setIsAlternateSidebar] = useState(false);
  const [searchData, setSearchData] = useState([]);

  const toggleSideBar = () => {
    setIsAlternateSidebar((prev) => !prev);
    console.log("Menu Button Clicked");
  };

  return (
    <>
      <Navbar toggleSideBar={toggleSideBar} setSearchData={setSearchData} />

      {/* Fixed: Pass as object instead of using comma operator */}
      <Outlet context={{ isAlternateSidebar, searchData }} />
    </>
  );
}

export default App;
