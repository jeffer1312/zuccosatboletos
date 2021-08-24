import { createContext, useContext, useEffect, useState } from 'react';
import Router from 'next/router';

type StatesType = {
  HandleShowSidebar: (value) => void;

  showSidebar: boolean;
};
//Criando contexto
export const ContextSide = createContext({} as StatesType);

//funçao para poder exportar esse contexto por toda a aplicação
export function SideProvider({ children }) {
  const [showSidebar, setShowSidebar] = useState(true);

  function HandleShowSidebar(value: boolean) {
    setShowSidebar(value);
  }

  return (
    <ContextSide.Provider
      value={{
        HandleShowSidebar,
        showSidebar,
      }}
    >
      {children}
    </ContextSide.Provider>
  );
}

export function useHandleShowSidebar() {
  const context = useContext(ContextSide);
  const { HandleShowSidebar } = context;
  return { HandleShowSidebar };
}
export function useShowSidebar() {
  const context = useContext(ContextSide);
  const { showSidebar } = context;
  return { showSidebar };
}
