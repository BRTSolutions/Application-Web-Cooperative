import React, { createContext, useState } from "react";

export const Context = createContext();

export const ContextProvider = ({ children }) => {
    const [err,setErr] = useState([])

  return (
    <Context.Provider
      value={{err,setErr}}
    >
      {children}
    </Context.Provider>
  );
};
