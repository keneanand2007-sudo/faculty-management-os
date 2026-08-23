import { createContext, useContext, useState, useEffect } from "react";
import { functionsList as initialFunctions } from "../data/mockData";

const EventContext = createContext();
const STORAGE_KEY = "fms_event_data_v2";

function loadInitial() {
  const saved = localStorage.getItem(STORAGE_KEY);
  if (saved) {
    try {
      return JSON.parse(saved);
    } catch {
      return initialFunctions;
    }
  }
  return initialFunctions;
}

export function EventProvider({ children }) {
  const [events, setEvents] = useState(loadInitial);

  useEffect(() => {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(events));
  }, [events]);

  const addEvent = (data) => {
    const newId = "EVT" + String(events.length + 1).padStart(3, "0");
    setEvents([...events, { ...data, id: newId, checklist: [], scheduleItems: [], usedBudget: 0 }]);
  };

  const updateEvent = (id, data) => {
    setEvents(events.map((e) => (e.id === id ? { ...e, ...data } : e)));
  };

  const deleteEvent = (id) => {
    setEvents(events.filter((e) => e.id !== id));
  };

  const addChecklistItem = (eventId, name) => {
    setEvents(
      events.map((e) =>
        e.id === eventId
          ? { ...e, checklist: [...e.checklist, { id: "CHK" + Date.now(), name, status: "Pending" }] }
          : e
      )
    );
  };

  const toggleChecklistItem = (eventId, itemId) => {
    setEvents(
      events.map((e) =>
        e.id === eventId
          ? {
              ...e,
              checklist: e.checklist.map((c) =>
                c.id === itemId ? { ...c, status: c.status === "Completed" ? "Pending" : "Completed" } : c
              ),
            }
          : e
      )
    );
  };

  const addScheduleItem = (eventId, time, title) => {
    setEvents(
      events.map((e) =>
        e.id === eventId
          ? { ...e, scheduleItems: [...e.scheduleItems, { id: "SCH" + Date.now(), time, title }] }
          : e
      )
    );
  };

  return (
    <EventContext.Provider
      value={{ events, addEvent, updateEvent, deleteEvent, addChecklistItem, toggleChecklistItem, addScheduleItem }}
    >
      {children}
    </EventContext.Provider>
  );
}

export function useEvents() {
  return useContext(EventContext);
}
