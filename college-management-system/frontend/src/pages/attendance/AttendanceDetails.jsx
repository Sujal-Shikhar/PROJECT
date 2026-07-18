import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import toast from "react-hot-toast";

import { getAttendanceById } from "../../api/attendanceApi";

export default function AttendanceDetails() {
  const { id } = useParams();

  const navigate = useNavigate();

  const [attendance, setAttendance] = useState(null);

  useEffect(() => {
    loadAttendance();
  }, []);

  const loadAttendance = async () => {
    try {
      const data = await getAttendanceById(id);
      setAttendance(data.attendance);
    } catch (error) {
      console.error(error);
      toast.error("Unable to load attendance");
    }
  };

  if (!attendance) {
    return (
      <div className="text-center py-20">
        Loading...
      </div>
    );
  }

  return (
    <div className="max-w-5xl mx-auto bg-white rounded-xl shadow p-8">

      <div className="flex justify-between items-center mb-8">

        <h1 className="text-3xl font-bold">
          Attendance Details
        </h1>

        <button
          onClick={() => navigate("/attendance")}
          className="bg-gray-600 text-white px-5 py-2 rounded-lg"
        >
          Back
        </button>

      </div>

      <div className="grid md:grid-cols-2 gap-6">

        <Info
          title="Student"
          value={attendance.student?.name}
        />

        <Info
          title="Roll Number"
          value={attendance.student?.rollNumber}
        />

        <Info
          title="Faculty"
          value={attendance.faculty?.name}
        />

        <Info
          title="Employee ID"
          value={attendance.faculty?.employeeId}
        />

        <Info
          title="Subject"
          value={attendance.subject?.name}
        />

        <Info
          title="Subject Code"
          value={attendance.subject?.code}
        />

        <Info
          title="Lecture Number"
          value={attendance.lectureNumber}
        />

        <Info
          title="Date"
          value={new Date(
            attendance.date
          ).toLocaleDateString()}
        />

        <Info
          title="Status"
          value={attendance.status}
        />

        <Info
          title="Created At"
          value={new Date(
            attendance.createdAt
          ).toLocaleString()}
        />

      </div>

      <div className="mt-8">

        <h2 className="font-semibold mb-2">
          Remarks
        </h2>

        <div className="border rounded-lg p-4 bg-gray-50">
          {attendance.remarks || "No remarks"}
        </div>

      </div>

    </div>
  );
}

function Info({
  title,
  value,
}) {
  return (
    <div className="border rounded-lg p-4">

      <p className="text-sm text-gray-500">
        {title}
      </p>

      <p className="text-lg font-semibold mt-1">
        {value || "-"}
      </p>

    </div>
  );
}