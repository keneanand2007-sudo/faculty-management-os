import { createContext, useContext, useState, useEffect } from "react";
import { activitiesList as initialActivities } from "../data/mockData";

const ActivityContext = createContext();
const STORAGE_KEY = "fms_activity_data";

function loadInitial() {
  const saved = localStorage.getItem(STORAGE_KEY);
  if (saved) {
    try {
      return JSON.parse(saved);
    } catch {
      return initialActivities;
    }
  }
  return initialActivities;
}

export function ActivityProvider({ children }) {
  const [activities, setActivities] = useState(loadInitial);

  useEffect(() => {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(activities));
  }, [activities]);

  const addActivity = (data) => {
    const newId = "ACT" + String(activities.length + 1).padStart(3, "0");
    setActivities([...activities, { ...data, id: newId }]);
  };

  const updateActivity = (id, data) => {
    setActivities(activities.map((a) => (a.id === id ? { ...a, ...data } : a)));
  };

  const deleteActivity = (id) => {
    setActivities(activities.filter((a) => a.id !== id));
  };

  return (
    <ActivityContext.Provider value={{ activities, addActivity, updateActivity, deleteActivity }}>
      {children}
    </ActivityContext.Provider>
  );
}

export function useActivities() {
  return useContext(ActivityContext);
}
