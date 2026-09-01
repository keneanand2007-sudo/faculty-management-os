import { createContext, useContext, useState, useEffect } from "react";
import { attendanceRecords as initialRecords } from "../data/mockData";

const AttendanceContext = createContext();
const STORAGE_KEY = "fms_attendance_data";

function loadInitial() {
  const saved = localStorage.getItem(STORAGE_KEY);
  if (saved) {
    try {
      return JSON.parse(saved);
    } catch {
      return initialRecords;
    }
  }
  return initialRecords;
}

export function AttendanceProvider({ children }) {
  const [records, setRecords] = useState(loadInitial);

  useEffect(() => {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(records));
  }, [records]);

  const saveAttendance = (date, subjectId, className, entries) => {
    const existingIndex = records.findIndex(
      (r) => r.date === date && r.subjectId === subjectId && r.className === className
    );
    if (existingIndex !== -1) {
      const updated = [...records];
      updated[existingIndex] = { ...updated[existingIndex], entries };
      setRecords(updated);
    } else {
      const newId = "ATT" + String(records.length + 1).padStart(3, "0");
      setRecords([...records, { id: newId, date, subjectId, className, entries }]);
    }
  };

  const getRecord = (date, subjectId, className) =>
    records.find((r) => r.date === date && r.subjectId === subjectId && r.className === className);

  const getStudentPercentage = (studentId) => {
    const relevant = records.filter((r) => r.entries.some((e) => e.studentId === studentId));
    if (relevant.length === 0) return 100;
    const presentCount = relevant.filter(
      (r) => r.entries.find((e) => e.studentId === studentId)?.status === "Present"
    ).length;
    return Math.round((presentCount / relevant.length) * 100);
  };

  return (
    <AttendanceContext.Provider value={{ records, saveAttendance, getRecord, getStudentPercentage }}>
      {children}
    </AttendanceContext.Provider>
  );
}

export function useAttendance() {
  return useContext(AttendanceContext);
}
