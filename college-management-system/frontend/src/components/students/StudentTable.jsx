import {
  Eye,
  Pencil,
  Trash2,
} from "lucide-react";

export default function StudentTable({
  students,
  onView,
  onEdit,
  onDelete,
}) {
  return (
    <div className="overflow-x-auto bg-white rounded-lg shadow">

      <table className="w-full">

        <thead className="bg-gray-100">

          <tr>

            <th className="p-3 text-left">Roll No</th>

            <th className="p-3 text-left">Name</th>

            <th className="p-3 text-left">Department</th>

            <th className="p-3 text-left">Semester</th>

            <th className="p-3 text-center">Actions</th>

          </tr>

        </thead>

        <tbody>

          {students.map((student) => (

            <tr
              key={student._id}
              className="border-t"
            >

              <td className="p-3">
                {student.rollNumber}
              </td>

              <td className="p-3">
                {student.name}
              </td>

              <td className="p-3">
                {student.department}
              </td>

              <td className="p-3">
                {student.semester}
              </td>

              <td className="p-3">

                <div className="flex justify-center gap-3">

                  <button
                    onClick={() =>
                      onView(student._id)
                    }
                  >
                    <Eye size={18} />
                  </button>

                  <button
                    onClick={() =>
                      onEdit(student._id)
                    }
                  >
                    <Pencil size={18} />
                  </button>

                  <button
                    onClick={() =>
                      onDelete(student._id)
                    }
                  >
                    <Trash2
                      size={18}
                      className="text-red-600"
                    />
                  </button>

                </div>

              </td>

            </tr>

          ))}

        </tbody>

      </table>

    </div>
  );
}