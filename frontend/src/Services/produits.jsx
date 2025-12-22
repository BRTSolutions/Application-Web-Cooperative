import Api from "./api";

export const addProduit = async (produit, setErr, onClose,setSuccessMsg) => {
  try {
    await Api.post("/add_produit", produit);
    setErr([]);
    onClose();
    setSuccessMsg("produit ajouté avec succès !");
     setTimeout(() => setSuccessMsg(""), 3000);
  } catch (err) {
    handleErrors(err, setErr);
    return false;
  }
};


export const deleteProduit = async(produitID,setErr,setSuccessMsg)=>{
  try{
    await Api.delete("/sup_produit",produitID);
    setErr([])
    setSuccessMsg("produit supprimé avec succés !");
  }catch(err){
    handleErrors(err, setErr);
    return false;
  }
}

export const updateProduit = async(produit,setErr,setSuccessMsg,onClose)=>{
  try{
    await Api.put(`modif_produit/${produit.id}`,produit);
    setErr([])
    onClose();
    setSuccessMsg("produit modifé avec succés !");
  }catch(err){
    handleErrors(err, setErr);
    return false;
  }
}


export const getAllProduits = async (setErr) => {
  try {
    const res = await Api.get("/get_all_produits");
    setErr([]);
    return res.data;
  } catch (err) {
    handleErrors(err, setErr);
    return [];
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