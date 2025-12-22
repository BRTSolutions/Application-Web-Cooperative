import React, { useEffect, useState } from "react";
import { Search } from "lucide-react";
import FormAddProduitFini from "./FormAddProduitFini";

const HeaderProduitFini = () => {
  const [showForm, setShowForm] = useState(false);
  const [Pf, setPf] = useState([]);

  useEffect(() => {
    const fetchPf = async () => {
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

      setPf(data);
    };

    fetchPf();
  }, []);
  return (
    <div className="mt-5">
      <div className="flex flex-col md:flex-row md:justify-between md:items-center gap-4">
        <div className="flex gap-5 items-center">
          <div className="flex flex-col">
            <h1 className="font-semibold text-2xl md:text-3xl">
              Gestion des produits finis
            </h1>
            <p className="text-gray-500 text-md">
              {Pf.length} produits finis enregistrés
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

      {showForm && <FormAddProduitFini onClose={() => setShowForm(false)} />}
    </div>
  );
};

export default HeaderProduitFini;
