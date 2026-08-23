import { createContext, useContext, useState, useEffect } from "react";
import { leavesList as initialLeaves } from "../data/mockData";

const LeaveContext = createContext();
const STORAGE_KEY = "fms_leave_data";

function loadInitial() {
  const saved = localStorage.getItem(STORAGE_KEY);
  if (saved) {
    try {
      return JSON.parse(saved);
    } catch {
      return initialLeaves;
    }
  }
  return initialLeaves;
}

export function LeaveProvider({ children }) {
  const [leaves, setLeaves] = useState(loadInitial);

  useEffect(() => {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(leaves));
  }, [leaves]);

  const applyLeave = (data) => {
    const newId = "LV" + String(leaves.length + 1).padStart(3, "0");
    setLeaves([...leaves, { ...data, id: newId, status: "Pending", hodRemarks: "" }]);
  };

  const updateLeaveStatus = (id, status, remarks) => {
    setLeaves(leaves.map((l) => (l.id === id ? { ...l, status, hodRemarks: remarks } : l)));
  };

  return (
    <LeaveContext.Provider value={{ leaves, applyLeave, updateLeaveStatus }}>
      {children}
    </LeaveContext.Provider>
  );
}

export function useLeaves() {
  return useContext(LeaveContext);
}
