import { createContext, useContext, useState, useEffect } from "react";
import { subjectsList as initialSubjects } from "../data/mockData";

const SubjectContext = createContext();
const STORAGE_KEY = "fms_subject_data_v4";

function loadInitial() {
  const saved = localStorage.getItem(STORAGE_KEY);
  if (saved) {
    try {
      return JSON.parse(saved);
    } catch {
      return initialSubjects;
    }
  }
  return initialSubjects;
}

export function SubjectProvider({ children }) {
  const [subjects, setSubjects] = useState(loadInitial);

  useEffect(() => {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(subjects));
  }, [subjects]);

  const addSubject = (data) => {
    const newId = "SUB" + String(subjects.length + 1).padStart(3, "0");
    setSubjects([...subjects, { ...data, id: newId, topics: [], notes: [] }]);
  };

  const updateSubject = (id, data) => {
    setSubjects(subjects.map((s) => (s.id === id ? { ...s, ...data } : s)));
  };

  const deleteSubject = (id) => {
    setSubjects(subjects.filter((s) => s.id !== id));
  };

  const addTopic = (subjectId, name) => {
    setSubjects(
      subjects.map((s) =>
        s.id === subjectId
          ? { ...s, topics: [...(s.topics || []), { id: "T" + Date.now(), name, status: "Not Started", date: "" }] }
          : s
      )
    );
  };

  const cycleTopicStatus = (subjectId, topicId) => {
    const order = ["Not Started", "In Progress", "Completed"];
    setSubjects(
      subjects.map((s) => {
        if (s.id !== subjectId) return s;
        return {
          ...s,
          topics: s.topics.map((t) => {
            if (t.id !== topicId) return t;
            const next = order[(order.indexOf(t.status) + 1) % order.length];
            return { ...t, status: next, date: next === "Completed" ? new Date().toISOString().slice(0, 10) : t.date };
          }),
        };
      })
    );
  };

  const deleteTopic = (subjectId, topicId) => {
    setSubjects(
      subjects.map((s) => (s.id === subjectId ? { ...s, topics: s.topics.filter((t) => t.id !== topicId) } : s))
    );
  };

  const addNote = (subjectId, title, content) => {
    setSubjects(
      subjects.map((s) =>
        s.id === subjectId
          ? {
              ...s,
              notes: [
                ...(s.notes || []),
                { id: "N" + Date.now(), title, content, date: new Date().toISOString().slice(0, 10) },
              ],
            }
          : s
      )
    );
  };

  const deleteNote = (subjectId, noteId) => {
    setSubjects(
      subjects.map((s) => (s.id === subjectId ? { ...s, notes: s.notes.filter((n) => n.id !== noteId) } : s))
    );
  };

  return (
    <SubjectContext.Provider
      value={{ subjects, addSubject, updateSubject, deleteSubject, addTopic, cycleTopicStatus, deleteTopic, addNote, deleteNote }}
    >
      {children}
    </SubjectContext.Provider>
  );
}

export function useSubjects() {
  return useContext(SubjectContext);
}
