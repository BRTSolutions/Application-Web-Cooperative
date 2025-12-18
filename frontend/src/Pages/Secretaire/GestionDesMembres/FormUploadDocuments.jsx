import React, { useContext, useState } from "react";
import { X } from "lucide-react";
import { InputFile } from "../../../components/InputFile";
import { postDocuments } from "../../../Services/MembreDocuments";
import { Context } from "../../../Context/ContextProvider";

const FormUploadDocuments = ({ membreId, onClose }) => {
  const { err, setErr, setSuccessMsg } = useContext(Context);
  const [files, setFiles] = useState({
    cin: null,
    photo: null,
    receipt: null,
  });

  const handleChange = (e) => {
    const { name, files: selectedFiles } = e.target;
    const file = selectedFiles[0];
    if (!file) return;

    // Validation type
    const allowedTypes = {
      rectoCIN: ["image/jpeg", "image/png", "application/pdf"],
      versoCIN: ["image/jpeg", "image/png", "application/pdf"],
      photo: ["image/jpeg", "image/png"],
      receipt: ["image/jpeg", "image/png", "application/pdf"],
    };

    if (!allowedTypes[name].includes(file.type)) {
      setErr([`Type de fichier invalide pour ${name}`]);
      return;
    }

    // Validation taille max 2MB
    const maxSize = 2 * 1024 * 1024;
    if (file.size > maxSize) {
      setErr([`Le fichier ${name} est trop lourd (max 2MB)`]);
      return;
    }

    setErr([]);
    setFiles({ ...files, [name]: file });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!files.rectoCIN || !files.versoCIN) {
      setErr(["Veuillez uploader les deux faces de la CIN."]);
      return;
    }

    const formData = new FormData();
    formData.append("rectoCIN", files.rectoCIN);
    formData.append("versoCIN", files.versoCIN);
    if (files.photo) formData.append("photo", files.photo);
    if (files.receipt) formData.append("receipt", files.receipt);
    formData.append("membre_id", membreId);

    await postDocuments(membreId, formData, setErr, setSuccessMsg);
  };

  return (
    <div className="fixed inset-0 bg-black/40 flex items-center justify-center z-50 px-4">
      <div className="bg-white w-full max-w-lg rounded-2xl shadow-xl">
        {/* Header */}
        <div className="flex justify-between items-center px-6 py-4 border-b">
          <h2 className="text-lg font-semibold">Upload des documents</h2>
          <button
            onClick={() => {
              onClose();
              setErr([]);
            }}
          >
            <X />
          </button>
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit} className="p-6 space-y-4">
          <InputFile
            label="CIN Recto"
            name="rectoCIN"
            onChange={handleChange}
            accept="image/*,.pdf"
          />

          <InputFile
            label="CIN Verso"
            name="versoCIN"
            onChange={handleChange}
            accept="image/*,.pdf"
          />

          <InputFile
            label="Photo"
            name="photo"
            onChange={handleChange}
            accept="image/*"
          />

          <InputFile
            label="Reçu de paiement"
            name="receipt"
            onChange={handleChange}
            accept="image/*,.pdf"
          />

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

          <button
            type="submit"
            className="w-full py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700"
          >
            Uploader
          </button>
        </form>
      </div>
    </div>
  );
};

export default FormUploadDocuments;
