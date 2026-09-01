import { createContext, useContext, useState, useEffect } from "react";
import { studentsList as initialStudents } from "../data/mockData";

const StudentContext = createContext();
const STORAGE_KEY = "fms_student_data_v2";

function loadInitial() {
  const saved = localStorage.getItem(STORAGE_KEY);
  if (saved) {
    try {
      return JSON.parse(saved);
    } catch {
      return initialStudents;
    }
  }
  return initialStudents;
}

export function StudentProvider({ children }) {
  const [students, setStudents] = useState(loadInitial);

  useEffect(() => {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(students));
  }, [students]);

  const addStudent = (data) => {
    const newId = "STU" + String(students.length + 1).padStart(3, "0") + "_" + Date.now().toString().slice(-4);
    setStudents([...students, { ...data, id: newId }]);
  };

  const addStudentsBulk = (rows) => {
    const newStudents = rows.map((r, i) => ({
      id: "STU" + Date.now().toString().slice(-6) + "_" + i,
      name: r.name,
      rollNo: r.rollNo,
      className: r.className,
    }));
    setStudents([...students, ...newStudents]);
    return newStudents.length;
  };

  const updateStudent = (id, data) => {
    setStudents(students.map((s) => (s.id === id ? { ...s, ...data } : s)));
  };

  const deleteStudent = (id) => {
    setStudents(students.filter((s) => s.id !== id));
  };

  const isRollNoTaken = (rollNo, className, excludeId = null) =>
    students.some((s) => s.rollNo === rollNo && s.className === className && s.id !== excludeId);

  return (
    <StudentContext.Provider
      value={{ students, addStudent, addStudentsBulk, updateStudent, deleteStudent, isRollNoTaken }}
    >
      {children}
    </StudentContext.Provider>
  );
}

export function useStudents() {
  return useContext(StudentContext);
}
