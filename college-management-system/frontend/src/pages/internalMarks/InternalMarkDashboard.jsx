import {
  useEffect,
  useState,
} from "react";

import toast from "react-hot-toast";

import {
  getDashboardSummary,
} from "../../api/internalMarkApi";

const InternalMarkDashboard = () => {
  const [records, setRecords] =
    useState([]);

  const [loading, setLoading] =
    useState(true);

  useEffect(() => {
    loadDashboard();
  }, []);

  const loadDashboard = async () => {
    try {
      const res =
        await getInternalMarkDashboard();

      setRecords(
        res.latestMarks || []
      );
    } catch (error) {
      console.error(error);

      toast.error(
        "Unable to load dashboard."
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="space-y-8">

      <div>

        <h1 className="text-3xl font-bold">
          Internal Marks Dashboard
        </h1>

        <p className="text-gray-500 mt-2">
          Latest internal assessment
          records.
        </p>

      </div>

      <div className="bg-white rounded-xl shadow overflow-hidden">

        <table className="w-full">

          <thead className="bg-gray-100">

            <tr>

              <th className="p-4 text-left">
                Student
              </th>

              <th className="p-4 text-left">
                Roll No
              </th>

              <th className="p-4 text-left">
                Subject
              </th>

              <th className="p-4 text-left">
                Total
              </th>

            </tr>

          </thead>

          <tbody>

            {loading ? (

              <tr>
                <td
                  colSpan="4"
                  className="text-center py-8"
                >
                  Loading...
                </td>
              </tr>

            ) : records.length ? (

              records.map((item) => (

                <tr
                  key={item._id}
                  className="border-t"
                >

                  <td className="p-4">
                    {item.student?.name}
                  </td>

                  <td className="p-4">
                    {
                      item.student
                        ?.rollNumber
                    }
                  </td>

                  <td className="p-4">
                    {item.subject?.name}
                  </td>

                  <td className="p-4 font-semibold">
                    {
                      item.totalInternalMarks
                    }
                  </td>

                </tr>

              ))

            ) : (

              <tr>
                <td
                  colSpan="4"
                  className="text-center py-8"
                >
                  No records found.
                </td>
              </tr>

            )}

          </tbody>

        </table>

      </div>

    </div>
  );
};

export default InternalMarkDashboard;