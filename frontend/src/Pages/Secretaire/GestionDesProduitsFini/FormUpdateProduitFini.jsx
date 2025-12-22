import React, { useContext, useState } from "react";
import { Context } from "../../../Context/ContextProvider";
import Input from "../../../components/Input";
import {
  BookMinus,
  CircleDollarSign,
  Flag,
  Mail,
  Phone,
  User,
  Warehouse,
} from "lucide-react";
import { updateProduitFini } from "../../../Services/ProduitFini";

const FormUpdateProduitFini = ({ PfData, onClose }) => {
  const [PfUpdated, setPfUpdated] = useState(PfData);
  const [loading, setLoading] = useState(false);
  const { err, setErr, setSuccessMsg } = useContext(Context);

  const handleChange = (e) => {
    setPfUpdated({ ...PfUpdated, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    setLoading(true);
    const dataToSend = {
      ...PfData,
      dateMiseAJour: new Date().toISOString(),
    };
    e.preventDefault();
    await updateProduitFini(dataToSend, setErr, setSuccessMsg);
    console.log("Updated produit fini:", PfData, onClose);
    setLoading(false);
  };
  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black/40 z-50 p-4">
      <div className="bg-white w-full max-w-md md:max-w-lg lg:w-1/3 p-6 rounded-xl shadow-2xl max-h-[90vh] overflow-y-auto">
        <h2 className="text-xl font-semibold mb-4">Modifier un produit fini</h2>
        <form onSubmit={handleSubmit}>
          <div className="flex flex-col gap-7">
            <div className="flex flex-col md:flex-row justify-between gap-5">
              <Input
                type="text"
                name={"reference"}
                value={PfUpdated.reference}
                onChange={handleChange}
                placeholder={"Réference"}
                icon={<User />}
                LabelName={"Réference"}
              />
              <Input
                type="text"
                name={"nom"}
                value={PfUpdated.nom}
                onChange={handleChange}
                placeholder={"Nom de produit fini"}
                icon={<User />}
                LabelName={"Nom de produit fini"}
              />
            </div>
            <Input
              type="text"
              name={"categorie"}
              value={PfUpdated.categorie}
              onChange={handleChange}
              placeholder={"catégorie"}
              icon={<BookMinus />}
              LabelName={"catégorie"}
            />
            <Input
              type="number"
              name={"prix"}
              value={PfUpdated.prix}
              onChange={handleChange}
              placeholder={"Prix"}
              icon={<CircleDollarSign />}
              LabelName={"Prix"}
            />
            <Input
              type="number"
              name={"stock"}
              value={PfUpdated.stock}
              onChange={handleChange}
              placeholder={"Stock"}
              icon={<Warehouse />}
              LabelName={"Stock"}
            />

            <div>
              <select
                name="statut"
                value={PfUpdated.statut}
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
                <option value="disponible">Disponible</option>
                <option value="indisponible">Indisponible</option>
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
            <div className="flex flex-col sm:flex-row justify-end gap-2 mt-2">
              <button
                type="button"
                onClick={() => {
                  setErr([]);
                  onClose();
                }}
                className="px-4 py-2 rounded bg-gray-200 hover:bg-gray-300 w-full sm:w-auto"
              >
                Annuler
              </button>
              <button
                type="submit"
                disabled={loading}
                className="px-4 py-2 rounded bg-[var(--primary-color)] text-white hover:bg-indigo-700 w-full sm:w-auto flex items-center justify-center"
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
                {loading ? "Modification en cours..." : "Modifier"}
              </button>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
};

export default FormUpdateProduitFini;
