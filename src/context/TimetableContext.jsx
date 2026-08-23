import { createContext, useContext, useState, useEffect } from "react";
import { scheduleList as initialSchedule } from "../data/mockData";

const TimetableContext = createContext();
const STORAGE_KEY = "fms_timetable_data_v2";

function loadInitial() {
  const saved = localStorage.getItem(STORAGE_KEY);
  if (saved) {
    try {
      return JSON.parse(saved);
    } catch {
      return initialSchedule;
    }
  }
  return initialSchedule;
}

export function TimetableProvider({ children }) {
  const [schedule, setSchedule] = useState(loadInitial);

  useEffect(() => {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(schedule));
  }, [schedule]);

  return (
    <TimetableContext.Provider value={{ schedule }}>
      {children}
    </TimetableContext.Provider>
  );
}

export function useTimetable() {
  return useContext(TimetableContext);
}
