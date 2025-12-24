import React, { useEffect, useState } from "react";
import { Search } from "lucide-react";
import FormAddProduct from "./FormAddProduct";
import { FaProductHunt } from "react-icons/fa";
import HeaderIcon from "../../../components/HeaderIcon";

const HeaderProduit = () => {
  const [showForm, setShowForm] = useState(false);
  const [produits, setProduits] = useState([]);

  useEffect(() => {
    const fetchProduit = async () => {
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

      setProduits(data);
    };

    fetchProduit();
  }, []);
  return (
    <div className="mt-5">
      <div className="flex flex-col md:flex-row md:justify-between md:items-center gap-4">
        <div className="flex gap-5 items-center">
          <HeaderIcon icon={FaProductHunt} />
          <div className="flex flex-col">
            <h1 className="font-semibold text-2xl md:text-3xl">
              Gestion des produits
            </h1>
            <p className="text-gray-500 text-md">
              {produits.length} produits enregistrés
            </p>
          </div>
        </div>

        <div className="flex flex-col md:flex-row gap-4 md:w-1/3 w-full">
          <div className="relative w-full">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-500 h-5 w-5" />
            <input
              type="search"
              placeholder="Recherche un produit..."
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

      {showForm && <FormAddProduct onClose={() => setShowForm(false)} />}
    </div>
  );
};

export default HeaderProduit;
