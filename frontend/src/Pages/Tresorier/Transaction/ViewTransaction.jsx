import React from 'react'
import { Info } from "../../../components/Info";
import { X, User, Mail, Phone, CheckCircle, XCircle } from "lucide-react";

const ViewTransaction = ({transactionData,onClose}) => {
    return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 px-4 animate-fade-in">
      <div className="bg-white w-full max-w-4xl rounded-3xl shadow-2xl overflow-hidden transform transition-all duration-300 ease-out animate-slide-up">
        {/* Header */}
        <div className="bg-gradient-to-r from-indigo-500 to-purple-600 px-6 py-5 border-b border-gray-200">
          <div className="flex justify-between items-center">
            <h2 className="text-2xl font-bold text-white">
              Informations du produit fini
            </h2>
            <button
              onClick={onClose}
              className="p-2 rounded-full bg-white/20 hover:bg-white/30 transition-all duration-200 hover:rotate-90"
            >
              <X className="w-6 h-6 text-white" />
            </button>
          </div>
        </div>

        {/* Content */}
        <div className="p-8 grid grid-cols-1 md:grid-cols-2 gap-8 text-sm">
          <div className="space-y-6">
            <Info
              label="Reference"
              value={transactionData.ref}
              icon={<User className="w-5 h-5 text-indigo-500" />}
            />
            <Info
              label="Utilisateur"
              value={transactionData.utilisateur}
              icon={<User className="w-5 h-5 text-indigo-500" />}
            />
            <Info
              label="Montant"
              value={transactionData.montant}
              icon={<Mail className="w-5 h-5 text-indigo-500" />}
            />
            <Info
              label="Date"
              value={transactionData.date}
              icon={<Phone className="w-5 h-5 text-indigo-500" />}
            />
            <Info
              label="Type"
              value={transactionData.type}
              icon={<Phone className="w-5 h-5 text-indigo-500" />}
            />
            <Info
              label="Statut"
              value={transactionData.statut}
              badge
            />
          </div>
        </div>

        {/* Footer */}
        <div className="px-8 py-6 border-t border-gray-200 flex justify-center">
          <button
            onClick={onClose}
            className="px-8 py-3 bg-gradient-to-r from-indigo-600 to-purple-600 text-white font-semibold rounded-xl shadow-lg hover:shadow-xl hover:scale-105 transition-all duration-200"
          >
            Fermer
          </button>
        </div>
      </div>
    </div>
  );
}

export default ViewTransaction