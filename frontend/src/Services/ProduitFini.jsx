import Api from "./api";

export const addProduitFini = async (Pf, setErr, onClose,setSuccessMsg) => {
  try {
    await Api.post("/add_produit_fini", Pf);
    setErr([]);
    onClose();
    setSuccessMsg("produit fini ajouté avec succès !");
     setTimeout(() => setSuccessMsg(""), 3000);
  } catch (err) {
    handleErrors(err, setErr);
    return false;
  }
};


export const deleteProduitFini = async(PfID,setErr,setSuccessMsg)=>{
  try{
    await Api.delete("/sup_produit_fini",PfID);
    setErr([])
    setSuccessMsg("produit fini supprimé avec succés !");
  }catch(err){
    handleErrors(err, setErr);
    return false;
  }
}

export const getAllProduitsFinis = async (setErr) => {
  try {
    const res = await Api.get("/get_all_produits_finis");
    setErr([]);
    return res.data;
  } catch (err) {
    handleErrors(err, setErr);
    return [];
  }
};

export const updateProduitFini = async(Pf,setErr,setSuccessMsg,onClose)=>{
  try{
    await Api.put(`modif_produit_fini/${Pf.id}`,Pf);
    setErr([])
    onClose();
    setSuccessMsg("produit fini modifé avec succés !");
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