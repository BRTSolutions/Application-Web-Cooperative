import {
  LayoutDashboard,
  Users,
  Package,
  CalendarCheck,
  User,
  LogOut,
  Menu,
  X,
} from "lucide-react";

import { Link, useLocation } from "react-router-dom";
import { useState } from "react";
import { TbTransactionDollar } from "react-icons/tb";

const SidebarTresorier = () => {
  const [isCollapsed, setIsCollapsed] = useState(false);
  const [isMobileOpen, setIsMobileOpen] = useState(false);

  return (
    <>
      <button
        onClick={() => setIsMobileOpen(!isMobileOpen)}
        className="md:hidden fixed top-4 left-4 z-50 bg-[#0b0b3b] text-white p-2 rounded-lg shadow-lg"
      >
        <Menu size={24} />
      </button>

      {isMobileOpen && (
        <div
          className="md:hidden fixed inset-0 bg-black bg-opacity-50 z-40"
          onClick={() => setIsMobileOpen(false)}
        ></div>
      )}

      {/* SidebarTresorier*/}
      <aside
        className={`h-screen bg-gradient-to-b from-[#0b0b3b] to-[#0a0a2a] text-white flex flex-col justify-between shadow-xl transition-all duration-300 z-50 
          ${isCollapsed ? "w-16" : "w-64"} 
          fixed md:relative md:translate-x-0
          ${isMobileOpen ? "translate-x-0" : "-translate-x-full"} 
          md:flex md:flex-col`}
      >
        <div>
          <div className="p-6 border-b border-white/10 flex items-center justify-between">
            {!isCollapsed && (
              <>
                <h1 className="text-2xl font-bold">Coopix</h1>
                <p className="text-sm text-white/60">Gestion Coopérative</p>
              </>
            )}
            <button
              onClick={() => {
                if (window.innerWidth >= 768) {
                  setIsCollapsed(!isCollapsed);
                } else {
                  setIsMobileOpen(false);
                }
              }}
              className="text-white/70 hover:text-white transition md:block hidden"
            >
              {isCollapsed ? <Menu size={20} /> : <X size={20} />}
            </button>
            <button
              onClick={() => setIsMobileOpen(false)}
              className="md:hidden text-white/70 hover:text-white transition"
            >
              <X size={20} />
            </button>
          </div>

          {!isCollapsed && (
            <div className="mx-4 my-5 rounded-xl bg-white/10 px-4 py-3">
              <p className="font-semibold">Ahmed Sabri</p>
              <p className="text-sm text-white/60">Tresorier</p>
            </div>
          )}

          <nav className="mt-4 space-y-2 px-3">
            <Link
              to={"/tresorier/dashboard"}
              onClick={() => setIsMobileOpen(false)}
            >
              <MenuItem
                icon={<LayoutDashboard size={20} />}
                text="Tableau de bord"
                pageName={"dashboard"}
                isCollapsed={isCollapsed}
              />
            </Link>
            <Link
              to={"/tresorier/transaction"}
              onClick={() => setIsMobileOpen(false)}
            >
              <MenuItem
                icon={<TbTransactionDollar size={20} />}
                text="Tableau des transactions"
                pageName={"transaction"}
                isCollapsed={isCollapsed}
              />
            </Link>
          </nav>
        </div>

        <div className="p-4 border-t border-white/10">
          <button
            className="flex items-center gap-3 text-white/70 hover:text-red-400 transition"
            onClick={() => {
              LogOut();
              setIsMobileOpen(false);
            }}
          >
            <LogOut size={20} />
            {!isCollapsed && <span>Déconnexion</span>}
          </button>
        </div>
      </aside>
    </>
  );
};

export default SidebarTresorier;

function MenuItem({ icon, text, pageName, isCollapsed }) {
  const location = useLocation();
  return (
    <div
      className={`flex items-center justify-between px-4 py-3 rounded-xl cursor-pointer transition
        ${
          location.pathname === `/tresorier/${pageName}`
            ? "bg-gradient-to-r from-cyan-400 to-teal-400 text-white font-semibold shadow-lg"
            : "text-white/70 hover:bg-white/10 hover:text-white"
        }`}
    >
      <div className="flex items-center gap-3">
        {icon}
        {!isCollapsed && <span>{text}</span>}
      </div>
      {location.pathname === `/tresorier/${pageName}` && !isCollapsed && (
        <span>{">"}</span>
      )}
    </div>
  );
}
