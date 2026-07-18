import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import toast from "react-hot-toast";

import { getNoticeById } from "../../api/noticeApi";

const NoticeDetails = () => {
  const { id } = useParams();

  const [notice, setNotice] =
    useState(null);

  useEffect(() => {
    fetchNotice();
  }, []);

  const fetchNotice = async () => {
    try {
      const res =
        await getNoticeById(id);

      setNotice(res.notice);
    } catch (error) {
      toast.error(
        "Unable to load notice."
      );
    }
  };

  if (!notice)
    return (
      <div className="text-center py-10">
        Loading...
      </div>
    );

  return (
    <div className="bg-white rounded-xl shadow p-6 space-y-4">

      <h1 className="text-3xl font-bold">
        {notice.title}
      </h1>

      <div>
        <strong>Audience:</strong>{" "}
        {notice.audience}
      </div>

      <div>
        <strong>Department:</strong>{" "}
        {notice.department || "-"}
      </div>

      <div>
        <strong>Semester:</strong>{" "}
        {notice.semester || "-"}
      </div>

      <div>
        <strong>Published By:</strong>{" "}
        {notice.publishedBy?.name}
      </div>

      <div>
        <strong>Publish Date:</strong>{" "}
        {new Date(
          notice.publishDate
        ).toLocaleDateString()}
      </div>

      <div>
        <strong>Expiry Date:</strong>{" "}
        {notice.expiryDate
          ? new Date(
              notice.expiryDate
            ).toLocaleDateString()
          : "-"}
      </div>

      <div>
        <strong>Status:</strong>{" "}
        {notice.isPublished
          ? "Published"
          : "Unpublished"}
      </div>

      <hr />

      <div className="whitespace-pre-wrap">
        {notice.description}
      </div>

    </div>
  );
};

export default NoticeDetails;