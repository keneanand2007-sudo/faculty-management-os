import { createContext, useContext, useState, useEffect } from "react";
import { competitionsList as initialCompetitions } from "../data/mockData";

const CompetitionContext = createContext();
const STORAGE_KEY = "fms_competition_data";

function loadInitial() {
  const saved = localStorage.getItem(STORAGE_KEY);
  if (saved) {
    try {
      return JSON.parse(saved);
    } catch {
      return initialCompetitions;
    }
  }
  return initialCompetitions;
}

export function CompetitionProvider({ children }) {
  const [competitions, setCompetitions] = useState(loadInitial);

  useEffect(() => {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(competitions));
  }, [competitions]);

  const addCompetition = (data) => {
    const newId = "COMP" + String(competitions.length + 1).padStart(3, "0");
    setCompetitions([...competitions, { ...data, id: newId, participants: [], results: [] }]);
  };

  const updateCompetition = (id, data) => {
    setCompetitions(competitions.map((c) => (c.id === id ? { ...c, ...data } : c)));
  };

  const deleteCompetition = (id) => {
    setCompetitions(competitions.filter((c) => c.id !== id));
  };

  const addParticipant = (compId, name, className) => {
    setCompetitions(
      competitions.map((c) =>
        c.id === compId
          ? { ...c, participants: [...c.participants, { id: "P" + Date.now(), name, className }] }
          : c
      )
    );
  };

  const removeParticipant = (compId, participantId) => {
    setCompetitions(
      competitions.map((c) =>
        c.id === compId
          ? {
              ...c,
              participants: c.participants.filter((p) => p.id !== participantId),
              results: c.results.filter((r) => r.participantId !== participantId),
            }
          : c
      )
    );
  };

  const saveResult = (compId, participantId, position, score) => {
    setCompetitions(
      competitions.map((c) => {
        if (c.id !== compId) return c;
        const existing = c.results.filter((r) => r.participantId !== participantId);
        return { ...c, results: [...existing, { participantId, position: Number(position), score: Number(score) }] };
      })
    );
  };

  return (
    <CompetitionContext.Provider
      value={{ competitions, addCompetition, updateCompetition, deleteCompetition, addParticipant, removeParticipant, saveResult }}
    >
      {children}
    </CompetitionContext.Provider>
  );
}

export function useCompetitions() {
  return useContext(CompetitionContext);
}
