import { useEffect, useState } from "react";
import { getTimetableDashboard } from "../../api/timetableApi";

const TimetableDashboard = () => {

  const [classes, setClasses] =
    useState([]);

  useEffect(() => {
    loadDashboard();
  }, []);

  const loadDashboard = async () => {
    const res =
      await getTimetableDashboard();

    setClasses(
      res.latestTimetable || []
    );
  };

  return (
    <div>

      <h1 className="text-3xl font-bold mb-6">
        Timetable Dashboard
      </h1>

      <div className="bg-white rounded-xl shadow">

        <table className="w-full">

          <thead className="bg-gray-100">

            <tr>

              <th className="p-3">
                Day
              </th>

              <th className="p-3">
                Subject
              </th>

              <th className="p-3">
                Faculty
              </th>

              <th className="p-3">
                Room
              </th>

            </tr>

          </thead>

          <tbody>

            {classes.map((item) => (

              <tr
                key={item._id}
                className="border-t"
              >

                <td className="p-3">
                  {item.day}
                </td>

                <td className="p-3">
                  {item.subject?.name}
                </td>

                <td className="p-3">
                  {item.faculty?.name}
                </td>

                <td className="p-3">
                  {item.roomNumber}
                </td>

              </tr>

            ))}

          </tbody>

        </table>

      </div>

    </div>
  );
};

export default TimetableDashboard;