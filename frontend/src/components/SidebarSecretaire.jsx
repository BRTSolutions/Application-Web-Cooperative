import {
  LayoutDashboard,
  Users,
  Package,
  CalendarCheck,
  User,
  LogOut,
} from "lucide-react";

import { Link, useLocation } from "react-router-dom";

const Sidebar = () => {
  return (
    <aside className="h-screen w-64 bg-gradient-to-b from-[#0b0b3b] to-[#0a0a2a] text-white flex flex-col justify-between shadow-xl">
      <div>
        <img src="#" />
        <div className="p-6 border-b border-white/10">
          <h1 className="text-2xl font-bold">Coopix</h1>
          <p className="text-sm text-white/60">Gestion Coopérative</p>
        </div>

        <div className="mx-4 my-5 rounded-xl bg-white/10 px-4 py-3">
          <p className="font-semibold">Fatima chokri</p>
          <p className="text-sm text-white/60">Secrétaire</p>
        </div>

        <nav className="mt-4 space-y-2 px-3">
          <Link to={"/secretaire/dashboard"}>
          <MenuItem
            icon={<LayoutDashboard size={20} />}
            text="Tableau de bord"
            pageName={"dashboard"}
          />
          </Link>
          <Link to={"/secretaire/membre"}>
          <MenuItem
            icon={<Users size={20} />}
            text="Membres"
            pageName={"membre"}
          />
          </Link>
          <Link to={"/secretaire/produits"}>
          <MenuItem
            icon={<Package size={20} />}
            text="Produits"
            pageName={"produits"}
          />
          </Link>
          <Link to={"/secretaire/reunions"}>
          <MenuItem
            icon={<CalendarCheck size={20} />}
            text="Réunions"
            pageName={"reunions"}
          />
          </Link>
          <Link to={"/secretaire/profil"}>
          <MenuItem
            icon={<User size={20} />}
            text="Profil"
            pageName={"profil"}
          />
          </Link>
        </nav>
      </div>

      <div className="p-4 border-t border-white/10">
        <button className="flex items-center gap-3 text-white/70 hover:text-red-400 transition" onClick={()=>LogOut()}>
          <LogOut size={20} />
          <span>Déconnexion</span>
        </button>
      </div>
    </aside>
  );
};

export default Sidebar;
function MenuItem({ icon, text, pageName }) {
  const location = useLocation()
  return (
    <div
      className={`flex items-center justify-between px-4 py-3 rounded-xl cursor-pointer transition
        ${
          location.pathname == `/secretaire/${pageName}`
            ? "bg-gradient-to-r from-cyan-400 to-teal-400 text-white font-semibold shadow-lg"
            : "text-white/70 hover:bg-white/10 hover:text-white"
        }`}
    >
      <div className="flex items-center gap-3">
        {icon}
        <span>{text}</span>
      </div>
      {location.pathname == `/secretaire/${pageName}` && <span>{">"}</span>}
    </div>
  );
}
