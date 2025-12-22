import React, { useContext, useEffect, useState } from "react";
import { Context } from "../../../Context/ContextProvider";
import {
  ChevronFirst,
  ChevronLast,
  Edit,
  Eye,
  Users,
  ChevronLeft,
  ChevronRight,
  Trash,
} from "lucide-react";
import FormUpdateProduitFini from "./FormUpdateProduitFini";
import ViewFormProduitFini from "./ViewFormProduitFini";
import { deleteProduitFini } from "../../../Services/ProduitFini";

const ProduuitFiniTable = () => {
  const { allPf, setAllPf, successMsg, setErr, setSuccessMsg } =
    useContext(Context);
  const [showUpdateForm, setShowUpdateForm] = useState(false);
  const [loading, setLoading] = useState(false);
  const [showPf, setShowPf] = useState(false);
  const [selectedPf, setSelectedPf] = useState(null);
  const [currentPage, setCurrentPage] = useState(1);
  const [windowWidth, setWindowWidth] = useState(window.innerWidth);
  const [filtreCategorie, setFiltreCategorie] = useState("");
  const [filtreStatut, setFiltreStatut] = useState("");
  const [tri, setTri] = useState("");

  useEffect(() => {
    const fetchPf = async () => {
      setLoading(true);
      try {
        const data = [
          {
            id: 1,
            nom: "Huile d'Argan",
            reference: "ARG-001",
            categorie: "Cosmétique",
            prix: 150,
            stock: 120,
            statut: "disponible",
            dateMiseAJour: "2025-12-22T10:00:00.000Z",
          },
          {
            id: 2,
            nom: "Miel Naturel",
            reference: "MIE-010",
            categorie: "Alimentaire",
            prix: 80,
            stock: 0,
            statut: "indisponible",
            dateMiseAJour: "2025-12-20T09:30:00.000Z",
          },
          {
            id: 3,
            nom: "Savon Aloe Vera",
            reference: "SAV-003",
            categorie: "Cosmétique",
            prix: 25,
            stock: 50,
            statut: "disponible",
            dateMiseAJour: "2025-12-21T14:15:00.000Z",
          },
          {
            id: 4,
            nom: "Confiture de Fraise",
            reference: "CONF-005",
            categorie: "Alimentaire",
            prix: 40,
            stock: 30,
            statut: "disponible",
            dateMiseAJour: "2025-12-22T08:45:00.000Z",
          },
          {
            id: 5,
            nom: "Shampoing Jojoba",
            reference: "SHA-007",
            categorie: "Cosmétique",
            prix: 60,
            stock: 0,
            statut: "indisponible",
            dateMiseAJour: "2025-12-19T12:00:00.000Z",
          },
          {
            id: 6,
            nom: "Gel Douche Citron",
            reference: "GEL-011",
            categorie: "Cosmétique",
            prix: 35,
            stock: 25,
            statut: "disponible",
            dateMiseAJour: "2025-12-18T11:00:00.000Z",
          },
          {
            id: 7,
            nom: "Chocolat Noir",
            reference: "CHO-002",
            categorie: "Alimentaire",
            prix: 20,
            stock: 100,
            statut: "disponible",
            dateMiseAJour: "2025-12-21T09:45:00.000Z",
          },
          {
            id: 8,
            nom: "Lotion Corps",
            reference: "LOT-008",
            categorie: "Cosmétique",
            prix: 45,
            stock: 15,
            statut: "disponible",
            dateMiseAJour: "2025-12-20T16:30:00.000Z",
          },
          {
            id: 9,
            nom: "Thé Vert",
            reference: "THE-004",
            categorie: "Alimentaire",
            prix: 30,
            stock: 50,
            statut: "disponible",
            dateMiseAJour: "2025-12-22T07:15:00.000Z",
          },
          {
            id: 10,
            nom: "Crème Visage",
            reference: "CRE-009",
            categorie: "Cosmétique",
            prix: 70,
            stock: 0,
            statut: "indisponible",
            dateMiseAJour: "2025-12-19T14:50:00.000Z",
          },
        ];
        await new Promise((res) => setTimeout(res, 1000));
        setAllPf(data);
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    };
    fetchPf();
  }, []);

  useEffect(() => {
    const handleResize = () => setWindowWidth(window.innerWidth);
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  const itemsPerPage = windowWidth < 768 ? 4 : 6;

  useEffect(() => {
    const totalPages = Math.ceil(allPf.length / itemsPerPage);
    if (currentPage > totalPages && totalPages > 0) {
      setCurrentPage(1);
    }
  }, [itemsPerPage, allPf.length, currentPage]);

  const filtredPf = allPf.filter((Pf) => {
    const matchCategorie = !filtreCategorie || Pf.categorie === filtreCategorie;

    const matchStatut = !filtreStatut || Pf.statut === filtreStatut;

    return matchCategorie && matchStatut;
  });

  const sortedPf = [...filtredPf].sort((a, b) => {
    switch (tri) {
      case "stock-asc":
        return a.stock - b.stock;
      case "stock-desc":
        return b.stock - a.stock;
      case "nom-asc":
        return a.nom.localeCompare(b.nom);
      case "nom-desc":
        return b.nom.localeCompare(a.nom);
      default:
        return 0;
    }
  });

  const totalPages = Math.ceil(sortedPf.length / itemsPerPage);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;
  const currentPf = sortedPf.slice(startIndex, endIndex);

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
          value={filtreCategorie}
          onChange={(e) => {
            setFiltreCategorie(e.target.value);
            setCurrentPage(1);
          }}
          className="border rounded-lg p-2 flex-1"
        >
          <option value="">Toutes les catégories</option>
          <option value="produitFini">produit fini</option>
          <option value="Produit">produit</option>
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
          <option value="disponible">Disponible</option>
          <option value="indisponible">Indisponible</option>
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
          <option value="stock-asc">Stock ↑</option>
          <option value="stock-desc">Stock ↓</option>
          <option value="nom-asc">Nom A-Z</option>
          <option value="nom-desc">Nom Z-A</option>
        </select>
      </div>

      {/* Desktop Table View */}
      <div className="hidden md:block overflow-x-auto">
        <table className="w-full border-collapse">
          <thead className="bg-gradient-to-r from-indigo-600 to-purple-600 text-white text-sm uppercase">
            <tr>
              <th className="px-6 py-4 text-left">Nom de produit fini</th>
              <th className="px-6 py-4 text-left">Catégorie</th>
              <th className="px-6 py-4 text-left">Stock</th>
              <th className="px-6 py-4 text-left">Statut</th>
              <th className="px-6 py-4 text-left">Date de mise à jour</th>
              <th className="px-6 py-4 text-center">Actions</th>
            </tr>
          </thead>

          <tbody className="divide-y divide-gray-100 text-gray-700">
            {allPf.length === 0 ? (
              <tr>
                <td colSpan="6" className="text-center py-16 text-gray-500">
                  <div className="flex flex-col items-center">
                    <Users className="h-16 w-16 text-gray-300 mb-4" />
                    <p className="text-lg">Aucun produit fini trouvé.</p>
                    <p className="text-sm text-gray-400">
                      Essayez d'ajuster votre recherche.
                    </p>
                  </div>
                </td>
              </tr>
            ) : (
              currentPf.map((Pf, index) => (
                <tr
                  key={Pf.id}
                  className={`border-b border-gray-100 hover:bg-gradient-to-r hover:from-indigo-50 hover:to-purple-50 transition-all duration-300 transform hover:scale-[1.01] ${
                    index === currentPf.length - 1
                      ? "rounded-bl-3xl rounded-br-3xl"
                      : ""
                  }`}
                >
                  <td className="p-6 text-gray-600">{Pf.nom}</td>
                  <td className="p-6 text-gray-600">{Pf.categorie}</td>
                  <td className="p-6 text-gray-600">{Pf.stock}</td>
                  <td className="p-6">
                    {Pf.statut === "disponible" ? (
                      <span className="px-2 py-1 bg-green-100 text-green-800 rounded-full text-sm font-medium">
                        Disponible
                      </span>
                    ) : (
                      <span className="px-2 py-1 bg-red-100 text-red-800 rounded-full text-sm font-medium">
                        Indisponible
                      </span>
                    )}
                  </td>
                  <td>
                    {new Date(Pf.dateMiseAJour).toLocaleDateString("fr-FR")}
                  </td>
                  <td className="p-6">
                    <div className="flex items-center justify-center gap-2">
                      <button
                        onClick={() => {
                          setShowUpdateForm(true);
                          setSelectedPf(Pf);
                        }}
                        className="flex items-center justify-center w-10 h-10 bg-indigo-100 text-indigo-600 rounded-xl hover:bg-indigo-200 hover:text-indigo-700 transition-all duration-200 shadow-md hover:shadow-lg transform hover:scale-110"
                        title="Modifier"
                      >
                        <Edit className="h-5 w-5" />
                      </button>
                      <button
                        onClick={() => {
                          deleteProduitFini(Pf.id, setErr, setSuccessMsg);
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
                          setShowPf(true);
                          setSelectedPf(Pf);
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
        {allPf.length === 0 ? (
          <div className="text-center py-16 text-gray-500">
            <div className="flex flex-col items-center">
              <Users className="h-16 w-16 text-gray-300 mb-4" />
              <p className="text-lg">Aucun produit fini trouvé.</p>
              <p className="text-sm text-gray-400">
                Essayez d'ajuster votre recherche.
              </p>
            </div>
          </div>
        ) : (
          currentPf.map((Pf) => (
            <div
              key={Pf.id}
              className="bg-gray-50 border border-gray-200 rounded-xl p-4 shadow-md hover:shadow-lg transition-all duration-300"
            >
              <div className="flex justify-between items-start mb-2">
                <h3 className="text-lg font-semibold text-gray-800">
                  {Pf.nom}
                </h3>
                {Pf.statut === "disponible" ? (
                  <span className="px-2 py-1 bg-green-100 text-green-800 rounded-full text-sm font-medium">
                    Disponible
                  </span>
                ) : (
                  <span className="px-2 py-1 bg-red-100 text-red-800 rounded-full text-sm font-medium">
                    Indisponible
                  </span>
                )}
              </div>
              <div className="space-y-1 text-sm text-gray-600">
                <p>
                  <strong>Catégorie:</strong> {Pf.categorie}
                </p>
                <p>
                  <strong>Prix:</strong> {Pf.prix}
                </p>
                <p>
                  <strong>Stock:</strong> {Pf.stock}
                </p>
              </div>
              <div className="flex justify-end gap-2 mt-4">
                <button
                  onClick={() => {
                    setShowUpdateForm(true);
                    setSelectedPf(Pf);
                  }}
                  className="flex items-center justify-center w-10 h-10 bg-indigo-100 text-indigo-600 rounded-xl hover:bg-indigo-200 hover:text-indigo-700 transition-all duration-200 shadow-md hover:shadow-lg transform hover:scale-110"
                  title="Modifier"
                >
                  <Edit className="h-5 w-5" />
                </button>
                <button
                  onClick={() => {
                    deleteProduitFini(Pf.id, setErr, setSuccessMsg);
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
                    setShowPf(true);
                    setSelectedPf(Pf);
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

      {showUpdateForm && (
        <FormUpdateProduitFini
          PfData={selectedPf}
          onClose={() => setShowUpdateForm(false)}
        />
      )}

      {showPf && (
        <ViewFormProduitFini
          PfData={selectedPf}
          onClose={() => setShowPf(false)}
        />
      )}
    </div>
  );
};

export default ProduuitFiniTable;
