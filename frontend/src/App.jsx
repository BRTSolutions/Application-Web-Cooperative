import { ContextProvider } from "./Context/ContextProvider";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Login from "./Pages/Auth/Login";

function App() {
  return (
    <>
      <BrowserRouter>
        <ContextProvider>
          <Routes>
            <Route path="/login" element={<Login />} />
          </Routes>
        </ContextProvider>
      </BrowserRouter>
    </>
  );
}

export default App;
