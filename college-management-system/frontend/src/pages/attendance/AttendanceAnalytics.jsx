import {
  useEffect,
  useState,
} from "react";

import API from "../../api/axios";
import Layout from "../../components/layout/Layout";

const AttendanceAnalytics = () => {
  const [analytics,
    setAnalytics] =
    useState([]);

  useEffect(() => {
    fetchAnalytics();
  }, []);

  const fetchAnalytics =
    async () => {
      try {
        const res =
          await API.get(
            "/attendance-report"
          );

        setAnalytics(
          res.data.report ||
            []
        );
      } catch (error) {
        console.log(error);
      }
    };

  return (
    <Layout>
      <div className="p-6">

        <h1 className="text-3xl font-bold mb-6">
          Attendance Analytics
        </h1>

        <table className="w-full border">

          <thead>
            <tr>
              <th className="border p-2">
                Student
              </th>

              <th className="border p-2">
                Subject
              </th>

              <th className="border p-2">
                Present
              </th>

              <th className="border p-2">
                Total
              </th>

              <th className="border p-2">
                Percentage
              </th>
            </tr>
          </thead>

          <tbody>

            {analytics.map(
              (
                student,
                index
              ) => (
                <tr
                  key={index}
                >
                  <td className="border p-2">
                    {
                      student.student
                    }
                  </td>

                  <td className="border p-2">
                    {
                      student.subject
                    }
                  </td>

                  <td className="border p-2">
                    {
                      student.present
                    }
                  </td>

                  <td className="border p-2">
                    {
                      student.total
                    }
                  </td>

                  <td className="border p-2">
                    {
                      student.percentage
                    }
                    %
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

export default AttendanceAnalytics;