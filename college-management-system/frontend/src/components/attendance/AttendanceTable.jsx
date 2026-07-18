export default function AttendanceTable({
  attendance,
  onView,
  onEdit,
  onDelete,
}) {
  return (
    <div className="overflow-x-auto bg-white rounded-xl shadow">
      <table className="min-w-full">
        <thead className="bg-gray-100">
          <tr>
            <th className="p-3">Student</th>
            <th className="p-3">Faculty</th>
            <th className="p-3">Subject</th>
            <th className="p-3">Lecture</th>
            <th className="p-3">Date</th>
            <th className="p-3">Status</th>
            <th className="p-3">Actions</th>
          </tr>
        </thead>

        <tbody>
          {attendance.length === 0 ? (
            <tr>
              <td
                colSpan={7}
                className="text-center py-8"
              >
                No attendance records found.
              </td>
            </tr>
          ) : (
            attendance.map((item) => (
              <tr
                key={item._id}
                className="border-t"
              >
                <td className="p-3">
                  {item.student?.name}
                </td>

                <td className="p-3">
                  {item.faculty?.name}
                </td>

                <td className="p-3">
                  {item.subject?.name}
                </td>

                <td className="p-3">
                  {item.lectureNumber}
                </td>

                <td className="p-3">
                  {new Date(
                    item.date
                  ).toLocaleDateString()}
                </td>

                <td className="p-3">
                  <span
                    className={`px-3 py-1 rounded-full text-white text-sm ${
                      item.status === "Present"
                        ? "bg-green-600"
                        : item.status === "Absent"
                        ? "bg-red-600"
                        : item.status === "Late"
                        ? "bg-yellow-500"
                        : "bg-purple-600"
                    }`}
                  >
                    {item.status}
                  </span>
                </td>

                <td className="p-3 flex gap-2">
                  <button
                    onClick={() =>
                      onView(item._id)
                    }
                    className="text-blue-600"
                  >
                    View
                  </button>

                  <button
                    onClick={() =>
                      onEdit(item._id)
                    }
                    className="text-green-600"
                  >
                    Edit
                  </button>

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
}