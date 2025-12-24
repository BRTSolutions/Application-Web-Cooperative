import React, { useContext, useEffect, useState } from "react";
import { Context } from "../../../Context/ContextProvider";
import {
  ChevronFirst,
  ChevronLast,
  ChevronLeft,
  ChevronRight,
  Edit,
  Eye,
  Trash,
  Users,
} from "lucide-react";
import ViewTransaction from "./ViewTransaction";

const TransactionTable = () => {
  const {
    allTransaction,
    setAllTransaction,
    successMsg,
    setErr,
    setSuccessMsg,
  } = useContext(Context);
  const [showUpdateForm, setShowUpdateForm] = useState(false);
  const [loading, setLoading] = useState(false);
  const [showTransaction, setShowTransaction] = useState(false);
  const [selectTransaction, setSelectedTransaction] = useState(null);
  const [currentPage, setCurrentPage] = useState(1);
  const [windowWidth, setWindowWidth] = useState(window.innerWidth);
  const [filtreType, setFiltreType] = useState("");
  const [filtreStatut, setFiltreStatut] = useState("");
  const [filtreDate, setFiltreDate] = useState("");
  const [tri, setTri] = useState("");

  useEffect(() => {
    const fetchTransaction = async () => {
      setLoading(true);
      try {
        const data = [
          {
            id: 1,
            ref: "TXN001",
            date: "2025-12-23",
            utilisateur: "Anis",
            type: "depot",
            montant: 500,
            statut: "Complete",
          },
          {
            id: 2,
            ref: "TXN002",
            date: "2025-12-23",
            utilisateur: "Zakaria",
            type: "retrait",
            montant: 300,
            statut: "enAttente",
          },
          {
            id: 3,
            ref: "TXN003",
            date: "2025-12-22",
            utilisateur: "Samira",
            type: "paiement",
            montant: 1000,
            statut: "Annule",
          },
          {
            id: 4,
            ref: "TXN004",
            date: "2025-12-22",
            utilisateur: "Mohamed",
            type: "virement",
            montant: 250,
            statut: "Complete",
          },
          {
            id: 5,
            ref: "TXN005",
            date: "2025-12-21",
            utilisateur: "Fatima",
            type: "remboursement",
            montant: 400,
            statut: "Complete",
          },
        ];
        await new Promise((res) => setTimeout(res, 1000));
        setAllTransaction(data);
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    };
    fetchTransaction();
  }, []);

  useEffect(() => {
    const handleResize = () => setWindowWidth(window.innerWidth);
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  const itemsPerPage = windowWidth < 768 ? 4 : 6;

  useEffect(() => {
    const totalPages = Math.ceil(allTransaction.length / itemsPerPage);
    if (currentPage > totalPages && totalPages > 0) {
      setCurrentPage(1);
    }
  }, [itemsPerPage, allTransaction.length, currentPage]);

  const filtredTransaction = allTransaction.filter((Transaction) => {
    const matchCategorie = !filtreType || Transaction.categorie === filtreType;
    const matchDate = !filtreDate || Transaction.date === filtreDate;
    const matchStatut = !filtreStatut || Transaction.statut === filtreStatut;

    return matchCategorie && matchStatut && matchDate;
  });

  const sortedTransaction = [...filtredTransaction].sort((a, b) => {
    switch (tri) {
      case "montant-asc":
        return a.montant - b.montant;
      case "montant-desc":
        return b.stock - a.stock;
      case "ref-asc":
        return a.ref.localeCompare(b.ref);
      case "ref-desc":
        return b.ref.localeCompare(a.ref);
      default:
        return 0;
    }
  });

  const totalPages = Math.ceil(sortedTransaction.length / itemsPerPage);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;
  const currentTransaction = sortedTransaction.slice(startIndex, endIndex);

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

      {/* Filters for all devices */}
      <div className="flex flex-col sm:flex-row gap-4 p-4">
        <select
          value={filtreType}
          onChange={(e) => {
            setFiltreType(e.target.value);
            setCurrentPage(1);
          }}
          className="border rounded-lg p-2 flex-1"
        >
          <option value="">Toutes les type</option>
          <option value="depot">Dépôt</option>
          <option value="paiement">Paiement</option>
          <option value="retrait">Retrait</option>
          <option value="virement">Virement</option>
          <option value="remboursement">Remboursement</option>
        </select>

        <select
          value={filtreStatut}
          onChange={(e) => {
            setFiltreStatut(e.target.value);
            setCurrentPage(1);
          }}
          className="border rounded-lg p-2 flex-1"
        >
          <option value="">Tous les statuts</option>
          <option value="Complete">Complété</option>
          <option value="Annule">Annulé</option>
          <option value="enAttente">En attente</option>
          <option value="Echoue">Échoué</option>
        </select>
        <select
          value={tri}
          onChange={(e) => {
            setTri(e.target.value);
            setCurrentPage(1);
          }}
          className="border rounded-lg p-2 flex-1"
        >
          <option value="">Trier par</option>
          <option value="montant-asc">montant ↑</option>
          <option value="montant-desc">montant ↓</option>
          <option value="ref-asc">reference A-Z</option>
          <option value="ref-desc">reference Z-A</option>
        </select>
      </div>

      {/* Desktop Table View */}
      <div className="hidden md:block overflow-x-auto">
        <table className="w-full border-collapse">
          <thead className="bg-gradient-to-r from-indigo-600 to-purple-600 text-white text-sm uppercase">
            <tr>
              <th className="px-6 py-4 text-left">Reference</th>
              <th className="px-6 py-4 text-left">Date</th>
              <th className="px-6 py-4 text-left">Utilisateur</th>
              <th className="px-6 py-4 text-left">Type</th>
              <th className="px-6 py-4 text-left">Montant</th>
              <th className="px-6 py-4 text-left">Statut</th>
              <th className="px-6 py-4 text-center">Actions</th>
            </tr>
          </thead>

          <tbody className="divide-y divide-gray-100 text-gray-700">
            {allTransaction.length === 0 ? (
              <tr>
                <td colSpan="6" className="text-center py-16 text-gray-500">
                  <div className="flex flex-col items-center">
                    <Users className="h-16 w-16 text-gray-300 mb-4" />
                    <p className="text-lg">Aucun transaction trouvé.</p>
                    <p className="text-sm text-gray-400">
                      Essayez d'ajuster votre recherche.
                    </p>
                  </div>
                </td>
              </tr>
            ) : (
              currentTransaction.map((Transaction, index) => (
                <tr
                  key={Transaction.id}
                  className={`border-b border-gray-100 hover:bg-gradient-to-r hover:from-indigo-50 hover:to-purple-50 transition-all duration-300 transform hover:scale-[1.01] ${
                    index === currentTransaction.length - 1
                      ? "rounded-bl-3xl rounded-br-3xl"
                      : ""
                  }`}
                >
                  <td className="p-6 text-gray-600">{Transaction.ref}</td>
                  <td>
                    {new Date(Transaction.date).toLocaleDateString("fr-FR")}
                  </td>
                  <td className="p-6 text-gray-600">
                    {Transaction.utilisateur}
                  </td>
                  <td className="p-6">
                    {Transaction.type === "depot" ? (
                      <span className="px-2 py-1 bg-green-100 text-green-800 rounded-full text-sm font-medium">
                        Dépôt
                      </span>
                    ) : Transaction.type === "paiement" ? (
                      <span className="px-2 py-1 bg-fuchsia-100 text-fuchsia-800 rounded-full text-sm font-medium">
                        Paiement
                      </span>
                    ) : Transaction.type === "retrait" ? (
                      <span className="px-2 py-1 bg-red-100 text-red-800 rounded-full text-sm font-medium">
                        Retrait
                      </span>
                    ) : Transaction.type === "virement" ? (
                      <span className="px-2 py-1 bg-blue-100 text-blue-800 rounded-full text-sm font-medium">
                        Virement
                      </span>
                    ) : (
                      <span className="px-2 py-1 bg-yellow-100 text-yellow-800 rounded-full text-sm font-medium">
                        Remboursement
                      </span>
                    )}
                  </td>

                  <td className="p-6">
                    {Transaction.montant}
                  </td>
                  <td className="p-6">
                    {Transaction.statut === "Complete" ? (
                      <span className="px-2 py-1 bg-green-100 text-green-800 rounded-full text-sm font-medium">
                        Complété
                      </span>
                    ) : Transaction.statut === "Annule" ? (
                      <span className="px-2 py-1 bg-red-100 text-red-800 rounded-full text-sm font-medium">
                        Annulé
                      </span>
                    ) : Transaction.statut === "enAttente" ? (
                      <span className="px-2 py-1 bg-yellow-100 text-yellow-800 rounded-full text-sm font-medium">
                        En attente
                      </span>
                    ) : (
                      <span className="px-2 py-1 bg-orange-100 text-orange-800 rounded-full text-sm font-medium">
                        Échoué
                      </span>
                    )}
                  </td>
                  <td className="p-6">
                    <div className="flex items-center justify-center gap-2">
                      <button
                        onClick={() => {
                          setShowUpdateForm(true);
                          setSelectedTransaction(Transaction);
                        }}
                        className="flex items-center justify-center w-10 h-10 bg-indigo-100 text-indigo-600 rounded-xl hover:bg-indigo-200 hover:text-indigo-700 transition-all duration-200 shadow-md hover:shadow-lg transform hover:scale-110"
                        title="Modifier"
                      >
                        <Edit className="h-5 w-5" />
                      </button>
                      <button
                        onClick={() => {
                          //   deleteTransaction(Transaction.id, setErr, setSuccessMsg);
                        }}
                        className="flex items-center justify-center w-10 h-10 bg-red-100 text-red-600 rounded-xl hover:bg-red-200 hover:text-red-700 transition-all duration-200 shadow-md hover:shadow-lg transform hover:scale-110"
                        title="Supprimer"
                      >
                        <Trash className="h-5 w-5" />
                      </button>
                      <button
                        className="flex items-center justify-center w-10 h-10 bg-green-100 text-green-600 rounded-xl hover:bg-green-200 hover:text-green-700 transition-all duration-200 shadow-md hover:shadow-lg transform hover:scale-110"
                        title="voir"
                        onClick={() => {
                          setShowTransaction(true);
                          setSelectedTransaction(Transaction);
                        }}
                      >
                        <Eye className="h-5 w-5" />
                      </button>
                    </div>
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>

      {/* Mobile/Tablet Card View */}
      <div className="md:hidden space-y-4 p-4">
        {allTransaction.length === 0 ? (
          <div className="text-center py-16 text-gray-500">
            <div className="flex flex-col items-center">
              <Users className="h-16 w-16 text-gray-300 mb-4" />
              <p className="text-lg">Aucun transaction trouvé.</p>
              <p className="text-sm text-gray-400">
                Essayez d'ajuster votre recherche.
              </p>
            </div>
          </div>
        ) : (
          currentTransaction.map((Transaction) => (
            <div
              key={Transaction.id}
              className="bg-gray-50 border border-gray-200 rounded-xl p-4 shadow-md hover:shadow-lg transition-all duration-300"
            >
              <div className="flex justify-between items-start mb-2">
                <h3 className="text-lg font-semibold text-gray-800">
                  {Transaction.ref}
                </h3>

                <h3 className="text-lg font-semibold text-gray-800">
                  {Transaction.utilisateur}
                </h3>
                <p>{new Date(Transaction.date).toLocaleDateString("fr-FR")}</p>
                {Transaction.statut === "Complete" ? (
                  <span className="px-2 py-1 bg-green-100 text-green-800 rounded-full text-sm font-medium">
                    Complété
                  </span>
                ) : Transaction.statut === "Annule" ? (
                  <span className="px-2 py-1 bg-red-100 text-red-800 rounded-full text-sm font-medium">
                    Annulé
                  </span>
                ) : Transaction.statut === "enAttente" ? (
                  <span className="px-2 py-1 bg-yellow-100 text-yellow-800 rounded-full text-sm font-medium">
                    En attente
                  </span>
                ) : (
                  <span className="px-2 py-1 bg-orange-50-100 text-oranbg-orange-50-800 rounded-full text-sm font-medium">
                    Échoué
                  </span>
                )}
              </div>
              <div className="space-y-1 text-sm text-gray-600">
                <p>
                  <strong>Montant:</strong> {Transaction.montant}
                </p>
                <p>
                  <strong>Type:</strong>{" "}
                  {Transaction.type === "depot" ? (
                    <span className="px-2 py-1 bg-green-100 text-green-800 rounded-full text-sm font-medium">
                      Dépôt
                    </span>
                  ) : Transaction.type === "paiement" ? (
                    <span className="px-2 py-1 bg-fuchsia-100 text-fuchsia-800 rounded-full text-sm font-medium">
                      Paiement
                    </span>
                  ) : Transaction.type === "retrait" ? (
                    <span className="px-2 py-1 bg-red-100 text-red-800 rounded-full text-sm font-medium">
                      Retrait
                    </span>
                  ) : Transaction.type === "virement" ? (
                    <span className="px-2 py-1 bg-blue-100 text-blue-800 rounded-full text-sm font-medium">
                      Virement
                    </span>
                  ) : (
                    <span className="px-2 py-1 bg-yellow-100 text-yellow-800 rounded-full text-sm font-medium">
                      Remboursement
                    </span>
                  )}
                </p>
              </div>
              <div className="flex justify-end gap-2 mt-4">
                <button
                  onClick={() => {
                    setShowUpdateForm(true);
                    setSelectedTransaction(Transaction);
                  }}
                  className="flex items-center justify-center w-10 h-10 bg-indigo-100 text-indigo-600 rounded-xl hover:bg-indigo-200 hover:text-indigo-700 transition-all duration-200 shadow-md hover:shadow-lg transform hover:scale-110"
                  title="Modifier"
                >
                  <Edit className="h-5 w-5" />
                </button>
                <button
                  onClick={() => {
                    // deleteTransaction(Transaction.id, setErr, setSuccessMsg);
                  }}
                  className="flex items-center justify-center w-10 h-10 bg-red-100 text-red-600 rounded-xl hover:bg-red-200 hover:text-red-700 transition-all duration-200 shadow-md hover:shadow-lg transform hover:scale-110"
                  title="Supprimer"
                >
                  <Trash className="h-5 w-5" />
                </button>
                <button
                  className="flex items-center justify-center w-10 h-10 bg-green-100 text-green-600 rounded-xl hover:bg-green-200 hover:text-green-700 transition-all duration-200 shadow-md hover:shadow-lg transform hover:scale-110"
                  title="voir"
                  onClick={() => {
                    setShowTransaction(true);
                    setSelectedTransaction(Transaction);
                  }}
                >
                  <Eye className="h-5 w-5" />
                </button>
              </div>
            </div>
          ))
        )}
      </div>

      {/* Pagination */}
      <div className="flex justify-center items-center gap-2 py-6 px-4 flex-wrap">
        <button
          disabled={currentPage === 1}
          onClick={() => setCurrentPage(1)}
          className="px-3 py-1 rounded bg-gray-200 disabled:opacity-50 text-sm md:text-base"
          title="Première page"
        >
          <ChevronFirst className="h-4 w-4" />
        </button>
        <button
          disabled={currentPage === 1}
          onClick={() => setCurrentPage(currentPage - 1)}
          className="px-3 py-1 rounded bg-gray-200 disabled:opacity-50 text-sm md:text-base"
          title="Page précédente"
        >
          <ChevronLeft className="h-4 w-4" />
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
          title="Page suivante"
        >
          <ChevronRight className="h-4 w-4" />
        </button>
        <button
          disabled={currentPage === totalPages}
          onClick={() => setCurrentPage(totalPages)}
          className="px-3 py-1 rounded bg-gray-200 disabled:opacity-50 text-sm md:text-base"
          title="Dernière page"
        >
          <ChevronLast className="h-4 w-4" />
        </button>
      </div>

      {/* {showUpdateForm && (
        <FormUpdateTransaction
          TransactionData={selectTransaction}
          onClose={() => setShowUpdateForm(false)}
        />
      )} */}

      {showTransaction && (
        <ViewTransaction
          transactionData={selectTransaction}
          onClose={() => setShowTransaction(false)}
        />
      )}
    </div>
  );
};

export default TransactionTable;
