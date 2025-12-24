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
  Search,
} from "lucide-react";
import { updateReunion } from "../../../Services/Reunions";

const FormUpdateReunion = ({ ReunionData, onClose }) => {
  const { err, setErr, setSuccessMsg, setAllMembres, allMembres } =
    useContext(Context);

  const [loading, setLoading] = useState(false);
  const [search, setSearch] = useState("");
  const [selectedMembres, setSelectedMembres] = useState([]);

  const [reunionData, setReunionData] = useState({
    id: ReunionData.id,
    title: ReunionData.title || "",
    description: ReunionData.extendedProps?.description || "",
    start: ReunionData.start
      ? new Date(ReunionData.start).toISOString().slice(0, 16)
      : "",
    end: ReunionData.end
      ? new Date(ReunionData.end).toISOString().slice(0, 16)
      : "",
    membres: ReunionData.extendedProps?.membres || [],
    statut: ReunionData.extendedProps?.statut || "",
    type: ReunionData.extendedProps?.type || "",
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

  useEffect(() => {
    if (Array.isArray(allMembres) && Array.isArray(reunionData.membres)) {
      const selected = allMembres.filter((m) =>
        reunionData.membres.includes(m.id)
      );
      setSelectedMembres(selected);
    }
  }, [allMembres, reunionData.membres]);

  const filteredMembres = (allMembres || []).filter(
    (m) =>
      m.nom.toLowerCase().includes(search.toLowerCase()) ||
      m.prenom.toLowerCase().includes(search.toLowerCase())
  );

  const addMembre = (membre) => {
    if (selectedMembres.some((m) => m.id === membre.id)) return;

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
    setLoading(true);

    await updateReunion(reunionData, setErr, onClose, setSuccessMsg);

    setLoading(false);
  };

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black/60 z-50 p-4">
      <div className="bg-white w-full max-w-2xl p-6 rounded-2xl relative max-h-[90vh] overflow-y-auto">
        <button
          onClick={() => {
            setErr([]);
            onClose();
          }}
          className="absolute top-4 right-4 text-gray-500"
        >
          <X />
        </button>

        <h2 className="text-2xl font-bold mb-6 text-center">
          Modifier une Réunion
        </h2>

        <form onSubmit={ReunionSubmit} className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
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
              icon={<User />}
              required
            />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <Input
              type="datetime-local"
              name="start"
              value={reunionData.start}
              onChange={handleChange}
              LabelName="Date de début"
              icon={<BookMinus />}
              required
            />

            <Input
              type="datetime-local"
              name="end"
              value={reunionData.end}
              onChange={handleChange}
              LabelName="Date de fin"
              icon={<CircleDollarSign />}
              required
            />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <Input
              name="type"
              value={reunionData.type}
              onChange={handleChange}
              LabelName="Type"
              icon={<Warehouse />}
              required
            />

            <div>
              <label className="block text-sm mb-1">Statut</label>
              <select
                name="statut"
                value={reunionData.statut}
                onChange={handleChange}
                className="w-full border rounded-lg px-4 py-3"
                required
              >
                <option value="">Statut</option>
                <option value="enAttente">En attente</option>
                <option value="terminee">Terminée</option>
                <option value="annulee">Annulée</option>
              </select>
            </div>
          </div>

          <div>
            <label className="block font-medium mb-2">
              Membres participants
            </label>

            <div className="flex flex-wrap gap-2 mb-3">
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
              placeholder="Rechercher un membre..."
              icon={<Search />}
            />

            {search && (
              <div className="border rounded-lg mt-2 max-h-48 overflow-y-auto">
                {filteredMembres.length > 0 ? (
                  filteredMembres.map((m) => (
                    <div
                      key={m.id}
                      onClick={() => addMembre(m)}
                      className="flex justify-between px-4 py-2 hover:bg-gray-100 cursor-pointer"
                    >
                      {m.nom} {m.prenom}
                      <Plus />
                    </div>
                  ))
                ) : (
                  <p className="p-3 text-gray-500">Aucun membre trouvé</p>
                )}
              </div>
            )}
          </div>

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
              onClick={() => {
                setErr([]);
                onClose();
              }}
              className="px-4 py-2 bg-gray-200 rounded"
            >
              Annuler
            </button>

            <button
              type="submit"
              disabled={loading || reunionData.membres.length === 0}
              className="px-4 py-2 bg-indigo-600 text-white rounded disabled:opacity-50"
            >
              {loading ? "Mise à jour..." : "Mettre à jour"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default FormUpdateReunion;
