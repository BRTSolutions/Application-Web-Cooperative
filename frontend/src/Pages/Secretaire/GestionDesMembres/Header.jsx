import React, { useEffect, useState } from "react";
import HeaderIcon from "../../../components/HeaderIcon";
import { Users, Search } from "lucide-react"; // Added Search icon
import FormMembre from "./FormAddMembre";

const Header = () => {
  const [showForm, setShowForm] = useState(false);
  const [membres, setMembres] = useState([]);

  useEffect(() => {
    const fetchMembres = async () => {
      const data = [
        {
          id: 1,
          nom: "Ahmed",
          prenom: "Yassine",
          email: "ahmed.yassine@example.com",
          telephone: "0601234567",
          status: "active",
        },
        {
          id: 2,
          nom: "Sara",
          prenom: "Amina",
          email: "sara.amina@example.com",
          telephone: "0612345678",
          status: "inactive",
        },
        {
          id: 3,
          nom: "Karim",
          prenom: "Hassan",
          email: "karim.hassan@example.com",
          telephone: "0623456789",
          status: "active",
        },
        {
          id: 4,
          nom: "Salma",
          prenom: "Laila",
          email: "salma.laila@example.com",
          telephone: "0634567890",
          status: "inactive",
        },
        {
          id: 5,
          nom: "Omar",
          prenom: "Rachid",
          email: "omar.rachid@example.com",
          telephone: "0645678901",
          status: "active",
        },
        {
          id: 6,
          nom: "Imane",
          prenom: "Khadija",
          email: "imane.khadija@example.com",
          telephone: "0656789012",
          status: "active",
        },
        {
          id: 7,
          nom: "Youssef",
          prenom: "Mehdi",
          email: "youssef.mehdi@example.com",
          telephone: "0667890123",
          status: "inactive",
        },
      ];

      setMembres(data);
    };

    fetchMembres();
  }, []);

  return (
    <div className="mt-5">
      {/* Title Section */}
      <div className="flex flex-col md:flex-row md:justify-between md:items-center gap-4">
        <div className="flex gap-5 items-center">
          <HeaderIcon icon={Users} />
          <div className="flex flex-col">
            <h1 className="font-semibold text-2xl md:text-3xl">
              Gestion des membres
            </h1>
            <p className="text-gray-500 text-md">
              {membres.length} membres enregistrés
            </p>
          </div>
        </div>

        {/* Search and Button Section */}
        <div className="flex flex-col md:flex-row gap-4 md:w-1/3 w-full">
          <div className="relative w-full">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-500 h-5 w-5" />
            <input
              type="search"
              placeholder="Rechercher ...."
              className="
                w-full
                bg-gray-100
                border border-black
                rounded-lg
                px-3 py-2 pl-10
                shadow-md
                placeholder-gray-500
                focus:outline-none
                focus:bg-white
                focus:ring-2 focus:ring-indigo-500
                transition
              "
            />
          </div>
          <button
            className="bg-[var(--primary-color)] text-white py-3 px-7 rounded-md w-full md:w-auto"
            onClick={() => setShowForm(true)}
          >
            Ajouter
          </button>
        </div>
      </div>

      {showForm && <FormMembre onClose={() => setShowForm(false)} />}
    </div>
  );
};

export default Header;
