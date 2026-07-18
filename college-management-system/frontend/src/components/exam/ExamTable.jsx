import {
  Eye,
  Pencil,
  Trash2,
} from "lucide-react";

import { Link } from "react-router-dom";

export default function ExamTable({
  exams = [],
  onDelete = () => {},
}) {
  return (

    <div className="overflow-x-auto bg-white rounded-xl shadow">

      <table className="w-full">

        <thead className="bg-gray-100">

          <tr>

            <th className="p-3 text-left">
              Exam
            </th>

            <th className="p-3 text-left">
              Subject
            </th>

            <th className="p-3 text-left">
              Faculty
            </th>

            <th className="p-3 text-left">
              Department
            </th>

            <th className="p-3 text-left">
              Semester
            </th>

            <th className="p-3 text-left">
              Date
            </th>

            <th className="p-3 text-left">
              Status
            </th>

            <th className="p-3 text-center">
              Actions
            </th>

          </tr>

        </thead>

        <tbody>

          {exams.map(
            (exam) => (

              <tr
                key={exam._id}
                className="border-t"
              >

                <td className="p-3">
                  {exam.examName}
                </td>

                <td className="p-3">
                  {exam.subject?.name}
                </td>

                <td className="p-3">
                  {exam.faculty?.name}
                </td>

                <td className="p-3">
                  {exam.department}
                </td>

                <td className="p-3">
                  {exam.semester}
                </td>

                <td className="p-3">
                  {new Date(
                    exam.examDate
                  ).toLocaleDateString()}
                </td>

                <td className="p-3">

                  <span
                    className={`px-3 py-1 rounded-full text-sm
                    ${
                      exam.status ===
                      "Scheduled"
                        ? "bg-blue-100 text-blue-700"
                        : exam.status ===
                          "Completed"
                        ? "bg-green-100 text-green-700"
                        : "bg-red-100 text-red-700"
                    }`}
                  >

                    {exam.status}

                  </span>

                </td>

                <td className="p-3">

                  <div className="flex justify-center gap-2">

                    <Link
                      to={`/exams/${exam._id}`}
                    >
                      <Eye size={18} />
                    </Link>

                    <Link
                      to={`/exams/edit/${exam._id}`}
                    >
                      <Pencil size={18} />
                    </Link>

                    <button
                      onClick={() =>
                        onDelete(
                          exam._id
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

            )
          )}

        </tbody>

      </table>

    </div>

  );

}