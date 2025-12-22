import { ContextProvider } from "./Context/ContextProvider";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Login from "./Pages/Auth/Login";
import Membres from "./Pages/Secretaire/GestionDesMembres/Membres";
import SecretaireLayout from "./Layout/SecretaireLayout";
import Dashboard from "./Pages/Secretaire/Dashboard/dashboard";
import Produits from "./Pages/Secretaire/GestionDesProduits/Produits";
import Reunions from "./Pages/Secretaire/GestionsDesReunions/Reunions";
import Profil from "./Pages/Secretaire/Profil/Profil";
import ProduuitFinis from "./Pages/Secretaire/GestionDesProduitsFini/ProduitsFinis";

function App() {
  return (
    <>
      <BrowserRouter>
        <ContextProvider>
          <Routes>
            <Route path="/login" element={<Login />} />
            <Route path="/secretaire" element={<SecretaireLayout/>}>
            <Route path="dashboard" element={<Dashboard/>}/>
            <Route path="membre" element={<Membres/>}/>
            <Route path="produits" element={<Produits/>}/>
            <Route path="produits_finis" element={<ProduuitFinis/>}/>
            <Route path="reunions" element={<Reunions/>}/>
            <Route path="profil" element={<Profil/>}/>
            </Route>
          </Routes>
        </ContextProvider>
      </BrowserRouter>
    </>
  );
}

export default App;
