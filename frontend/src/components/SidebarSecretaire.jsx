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

const Sidebar = () => {
  const [isCollapsed, setIsCollapsed] = useState(false);
  const [isMobileOpen, setIsMobileOpen] = useState(false);

  return (
    <>
      {/* Mobile Hamburger Button - Visible only on small screens */}
      <button
        onClick={() => setIsMobileOpen(!isMobileOpen)}
        className="md:hidden fixed top-4 left-4 z-50 bg-[#0b0b3b] text-white p-2 rounded-lg shadow-lg"
      >
        <Menu size={24} />
      </button>

      {/* Backdrop for Mobile */}
      {isMobileOpen && (
        <div
          className="md:hidden fixed inset-0 bg-black bg-opacity-50 z-40"
          onClick={() => setIsMobileOpen(false)}
        ></div>
      )}

      {/* Sidebar */}
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
            {/* Close button for mobile */}
            <button
              onClick={() => setIsMobileOpen(false)}
              className="md:hidden text-white/70 hover:text-white transition"
            >
              <X size={20} />
            </button>
          </div>

          {!isCollapsed && (
            <div className="mx-4 my-5 rounded-xl bg-white/10 px-4 py-3">
              <p className="font-semibold">Fatima chokri</p>
              <p className="text-sm text-white/60">Secrétaire</p>
            </div>
          )}

          <nav className="mt-4 space-y-2 px-3">
            <Link
              to={"/secretaire/dashboard"}
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
              to={"/secretaire/membre"}
              onClick={() => setIsMobileOpen(false)}
            >
              <MenuItem
                icon={<Users size={20} />}
                text="Membres"
                pageName={"membre"}
                isCollapsed={isCollapsed}
              />
            </Link>
            <Link
              to={"/secretaire/produits"}
              onClick={() => setIsMobileOpen(false)}
            >
              <MenuItem
                icon={<Package size={20} />}
                text="Produits"
                pageName={"produits"}
                isCollapsed={isCollapsed}
              />
            </Link>
            <Link
              to={"/secretaire/reunions"}
              onClick={() => setIsMobileOpen(false)}
            >
              <MenuItem
                icon={<CalendarCheck size={20} />}
                text="Réunions"
                pageName={"reunions"}
                isCollapsed={isCollapsed}
              />
            </Link>
            <Link
              to={"/secretaire/profil"}
              onClick={() => setIsMobileOpen(false)}
            >
              <MenuItem
                icon={<User size={20} />}
                text="Profil"
                pageName={"profil"}
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

export default Sidebar;

function MenuItem({ icon, text, pageName, isCollapsed }) {
  const location = useLocation();
  return (
    <div
      className={`flex items-center justify-between px-4 py-3 rounded-xl cursor-pointer transition
        ${
          location.pathname === `/secretaire/${pageName}`
            ? "bg-gradient-to-r from-cyan-400 to-teal-400 text-white font-semibold shadow-lg"
            : "text-white/70 hover:bg-white/10 hover:text-white"
        }`}
    >
      <div className="flex items-center gap-3">
        {icon}
        {!isCollapsed && <span>{text}</span>}
      </div>
      {location.pathname === `/secretaire/${pageName}` && !isCollapsed && (
        <span>{">"}</span>
      )}
    </div>
  );
}
