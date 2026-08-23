import { useMemo } from "react";
import { useLeaves } from "../context/LeaveContext";
import { useEvents } from "../context/EventContext";
import { useAttendance } from "../context/AttendanceContext";
import { useFaculty } from "../context/FacultyContext";

export function useNotifications(role, currentFacultyId) {
  const { leaves } = useLeaves();
  const { events } = useEvents();
  const { students, getStudentPercentage } = useAttendance();
  const { faculty } = useFaculty();

  return useMemo(() => {
    const list = [];

    if (role === "HOD") {
      leaves
        .filter((l) => l.status === "Pending")
        .forEach((l) => {
          const f = faculty.find((fac) => fac.id === l.facultyId);
          list.push({
            id: `leave-${l.id}`,
            type: "leave",
            title: "Leave request pending",
            message: `${f?.name || "A faculty member"} applied for ${l.leaveType} (${l.fromDate} → ${l.toDate})`,
            link: "/hod/leave",
          });
        });

      events
        .filter((e) => e.status === "Upcoming" || e.status === "Scheduled")
        .forEach((e) => {
          list.push({
            id: `event-${e.id}`,
            type: "event",
            title: "Upcoming function",
            message: `${e.name} is scheduled on ${e.startDate}`,
            link: `/hod/events/${e.id}`,
          });
        });

      const lowAttendance = students.filter((s) => getStudentPercentage(s.id) < 75);
      if (lowAttendance.length > 0) {
        list.push({
          id: "low-attendance",
          type: "attendance",
          title: "Low attendance alert",
          message: `${lowAttendance.length} student(s) are below 75% attendance`,
          link: "/hod/attendance",
        });
      }
    }

    if (role === "Faculty" && currentFacultyId) {
      leaves
        .filter((l) => l.facultyId === currentFacultyId && l.status !== "Pending")
        .forEach((l) => {
          list.push({
            id: `myleave-${l.id}`,
            type: l.status === "Approved" ? "success" : "error",
            title: `Leave ${l.status.toLowerCase()}`,
            message: `Your ${l.leaveType} request (${l.fromDate} → ${l.toDate}) was ${l.status.toLowerCase()}${l.hodRemarks ? `: "${l.hodRemarks}"` : ""}`,
            link: "/faculty/leave",
          });
        });

      events
        .filter((e) => e.inChargeFacultyId === currentFacultyId && (e.status === "Upcoming" || e.status === "Scheduled"))
        .forEach((e) => {
          list.push({
            id: `myevent-${e.id}`,
            type: "event",
            title: "You're in-charge of an event",
            message: `${e.name} is scheduled on ${e.startDate}`,
            link: "/faculty",
          });
        });
    }

    return list;
  }, [role, currentFacultyId, leaves, events, students, faculty]);
}
