import { useEffect, useState } from "react";
import toast from "react-hot-toast";

import StatCard from "../../components/common/StatCard";

import { getAssignmentStats } from "../../api/facultySubjectApi";

const FacultySubjectStatistics = () => {

  const [stats, setStats] = useState({});

  useEffect(() => {
    fetchStats();
  }, []);

  const fetchStats = async () => {
    try {

      const res =
        await getAssignmentStats();

      setStats(res.stats || {});

    } catch (error) {

      console.error(error);

      toast.error(
        "Unable to load statistics."
      );

    }
  };

  return (

    <div className="space-y-6">

      <div>

        <h1 className="text-3xl font-bold">
          Faculty Subject Statistics
        </h1>

        <p className="text-gray-500">
          Assignment overview
        </p>

      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">

        <StatCard
          title="Total"
          value={stats.totalAssignments || 0}
        />

        <StatCard
          title="Active"
          value={stats.activeAssignments || 0}
        />

        <StatCard
          title="Inactive"
          value={stats.inactiveAssignments || 0}
        />

        <StatCard
          title="Coordinators"
          value={stats.coordinatorCount || 0}
        />

      </div>

      <div className="bg-white rounded-xl shadow p-6">

        <h2 className="text-xl font-semibold mb-4">
          Department Statistics
        </h2>

        <table className="min-w-full">

          <thead className="bg-gray-100">

            <tr>

              <th className="p-3">
                Department
              </th>

              <th className="p-3">
                Assignments
              </th>

            </tr>

          </thead>

          <tbody>

            {stats.departmentStats?.map(
              (item) => (

                <tr
                  key={item._id}
                  className="border-t"
                >

                  <td className="p-3">
                    {item._id}
                  </td>

                  <td className="p-3">
                    {item.total}
                  </td>

                </tr>

              )
            )}

          </tbody>

        </table>

      </div>

    </div>

  );
};

export default FacultySubjectStatistics;