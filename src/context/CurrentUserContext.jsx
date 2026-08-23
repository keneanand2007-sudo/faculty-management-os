import { createContext, useContext, useState } from "react";

const CurrentUserContext = createContext();

export function CurrentUserProvider({ children }) {
  const [currentFacultyId, setCurrentFacultyId] = useState("FAC002");

  return (
    <CurrentUserContext.Provider value={{ currentFacultyId, setCurrentFacultyId }}>
      {children}
    </CurrentUserContext.Provider>
  );
}

export function useCurrentUser() {
  return useContext(CurrentUserContext);
}
