import { useEffect, useState } from "react";

import {
  getPlacementDashboard,
} from "../../api/placementApi";

const PlacementDashboard = () => {
  const [placements, setPlacements] =
    useState([]);

  useEffect(() => {
    fetchDashboard();
  }, []);

  const fetchDashboard = async () => {
    try {
      const res =
        await getPlacementDashboard();

      setPlacements(
        res.latestPlacements || []
      );
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <div className="space-y-6">

      <h1 className="text-2xl font-bold">
        Placement Dashboard
      </h1>

      <div className="bg-white rounded shadow">

        <table className="w-full">

          <thead className="bg-gray-100">

            <tr>

              <th className="p-3 text-left">
                Student
              </th>

              <th className="p-3 text-left">
                Company
              </th>

              <th className="p-3 text-left">
                Role
              </th>

              <th className="p-3 text-left">
                Status
              </th>

            </tr>

          </thead>

          <tbody>

            {placements.map((item) => (

              <tr
                key={item._id}
                className="border-t"
              >

                <td className="p-3">
                  {item.student?.name}
                </td>

                <td className="p-3">
                  {item.companyName}
                </td>

                <td className="p-3">
                  {item.jobRole}
                </td>

                <td className="p-3">
                  {item.status}
                </td>

              </tr>

            ))}

          </tbody>

        </table>

      </div>

    </div>
  );
};

export default PlacementDashboard;