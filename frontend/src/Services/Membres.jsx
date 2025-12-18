import Api from "./api";

export const addMembre = async (membre, setErr, onClose,setSuccessMsg) => {
  try {
    await Api.post("/add_membre", membre);
    setErr([]);
    onClose();
    setSuccessMsg("Membre ajouté avec succès !");
     setTimeout(() => setSuccessMsg(""), 3000);
  } catch (err) {
    handleErrors(err, setErr);
    return false;
  }
};

export const getAllMembres = async (setErr) => {
  try {
    const res = await Api.get("/get_all_membres");
    setErr([]);
    return res.data;
  } catch (err) {
    handleErrors(err, setErr);
    return [];
  }
};

export const updateMembre = async (membreUpdated, setErr, onClose,setSuccessMsg) => {
  try {
    await Api.put(
      `/update_membre/${membreUpdated.id}`,
      membreUpdated
    );
    setErr([]);
    onClose();
    setSuccessMsg("Membre modifié avec succès !");
     setTimeout(() => setSuccessMsg(""), 3000);
  } catch (err) {
    handleErrors(err, setErr);
    return false;
  }
};



const handleErrors = (err, setErr) => {
  if (err.response?.data?.errors) {
    setErr(Object.values(err.response.data.errors).flat());
  } else if (err.response?.data?.message) {
    setErr([err.response.data.message]);
  } else {
    setErr(["Something went wrong."]);
  }
};
