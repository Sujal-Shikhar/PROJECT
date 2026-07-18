import { useEffect, useState } from "react";
import toast from "react-hot-toast";
import {
  ResponsiveContainer,
  BarChart,
  Bar,
  CartesianGrid,
  XAxis,
  YAxis,
  Tooltip,
} from "recharts";

import {
  getAttendanceReport,
  getMonthlyReport,
} from "../../api/attendanceReportApi";

export default function AttendanceReport() {
  const [report, setReport] = useState([]);
  const [monthly, setMonthly] = useState([]);

  useEffect(() => {
    loadData();
  }, []);

  const loadData = async () => {
    try {
      const overall =
        await getAttendanceReport();

      const month =
        await getMonthlyReport();

      setReport(overall.report);
      setMonthly(month.report);
    } catch (err) {
      console.error(err);
      toast.error("Unable to load report");
    }
  };

  return (
    <div className="space-y-6">

      <h1 className="text-3xl font-bold">
        Attendance Report
      </h1>

      <div className="grid md:grid-cols-4 gap-5">

        <Card
          title="Students"
          value={report.length}
        />

        <Card
          title="Average %"
          value={
            report.length
              ? (
                  report.reduce(
                    (a, b) =>
                      a + b.percentage,
                    0
                  ) / report.length
                ).toFixed(2)
              : 0
          }
        />

        <Card
          title="Highest"
          value={
            report.length
              ? Math.max(
                  ...report.map(
                    (i) =>
                      i.percentage
                  )
                )
              : 0
          }
        />

        <Card
          title="Lowest"
          value={
            report.length
              ? Math.min(
                  ...report.map(
                    (i) =>
                      i.percentage
                  )
                )
              : 0
          }
        />

      </div>

      <div className="bg-white rounded-xl shadow p-5">

        <h2 className="font-semibold text-xl mb-5">
          Monthly Attendance
        </h2>

        <ResponsiveContainer
          width="100%"
          height={350}
        >
          <BarChart
            data={monthly}
          >
            <CartesianGrid strokeDasharray="3 3" />

            <XAxis
              dataKey="month"
            />

            <YAxis />

            <Tooltip />

            <Bar
              dataKey="percentage"
            />

          </BarChart>
        </ResponsiveContainer>

      </div>

      <div className="bg-white rounded-xl shadow overflow-auto">

        <table className="min-w-full">

          <thead className="bg-gray-100">

            <tr>

              <th className="p-3">
                Roll
              </th>

              <th className="p-3">
                Name
              </th>

              <th className="p-3">
                Department
              </th>

              <th className="p-3">
                Semester
              </th>

              <th className="p-3">
                Total
              </th>

              <th className="p-3">
                Present
              </th>

              <th className="p-3">
                Absent
              </th>

              <th className="p-3">
                %
              </th>

            </tr>

          </thead>

          <tbody>

            {report.map((student) => (

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

                <td className="p-3">

                  <div className="w-full bg-gray-200 rounded-full h-3">

                    <div
                      className={`h-3 rounded-full ${
                        student.percentage >=
                        75
                          ? "bg-green-600"
                          : "bg-red-600"
                      }`}
                      style={{
                        width: `${student.percentage}%`,
                      }}
                    />

                  </div>

                  <p className="text-sm mt-1">
                    {student.percentage}%
                  </p>

                </td>

              </tr>

            ))}

          </tbody>

        </table>

      </div>

    </div>
  );
}

function Card({
  title,
  value,
}) {
  return (
    <div className="bg-white rounded-xl shadow p-5">

      <p className="text-gray-500">
        {title}
      </p>

      <h2 className="text-3xl font-bold mt-2">
        {value}
      </h2>

    </div>
  );
}