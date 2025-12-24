import React, { useContext, useEffect, useState } from "react";
import { Context } from "../../../Context/ContextProvider";
import Input from "../../../components/Input";
import {
  BookMinus,
  CircleDollarSign,
  User,
  Warehouse,
  X,
  Plus,
} from "lucide-react";
import { addReunion } from "../../../Services/Reunions";

const FormAddReunion = ({ onClose }) => {
  const { err, setErr, setSuccessMsg, setAllMembres, allMembres } =
    useContext(Context);

  const [loading, setLoading] = useState(false);
  const [search, setSearch] = useState("");
  const [selectedMembres, setSelectedMembres] = useState([]);

  const [reunionData, setReunionData] = useState({
    title: "",
    description: "",
    start: "",
    end: "",
    membres: [],
    statut: "",
    type: "",
  });

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
      } catch (e) {
        console.error(e);
      } finally {
        setLoading(false);
      }
    };
    fetchMembres();
  }, []);

  const filteredMembres = (allMembres || []).filter(
    (m) =>
      m.nom.toLowerCase().includes(search.toLowerCase()) ||
      m.prenom.toLowerCase().includes(search.toLowerCase())
  );

  const addMembre = (membre) => {
    if (selectedMembres.find((m) => m.id === membre.id)) return;

    const updated = [...selectedMembres, membre];
    setSelectedMembres(updated);

    setReunionData((prev) => ({
      ...prev,
      membres: updated.map((m) => m.id),
    }));

    setSearch("");
  };

  const removeMembre = (id) => {
    const updated = selectedMembres.filter((m) => m.id !== id);
    setSelectedMembres(updated);

    setReunionData((prev) => ({
      ...prev,
      membres: updated.map((m) => m.id),
    }));
  };

  const handleChange = (e) => {
    setReunionData((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  const ReunionSubmit = async (e) => {
    e.preventDefault();
    console.log(reunionData)
    setLoading(true);

    await addReunion(reunionData, setErr, onClose, setSuccessMsg);

    setLoading(false);
  };

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black/60 z-50">
      <div className="bg-white w-full max-w-2xl p-6 rounded-xl relative">
        <button
          onClick={onClose}
          className="absolute top-4 right-4 text-gray-500"
        >
          <X />
        </button>

        <h2 className="text-xl font-bold mb-4">Ajouter une Réunion</h2>

        <form onSubmit={ReunionSubmit} className="space-y-4">
          <Input
            name="title"
            value={reunionData.title}
            onChange={handleChange}
            LabelName="Titre"
            icon={<User />}
            required
          />

          <Input
            name="description"
            value={reunionData.description}
            onChange={handleChange}
            LabelName="Description"
            required
          />

          <div className="grid grid-cols-2 gap-4">
            <Input
              type="datetime-local"
              name="start"
              value={reunionData.start}
              onChange={handleChange}
              LabelName="Début"
              icon={<BookMinus />}
              required
            />

            <Input
              type="datetime-local"
              name="end"
              value={reunionData.end}
              onChange={handleChange}
              LabelName="Fin"
              icon={<CircleDollarSign />}
              required
            />
          </div>

          <Input
            name="type"
            value={reunionData.type}
            onChange={handleChange}
            LabelName="Type"
            icon={<Warehouse />}
            required
          />

          <select
            name="statut"
            value={reunionData.statut}
            onChange={handleChange}
            className="w-full border p-3 rounded-lg"
            required
          >
            <option value="">Statut</option>
            <option value="enAttente">En attente</option>
            <option value="terminee">Terminée</option>
            <option value="annulee">Annulée</option>
          </select>

          {/* Membres */}
          <div>
            <label className="font-medium">Membres</label>

            <div className="flex gap-2 flex-wrap mb-2">
              {selectedMembres.map((m) => (
                <span
                  key={m.id}
                  className="bg-indigo-100 px-3 py-1 rounded-full flex items-center gap-2"
                >
                  {m.nom} {m.prenom}
                  <X
                    size={14}
                    className="cursor-pointer"
                    onClick={() => removeMembre(m.id)}
                  />
                </span>
              ))}
            </div>

            <Input
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              placeholder="Rechercher un membre"
            />

            {search && (
              <div className="border rounded mt-2">
                {filteredMembres.map((m) => (
                  <div
                    key={m.id}
                    className="flex justify-between p-2 hover:bg-gray-100 cursor-pointer"
                    onClick={() => addMembre(m)}
                  >
                    {m.nom} {m.prenom}
                    <Plus />
                  </div>
                ))}
              </div>
            )}
          </div>

          {/* Errors backend */}
          {err?.length > 0 && (
            <div className="bg-red-50 border border-red-200 p-3 rounded">
              {err.map((e, i) => (
                <p key={i} className="text-red-600 text-sm">
                  {e}
                </p>
              ))}
            </div>
          )}

          <div className="flex justify-end gap-3">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2 bg-gray-200 rounded"
            >
              Annuler
            </button>

            <button
              type="submit"
              disabled={loading}
              className="px-4 py-2 bg-indigo-600 text-white rounded disabled:opacity-50"
            >
              {loading ? "Ajout..." : "Ajouter"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default FormAddReunion;
