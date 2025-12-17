import React, { createContext, useState } from "react";

export const Context = createContext();

export const ContextProvider = ({ children }) => {
    const [err,setErr] = useState([])
    const [allMembres,setAllMembres] = useState([]);
    const [successMsg, setSuccessMsg] = useState("");

  return (
    <Context.Provider
      value={{err,setErr,allMembres,setAllMembres,successMsg, setSuccessMsg}}
    >
      {children}
    </Context.Provider>
  );
};
