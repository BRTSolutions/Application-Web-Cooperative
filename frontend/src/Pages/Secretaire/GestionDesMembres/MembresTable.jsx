import React, { useContext, useEffect, useState } from "react";
import { ChevronFirst, ChevronLast, Edit, Eye, Upload, Users } from "lucide-react";
import { Context } from "../../../Context/ContextProvider";
import { Link } from "react-router-dom";
import FormUpdateMembre from "./FormUpdateMembre";
// import { getAllMembres } from "../../../Services/Membres";
import FormViewMembre from "./FormViewMembre";
import FormUploadDocuments from "./FormUploadDocuments";

const MembresTable = () => {
  const { allMembres, setAllMembres, successMsg } = useContext(Context);
  const [showUpdateForm, setShowUpdateForm] = useState(false);
  const [selectedMembre, setSelectedMembre] = useState(null);
  const [loading,setLoading] = useState(false)
  const [currentPage, setCurrentPage] = useState(1);
  const [windowWidth, setWindowWidth] = useState(window.innerWidth);
  const [showMembre, setShowMembre] = useState(false);
  const [showUploadForm, setShowUploadForm] = useState(false);

  useEffect(() => {
    const fetchMembres = async () => {
      setLoading(true)
      try{
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
      await new Promise((res) => setTimeout(res, 1000));
      setAllMembres(data);
      }catch(err){
        console.log(err)
      } finally {
        setLoading(false);
      }
      
    };
    fetchMembres();
  }, []);

  useEffect(() => {
    const handleResize = () => setWindowWidth(window.innerWidth);
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  const itemsPerPage = windowWidth < 768 ? 4 : 6;

  useEffect(() => {
    const totalPages = Math.ceil(allMembres.length / itemsPerPage);
    if (currentPage > totalPages && totalPages > 0) {
      setCurrentPage(1);
    }
  }, [itemsPerPage, allMembres.length, currentPage]);

  const totalPages = Math.ceil(allMembres.length / itemsPerPage);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;
  const currentMembres = allMembres.slice(startIndex, endIndex);


    if (loading) {
    return (
      <div className="flex justify-center items-center h-64">
        <div className="animate-spin rounded-full h-16 w-16 border-b-2 border-indigo-600"></div>
      </div>
    );
  }

  return (
    <div className="bg-white shadow-xl rounded-2xl border border-gray-200">
      {successMsg && (
        <div className="fixed top-5 right-5 bg-green-500 text-white px-4 py-2 rounded shadow-lg animate-fadeIn z-50">
          {successMsg}
        </div>
      )}

      {/* Desktop Tableau vue */}
      <div className="hidden md:block overflow-x-auto">
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
                    index === currentMembres.length - 1
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
                          setShowMembre(true);
                          setSelectedMembre(membre);
                        }}
                      >
                        <Eye className="h-5 w-5" />
                      </button>
                      <button
                        onClick={() => {
                          setSelectedMembre(membre);
                          setShowUploadForm(true);
                        }}
                        className="flex items-center justify-center w-10 h-10 bg-emerald-100 text-emerald-600 rounded-xl hover:bg-emerald-200 transition"
                        title="Uploader documents"
                      >
                        <Upload/>
                      </button>
                    </div>
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>

      {/* Mobile/Tablet vue */}
      <div className="md:hidden space-y-4 p-4">
        {allMembres.length === 0 ? (
          <div className="text-center py-16 text-gray-500">
            <div className="flex flex-col items-center">
              <Users className="h-16 w-16 text-gray-300 mb-4" />
              <p className="text-lg">Aucun membre trouvé.</p>
              <p className="text-sm text-gray-400">
                Essayez d'ajuster votre recherche.
              </p>
            </div>
          </div>
        ) : (
          currentMembres.map((membre) => (
            <div
              key={membre.id}
              className="bg-gray-50 border border-gray-200 rounded-xl p-4 shadow-md hover:shadow-lg transition-all duration-300"
            >
              <div className="flex justify-between items-start mb-2">
                <h3 className="text-lg font-semibold text-gray-800">
                  {membre.nom} {membre.prenom}
                </h3>
                {membre.status === "active" ? (
                  <span className="px-2 py-1 bg-green-100 text-green-800 rounded-full text-sm font-medium">
                    Active
                  </span>
                ) : (
                  <span className="px-2 py-1 bg-red-100 text-red-800 rounded-full text-sm font-medium">
                    No Active
                  </span>
                )}
              </div>
              <div className="space-y-1 text-sm text-gray-600">
                <p>
                  <strong>Email:</strong> {membre.email}
                </p>
                <p>
                  <strong>Téléphone:</strong> {membre.telephone}
                </p>
              </div>
              <div className="flex justify-end gap-2 mt-4">
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
                  className="flex items-center justify-center w-10 h-10 bg-red-100 text-blue-600 rounded-xl hover:bg-red-200 hover:text-red-700 transition-all duration-200 shadow-md hover:shadow-lg transform hover:scale-110"
                  title="voir"
                  onClick={() => {
                    setShowMembre(true);
                    setSelectedMembre(membre);
                  }}
                >
                  <Eye className="h-5 w-5" />
                </button>
                 <button
                        onClick={() => {
                          setSelectedMembre(membre);
                          setShowUploadForm(true);
                        }}
                        className="flex items-center justify-center w-10 h-10 bg-emerald-100 text-emerald-600 rounded-xl hover:bg-emerald-200 transition-all duration-200 shadow-md hover:shadow-lg transform hover:scale-110"
                        title="Uploader documents"
                      >
                        <Upload/>
                      </button>
              </div>
            </div>
          ))
        )}
      </div>

      {/* Pagination */}
      <div className="flex justify-center items-center gap-2 py-6 px-4">
        <button
          disabled={currentPage === 1}
          onClick={() => setCurrentPage(currentPage - 1)}
          className="px-3 py-1 rounded bg-gray-200 disabled:opacity-50 text-sm md:text-base"
        >
          <ChevronFirst/>
        </button>

        {[...Array(totalPages)].map((_, index) => (
          <button
            key={index}
            onClick={() => setCurrentPage(index + 1)}
            className={`px-3 py-1 rounded text-sm md:text-base ${
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
          className="px-3 py-1 rounded bg-gray-200 disabled:opacity-50 text-sm md:text-base"
        >
          <ChevronLast/>
        </button>
      </div>

      {showUpdateForm && (
        <FormUpdateMembre
          membreData={selectedMembre}
          onClose={() => setShowUpdateForm(false)}
        />
      )}

      {showMembre && (
        <FormViewMembre
          membreData={selectedMembre}
          onClose={() => setShowMembre(false)}
        />
      )}

      {showUploadForm && (
        <FormUploadDocuments
          membreId={selectedMembre.id}
          onClose={() => setShowUploadForm(false)}
        />
      )}
    </div>
  );
};

export default MembresTable;
