import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";

import AttendanceDashboard from "../../components/attendance/AttendanceDashboard";
import AttendanceFilters from "../../components/attendance/AttendanceFilters";
import AttendanceTable from "../../components/attendance/AttendanceTable";

import {
  getAttendance,
  deleteAttendance,
} from "../../api/attendanceApi";

export default function AttendanceList() {
  const navigate = useNavigate();

  const [attendance, setAttendance] = useState([]);

  const [pagination, setPagination] = useState({});

  const [page, setPage] = useState(1);

  const [filters, setFilters] = useState({
    student: "",
    faculty: "",
    subject: "",
    status: "",
    date: "",
  });

  useEffect(() => {
    loadAttendance();
  }, [page, filters]);

  const loadAttendance = async () => {
    try {
      const data = await getAttendance({
        page,
        ...filters,
      });

      setAttendance(data.attendance);

      setPagination({
        currentPage: data.currentPage,
        totalPages: data.totalPages,
        total: data.total,
      });
    } catch (error) {
      console.error(error);
      toast.error("Unable to load attendance");
    }
  };

  const remove = async (id) => {
    if (!window.confirm("Delete attendance record?"))
      return;

    try {
      await deleteAttendance(id);

      toast.success("Attendance deleted");

      loadAttendance();
    } catch (error) {
      console.error(error);
      toast.error("Delete failed");
    }
  };

  return (
    <div className="space-y-6">

      <div className="flex justify-between items-center">

        <h1 className="text-3xl font-bold">
          Attendance
        </h1>

        <button
          onClick={() =>
            navigate("/attendance/add")
          }
          className="bg-blue-600 hover:bg-blue-700 text-white px-5 py-2 rounded-lg"
        >
          Mark Attendance
        </button>

      </div>

      <AttendanceDashboard />

      <AttendanceFilters
        filters={filters}
        setFilters={setFilters}
      />

      <AttendanceTable
        attendance={attendance}
        onView={(id) =>
          navigate(`/attendance/${id}`)
        }
        onEdit={(id) =>
          navigate(`/attendance/edit/${id}`)
        }
        onDelete={remove}
      />

      <div className="flex justify-between items-center">

        <button
          disabled={page <= 1}
          onClick={() => setPage(page - 1)}
          className="border rounded px-4 py-2 disabled:opacity-50"
        >
          Previous
        </button>

        <span>
          Page {pagination.currentPage || 1} of{" "}
          {pagination.totalPages || 1}
        </span>

        <button
          disabled={
            page >=
            (pagination.totalPages || 1)
          }
          onClick={() => setPage(page + 1)}
          className="border rounded px-4 py-2 disabled:opacity-50"
        >
          Next
        </button>

      </div>

    </div>
  );
}