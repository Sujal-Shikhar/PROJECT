import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import toast from "react-hot-toast";

import NoticeForm from "../../components/notice/NoticeForm";

import {
  getNoticeById,
  updateNotice,
} from "../../api/noticeApi";

import { getFaculties } from "../../api/facultyApi";

const EditNotice = () => {
  const { id } = useParams();

  const navigate = useNavigate();

  const [notice, setNotice] = useState({});
  const [faculties, setFaculties] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      const [noticeRes, facultyRes] =
        await Promise.all([
          getNoticeById(id),
          getFaculties(),
        ]);

      setNotice(noticeRes.notice);

      setFaculties(
        facultyRes.faculty || []
      );
    } catch (error) {
      toast.error("Unable to load notice.");
    } finally {
      setLoading(false);
    }
  };

  const handleSubmit = async (data) => {
    try {
      await updateNotice(id, data);

      toast.success(
        "Notice updated successfully."
      );

      navigate("/notices");
    } catch (error) {
      toast.error(
        error.response?.data?.message ||
          "Update failed."
      );
    }
  };

  if (loading)
    return (
      <div className="text-center py-10">
        Loading...
      </div>
    );

  return (
    <div className="space-y-6">

      <div>
        <h1 className="text-3xl font-bold">
          Edit Notice
        </h1>
      </div>

      <NoticeForm
        initialData={notice}
        faculties={faculties}
        onSubmit={handleSubmit}
      />

    </div>
  );
};

export default EditNotice;