import React, { useState } from "react";
import HeaderIcon from "../../../components/HeaderIcon";
import { Users } from "lucide-react";
import FormMembre from "./FormAddMembre";

const Header = () => {
  const [showForm,setShowForm]=useState(false);
    return (
    <div className="flex justify-between mt-5">
      <div className="flex gap-5">
        <HeaderIcon icon={Users} />
        <h1 className="font-semibold text-3xl">Gestion des membres</h1>
      </div>

      <div className="flex gap-4 w-1/3">
        <input
          type="search"
          placeholder="Rechercher ...."
          className="
          w-full
          bg-gray-100
          border border-black
          rounded-lg
          px-3 py-2
          shadow-md
          placeholder-gray-500
          focus:outline-none
          focus:bg-white
          focus:ring-2 focus:ring-indigo-500
          transition
          pl-10
        "
        />
        <button className="bg-[var(--primary-color)] text-white py-3 px-7 rounded-md" onClick={()=>setShowForm(true)}>Ajouter</button>
      </div>

      {showForm && <FormMembre onClose={()=>setShowForm(false)}/>}
    </div>
  );
};

export default Header;
