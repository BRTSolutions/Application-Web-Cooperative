import React, { useContext, useEffect, useState } from "react";
import { Context } from "../../../Context/ContextProvider";
import {
  ChevronFirst,
  ChevronLast,
  Delete,
  Edit,
  Eye,
  Users,
  ChevronLeft,
  ChevronRight,
  Trash,
} from "lucide-react";
import { deleteProduit } from "../../../Services/produits";
import FormUpdateProduct from "./FormUpdateProduct";
import ViewFormProduct from "./ViewFormProduct";

const ProductTable = () => {
  const { allProduits, setAllProduits, successMsg, setErr, setSuccessMsg } =
    useContext(Context);
  const [showUpdateForm, setShowUpdateForm] = useState(false);
  const [loading,setLoading] = useState(false)
  const [showProduit, setShowproduit] = useState(false);
  const [selectedProduit, setSelectedProduit] = useState(null);
  const [currentPage, setCurrentPage] = useState(1);
  const [windowWidth, setWindowWidth] = useState(window.innerWidth);
  const [filtreCategorie, setFiltreCategorie] = useState("");
  const [filtreStatut, setFiltreStatut] = useState("");
  const [tri, setTri] = useState("");
  

  useEffect(() => {
    
    const fetchProduits = async () => {
      setLoading(true);
      try{
 const data = [
        {
          id: 1,
          nom: "Clavier Gaming",
          reference: "CLV-GAM-001",
          categorie: "Informatique",
          prix: 399,
          stock: 25,
          statut: "disponible",
          description: "Clavier mécanique RGB",
        },
        {
          id: 2,
          nom: "Souris Sans Fil",
          reference: "SRC-WL-002",
          categorie: "Informatique",
          prix: 199,
          stock: 40,
          statut: "indisponible",
          description: "Souris ergonomique rechargeable",
        },
        {
          id: 3,
          nom: "Tasse Café",
          reference: "TSC-003",
          categorie: "Cuisine",
          prix: 15,
          stock: 100,
          statut: "Disponible",
          description: "Tasse en céramique blanche",
        },
        {
          id: 4,
          nom: "Livre ReactJS",
          reference: "LIV-004",
          categorie: "Livres",
          prix: 59,
          stock: 12,
          statut: "disponible ",
          description: "Guide complet pour ReactJS",
        },
        {
          id: 5,
          nom: "Chaise Bureau",
          reference: "CHB-005",
          categorie: "Mobilier",
          prix: 299,
          stock: 5,
          statut: "indisponible",
          description: "Chaise ergonomique avec accoudoirs",
        },
        {
          id: 6,
          nom: "Table Basse",
          reference: "TBL-006",
          categorie: "Mobilier",
          prix: 499,
          stock: 8,
          statut: "disponible",
          description: "Table basse moderne en bois",
        },
        {
          id: 7,
          nom: "Cafetière Expresso",
          reference: "CAF-007",
          categorie: "Cuisine",
          prix: 129,
          stock: 30,
          statut: "indisponible",
          description: "Cafetière avec mousseur à lait",
        },
        {
          id: 8,
          nom: "Écouteurs Bluetooth",
          reference: "EC-BT-008",
          categorie: "Informatique",
          prix: 89,
          stock: 60,
          statut: "disponible",
          description: "Écouteurs sans fil avec réduction de bruit",
        },
        {
          id: 9,
          nom: "Support Livre",
          reference: "SUP-009",
          categorie: "Livres",
          prix: 25,
          stock: 50,
          statut: "Disponible",
          description: "Support réglable pour livres et tablettes",
        },
        {
          id: 10,
          nom: "Lampe de Bureau",
          reference: "LAM-010",
          categorie: "Mobilier",
          prix: 79,
          stock: 15,
          statut: "disponible",
          description: "Lampe LED avec variateur d’intensité",
        },
      ];
      await new Promise((res) => setTimeout(res, 1000));
      setAllProduits(data);
      }catch(err){
        console.log(err)
      } finally {
        setLoading(false);
      }
    };
    fetchProduits();
  }, []);

  useEffect(() => {
    const handleResize = () => setWindowWidth(window.innerWidth);
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  const itemsPerPage = windowWidth < 768 ? 4 : 6;

  useEffect(() => {
    const totalPages = Math.ceil(allProduits.length / itemsPerPage);
    if (currentPage > totalPages && totalPages > 0) {
      setCurrentPage(1);
    }
  }, [itemsPerPage, allProduits.length, currentPage]);

  const filteredProduits = allProduits.filter((produit) => {
    const matchCategorie =
      !filtreCategorie || produit.categorie === filtreCategorie;

    const matchStatut = !filtreStatut || produit.statut === filtreStatut;

    return matchCategorie && matchStatut;
  });

  const sortedProduits = [...filteredProduits].sort((a, b) => {
    switch (tri) {
      case "prix-asc":
        return a.prix - b.prix;
      case "prix-desc":
        return b.prix - a.prix;
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

  const totalPages = Math.ceil(sortedProduits.length / itemsPerPage);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;
  const currentProduits = sortedProduits.slice(startIndex, endIndex);

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
          <option value="prix-asc">Prix ↑</option>
          <option value="prix-desc">Prix ↓</option>
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
              <th className="px-6 py-4 text-left">Nom de produit</th>
              <th className="px-6 py-4 text-left">Catégorie</th>
              <th className="px-6 py-4 text-left">Prix</th>
              <th className="px-6 py-4 text-left">Stock</th>
              <th className="px-6 py-4 text-left">Statut</th>
              <th className="px-6 py-4 text-center">Actions</th>
            </tr>
          </thead>

          <tbody className="divide-y divide-gray-100 text-gray-700">
            {allProduits.length === 0 ? (
              <tr>
                <td colSpan="6" className="text-center py-16 text-gray-500">
                  <div className="flex flex-col items-center">
                    <Users className="h-16 w-16 text-gray-300 mb-4" />
                    <p className="text-lg">Aucun produit trouvé.</p>
                    <p className="text-sm text-gray-400">
                      Essayez d'ajuster votre recherche.
                    </p>
                  </div>
                </td>
              </tr>
            ) : (
              currentProduits.map((produit, index) => (
                <tr
                  key={produit.id}
                  className={`border-b border-gray-100 hover:bg-gradient-to-r hover:from-indigo-50 hover:to-purple-50 transition-all duration-300 transform hover:scale-[1.01] ${
                    index === currentProduits.length - 1
                      ? "rounded-bl-3xl rounded-br-3xl"
                      : ""
                  }`}
                >
                  <td className="p-6 text-gray-600">{produit.nom}</td>
                  <td className="p-6 text-gray-600">{produit.categorie}</td>
                  <td className="p-6 text-gray-600">{produit.prix}</td>
                  <td className="p-6 text-gray-600">{produit.stock}</td>
                  <td className="p-6">
                    {produit.statut === "disponible" ? (
                      <span className="px-2 py-1 bg-green-100 text-green-800 rounded-full text-sm font-medium">
                        Disponible
                      </span>
                    ) : (
                      <span className="px-2 py-1 bg-red-100 text-red-800 rounded-full text-sm font-medium">
                        Indisponible
                      </span>
                    )}
                  </td>
                  <td className="p-6">
                    <div className="flex items-center justify-center gap-2">
                      <button
                        onClick={() => {
                          setShowUpdateForm(true);
                          setSelectedProduit(produit);
                        }}
                        className="flex items-center justify-center w-10 h-10 bg-indigo-100 text-indigo-600 rounded-xl hover:bg-indigo-200 hover:text-indigo-700 transition-all duration-200 shadow-md hover:shadow-lg transform hover:scale-110"
                        title="Modifier"
                      >
                        <Edit className="h-5 w-5" />
                      </button>
                      <button
                        onClick={() => {
                          deleteProduit(produit.id, setErr, setSuccessMsg);
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
                          setShowproduit(true);
                          setSelectedProduit(produit);
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
        {allProduits.length === 0 ? (
          <div className="text-center py-16 text-gray-500">
            <div className="flex flex-col items-center">
              <Users className="h-16 w-16 text-gray-300 mb-4" />
              <p className="text-lg">Aucun produit trouvé.</p>
              <p className="text-sm text-gray-400">
                Essayez d'ajuster votre recherche.
              </p>
            </div>
          </div>
        ) : (
          currentProduits.map((produit) => (
            <div
              key={produit.id}
              className="bg-gray-50 border border-gray-200 rounded-xl p-4 shadow-md hover:shadow-lg transition-all duration-300"
            >
              <div className="flex justify-between items-start mb-2">
                <h3 className="text-lg font-semibold text-gray-800">
                  {produit.nom}
                </h3>
                {produit.statut === "disponible" ? (
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
                  <strong>Catégorie:</strong> {produit.categorie}
                </p>
                <p>
                  <strong>Prix:</strong> {produit.prix}
                </p>
                <p>
                  <strong>Stock:</strong> {produit.stock}
                </p>
              </div>
              <div className="flex justify-end gap-2 mt-4">
                <button
                  onClick={() => {
                    setShowUpdateForm(true);
                    setSelectedProduit(produit);
                  }}
                  className="flex items-center justify-center w-10 h-10 bg-indigo-100 text-indigo-600 rounded-xl hover:bg-indigo-200 hover:text-indigo-700 transition-all duration-200 shadow-md hover:shadow-lg transform hover:scale-110"
                  title="Modifier"
                >
                  <Edit className="h-5 w-5" />
                </button>
                <button
                  onClick={() => {
                    deleteProduit(produit.id, setErr, setSuccessMsg);
                  }}
                  className="flex items-center justify-center w-10 h-10 bg-red-100 text-red-600 rounded-xl hover:bg-red-200 hover:text-red-700 transition-all duration-200 shadow-md hover:shadow-lg transform hover:scale-110"
                  title="Supprimer"
                >
                  <Trash className="h-5 w-5" />
                </button>
                <button
                  className="flex items-center justify-center w-10 h-10 bg-green-100 text-green-600 rounded-xl hover:bg-green-200 hover:text-green+-700 transition-all duration-200 shadow-md hover:shadow-lg transform hover:scale-110"
                  title="voir"
                  onClick={() => {
                    setShowproduit(true);
                    setSelectedProduit(produit);
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
        <FormUpdateProduct
          produitData={selectedProduit}
          onClose={() => setShowUpdateForm(false)}
        />
      )}

      {showProduit && (
        <ViewFormProduct
          produitData={selectedProduit}
          onClose={() => setShowproduit(false)}
        />
      )}
    </div>
  );
};

export default ProductTable;
