import { Link } from "react-router-dom";

const InternalMarkTable = ({
  records = [],
  onDelete,
  onPublish,
  onLock,
}) => {
  return (
    <div className="overflow-x-auto bg-white rounded-xl shadow">

      <table className="min-w-full">

        <thead className="bg-gray-100">

          <tr>

            <th className="px-4 py-3 text-left">
              Student
            </th>

            <th className="px-4 py-3 text-left">
              Subject
            </th>

            <th className="px-4 py-3 text-left">
              Exam
            </th>

            <th className="px-4 py-3">
              Total
            </th>

            <th className="px-4 py-3">
              Published
            </th>

            <th className="px-4 py-3">
              Locked
            </th>

            <th className="px-4 py-3">
              Actions
            </th>

          </tr>

        </thead>


        <tbody>

          {records.length === 0 ? (

            <tr>

              <td
                colSpan="7"
                className="text-center py-6 text-gray-500"
              >
                No internal marks found.
              </td>

            </tr>

          ) : (

            records.map((mark) => (

              <tr
                key={mark._id}
                className="border-t"
              >

                <td className="px-4 py-3">
                  {mark.student?.name || "N/A"}
                </td>


                <td className="px-4 py-3">
                  {mark.subject?.name || "N/A"}
                </td>


                <td className="px-4 py-3">
                  {mark.exam?.examType || "N/A"}
                </td>


                <td className="px-4 py-3 text-center font-semibold">
                  {mark.totalInternalMarks ?? 0}
                </td>


                <td className="px-4 py-3 text-center">

                  {mark.isPublished
                    ? "Yes"
                    : "No"}

                </td>


                <td className="px-4 py-3 text-center">

                  {mark.isLocked
                    ? "Yes"
                    : "No"}

                </td>


                <td className="px-4 py-3">

                  <div className="flex gap-3 items-center">


                    <Link
                      to={`/internal-marks/${mark._id}`}
                      className="text-blue-600 hover:underline"
                    >
                      View
                    </Link>


                    <Link
                      to={`/internal-marks/edit/${mark._id}`}
                      className="text-green-600 hover:underline"
                    >
                      Edit
                    </Link>


                    <button
                      onClick={() =>
                        onDelete(mark._id)
                      }
                      className="text-red-600 hover:underline"
                    >
                      Delete
                    </button>


                    {onPublish && (
                      <button
                        onClick={() =>
                          onPublish(
                            mark._id,
                            mark.isPublished
                          )
                        }
                        className="text-purple-600 hover:underline"
                      >
                        {mark.isPublished
                          ? "Unpublish"
                          : "Publish"}
                      </button>
                    )}


                    {onLock && (
                      <button
                        onClick={() =>
                          onLock(
                            mark._id,
                            mark.isLocked
                          )
                        }
                        className="text-orange-600 hover:underline"
                      >
                        {mark.isLocked
                          ? "Unlock"
                          : "Lock"}
                      </button>
                    )}

                  </div>

                </td>


              </tr>

            ))

          )}

        </tbody>

      </table>

    </div>
  );
};


export default InternalMarkTable;