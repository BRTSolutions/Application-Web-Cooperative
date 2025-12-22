import React, { useContext, useState, useEffect } from "react";
import { X, User, Mail, Phone, CheckCircle, XCircle, FileText, Image, Receipt, Download } from "lucide-react";
import { Info } from "../../../components/Info";
import { Context } from "../../../Context/ContextProvider";

const FormViewMembre = ({ membreData, onClose }) => {
  const { setErr } = useContext(Context);
  const [docs, setDocs] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchDocs = async () => {
      setLoading(true);
      const data = {
        cin: "https://via.placeholder.com/150?text=CIN",
        photo: "https://via.placeholder.com/150?text=Photo",
        receipt: "https://via.placeholder.com/150?text=Receipt",
      };
      setDocs(data || {});
      setLoading(false);
    };

    fetchDocs();
  }, [membreData.id, setErr]);

  // Handle ESC key to close modal
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === "Escape") onClose();
    };
    document.addEventListener("keydown", handleKeyDown);
    return () => document.removeEventListener("keydown", handleKeyDown);
  }, [onClose]);

  if (!membreData) return null;

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 px-4 animate-fade-in">
      <div className="bg-white w-full max-w-4xl rounded-3xl shadow-2xl overflow-hidden transform transition-all duration-300 ease-out animate-slide-up">
        {/* Header */}
        <div className="bg-gradient-to-r from-indigo-500 to-purple-600 px-6 py-5 border-b border-gray-200">
          <div className="flex justify-between items-center">
            <h2 className="text-2xl font-bold text-white">Informations du membre</h2>
            <button
              onClick={onClose}
              className="p-2 rounded-full bg-white/20 hover:bg-white/30 transition-all duration-200 hover:rotate-90"
              aria-label="Fermer la modal"
            >
              <X className="w-6 h-6 text-white" />
            </button>
          </div>
        </div>

        {/* Content */}
        <div className="p-8 grid grid-cols-1 md:grid-cols-2 gap-8 text-sm">
          {/* Personal Info */}
          <div className="space-y-6">
            <Info label="Nom" value={membreData.nom} icon={<User className="w-5 h-5 text-indigo-500" />} />
            <Info label="Prénom" value={membreData.prenom} icon={<User className="w-5 h-5 text-indigo-500" />} />
            <Info label="Email" value={membreData.email} icon={<Mail className="w-5 h-5 text-indigo-500" />} />
            <Info label="Téléphone" value={membreData.telephone} icon={<Phone className="w-5 h-5 text-indigo-500" />} />
            <Info
              label="Statut"
              value={membreData.status === "active" ? "Actif" : "Inactif"}
              badge
              icon={membreData.status === "active" ? <CheckCircle className="w-5 h-5 text-green-500" /> : <XCircle className="w-5 h-5 text-red-500" />}
            />
          </div>

          {/* Documents */}
          <div className="space-y-4 md:col-span-2">
            <h3 className="text-lg font-semibold text-gray-800 mb-4">Documents</h3>
            {loading ? (
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                {[1, 2, 3].map((i) => (
                  <div key={i} className="animate-pulse bg-gray-200 h-16 rounded-lg"></div>
                ))}
              </div>
            ) : (
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                {docs.cin && (
                  <a
                    href={docs.cin}
                    download="carte_nationale.pdf"
                    className="flex items-center p-4 bg-gray-50 border border-gray-200 rounded-xl hover:bg-indigo-50 hover:border-indigo-300 transition-all duration-200 group cursor-pointer"
                    aria-label="Télécharger la Carte Nationale"
                  >
                    <FileText className="w-6 h-6 text-indigo-500 mr-3 group-hover:scale-110 transition-transform" />
                    <span className="text-gray-700 font-medium">Carte Nationale</span>
                    <Download className="w-5 h-5 text-gray-400 ml-auto group-hover:text-indigo-500 transition-colors" />
                  </a>
                )}
                {docs.photo && (
                  <a
                    href={docs.photo}
                    download="photo.jpg"
                    className="flex items-center p-4 bg-gray-50 border border-gray-200 rounded-xl hover:bg-indigo-50 hover:border-indigo-300 transition-all duration-200 group cursor-pointer"
                    aria-label="Télécharger la Photo"
                  >
                    <Image className="w-6 h-6 text-indigo-500 mr-3 group-hover:scale-110 transition-transform" />
                    <span className="text-gray-700 font-medium">Photo</span>
                    <Download className="w-5 h-5 text-gray-400 ml-auto group-hover:text-indigo-500 transition-colors" />
                  </a>
                )}
                {docs.receipt && (
                  <a
                    href={docs.receipt}
                    download="recu_paiement.pdf"
                    className="flex items-center p-4 bg-gray-50 border border-gray-200 rounded-xl hover:bg-indigo-50 hover:border-indigo-300 transition-all duration-200 group cursor-pointer"
                    aria-label="Télécharger le Reçu de paiement"
                  >
                    <Receipt className="w-6 h-6 text-indigo-500 mr-3 group-hover:scale-110 transition-transform" />
                    <span className="text-gray-700 font-medium">Reçu de paiement</span>
                    <Download className="w-5 h-5 text-gray-400 ml-auto group-hover:text-indigo-500 transition-colors" />
                  </a>
                )}
                {!docs.cin && !docs.photo && !docs.receipt && (
                  <div className="col-span-full flex items-center justify-center p-8 bg-gray-50 rounded-xl">
                    <FileText className="w-8 h-8 text-gray-400 mr-3" />
                    <p className="text-gray-500">Aucun document disponible</p>
                  </div>
                )}
              </div>
            )}
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
};

export default FormViewMembre;