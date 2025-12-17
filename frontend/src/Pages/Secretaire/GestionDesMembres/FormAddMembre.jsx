import React, { useContext, useState } from "react";
import Input from "../../../components/Input";
import { Mail, Phone, User, UserCheck } from "lucide-react";
import { addMembre } from "../../../Services/Membres";
import { Context } from "../../../Context/ContextProvider";

const FormMembre = ({ onClose }) => {
  const { err, setErr,setSuccessMsg } = useContext(Context);
  const [loading, setLoading] = useState(false);
  const [membreData, setMembreData] = useState({
    prenom: "",
    nom: "",
    email: "",
    telephone: "",
    status: "active",
  });

  const handleChange = (e) => {
    setMembreData({
      ...membreData,
      [e.target.name]: e.target.value,
    });
  };

  const MembreSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    await addMembre(membreData, setErr, onClose,setSuccessMsg);
    setLoading(false);
    console.log(membreData);
  };
  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black/40 z-50">
      <div className="bg-white w-1/3 p-6 rounded-xl shadow-2xl">
        <h2 className="text-xl font-semibold mb-4">Ajouter un membre</h2>
        <form onSubmit={MembreSubmit}>
          <div className="flex flex-col gap-7">
            <div className="flex justify-between gap-5">
              <Input
                type="text"
                name={"nom"}
                value={membreData.nom}
                onChange={handleChange}
                placeholder={"Nom"}
                icon={<User />}
                LabelName={"Nom"}
              />
              <Input
                type="text"
                name={"prenom"}
                value={membreData.prenom}
                onChange={handleChange}
                placeholder={"Prenom"}
                icon={<User />}
                LabelName={"Prenom"}
              />
            </div>
            <Input
              type="email"
              name={"email"}
              value={membreData.email}
              onChange={handleChange}
              placeholder={"Email"}
              icon={<Mail />}
              LabelName={"Email"}
            />
            <Input
              type="tel"
              name={"telephone"}
              value={membreData.telephone}
              onChange={handleChange}
              placeholder={"Telephone"}
              icon={<Phone />}
              LabelName={"Telephone"}
            />

            <div>
              <select
                name="status"
                value={membreData.status}
                onChange={handleChange}
                className="
          w-full
          bg-gray-100
          border border-black
          rounded-lg
          px-3 py-2
          shadow-md
          placeholder-gray-500
          focus:outline-none
          focus:bg-white
          focus:ring-2 focus:ring-indigo-500
          transition
          pl-10
        "
              >
                <option value="active">Active</option>
                <option value="No Active">No active</option>
              </select>
            </div>
            <div>
              {err.map((err, index) => (
                <div
                  key={index}
                  className="flex items-center bg-red-100 border border-red-400 text-red-700 px-4 py-2 rounded mb-2 shadow-sm animate-fadeIn"
                >
                  <svg
                    className="w-5 h-5 mr-2"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M12 9v2m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                    />
                  </svg>
                  <span className="text-sm">{err}</span>
                </div>
              ))}
            </div>
            <div className="flex justify-end gap-2 mt-2">
              <button
                type="button"
                onClick={() => {
                  setErr([]);
                  onClose();
                }}
                className="px-4 py-2 rounded bg-gray-200 hover:bg-gray-300"
              >
                Annuler
              </button>
              <button
                type="submit"
                disabled={loading}
                className="px-4 py-2 rounded bg-[var(--primary-color)] text-white hover:bg-indigo-700"
              >
                {loading ? (
                  <svg
                    className="w-5 h-5 mr-2 text-white animate-spin"
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                  >
                    <circle
                      className="opacity-25"
                      cx="12"
                      cy="12"
                      r="10"
                      stroke="currentColor"
                      strokeWidth="4"
                    ></circle>
                    <path
                      className="opacity-75"
                      fill="currentColor"
                      d="M4 12a8 8 0 018-8v4a4 4 0 00-4 4H4z"
                    ></path>
                  </svg>
                ) : null}
                {loading ? "" : "Ajouter"}
              </button>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
};

export default FormMembre;
