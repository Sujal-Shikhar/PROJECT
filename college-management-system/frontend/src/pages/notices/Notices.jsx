import { useEffect, useState } from "react";
import API from "../../api/axios";
import Layout from "../../components/layout/Layout";
import NoticeForm from "./NoticeForm";

const Notices = () => {
  const [notices, setNotices] = useState([]);

  useEffect(() => {
    fetchNotices();
  }, []);

  const fetchNotices = async () => {
    try {
      const res = await API.get("/notices");

      setNotices(res.data.data || []);
    } catch (error) {
      console.log(error);
    }
  };

  const deleteNotice = async (id) => {
    try {
      await API.delete(`/notices/${id}`);

      fetchNotices();
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <Layout>
      <div className="p-6">

        <h1 className="text-3xl font-bold mb-6">
          Notice Board
        </h1>

        <NoticeForm
          refreshNotices={fetchNotices}
        />

        <div className="bg-white shadow rounded overflow-hidden">
          <table className="w-full">

            <thead className="bg-gray-100">
              <tr>
                <th className="p-3">Title</th>
                <th className="p-3">Description</th>
                <th className="p-3">Audience</th>
                <th className="p-3">Date</th>
                <th className="p-3">Action</th>
              </tr>
            </thead>

            <tbody>
              {notices.map((notice) => (
                <tr
                  key={notice._id}
                  className="border-t"
                >
                  <td className="p-3">
                    {notice.title}
                  </td>

                  <td className="p-3">
                    {notice.description}
                  </td>

                  <td className="p-3">
                    {notice.audience}
                  </td>

                  <td className="p-3">
                    {new Date(
                      notice.noticeDate
                    ).toLocaleDateString()}
                  </td>

                  <td className="p-3">
                    <button
                      onClick={() =>
                        deleteNotice(notice._id)
                      }
                      className="bg-red-500 text-white px-3 py-1 rounded"
                    >
                      Delete
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>

          </table>
        </div>

      </div>
    </Layout>
  );
};

export default Notices;