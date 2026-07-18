import {
  Eye,
  Pencil,
  Trash2,
} from "lucide-react";

export default function SubjectTable({
  subjects,
  onView,
  onEdit,
  onDelete,
}) {
  return (
    <div className="overflow-x-auto bg-white rounded-xl shadow">

      <table className="min-w-full">

        <thead className="bg-gray-100">

          <tr>

            <th className="p-3 text-left">
              Code
            </th>

            <th className="p-3 text-left">
              Subject
            </th>

            <th className="p-3">
              Department
            </th>

            <th className="p-3">
              Semester
            </th>

            <th className="p-3">
              Credits
            </th>

            <th className="p-3">
              Type
            </th>

            <th className="p-3">
              Faculty
            </th>

            <th className="p-3">
              Status
            </th>

            <th className="p-3">
              Actions
            </th>

          </tr>

        </thead>

        <tbody>

          {subjects.map((subject) => (

            <tr
              key={subject._id}
              className="border-t"
            >

              <td className="p-3">
                {subject.code}
              </td>

              <td className="p-3 font-medium">
                {subject.name}
              </td>

              <td className="p-3 text-center">
                {subject.department}
              </td>

              <td className="p-3 text-center">
                {subject.semester}
              </td>

              <td className="p-3 text-center">
                {subject.credits}
              </td>

              <td className="p-3 text-center">
                {subject.type}
              </td>

              <td className="p-3 text-center">
                {subject.faculty?.name || "-"}
              </td>

              <td className="p-3 text-center">

                <span
                  className={`px-3 py-1 rounded-full text-xs ${
                    subject.isActive
                      ? "bg-green-100 text-green-700"
                      : "bg-red-100 text-red-700"
                  }`}
                >
                  {subject.isActive
                    ? "Active"
                    : "Inactive"}
                </span>

              </td>

              <td className="p-3">

                <div className="flex justify-center gap-2">

                  <button
                    onClick={() =>
                      onView(subject._id)
                    }
                  >
                    <Eye size={18} />
                  </button>

                  <button
                    onClick={() =>
                      onEdit(subject._id)
                    }
                  >
                    <Pencil size={18} />
                  </button>

                  <button
                    onClick={() =>
                      onDelete(subject._id)
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