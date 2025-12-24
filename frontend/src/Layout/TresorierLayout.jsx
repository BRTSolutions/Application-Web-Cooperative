import React from "react";
import Sidebar from "../components/SidebarSecretaire";
import { Outlet } from "react-router-dom";
import SidebarTresorier from "../components/SidebarTresorier";

const TresorierLayout = () => {
  return (
    <div className="flex h-screen bg-gray-100">
      <SidebarTresorier />
      <div className="flex-1 ml-0 md:ml-64 overflow-y-auto p-5">
        <Outlet />
      </div>
    </div>
  );
};

export default TresorierLayout;
