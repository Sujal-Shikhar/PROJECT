import {
  Routes,
  Route,
  Navigate,
} from "react-router-dom";

import Login from "./pages/auth/Login";

import AdminLayout from "./layouts/AdminLayout";

import ProtectedRoute from "./routes/ProtectedRoute";

import Dashboard from "./pages/dashboard/Dashboard";

import StudentList from "./pages/students/StudentList";
import AddStudent from "./pages/students/AddStudent";
import EditStudent from "./pages/students/EditStudent";
import StudentDetails from "./pages/students/StudentDetails";

import FacultyList from "./pages/faculty/FacultyList";
import AddFaculty from "./pages/faculty/AddFaculty";
import EditFaculty from "./pages/faculty/EditFaculty";
import FacultyDetails from "./pages/faculty/FacultyDetails";

import SubjectList from "./pages/subject/SubjectList";
import AddSubject from "./pages/subject/AddSubject";
import EditSubject from "./pages/subject/EditSubject";
import SubjectDetails from "./pages/subject/SubjectDetails";
import SubjectStatistics from "./pages/subject/SubjectStatistics";
import AssignFaculty from "./pages/subject/AssignFaculty";

import Results from "./pages/result/Results";
import AddResult from "./pages/result/AddResult";
import EditResult from "./pages/result/EditResult";
import ViewResult from "./pages/result/ViewResult";

/*
==================================
Attendance Pages
==================================
*/

import AttendanceList from "./pages/attendance/AttendanceList";
import AttendanceDetails from "./pages/attendance/AttendanceDetails";
import AttendanceForm from "./pages/attendance/AttendanceForm";
import AttendanceReport from "./pages/attendance/AttendanceReport";
import StudentAttendanceReport from "./pages/attendance/StudentAttendanceReport";
import SubjectAttendanceReport from "./pages/attendance/SubjectAttendanceReport";
import Defaulters from "./pages/attendance/Defaulters";

/*
==========================================
INTERNAL MARKS
==========================================
*/

import InternalMarkList from "./pages/internalMarks/InternalMarkList";
import AddInternalMark from "./pages/internalMarks/AddInternalMark";
import EditInternalMark from "./pages/internalMarks/EditInternalMark";
import ViewInternalMark from "./pages/internalMarks/ViewInternalMark";
import StudentInternalMarks from "./pages/internalMarks/StudentInternalMarks";
import SubjectInternalMarks from "./pages/internalMarks/SubjectInternalMarks";
import ExamInternalMarks from "./pages/internalMarks/ExamInternalMarks";
import InternalMarkStatistics from "./pages/internalMarks/InternalMarkStatistics";
import InternalMarkDashboard from "./pages/internalMarks/InternalMarkDashboard";

// Exam Pages
import ExamList from "./pages/exam/ExamList";
import AddExam from "./pages/exam/AddExam";
import EditExam from "./pages/exam/EditExam";
import ExamDetails from "./pages/exam/ExamDetails";
import ExamCalendar from "./pages/exam/ExamCalendar";
import ExamStatistics from "./pages/exam/ExamStatistics";
import UpcomingExams from "./pages/exam/UpcomingExams";

import FeeList from "./pages/fee/FeeList";
import AddFee from "./pages/fee/AddFee";
import EditFee from "./pages/fee/EditFee";
import FeeDetails from "./pages/fee/FeeDetails";
import PendingFees from "./pages/fee/PendingFees";
import FeeStatistics from "./pages/fee/FeeStatistics";

import PlacementList from "./pages/placement/PlacementList";
import AddPlacement from "./pages/placement/AddPlacement";
import EditPlacement from "./pages/placement/EditPlacement";
import PlacementDetails from "./pages/placement/PlacementDetails";
import ViewPlacement from "./pages/placement/ViewPlacement";
import PlacementStatistics from "./pages/placement/PlacementStatistics";
import PlacementDashboard from "./pages/placement/PlacementDashboard";
import SelectedPlacements from "./pages/placement/SelectedPlacements";
import RejectedPlacements from "./pages/placement/RejectedPlacements";
import StudentPlacements from "./pages/placement/StudentPlacements";
import CompanyPlacements from "./pages/placement/CompanyPlacements";

