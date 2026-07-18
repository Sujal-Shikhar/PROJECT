import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";

import {
  getNotices,
  deleteNotice,
  publishNotice,
  unpublishNotice,
} from "../../api/noticeApi";

import NoticeTable from "../../components/notice/NoticeTable";

const NoticeList = () => {
  const navigate = useNavigate();

  const [notices, setNotices] = useState([]);
  const [loading, setLoading] =
    useState(true);

  useEffect(() => {
    fetchNotices();
  }, []);

  const fetchNotices = async () => {
    try {
      setLoading(true);

      const res = await getNotices();

      setNotices(res.notices || []);
    } catch (error) {
      console.error(error);

      toast.error(
        "Unable to load notices."
      );
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (id) => {
    if (
      !window.confirm(
        "Delete this notice?"
      )
    )
      return;

    try {
      await deleteNotice(id);

      toast.success(
        "Notice deleted successfully."
      );

      fetchNotices();
    } catch (error) {
      toast.error(
        error.response?.data?.message ||
          "Delete failed."
      );
    }
  };

  const handlePublish = async (id) => {
    try {
      await publishNotice(id);

      toast.success(
        "Notice published."
      );

      fetchNotices();
    } catch (error) {
      toast.error(
        error.response?.data?.message ||
          "Publish failed."
      );
    }
  };

  const handleUnpublish =
    async (id) => {
      try {
        await unpublishNotice(id);

        toast.success(
          "Notice unpublished."
        );

        fetchNotices();
      } catch (error) {
        toast.error(
          error.response?.data
            ?.message ||
            "Unpublish failed."
        );
      }
    };

  if (loading) {
    return (
      <div className="text-center py-10">
        Loading...
      </div>
    );
  }

  return (
    <div className="space-y-6">

      <div className="flex justify-between items-center">

        <div>

          <h1 className="text-3xl font-bold">
            Notices
          </h1>

          <p className="text-gray-500">
            Manage all notices.
          </p>

        </div>

        <button
          onClick={() =>
            navigate("/notices/add")
          }
          className="bg-blue-600 text-white px-5 py-2 rounded-lg hover:bg-blue-700"
        >
          Add Notice
        </button>

      </div>

      <NoticeTable
        notices={notices}
        onView={(id) =>
          navigate(`/notices/${id}`)
        }
        onEdit={(id) =>
          navigate(
            `/notices/edit/${id}`
          )
        }
        onDelete={handleDelete}
        onPublish={handlePublish}
        onUnpublish={
          handleUnpublish
        }
      />

    </div>
  );
};

export default NoticeList;