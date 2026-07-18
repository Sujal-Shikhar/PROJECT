import { useEffect, useState } from "react";
import toast from "react-hot-toast";

import { getDefaulters } from "../../api/attendanceReportApi";

export default function Defaulters() {

  const [students, setStudents] = useState([]);

  useEffect(() => {
    load();
  }, []);

  const load = async () => {

    try {

      const data =
        await getDefaulters();

      setStudents(data.defaulters);

    } catch {

      toast.error("Unable to load defaulters");

    }

  };

  return (

    <div>

      <h1 className="text-3xl font-bold mb-6">
        Attendance Defaulters
      </h1>

      <table className="w-full bg-white shadow rounded-lg">

        <thead className="bg-red-100">

          <tr>

            <th className="p-3">Roll No</th>

            <th className="p-3">Name</th>

            <th className="p-3">Department</th>

            <th className="p-3">Semester</th>

            <th className="p-3">Total</th>

            <th className="p-3">Present</th>

            <th className="p-3">Absent</th>

            <th className="p-3">%</th>

          </tr>

        </thead>

        <tbody>

          {students.map((student) => (

            <tr
              key={student.studentId}
              className="border-t"
            >

              <td className="p-3">
                {student.rollNumber}
              </td>

              <td className="p-3">
                {student.name}
              </td>

              <td className="p-3">
                {student.department}
              </td>

              <td className="p-3">
                {student.semester}
              </td>

              <td className="p-3">
                {student.totalClasses}
              </td>

              <td className="p-3 text-green-600">
                {student.presentClasses}
              </td>

              <td className="p-3 text-red-600">
                {student.absentClasses}
              </td>

              <td className="p-3 font-bold text-red-600">
                {student.percentage}%
              </td>

            </tr>

          ))}

        </tbody>

      </table>

    </div>

  );

}