/* ==============================
   Timetable Pages
============================== */

import TimetableList from "./pages/timetable/TimetableList";
import AddTimetable from "./pages/timetable/AddTimetable";
import EditTimetable from "./pages/timetable/EditTimetable";
import TimetableDetails from "./pages/timetable/TimetableDetails";
import FacultyTimetable from "./pages/timetable/FacultyTimetable";
import ClassTimetable from "./pages/timetable/ClassTimetable";
import TodayTimetable from "./pages/timetable/TodayTimetable";
import TimetableStatistics from "./pages/timetable/TimetableStatistics";
import TimetableDashboard from "./pages/timetable/TimetableDashboard";

/* ==========================================
   NOTICE PAGES
========================================== */

import NoticeList from "./pages/notice/NoticeList";
import AddNotice from "./pages/notice/AddNotice";
import EditNotice from "./pages/notice/EditNotice";
import NoticeDetails from "./pages/notice/NoticeDetails";
import NoticeStatistics from "./pages/notice/NoticeStatistics";
import NoticeDashboard from "./pages/notice/NoticeDashboard";
import ActiveNotices from "./pages/notice/ActiveNotices";
import ExpiredNotices from "./pages/notice/ExpiredNotices";

// Faculty Subject
import FacultySubjectList from "./pages/facultySubject/FacultySubjectList";
import AddFacultySubject from "./pages/facultySubject/AddFacultySubject";
import EditFacultySubject from "./pages/facultySubject/EditFacultySubject";
import FacultySubjectDetails from "./pages/facultySubject/FacultySubjectDetails";
import FacultyAssignments from "./pages/facultySubject/FacultyAssignments";
import SubjectAssignments from "./pages/facultySubject/SubjectAssignments";
import DepartmentAssignments from "./pages/facultySubject/DepartmentAssignments";
import SemesterAssignments from "./pages/facultySubject/SemesterAssignments";
import FacultyWorkload from "./pages/facultySubject/FacultyWorkload";
import FacultySubjectStatistics from "./pages/facultySubject/FacultySubjectStatistics";

