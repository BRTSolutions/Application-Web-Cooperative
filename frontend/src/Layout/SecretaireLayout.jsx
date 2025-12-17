import React from "react";
import Sidebar from "../components/SidebarSecretaire";
import { Outlet } from "react-router-dom";

const SecretaireLayout = () => {
  return (
    <div className="flex h-screen">
      <Sidebar />
      <div className="flex-1 p-5 bg-gray-100">
        <Outlet />
      </div>
    </div>
  );
};

export default SecretaireLayout;
