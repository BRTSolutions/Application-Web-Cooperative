import { Calendar, Search } from "lucide-react";
import React, { useEffect, useState } from "react";
import AddReunion from "./FormAddReunion";
import HeaderIcon from "../../../components/HeaderIcon";

const HeaderReunions = () => {
  const [showForm, setShowForm] = useState(false);
  const [Reunion, setReunion] = useState([]);

  useEffect(() => {
    const fetchReunion = async () => {
      const data = [
        {
          id: 1,
          title: "Réunion équipe dev",
          description: "Planning sprint",
          start: "2025-01-15T10:30",
          end: "2025-01-15T12:00",
          membres: [1, 3, 5],
          statut: "enAttente",
          type: "Présentiel",
        },
        {
          id: 2,
          title: "Meeting client",
          description: "Présentation du projet",
          start: "2025-01-16T14:00",
          end: "2025-01-16T15:30",
          membres: [2, 4],
          statut: "terminee",
          type: "Online",
        },
        {
          id: 3,
          title: "Brainstorming",
          description: "Nouvelles idées",
          start: "2025-01-18T09:00",
          end: "2025-01-18T10:30",
          membres: [1, 2, 3, 6],
          statut: "annulee",
          type: "Présentiel",
        },
      ];

      setReunion(data);
    };

    fetchReunion();
  }, []);
  return (
    <div className="mt-5">
      <div className="flex flex-col md:flex-row md:justify-between md:items-center gap-4">
        <div className="flex gap-5 items-center">
          <HeaderIcon icon={Calendar} />
          <div className="flex flex-col">
            <h1 className="font-semibold text-2xl md:text-3xl">
              Gestion des reunions
            </h1>
            <p className="text-gray-500 text-md">
              {Reunion.length} reunions enregistrés
            </p>
          </div>
        </div>

        <button
          className="bg-[var(--primary-color)] text-white py-3 px-7 rounded-md w-full md:w-auto"
          onClick={() => setShowForm(true)}
        >
          Ajouter
        </button>
      </div>

      {showForm && <AddReunion onClose={() => setShowForm(false)} />}
    </div>
  );
};

export default HeaderReunions;
