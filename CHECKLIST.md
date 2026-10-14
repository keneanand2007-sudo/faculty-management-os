# 🧪 Testing Checklist & Verification Guide

This document outlines the testing flows and module-by-module verification checklist for the Faculty Management OS.

## 1️⃣ Login Flow
- [ ] Open `localhost:5173` and verify Login page is visible.
- [ ] Click “Continue as HOD” → Verify HOD Dashboard opens successfully.
- [ ] Click Logout → Verify redirection back to the Login page.
- [ ] Click “Continue as Faculty” → Verify faculty list appears → Select a faculty member → Verify their respective dashboard opens.

## 2️⃣ HOD Side — Sidebar Links Verification
- [ ] **Dashboard:** Verify summary cards, 2 charts, Faculty List, and Upcoming Functions.
- [ ] **Faculty:** Verify cards grid view, Export CSV functionality, Add Faculty option, and clicking any card opens the Profile view.
- [ ] **Classes:** Verify class cards view and clicking any card shows student/subject details.
- [ ] **Subjects:** Verify data table and clicking any row opens Topics/Notes tabs.
- [ ] **Activities:** Verify cards grid layout.
- [ ] **Timetable:** Verify Mon-Sat tabs and active period listings.
- [ ] **Events & Calendar:** Verify List/Calendar toggle and clicking dates opens modals.
- [ ] **Competitions:** Verify cards and detail views (Overview/Participants/Results).
- [ ] **Attendance:** Verify Class/Subject/Date selection, marking, saving, and Import/Add Student features.
- [ ] **Leaves:** Verify Approve/Reject actions.
- [ ] **Reports:** Verify generation across all 5 report types.
- [ ] **Analytics:** Verify all 4 tabs (Faculty/Academic/Events/Competitions).

## 3️⃣ Faculty Side (e.g., Prof. Avani)
- [ ] **Dashboard:** Verify My Subjects, Classes Today (matching timetable), and timetable card.
- [ ] **My Subjects:** Verify clicking a subject opens Topics/Notes.
- [ ] **My Activities:** Verify active activities display.
- [ ] **Timetable:** Verify Mon-Sat schedule.
- [ ] **Attendance:** Verify marking functionality.
- [ ] **Leave:** Verify leave application form and submission.

## 4️⃣ Global Navigation & Extras
- [ ] **Search Bar:** Test queries like “dbms”, “avani”, and “tech”.
- [ ] **Bell Icon:** Verify notifications dropdown/display.
- [ ] **Faculty Switcher:** Verify switching between different faculty members (available on Faculty side).