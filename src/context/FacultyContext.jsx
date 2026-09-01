import { createContext, useContext, useState, useEffect } from "react";
import { facultyList as initialFaculty } from "../data/mockData";

const FacultyContext = createContext();
const STORAGE_KEY = "fms_faculty_data_v3";

function loadInitial() {
  const saved = localStorage.getItem(STORAGE_KEY);
  if (saved) {
    try {
      return JSON.parse(saved);
    } catch {
      return initialFaculty;
    }
  }
  return initialFaculty;
}

export function FacultyProvider({ children }) {
  const [faculty, setFaculty] = useState(loadInitial);

  useEffect(() => {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(faculty));
  }, [faculty]);

  const isEmailTaken = (email, excludeId = null) =>
    faculty.some((f) => f.email.toLowerCase() === email.toLowerCase() && f.id !== excludeId);

  const addFaculty = (data) => {
    const newId = "FAC" + String(faculty.length + 1).padStart(3, "0");
    const initials = data.name.split(" ").map((n) => n[0]).slice(-2).join("").toUpperCase();
    setFaculty([
      ...faculty,
      { ...data, id: newId, photo: initials, subjects: 0, classes: 0, workload: 0, attendance: 100, status: data.status || "Active" },
    ]);
  };

  const updateFaculty = (id, data) => {
    setFaculty(faculty.map((f) => (f.id === id ? { ...f, ...data } : f)));
  };

  const deleteFaculty = (id) => {
    setFaculty(faculty.filter((f) => f.id !== id));
  };

  const setFacultyStatus = (id, status) => {
    setFaculty(faculty.map((f) => (f.id === id ? { ...f, status } : f)));
  };

  return (
    <FacultyContext.Provider value={{ faculty, addFaculty, updateFaculty, deleteFaculty, setFacultyStatus, isEmailTaken }}>
      {children}
    </FacultyContext.Provider>
  );
}

export function useFaculty() {
  return useContext(FacultyContext);
}
