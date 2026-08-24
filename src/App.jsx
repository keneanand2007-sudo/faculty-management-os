import { BrowserRouter, Routes, Route } from "react-router-dom";
import Login from "./pages/Login";
import HODDashboard from "./pages/HODDashboard";
import FacultyDashboard from "./pages/FacultyDashboard";
import FacultyList from "./pages/FacultyList";
import FacultyProfile from "./pages/FacultyProfile";
import Classes from "./pages/Classes";
import ClassDetail from "./pages/ClassDetail";
import Subjects from "./pages/Subjects";
import SubjectDetail from "./pages/SubjectDetail";
import Activities from "./pages/Activities";
import Timetable from "./pages/Timetable";
import Events from "./pages/Events";
import EventDetail from "./pages/EventDetail";
import Competitions from "./pages/Competitions";
import CompetitionDetail from "./pages/CompetitionDetail";
import Attendance from "./pages/Attendance";
import Leave from "./pages/Leave";
import Reports from "./pages/Reports";
import Analytics from "./pages/Analytics";
import FacultySubjects from "./pages/FacultySubjects";
import FacultyActivities from "./pages/FacultyActivities";
import FacultyTimetable from "./pages/FacultyTimetable";
import FacultyAttendance from "./pages/FacultyAttendance";
import FacultyLeave from "./pages/FacultyLeave";
import DashboardLayout from "./layouts/DashboardLayout";
import { FacultyProvider } from "./context/FacultyContext";
import { SubjectProvider } from "./context/SubjectContext";
import { ActivityProvider } from "./context/ActivityContext";
import { TimetableProvider } from "./context/TimetableContext";
import { EventProvider } from "./context/EventContext";
import { CompetitionProvider } from "./context/CompetitionContext";
import { AttendanceProvider } from "./context/AttendanceContext";
import { LeaveProvider } from "./context/LeaveContext";
import { CurrentUserProvider } from "./context/CurrentUserContext";

export default function App() {
  return (
    <FacultyProvider>
      <SubjectProvider>
        <ActivityProvider>
          <TimetableProvider>
            <EventProvider>
              <CompetitionProvider>
                <AttendanceProvider>
                  <LeaveProvider>
                    <CurrentUserProvider>
                      <BrowserRouter>
                        <Routes>
                          <Route path="/" element={<Login />} />

                          <Route path="/hod" element={<DashboardLayout role="hod" />}>
                            <Route index element={<HODDashboard />} />
                            <Route path="faculty" element={<FacultyList />} />
                            <Route path="faculty/:id" element={<FacultyProfile />} />
                            <Route path="classes" element={<Classes />} />
                            <Route path="classes/:id" element={<ClassDetail />} />
                            <Route path="subjects" element={<Subjects />} />
                            <Route path="subjects/:id" element={<SubjectDetail />} />
                            <Route path="activities" element={<Activities />} />
                            <Route path="timetable" element={<Timetable />} />
                            <Route path="events" element={<Events />} />
                            <Route path="events/:id" element={<EventDetail />} />
                            <Route path="competitions" element={<Competitions />} />
                            <Route path="competitions/:id" element={<CompetitionDetail />} />
                            <Route path="attendance" element={<Attendance />} />
                            <Route path="leave" element={<Leave />} />
                            <Route path="reports" element={<Reports />} />
                            <Route path="analytics" element={<Analytics />} />
                          </Route>

                          <Route path="/faculty" element={<DashboardLayout role="faculty" />}>
                            <Route index element={<FacultyDashboard />} />
                            <Route path="subjects" element={<FacultySubjects />} />
                            <Route path="subjects/:id" element={<SubjectDetail />} />
                            <Route path="activities" element={<FacultyActivities />} />
                            <Route path="timetable" element={<FacultyTimetable />} />
                            <Route path="attendance" element={<FacultyAttendance />} />
                            <Route path="leave" element={<FacultyLeave />} />
                          </Route>
                        </Routes>
                      </BrowserRouter>
                    </CurrentUserProvider>
                  </LeaveProvider>
                </AttendanceProvider>
              </CompetitionProvider>
            </EventProvider>
          </TimetableProvider>
        </ActivityProvider>
      </SubjectProvider>
    </FacultyProvider>
  );
}
