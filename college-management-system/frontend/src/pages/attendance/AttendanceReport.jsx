import {
  useEffect,
  useState,
} from "react";

import API from "../../api/axios";
import { useParams } from "react-router-dom";
import Layout from "../../components/layout/Layout";

const AttendanceReport = () => {
  const { id } = useParams();

  const [report, setReport] =
    useState(null);

  useEffect(() => {
    fetchReport();
  }, []);

  const fetchReport =
    async () => {
      const res =
        await API.get(
          `/attendance/report/${id}`
        );

      setReport(res.data);
    };

  if (!report)
    return (
      <Layout>
        Loading...
      </Layout>
    );

  return (
    <Layout>
      <div className="p-6">

        <h1 className="text-3xl font-bold mb-6">
          Attendance Report
        </h1>

        <div className="grid grid-cols-4 gap-4 mb-6">

          <div className="bg-white p-4 shadow rounded">
            <h3>Total Classes</h3>
            <p className="text-2xl font-bold">
              {
                report.totalClasses
              }
            </p>
          </div>

          <div className="bg-white p-4 shadow rounded">
            <h3>Present</h3>
            <p className="text-2xl font-bold">
              {report.present}
            </p>
          </div>

          <div className="bg-white p-4 shadow rounded">
            <h3>Absent</h3>
            <p className="text-2xl font-bold">
              {report.absent}
            </p>
          </div>

          <div className="bg-white p-4 shadow rounded">
            <h3>Percentage</h3>
            <p className="text-2xl font-bold">
              {
                report.percentage
              }
              %
            </p>
          </div>

        </div>

        <table className="w-full border">
          <thead>
            <tr>
              <th className="border p-2">
                Subject
              </th>

              <th className="border p-2">
                Status
              </th>

              <th className="border p-2">
                Date
              </th>
            </tr>
          </thead>

          <tbody>
            {report.records.map(
              (r) => (
                <tr key={r._id}>
                  <td className="border p-2">
                    {
                      r.subject
                        ?.subjectName
                    }
                  </td>

                  <td className="border p-2">
                    {r.status}
                  </td>

                  <td className="border p-2">
                    {new Date(
                      r.date
                    ).toLocaleDateString()}
                  </td>
                </tr>
              )
            )}
          </tbody>
        </table>

      </div>
    </Layout>
  );
};

export default AttendanceReport;