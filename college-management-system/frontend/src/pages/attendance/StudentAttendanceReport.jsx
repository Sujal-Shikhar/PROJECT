import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import toast from "react-hot-toast";

import { getStudentReport } from "../../api/attendanceReportApi";

export default function StudentAttendanceReport() {
  const { id } = useParams();

  const [report, setReport] = useState(null);

  useEffect(() => {
    loadReport();
  }, []);

  const loadReport = async () => {
    try {
      const data = await getStudentReport(id);
      setReport(data);
    } catch {
      toast.error("Unable to load report");
    }
  };

  if (!report) return <div>Loading...</div>;

  return (
    <div className="space-y-6">

      <h1 className="text-3xl font-bold">
        Student Attendance Report
      </h1>

      <div className="grid md:grid-cols-4 gap-5">

        <Card title="Student" value={report.student.name} />

        <Card title="Total" value={report.totalClasses} />

        <Card title="Present" value={report.presentClasses} />

        <Card title="Attendance %" value={`${report.percentage}%`} />

      </div>

      <table className="w-full bg-white shadow rounded-lg">

        <thead className="bg-gray-100">

          <tr>

            <th className="p-3">Date</th>

            <th className="p-3">Subject</th>

            <th className="p-3">Code</th>

            <th className="p-3">Status</th>

          </tr>

        </thead>

        <tbody>

          {report.attendance.map((item) => (

            <tr key={item._id} className="border-t">

              <td className="p-3">
                {new Date(item.date).toLocaleDateString()}
              </td>

              <td className="p-3">
                {item.subject.name}
              </td>

              <td className="p-3">
                {item.subject.code}
              </td>

              <td className="p-3">
                {item.status}
              </td>

            </tr>

          ))}

        </tbody>

      </table>

    </div>
  );
}

function Card({ title, value }) {
  return (
    <div className="bg-white rounded-xl shadow p-5">

      <p>{title}</p>

      <h2 className="text-2xl font-bold mt-2">
        {value}
      </h2>

    </div>
  );
}