import { Link } from "react-router-dom";

const PlacementTable = ({
  placements = [],
  onDelete,
}) => {
  if (!placements.length) {
    return (
      <div className="bg-white rounded-xl shadow p-8 text-center text-gray-500">
        No placement records found.
      </div>
    );
  }

  return (
    <div className="bg-white rounded-xl shadow overflow-x-auto">

      <table className="min-w-full">

        <thead className="bg-gray-100">

          <tr>

            <th className="px-4 py-3 text-left">
              Student
            </th>

            <th className="px-4 py-3 text-left">
              Roll No.
            </th>

            <th className="px-4 py-3 text-left">
              Company
            </th>

            <th className="px-4 py-3 text-left">
              Role
            </th>

            <th className="px-4 py-3 text-left">
              Package
            </th>

            <th className="px-4 py-3 text-left">
              Status
            </th>

            <th className="px-4 py-3 text-left">
              Drive Date
            </th>

            <th className="px-4 py-3 text-center">
              Actions
            </th>

          </tr>

        </thead>

        <tbody>

          {placements.map((placement) => (

            <tr
              key={placement._id}
              className="border-t hover:bg-gray-50"
            >

              <td className="px-4 py-3">
                {placement.student?.name}
              </td>

              <td className="px-4 py-3">
                {placement.student?.rollNumber}
              </td>

              <td className="px-4 py-3">
                {placement.companyName}
              </td>

              <td className="px-4 py-3">
                {placement.jobRole}
              </td>

              <td className="px-4 py-3">
                ₹{placement.package} LPA
              </td>

              <td className="px-4 py-3">

                <span
                  className={`px-3 py-1 rounded-full text-white text-sm
                    ${
                      placement.status ===
                      "Selected"
                        ? "bg-green-600"
                        : placement.status ===
                          "Rejected"
                        ? "bg-red-600"
                        : placement.status ===
                          "Interview"
                        ? "bg-blue-600"
                        : placement.status ===
                          "Shortlisted"
                        ? "bg-yellow-500"
                        : "bg-gray-500"
                    }`}
                >
                  {placement.status}
                </span>

              </td>

              <td className="px-4 py-3">
                {placement.driveDate
                  ? new Date(
                      placement.driveDate
                    ).toLocaleDateString()
                  : "-"}
              </td>

              <td className="px-4 py-3">

                <div className="flex justify-center gap-2">

                  <Link
                    to={`/placements/details/${placement._id}`}
                    className="px-3 py-1 bg-blue-600 text-white rounded hover:bg-blue-700"
                  >
                    View
                  </Link>

                  <Link
                    to={`/placements/edit/${placement._id}`}
                    className="px-3 py-1 bg-yellow-500 text-white rounded hover:bg-yellow-600"
                  >
                    Edit
                  </Link>

                  <button
                    onClick={() =>
                      onDelete(
                        placement._id
                      )
                    }
                    className="px-3 py-1 bg-red-600 text-white rounded hover:bg-red-700"
                  >
                    Delete
                  </button>

                </div>

              </td>

            </tr>

          ))}

        </tbody>

      </table>

    </div>
  );
};

export default PlacementTable;