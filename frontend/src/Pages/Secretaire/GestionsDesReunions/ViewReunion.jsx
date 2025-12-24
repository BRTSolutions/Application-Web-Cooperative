import {
  Mail,
  User,
  X,
  Calendar,
  Clock,
  FileText,
  Users,
  Tag,
} from "lucide-react";
import { Info } from "../../../components/Info";
import { useState, useContext, useEffect } from "react";
import { Context } from "../../../Context/ContextProvider";
import UpdateReunion from "./FormUpdateReunion";
import { deleteReunion } from "../../../Services/Reunions";

const ViewReunion = ({ selectedReunion, onClose }) => {
  const [showUpdateForm, setShowUpdateForm] = useState(false);
  const [loading, setLoading] = useState(false);
  const { allMembres, setAllMembres, setErr, setSuccessMsg } =
    useContext(Context);

  useEffect(() => {
    const fetchMembres = async () => {
      setLoading(true);
      try {
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
        setAllMembres(data);
        await new Promise((res) => setTimeout(res, 1000));
      } catch (err) {
        console.log(err);
      } finally {
        setLoading(false);
      }
    };
    fetchMembres();
  }, []);

  const title = selectedReunion.title;
  const description =
    selectedReunion.extendedProps?.description || "Aucune description";
  const type = selectedReunion.extendedProps?.type || "Type non spécifié";
  const membres = selectedReunion.extendedProps?.membres || [];

  const startDateObj = selectedReunion.start
    ? new Date(selectedReunion.start)
    : null;
  const endDateObj = selectedReunion.end ? new Date(selectedReunion.end) : null;

  const date = startDateObj
    ? startDateObj.toLocaleDateString("fr-FR", {
        weekday: "long",
        year: "numeric",
        month: "long",
        day: "numeric",
      })
    : "Date non disponible";
  const startTime = startDateObj
    ? startDateObj.toLocaleTimeString([], {
        hour: "2-digit",
        minute: "2-digit",
      })
    : "";
  const endTime = endDateObj
    ? endDateObj.toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" })
    : "";
  const heure =
    startTime && endTime
      ? `${startTime} → ${endTime}`
      : startTime || endTime || "Heure non disponible";

  const statut = selectedReunion.extendedProps?.statut || "Statut inconnu";

  if (loading) {
    return (
      <div className="fixed inset-0 bg-black/60 flex items-center justify-center z-50 px-4 animate-fade-in">
        <div className="flex justify-center items-center h-64">
          <div className="animate-spin rounded-full h-16 w-16 border-b-2 border-indigo-600"></div>
        </div>
      </div>
    );
  }

  return (
    <div className="fixed inset-0 bg-black/60 flex items-center justify-center z-50 px-4 animate-fade-in">
      <div className="bg-white w-full max-w-5xl rounded-3xl shadow-2xl overflow-hidden transform transition-all duration-300 ease-out animate-slide-up max-h-[90vh] overflow-y-auto">
        {/* Header */}
        <div className="bg-gradient-to-r from-indigo-500 to-purple-600 px-8 py-6 border-b border-gray-200">
          <div className="flex justify-between items-center">
            <h2 className="text-3xl font-bold text-white">
              Détails de la Réunion
            </h2>
            <button
              onClick={onClose}
              className="p-3 rounded-full bg-white/20 hover:bg-white/30 transition-all duration-200 hover:rotate-90"
              aria-label="Fermer"
            >
              <X className="w-6 h-6 text-white" />
            </button>
          </div>
        </div>

        {/* Contenido Principal */}
        <div className="p-8 grid grid-cols-1 lg:grid-cols-2 gap-8 text-sm">
          <div className="space-y-6">
            <Info
              label="Titre"
              value={title}
              icon={<User className="w-5 h-5 text-indigo-500" />}
            />
            <Info
              label="Description"
              value={description}
              icon={<FileText className="w-5 h-5 text-indigo-500" />}
            />
            <Info
              label="Type"
              value={type}
              icon={<Tag className="w-5 h-5 text-indigo-500" />}
            />
            <Info
              label="Date"
              value={date}
              icon={<Calendar className="w-5 h-5 text-indigo-500" />}
            />
            <Info
              label="Heure"
              value={heure}
              icon={<Clock className="w-5 h-5 text-indigo-500" />}
            />
            <Info
              label="Statut"
              value={statut}
              icon={<Mail className="w-5 h-5 text-indigo-500" />}
            />
          </div>

          <div className="space-y-6">
            <div>
              <h3 className="text-lg font-semibold text-gray-800 mb-4 flex items-center">
                <Users className="w-5 h-5 text-indigo-500 mr-2" />
                Participants ({membres.length})
              </h3>
              {membres.length > 0 ? (
                <div className="space-y-2 max-h-48 overflow-y-auto">
                  {membres.map((membreId) => {
                    const membre = allMembres.find((m) => m.id === membreId);
                    return membre ? (
                      <div
                        key={membre.id}
                        className="flex items-center p-3 bg-gray-50 rounded-lg shadow-sm hover:bg-gray-100 transition"
                      >
                        <div className="w-10 h-10 bg-indigo-100 rounded-full flex items-center justify-center mr-3">
                          <User className="w-5 h-5 text-indigo-600" />
                        </div>
                        <div>
                          <p className="font-medium text-gray-800">
                            {membre.nom} {membre.prenom}
                          </p>
                          <p className="text-sm text-gray-500">
                            {membre.email}
                          </p>
                        </div>
                      </div>
                    ) : (
                      <p key={membreId} className="text-gray-500">
                        Membre ID {membreId} non trouvé
                      </p>
                    );
                  })}
                </div>
              ) : (
                <p className="text-gray-500 italic">
                  Aucun participant ajouté.
                </p>
              )}
            </div>
          </div>
        </div>

        {/* Footer */}
        <div className="px-8 py-6 border-t border-gray-200 flex justify-center space-x-4">
          <button
            onClick={() => setShowUpdateForm(true)}
            className="px-8 py-3 bg-gradient-to-r from-indigo-600 to-purple-600 text-white font-semibold rounded-xl shadow-lg hover:shadow-xl hover:scale-105 transition-all duration-200"
          >
            Modifier
          </button>
          <button
            onClick={() => {
              deleteReunion(selectedReunion.id, setErr, setSuccessMsg);
            }}
            className="px-8 py-3 bg-gradient-to-r from-red-600 to-red-700 text-white font-semibold rounded-xl shadow-lg hover:shadow-xl hover:scale-105 transition-all duration-200"
          >
            Supprimer
          </button>
        </div>
      </div>
      {showUpdateForm && (
        <UpdateReunion
          ReunionData={selectedReunion}
          onClose={() => setShowUpdateForm(false)}
        />
      )}
    </div>
  );
};

export default ViewReunion;
