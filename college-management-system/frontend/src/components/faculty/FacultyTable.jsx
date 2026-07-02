import {
  Eye,
  Pencil,
  Trash2,
} from "lucide-react";

export default function FacultyTable({
  faculty,
  onView,
  onEdit,
  onDelete,
}) {
  return (
    <div className="overflow-x-auto bg-white rounded-xl shadow">

      <table className="w-full">

        <thead className="bg-gray-100">

          <tr>

            <th className="p-3">Faculty ID</th>

            <th className="p-3">Name</th>

            <th className="p-3">Department</th>

            <th className="p-3">Designation</th>

            <th className="p-3">Email</th>

            <th className="p-3">Actions</th>

          </tr>

        </thead>

        <tbody>

          {faculty.map((teacher) => (

            <tr
              key={teacher._id}
              className="border-t"
            >

              <td className="p-3">
                {teacher.facultyId}
              </td>

              <td className="p-3">
                {teacher.name}
              </td>

              <td className="p-3">
                {teacher.department}
              </td>

              <td className="p-3">
                {teacher.designation}
              </td>

              <td className="p-3">
                {teacher.email}
              </td>

              <td className="p-3">

                <div className="flex justify-center gap-3">

                  <button
                    onClick={() =>
                      onView(
                        teacher._id
                      )
                    }
                  >
                    <Eye size={18} />
                  </button>

                  <button
                    onClick={() =>
                      onEdit(
                        teacher._id
                      )
                    }
                  >
                    <Pencil size={18} />
                  </button>

                  <button
                    onClick={() =>
                      onDelete(
                        teacher._id
                      )
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