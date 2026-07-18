import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import toast from "react-hot-toast";

import { getSubjectReport } from "../../api/attendanceReportApi";

export default function SubjectAttendanceReport() {

  const { id } = useParams();

  const [report, setReport] = useState(null);

  useEffect(() => {
    loadReport();
  }, []);

  const loadReport = async () => {

    try {

      const data =
        await getSubjectReport(id);

      setReport(data);

    } catch {

      toast.error("Unable to load report");

    }

  };

  if (!report)
    return <div>Loading...</div>;

  return (

    <div className="space-y-6">

      <h1 className="text-3xl font-bold">

        {report.subject.name}

      </h1>

      <div className="grid md:grid-cols-4 gap-5">

        <Card title="Total Classes" value={report.totalClasses} />

        <Card title="Present" value={report.presentClasses} />

        <Card title="Absent" value={report.absentClasses} />

        <Card title="Attendance %" value={`${report.percentage}%`} />

      </div>

      <table className="w-full bg-white rounded-lg shadow">

        <thead className="bg-gray-100">

          <tr>

            <th className="p-3">
              Roll No
            </th>

            <th className="p-3">
              Student
            </th>

            <th className="p-3">
              Department
            </th>

            <th className="p-3">
              Semester
            </th>

            <th className="p-3">
              Status
            </th>

            <th className="p-3">
              Date
            </th>

          </tr>

        </thead>

        <tbody>

          {report.records.map((record) => (

            <tr
              key={record._id}
              className="border-t"
            >

              <td className="p-3">
                {record.student.rollNumber}
              </td>

              <td className="p-3">
                {record.student.name}
              </td>

              <td className="p-3">
                {record.student.department}
              </td>

              <td className="p-3">
                {record.student.semester}
              </td>

              <td className="p-3">
                {record.status}
              </td>

              <td className="p-3">
                {new Date(record.date).toLocaleDateString()}
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