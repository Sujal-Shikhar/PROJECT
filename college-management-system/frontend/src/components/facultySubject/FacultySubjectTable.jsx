import { Link } from "react-router-dom";

const FacultySubjectTable = ({
  assignments = [],
  onDelete,
}) => {
  return (
    <div className="bg-white rounded-xl shadow overflow-x-auto">
      <table className="min-w-full">

        <thead className="bg-gray-100">

          <tr>

            <th className="p-3 text-left">
              Faculty
            </th>

            <th className="p-3 text-left">
              Subject
            </th>

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
              Academic Year
            </th>

            <th className="p-3 text-left">
              Coordinator
            </th>

            <th className="p-3 text-center">
              Actions
            </th>

          </tr>

        </thead>

        <tbody>

          {assignments.length === 0 ? (
            <tr>
              <td
                colSpan="8"
                className="text-center py-6"
              >
                No assignments found.
              </td>
            </tr>
          ) : (
            assignments.map((item) => (
              <tr
                key={item._id}
                className="border-t"
              >
                <td className="p-3">
                  {item.faculty?.name}
                </td>

                <td className="p-3">
                  {item.subject?.name}
                </td>

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
                  {item.academicYear}
                </td>

                <td className="p-3">
                  {item.isCoordinator
                    ? "Yes"
                    : "No"}
                </td>

                <td className="p-3 text-center space-x-2">

                  <Link
                    to={`/faculty-subjects/${item._id}`}
                    className="text-blue-600"
                  >
                    View
                  </Link>

                  <Link
                    to={`/faculty-subjects/edit/${item._id}`}
                    className="text-green-600"
                  >
                    Edit
                  </Link>

                  <button
                    onClick={() =>
                      onDelete(item._id)
                    }
                    className="text-red-600"
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

export default FacultySubjectTable;