import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";

import NoticeForm from "../../components/notice/NoticeForm";

import { createNotice } from "../../api/noticeApi";
import { getFaculties } from "../../api/facultyApi";

const AddNotice = () => {
  const navigate = useNavigate();

  const [faculties, setFaculties] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    fetchFaculties();
  }, []);

  const fetchFaculties = async () => {
    try {
      const res = await getFaculties();
      setFaculties(res.faculty || []);
    } catch (error) {
      toast.error("Unable to load faculties.");
    }
  };

  const handleSubmit = async (data) => {
    try {
      setLoading(true);

      await createNotice(data);

      toast.success("Notice created successfully.");

      navigate("/notices");
    } catch (error) {
      toast.error(
        error.response?.data?.message ||
          "Unable to create notice."
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="space-y-6">

      <div>
        <h1 className="text-3xl font-bold">
          Add Notice
        </h1>

        <p className="text-gray-500">
          Create a new notice.
        </p>
      </div>

      <NoticeForm
        faculties={faculties}
        onSubmit={handleSubmit}
        loading={loading}
      />

    </div>
  );
};

export default AddNotice;