export default function App() {
  return (
    <Routes>

      <Route
        path="/login"
        element={<Login />}
      />

      <Route
        path="/"
        element={
          <ProtectedRoute>
            <AdminLayout>
              <Dashboard />
            </AdminLayout>
          </ProtectedRoute>
        }
      />

      <Route
       path="/students"
       element={
        <ProtectedRoute>
        <AdminLayout>
           <StudentList />
        </AdminLayout>
        </ProtectedRoute>
      }
     />

      <Route
  path="/students/add"
  element={
    <ProtectedRoute>
      <AdminLayout>
        <AddStudent />
      </AdminLayout>
    </ProtectedRoute>
  }
/>
      <Route
  path="/students/edit/:id"
  element={
    <ProtectedRoute>
      <AdminLayout>
        <EditStudent />
      </AdminLayout>
    </ProtectedRoute>
  }
/>

<Route
  path="/students/:id"
  element={
    <ProtectedRoute>
      <AdminLayout>
        <StudentDetails />
      </AdminLayout>
    </ProtectedRoute>
  }
/>

      <Route
  path="/faculty"
  element={
    <ProtectedRoute>
      <AdminLayout>
        <FacultyList />
      </AdminLayout>
    </ProtectedRoute>
  }
/>

<Route
  path="/faculty/add"
  element={
    <ProtectedRoute>
      <AdminLayout>
        <AddFaculty />
      </AdminLayout>
    </ProtectedRoute>
  }
/>

      <Route
  path="/faculty/edit/:id"
  element={
    <ProtectedRoute>
      <AdminLayout>
        <EditFaculty />
      </AdminLayout>
    </ProtectedRoute>
  }
/>

      <Route
  path="/faculty/:id"
  element={
    <ProtectedRoute>
      <AdminLayout>
        <FacultyDetails />
      </AdminLayout>
    </ProtectedRoute>
  }
/>
      
      <Route
  path="/subjects"
  element={
    <ProtectedRoute>
      <AdminLayout>
        <SubjectList />
      </AdminLayout>
    </ProtectedRoute>
  }
/>

<Route
  path="/subjects/add"
  element={
    <ProtectedRoute>
      <AdminLayout>
        <AddSubject />
      </AdminLayout>
    </ProtectedRoute>
  }
/>

<Route
  path="/subjects/edit/:id"
  element={
    <ProtectedRoute>
      <AdminLayout>
        <EditSubject />
      </AdminLayout>
    </ProtectedRoute>
  }
/>

      <Route
  path="/subjects/:id"
  element={
    <ProtectedRoute>
      <AdminLayout>
        <SubjectDetails />
      </AdminLayout>
    </ProtectedRoute>
  }
/>

<Route
  path="/subjects/statistics"
  element={
    <ProtectedRoute>
      <AdminLayout>
        <SubjectStatistics />
      </AdminLayout>
    </ProtectedRoute>
  }
/>

<Route
  path="/subjects/:id/assign"
  element={
    <ProtectedRoute>
      <AdminLayout>
        <AssignFaculty />
      </AdminLayout>
    </ProtectedRoute>
  }
/>

<Route
  path="/attendance"
  element={
    <ProtectedRoute>
      <AdminLayout>
        <AttendanceList />
      </AdminLayout>
    </ProtectedRoute>
  }
/>

<Route
  path="/attendance/add"
  element={
    <ProtectedRoute>
      <AdminLayout>
        <AttendanceForm />
      </AdminLayout>
    </ProtectedRoute>
  }
/>

<Route
  path="/attendance/edit/:id"
  element={
    <ProtectedRoute>
      <AdminLayout>
        <AttendanceForm />
      </AdminLayout>
    </ProtectedRoute>
  }
/>

<Route
  path="/attendance/:id"
  element={
    <ProtectedRoute>
      <AdminLayout>
        <AttendanceDetails />
      </AdminLayout>
    </ProtectedRoute>
  }
/>

<Route
  path="/attendance/report"
  element={
    <ProtectedRoute>
      <AdminLayout>
        <AttendanceReport />
      </AdminLayout>
    </ProtectedRoute>
  }
/>

<Route
  path="/attendance/student/:studentId"
  element={
    <ProtectedRoute>
      <AdminLayout>
        <StudentAttendanceReport />
      </AdminLayout>
    </ProtectedRoute>
  }
/>

<Route
  path="/attendance/subject/:subjectId"
  element={
    <ProtectedRoute>
      <AdminLayout>
        <SubjectAttendanceReport />
      </AdminLayout>
    </ProtectedRoute>
  }
/>

<Route
  path="/attendance/defaulters"
  element={
    <ProtectedRoute>
      <AdminLayout>
        <Defaulters />
      </AdminLayout>
    </ProtectedRoute>
  }
/>

      <Route
  path="/results"
  element={
    <ProtectedRoute>
      <AdminLayout>
        <Results />
      </AdminLayout>
    </ProtectedRoute>
  }
/>

<Route
  path="/results/add"
  element={
    <ProtectedRoute>
      <AdminLayout>
        <AddResult />
      </AdminLayout>
    </ProtectedRoute>
  }
/>

<Route
  path="/results/edit/:id"
  element={
    <ProtectedRoute>
      <AdminLayout>
        <EditResult />
      </AdminLayout>
    </ProtectedRoute>
  }
/>

<Route
  path="/results/:id"
  element={
    <ProtectedRoute>
      <AdminLayout>
        <ViewResult />
      </AdminLayout>
    </ProtectedRoute>
  }
/>  


<Route
  path="/exams"
  element={
    <ProtectedRoute>
      <AdminLayout>
        <ExamList />
      </AdminLayout>
    </ProtectedRoute>
  }
/>

<Route
  path="/exams/add"
  element={
    <ProtectedRoute>
      <AdminLayout>
        <AddExam />
      </AdminLayout>
    </ProtectedRoute>
  }
/>

<Route
  path="/exams/edit/:id"
  element={
    <ProtectedRoute>
      <AdminLayout>
        <EditExam />
      </AdminLayout>
    </ProtectedRoute>
  }
/>

<Route
  path="/exams/:id"
  element={
    <ProtectedRoute>
      <AdminLayout>
        <ExamDetails />
      </AdminLayout>
    </ProtectedRoute>
  }
/>

<Route
  path="/exams/calendar"
  element={
    <ProtectedRoute>
      <AdminLayout>
        <ExamCalendar />
      </AdminLayout>
    </ProtectedRoute>
  }
/>

<Route
  path="/exams/statistics"
  element={
    <ProtectedRoute>
      <AdminLayout>
        <ExamStatistics />
      </AdminLayout>
    </ProtectedRoute>
  }
/>

<Route
  path="/exams/upcoming"
  element={
    <ProtectedRoute>
      <AdminLayout>
        <UpcomingExams />
      </AdminLayout>
    </ProtectedRoute>
  }
/>

<Route
  path="/fees"
  element={
    <ProtectedRoute>
      <AdminLayout>
        <FeeList />
      </AdminLayout>
    </ProtectedRoute>
  }
/>

<Route
  path="/fees/add"
  element={
    <ProtectedRoute>
      <AdminLayout>
        <AddFee />
      </AdminLayout>
    </ProtectedRoute>
  }
/>

<Route
  path="/fees/edit/:id"
  element={
    <ProtectedRoute>
      <AdminLayout>
        <EditFee />
      </AdminLayout>
    </ProtectedRoute>
  }
/>

<Route
  path="/fees/:id"
  element={
    <ProtectedRoute>
      <AdminLayout>
        <FeeDetails />
      </AdminLayout>
    </ProtectedRoute>
  }
/>

<Route
  path="/fees/pending"
  element={
    <ProtectedRoute>
      <AdminLayout>
        <PendingFees />
      </AdminLayout>
    </ProtectedRoute>
  }
/>

<Route
  path="/fees/statistics"
  element={
    <ProtectedRoute>
      <AdminLayout>
        <FeeStatistics />
      </AdminLayout>
    </ProtectedRoute>
  }
/>

<Route
  path="/internal-marks"
  element={
    <ProtectedRoute>
      <AdminLayout>
        <InternalMarkList />
      </AdminLayout>
    </ProtectedRoute>
  }
/>

<Route
  path="/internal-marks/add"
  element={
    <ProtectedRoute>
      <AdminLayout>
        <AddInternalMark />
      </AdminLayout>
    </ProtectedRoute>
  }
/>

<Route
  path="/internal-marks/edit/:id"
  element={
    <ProtectedRoute>
      <AdminLayout>
        <EditInternalMark />
      </AdminLayout>
    </ProtectedRoute>
  }
/>

<Route
  path="/internal-marks/:id"
  element={
    <ProtectedRoute>
      <AdminLayout>
        <ViewInternalMark />
      </AdminLayout>
    </ProtectedRoute>
  }
/>

<Route
  path="/internal-marks/student/:studentId"
  element={
    <ProtectedRoute>
      <AdminLayout>
        <StudentInternalMarks />
      </AdminLayout>
    </ProtectedRoute>
  }
/>

<Route
  path="/internal-marks/subject/:subjectId"
  element={
    <ProtectedRoute>
      <AdminLayout>
        <SubjectInternalMarks />
      </AdminLayout>
    </ProtectedRoute>
  }
/>

<Route
  path="/internal-marks/exam/:examId"
  element={
    <ProtectedRoute>
      <AdminLayout>
        <ExamInternalMarks />
      </AdminLayout>
    </ProtectedRoute>
  }
/>

<Route
  path="/internal-marks/statistics"
  element={
    <ProtectedRoute>
      <AdminLayout>
        <InternalMarkStatistics />
      </AdminLayout>
    </ProtectedRoute>
  }
/>

<Route
  path="/internal-marks/dashboard"
  element={
    <ProtectedRoute>
      <AdminLayout>
        <InternalMarkDashboard />
      </AdminLayout>
    </ProtectedRoute>
  }
/>


<Route
  path="/placements"
  element={
    <ProtectedRoute>
      <AdminLayout>
        <PlacementList />
      </AdminLayout>
    </ProtectedRoute>
  }
/>

<Route
  path="/placements/add"
  element={
    <ProtectedRoute>
      <AdminLayout>
        <AddPlacement />
      </AdminLayout>
    </ProtectedRoute>
  }
/>

<Route
  path="/placements/edit/:id"
  element={
    <ProtectedRoute>
      <AdminLayout>
        <EditPlacement />
      </AdminLayout>
    </ProtectedRoute>
  }
/>

<Route
  path="/placements/view/:id"
  element={
    <ProtectedRoute>
      <AdminLayout>
        <ViewPlacement />
      </AdminLayout>
    </ProtectedRoute>
  }
/>

<Route
  path="/placements/details/:id"
  element={
    <ProtectedRoute>
      <AdminLayout>
        <PlacementDetails />
      </AdminLayout>
    </ProtectedRoute>
  }
/>

<Route
  path="/placements/dashboard"
  element={
    <ProtectedRoute>
      <AdminLayout>
        <PlacementDashboard />
      </AdminLayout>
    </ProtectedRoute>
  }
/>

<Route
  path="/placements/statistics"
  element={
    <ProtectedRoute>
      <AdminLayout>
        <PlacementStatistics />
      </AdminLayout>
    </ProtectedRoute>
  }
/>

<Route
  path="/placements/selected"
  element={
    <ProtectedRoute>
      <AdminLayout>
        <SelectedPlacements />
      </AdminLayout>
    </ProtectedRoute>
  }
/>

<Route
  path="/placements/rejected"
  element={
    <ProtectedRoute>
      <AdminLayout>
        <RejectedPlacements />
      </AdminLayout>
    </ProtectedRoute>
  }
/>

<Route
  path="/placements/student/:studentId"
  element={
    <ProtectedRoute>
      <AdminLayout>
        <StudentPlacements />
      </AdminLayout>
    </ProtectedRoute>
  }
/>

<Route
  path="/placements/company/:company"
  element={
    <ProtectedRoute>
      <AdminLayout>
        <CompanyPlacements />
      </AdminLayout>
    </ProtectedRoute>
  }
/>

<Route
  path="/timetable"
  element={
    <ProtectedRoute>
      <AdminLayout>
        <TimetableList />
      </AdminLayout>
    </ProtectedRoute>
  }
/>

<Route
  path="/timetable/add"
  element={
    <ProtectedRoute>
      <AdminLayout>
        <AddTimetable />
      </AdminLayout>
    </ProtectedRoute>
  }
/>

<Route
  path="/timetable/edit/:id"
  element={
    <ProtectedRoute>
      <AdminLayout>
        <EditTimetable />
      </AdminLayout>
    </ProtectedRoute>
  }
/>

<Route
  path="/timetable/:id"
  element={
    <ProtectedRoute>
      <AdminLayout>
        <TimetableDetails />
      </AdminLayout>
    </ProtectedRoute>
  }
/>

<Route
  path="/timetable/faculty/:facultyId"
  element={
    <ProtectedRoute>
      <AdminLayout>
        <FacultyTimetable />
      </AdminLayout>
    </ProtectedRoute>
  }
/>

<Route
  path="/timetable/class/:department/:semester/:section"
  element={
    <ProtectedRoute>
      <AdminLayout>
        <ClassTimetable />
      </AdminLayout>
    </ProtectedRoute>
  }
/>

<Route
  path="/timetable/today"
  element={
    <ProtectedRoute>
      <AdminLayout>
        <TodayTimetable />
      </AdminLayout>
    </ProtectedRoute>
  }
/>

<Route
  path="/timetable/statistics"
  element={
    <ProtectedRoute>
      <AdminLayout>
        <TimetableStatistics />
      </AdminLayout>
    </ProtectedRoute>
  }
/>

<Route
  path="/timetable/dashboard"
  element={
    <ProtectedRoute>
      <AdminLayout>
        <TimetableDashboard />
      </AdminLayout>
    </ProtectedRoute>
  }
/>

<Route
  path="/notices"
  element={
    <ProtectedRoute>
      <AdminLayout>
        <NoticeList />
      </AdminLayout>
    </ProtectedRoute>
  }
/>

<Route
  path="/notices/add"
  element={
    <ProtectedRoute>
      <AdminLayout>
        <AddNotice />
      </AdminLayout>
    </ProtectedRoute>
  }
/>

<Route
  path="/notices/edit/:id"
  element={
    <ProtectedRoute>
      <AdminLayout>
        <EditNotice />
      </AdminLayout>
    </ProtectedRoute>
  }
/>

<Route
  path="/notices/:id"
  element={
    <ProtectedRoute>
      <AdminLayout>
        <NoticeDetails />
      </AdminLayout>
    </ProtectedRoute>
  }
/>

<Route
  path="/notices/statistics"
  element={
    <ProtectedRoute>
      <AdminLayout>
        <NoticeStatistics />
      </AdminLayout>
    </ProtectedRoute>
  }
/>

<Route
  path="/notices/dashboard"
  element={
    <ProtectedRoute>
      <AdminLayout>
        <NoticeDashboard />
      </AdminLayout>
    </ProtectedRoute>
  }
/>

<Route
  path="/notices/active"
  element={
    <ProtectedRoute>
      <AdminLayout>
        <ActiveNotices />
      </AdminLayout>
    </ProtectedRoute>
  }
/>

<Route
  path="/notices/expired"
  element={
    <ProtectedRoute>
      <AdminLayout>
        <ExpiredNotices />
      </AdminLayout>
    </ProtectedRoute>
  }
/>

{/* Faculty Subject */}

<Route
  path="/faculty-subjects"
  element={<FacultySubjectList />}
/>

<Route
  path="/faculty-subjects/add"
  element={<AddFacultySubject />}
/>

<Route
  path="/faculty-subjects/edit/:id"
  element={<EditFacultySubject />}
/>

<Route
  path="/faculty-subjects/:id"
  element={<FacultySubjectDetails />}
/>

<Route
  path="/faculty-subjects/faculty/:facultyId"
  element={<FacultyAssignments />}
/>

<Route
  path="/faculty-subjects/subject/:subjectId"
  element={<SubjectAssignments />}
/>

<Route
  path="/faculty-subjects/department/:department"
  element={<DepartmentAssignments />}
/>

<Route
  path="/faculty-subjects/semester/:semester"
  element={<SemesterAssignments />}
/>

<Route
  path="/faculty-subjects/workload"
  element={<FacultyWorkload />}
/>

<Route
  path="/faculty-subjects/statistics"
  element={<FacultySubjectStatistics />}
/>

      <Route
        path="*"
        element={<Navigate to="/" replace />}
      />

    </Routes>
  );
}