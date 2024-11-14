import React from "react";
import Navbar from './Component/Navbar';
import SideBar from "./Component/SideBar";

const MainLayout = ({ children }) => {
  return(
    <div className="flex h-screen">
      <SideBar/>
      <div className="flex flex-col flex-1">
        <Navbar/>
        <main className="flex-1 overflow-y-auto">
          {children}
        </main>
      </div>
    </div>
  );
};

export default MainLayout;