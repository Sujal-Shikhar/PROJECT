import { Link } from "react-router-dom";
import {
  Eye,
  Pencil,
  Trash2,
  Upload,
  UploadCloud,
} from "lucide-react";

const ResultTable = ({
  results = [],
  loading = false,
  onDelete,
  onPublish,
  showActions = true,
}) => {
  if (loading) {
    return (
      <div className="bg-white rounded-xl shadow p-8 text-center">
        Loading...
      </div>
    );
  }

  return (
    <div className="bg-white rounded-xl shadow overflow-hidden">

      <div className="overflow-x-auto">

        <table className="min-w-full">

          <thead className="bg-gray-100">

            <tr>
              <th className="px-4 py-3 text-left">Student</th>

              <th className="px-4 py-3 text-left">
                Roll No
              </th>

              <th className="px-4 py-3 text-left">
                Subject
              </th>

              <th className="px-4 py-3 text-left">
                Exam
              </th>

              <th className="px-4 py-3 text-center">
                Internal
              </th>

              <th className="px-4 py-3 text-center">
                External
              </th>

              <th className="px-4 py-3 text-center">
                Total
              </th>

              <th className="px-4 py-3 text-center">
                Grade
              </th>

              <th className="px-4 py-3 text-center">
                Result
              </th>

              <th className="px-4 py-3 text-center">
                Published
              </th>

              {showActions && (
                <th className="px-4 py-3 text-center">
                  Actions
                </th>
              )}
            </tr>

          </thead>

          <tbody>

            {results.length === 0 ? (
              <tr>
                <td
                  colSpan={showActions ? 11 : 10}
                  className="text-center py-10 text-gray-500"
                >
                  No Results Found
                </td>
              </tr>
            ) : (
              results.map((result) => (
                <tr
                  key={result._id}
                  className="border-t hover:bg-gray-50"
                >
                  <td className="px-4 py-3">
                    {result.student?.name}
                  </td>

                  <td className="px-4 py-3">
                    {result.student?.rollNumber}
                  </td>

                  <td className="px-4 py-3">
                    {result.subject?.name}
                  </td>

                  <td className="px-4 py-3">
                    {result.exam?.name}
                  </td>

                  <td className="px-4 py-3 text-center">
                    {result.internalMarks}
                  </td>

                  <td className="px-4 py-3 text-center">
                    {result.externalMarks}
                  </td>

                  <td className="px-4 py-3 text-center font-semibold">
                    {result.totalMarks}
                  </td>

                  <td className="px-4 py-3 text-center">
                    {result.grade}
                  </td>

                  <td className="px-4 py-3 text-center">

                    <span
                      className={`px-2 py-1 rounded-full text-xs ${
                        result.result === "Pass"
                          ? "bg-green-100 text-green-700"
                          : "bg-red-100 text-red-700"
                      }`}
                    >
                      {result.result}
                    </span>

                  </td>

                  <td className="px-4 py-3 text-center">

                    <button
                      onClick={() => onPublish(result)}
                      className={`px-3 py-1 rounded text-white text-sm ${
                        result.isPublished
                          ? "bg-green-600"
                          : "bg-gray-500"
                      }`}
                    >
                      {result.isPublished
                        ? "Published"
                        : "Publish"}
                    </button>

                  </td>

                  {showActions && (
                    <td className="px-4 py-3">

                      <div className="flex justify-center gap-3">

                        <Link
                          to={`/results/${result._id}`}
                          title="View"
                        >
                          <Eye
                            size={18}
                            className="text-blue-600"
                          />
                        </Link>

                        <Link
                          to={`/results/edit/${result._id}`}
                          title="Edit"
                        >
                          <Pencil
                            size={18}
                            className="text-yellow-600"
                          />
                        </Link>

                        <button
                          onClick={() =>
                            onDelete(result._id)
                          }
                          title="Delete"
                        >
                          <Trash2
                            size={18}
                            className="text-red-600"
                          />
                        </button>

                      </div>

                    </td>
                  )}

                </tr>
              ))
            )}

          </tbody>

        </table>

      </div>

    </div>
  );
};

export default ResultTable;