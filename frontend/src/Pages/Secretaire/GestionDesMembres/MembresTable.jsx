import React, { useContext, useEffect, useState } from "react";
import { Edit, Trash2, Users } from "lucide-react";
import { Context } from "../../../Context/ContextProvider";
import { Link } from "react-router-dom";
import FormUpdateMembre from "./FormUpdateMembre";
import { deleteMembre, getAllMembres } from "../../../Services/Membres";
// import { getAllMembres } from "../../../Services/Membres";

const MembresTable = () => {
  const { allMembres, setAllMembres, setErr, successMsg, setSuccessMsg } =
    useContext(Context);
  const [showUpdateForm, setShowUpdateForm] = useState(false);
  const [selectedMembre, setSelectedMembre] = useState(null);
  const itemsPerPage = 6;
  const [currentPage, setCurrentPage] = useState(1);

  useEffect(() => {
    const fetchMembres = async () => {
      const data = await getAllMembres(setErr);
      setAllMembres(data);
    };
    fetchMembres();
  }, []);

  const totalPages = Math.ceil(allMembres.length / itemsPerPage);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;
  const currentMembres = allMembres.slice(startIndex, endIndex);
  return (
    <div className="overflow-x-auto bg-white shadow-xl rounded-2xl border border-gray-200">
      {successMsg && (
        <div className="fixed top-5 right-5 bg-green-500 text-white px-4 py-2 rounded shadow-lg animate-fadeIn">
          {successMsg}
        </div>
      )}

      <table className="w-full border-collapse">
        <thead className="bg-gradient-to-r from-indigo-600 to-purple-600 text-white text-sm uppercase">
          <tr>
            <th className="px-6 py-4 text-left">Nom</th>
            <th className="px-6 py-4 text-left">Prénom</th>
            <th className="px-6 py-4 text-left">Email</th>
            <th className="px-6 py-4 text-left">Téléphone</th>
            <th className="px-6 py-4 text-left">Statut</th>
            <th className="px-6 py-4 text-center">Actions</th>
          </tr>
        </thead>

        {/* le contenu de table */}
        <tbody className="divide-y divide-gray-100 text-gray-700">
          {allMembres.length === 0 ? (
            <tr>
              <td colSpan="6" className="text-center py-16 text-gray-500">
                <div className="flex flex-col items-center">
                  <Users className="h-16 w-16 text-gray-300 mb-4" />
                  <p className="text-lg">Aucun membre trouvé.</p>
                  <p className="text-sm text-gray-400">
                    Essayez d'ajuster votre recherche.
                  </p>
                </div>
              </td>
            </tr>
          ) : (
            currentMembres.map((membre, index) => (
              <tr
                key={membre.id}
                className={`border-b border-gray-100 hover:bg-gradient-to-r hover:from-indigo-50 hover:to-purple-50 transition-all duration-300 transform hover:scale-[1.01] ${
                  index === allMembres.length - 1
                    ? "rounded-bl-3xl rounded-br-3xl"
                    : ""
                }`}
              >
                <td className="p-6 text-gray-600">{membre.nom}</td>
                <td className="p-6 text-gray-600">{membre.prenom}</td>
                <td className="p-6 text-gray-600">{membre.email}</td>
                <td className="p-6 text-gray-600">{membre.telephone}</td>
                <td className="p-6">
                  {membre.status === "active" ? (
                    <span className="px-2 py-1 bg-green-100 text-green-800 rounded-full text-sm font-medium">
                      Active
                    </span>
                  ) : (
                    <span className="px-2 py-1 bg-red-100 text-red-800 rounded-full text-sm font-medium">
                      No Active
                    </span>
                  )}
                </td>
                <td className="p-6">
                  <div className="flex items-center justify-center gap-2">
                    <button
                      onClick={() => {
                        setShowUpdateForm(true);
                        setSelectedMembre(membre);
                      }}
                      className="flex items-center justify-center w-10 h-10 bg-indigo-100 text-indigo-600 rounded-xl hover:bg-indigo-200 hover:text-indigo-700 transition-all duration-200 shadow-md hover:shadow-lg transform hover:scale-110"
                      title="Modifier"
                    >
                      <Edit className="h-5 w-5" />
                    </button>
                    <button
                      className="flex items-center justify-center w-10 h-10 bg-red-100 text-red-600 rounded-xl hover:bg-red-200 hover:text-red-700 transition-all duration-200 shadow-md hover:shadow-lg transform hover:scale-110"
                      title="Supprimer"
                      onClick={() => {
                        deleteMembre(membre, setErr, setSuccessMsg);
                      }}
                    >
                      <Trash2 className="h-5 w-5" />
                    </button>
                  </div>
                </td>
              </tr>
            ))
          )}
        </tbody>
      </table>

      {/* Pagination */}
      <div className="flex justify-center items-center gap-2 py-6">
        <button
          disabled={currentPage === 1}
          onClick={() => setCurrentPage(currentPage - 1)}
          className="px-3 py-1 rounded bg-gray-200 disabled:opacity-50"
        >
          précédente
        </button>

        {[...Array(totalPages)].map((_, index) => (
          <button
            key={index}
            onClick={() => setCurrentPage(index + 1)}
            className={`px-3 py-1 rounded ${
              currentPage === index + 1
                ? "bg-indigo-600 text-white"
                : "bg-gray-100"
            }`}
          >
            {index + 1}
          </button>
        ))}

        <button
          disabled={currentPage === totalPages}
          onClick={() => setCurrentPage(currentPage + 1)}
          className="px-3 py-1 rounded bg-gray-200 disabled:opacity-50"
        >
          Suivant
        </button>
      </div>

      {showUpdateForm && (
        <FormUpdateMembre
          membreData={selectedMembre}
          onClose={() => setShowUpdateForm(false)}
        />
      )}
    </div>
  );
};

export default MembresTable;
