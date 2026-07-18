import {
  Pencil,
  Trash2,
  Eye,
  CheckCircle,
  XCircle,
} from "lucide-react";

const NoticeTable = ({
  notices = [],
  onView,
  onEdit,
  onDelete,
  onPublish,
  onUnpublish,
}) => {
  return (
    <div className="bg-white rounded-xl shadow overflow-x-auto">
      <table className="w-full">
        <thead className="bg-gray-100">
          <tr>
            <th className="p-3 text-left">
              Title
            </th>

            <th className="p-3 text-left">
              Audience
            </th>

            <th className="p-3 text-left">
              Department
            </th>

            <th className="p-3 text-left">
              Semester
            </th>

            <th className="p-3 text-left">
              Publish Date
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
          {notices.length === 0 ? (
            <tr>
              <td
                colSpan="7"
                className="text-center py-8"
              >
                No notices found.
              </td>
            </tr>
          ) : (
            notices.map((notice) => (
              <tr
                key={notice._id}
                className="border-t"
              >
                <td className="p-3 font-medium">
                  {notice.title}
                </td>

                <td className="p-3">
                  {notice.audience}
                </td>

                <td className="p-3">
                  {notice.department || "-"}
                </td>

                <td className="p-3">
                  {notice.semester || "-"}
                </td>

                <td className="p-3">
                  {notice.publishDate
                    ? new Date(
                        notice.publishDate
                      ).toLocaleDateString()
                    : "-"}
                </td>

                <td className="p-3">
                  {notice.isPublished ? (
                    <span className="text-green-600 font-medium">
                      Published
                    </span>
                  ) : (
                    <span className="text-red-600 font-medium">
                      Unpublished
                    </span>
                  )}
                </td>

                <td className="p-3">
                  <div className="flex justify-center gap-2">

                    <button
                      onClick={() =>
                        onView(notice._id)
                      }
                      className="text-blue-600 hover:text-blue-800"
                    >
                      <Eye size={18} />
                    </button>

                    <button
                      onClick={() =>
                        onEdit(notice._id)
                      }
                      className="text-yellow-600 hover:text-yellow-800"
                    >
                      <Pencil size={18} />
                    </button>

                    <button
                      onClick={() =>
                        onDelete(notice._id)
                      }
                      className="text-red-600 hover:text-red-800"
                    >
                      <Trash2 size={18} />
                    </button>

                    {notice.isPublished ? (
                      <button
                        onClick={() =>
                          onUnpublish(
                            notice._id
                          )
                        }
                        className="text-orange-600 hover:text-orange-800"
                      >
                        <XCircle size={18} />
                      </button>
                    ) : (
                      <button
                        onClick={() =>
                          onPublish(
                            notice._id
                          )
                        }
                        className="text-green-600 hover:text-green-800"
                      >
                        <CheckCircle
                          size={18}
                        />
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

export default NoticeTable;