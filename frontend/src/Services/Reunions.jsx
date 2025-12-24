import Api from "./api";

export const getAllReunions= async (setErr) => {
  try {
    const res = await Api.get("/get_all_Reunions");
    setErr([]);
    return res.data;
  } catch (err) {
    handleErrors(err, setErr);
    return [];
  }
};


export const addReunion = async (Reunion, setErr, onClose,setSuccessMsg) => {
  try {
    await Api.post("/add_reunion", Reunion);
    setErr([]);
    onClose();
    setSuccessMsg("Reunion ajouté avec succès !");
     setTimeout(() => setSuccessMsg(""), 3000);
  } catch (err) {
    handleErrors(err, setErr);
    return false;
  }
};


export const updateReunion = async(reunion,setErr,onClose,setSuccessMsg)=>{
  try{
    await Api.put(`modif_reunion/${reunion.id}`,reunion);
    setErr([])
    onClose();
    setSuccessMsg("Reunion modifé avec succés !");
  }catch(err){
    handleErrors(err, setErr);
    return false;
  }
}


export const deleteReunion = async(ReunionID,setErr,setSuccessMsg)=>{
  try{
    await Api.delete("/sup_reunion",ReunionID);
    setErr([])
    setSuccessMsg("Reunion supprimé avec succés !");
  }catch(err){
    handleErrors(err, setErr);
    return false;
  }
}

const handleErrors = (err, setErr) => {
  if (err.response?.data?.errors) {
    setErr(Object.values(err.response.data.errors).flat());
  } else if (err.response?.data?.message) {
    setErr([err.response.data.message]);
  } else {
    setErr(["Something went wrong."]);
  }
};