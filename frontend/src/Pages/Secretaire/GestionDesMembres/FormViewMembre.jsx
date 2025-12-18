import React from "react";
import { X } from "lucide-react";
import { Info } from "../../../components/Info";

const FormViewMembre = ({ membreData, onClose }) => {
  if (!membreData) return null;

  return (
    <div className="fixed inset-0 bg-black/40 flex items-center justify-center z-50 px-4">
      <div className="bg-white w-full max-w-3xl rounded-2xl shadow-2xl overflow-hidden">
        
        {/* Header */}
        <div className="flex justify-between items-center px-6 py-4 border-b">
          <h2 className="text-xl font-semibold text-gray-800">
            Informations du membre
          </h2>
          <button
            onClick={onClose}
            className="p-2 rounded-full hover:bg-gray-100"
          >
            <X />
          </button>
        </div>

        {/* Content */}
        <div className="p-6 grid grid-cols-1 sm:grid-cols-2 gap-6 text-sm">
          
          <Info label="Nom" value={membreData.nom} />
          <Info label="Prénom" value={membreData.prenom} />
          <Info label="Email" value={membreData.email} />
          <Info label="Téléphone" value={membreData.telephone} />

          <Info
            label="Statut"
            value={
              membreData.status === "active" ? "Actif" : "Inactif"
            }
            badge
          />

        </div>

        {/* Footer */}
        <div className="px-6 py-4 border-t flex justify-end">
          <button
            onClick={()=>{onClose()}}
            className="px-6 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 transition"
          >
            Fermer
          </button>
        </div>
      </div>
    </div>
  );
};

export default FormViewMembre;
