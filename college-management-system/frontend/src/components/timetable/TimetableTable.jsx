import { Link } from "react-router-dom";

const TimetableTable = ({
  timetable = [],
  onDelete,
}) => {
  return (
    <div className="bg-white rounded-xl shadow overflow-x-auto">

      <table className="w-full">

        <thead className="bg-gray-100">

          <tr>

            <th className="p-3 text-left">
              Department
            </th>

            <th className="p-3 text-left">
              Semester
            </th>

            <th className="p-3 text-left">
              Section
            </th>

            <th className="p-3 text-left">
              Day
            </th>

            <th className="p-3 text-left">
              Time
            </th>

            <th className="p-3 text-left">
              Subject
            </th>

            <th className="p-3 text-left">
              Faculty
            </th>

            <th className="p-3 text-left">
              Room
            </th>

            <th className="p-3 text-center">
              Actions
            </th>

          </tr>

        </thead>

        <tbody>

          {timetable.length === 0 ? (

            <tr>

              <td
                colSpan="9"
                className="text-center p-8"
              >
                No timetable entries found.
              </td>

            </tr>

          ) : (

            timetable.map((item) => (

              <tr
                key={item._id}
                className="border-t"
              >

                <td className="p-3">
                  {item.department}
                </td>

                <td className="p-3">
                  {item.semester}
                </td>

                <td className="p-3">
                  {item.section}
                </td>

                <td className="p-3">
                  {item.day}
                </td>

                <td className="p-3">
                  {item.startTime} - {item.endTime}
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

                <td className="p-3 flex gap-2 justify-center">

                  <Link
                    to={`/timetable/${item._id}`}
                    className="px-3 py-1 bg-green-600 text-white rounded"
                  >
                    View
                  </Link>

                  <Link
                    to={`/timetable/edit/${item._id}`}
                    className="px-3 py-1 bg-yellow-500 text-white rounded"
                  >
                    Edit
                  </Link>

                  <button
                    onClick={() =>
                      onDelete(item._id)
                    }
                    className="px-3 py-1 bg-red-600 text-white rounded"
                  >
                    Delete
                  </button>

                </td>

              </tr>

            ))

          )}

        </tbody>

      </table>

    </div>
  );
};

export default TimetableTable;