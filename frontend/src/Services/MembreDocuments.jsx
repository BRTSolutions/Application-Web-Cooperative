import Api from "./api";

export const postDocuments = async (
  membreId,
  formData,
  setErr,
  setSuccessMsg
) => {
  try {
    await Api.post(`/membres/${membreId}/documents`, formData);
    setSuccessMsg("Documents uploadés avec succès");
    setErr([])
  } catch (err) {
    if (err.response?.data?.errors) {
      setErr(err.response.data.errors);
    } else {
      setErr(["Erreur lors de l'upload des documents"]);
    }
  }
};
