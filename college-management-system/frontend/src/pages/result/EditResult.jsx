import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import toast from "react-hot-toast";

import ResultForm from "../../components/result/ResultForm";

import {
  getResultById,
  updateResult,
} from "../../api/resultApi";

const EditResult = () => {
  const { id } = useParams();
  const navigate = useNavigate();

  const [loading, setLoading] = useState(false);
  const [initialData, setInitialData] = useState(null);

  useEffect(() => {
    fetchResult();
  }, []);

  const fetchResult = async () => {
    try {
      setLoading(true);

      const res = await getResultById(id);

      const result = res.result;

      setInitialData({
        student: result.student?._id || "",
        subject: result.subject?._id || "",
        exam: result.exam?._id || "",
        externalMarks: result.externalMarks || "",
        remarks: result.remarks || "",
      });
    } catch (err) {
      console.error(err);

      toast.error("Unable to load result");

      navigate("/results");
    } finally {
      setLoading(false);
    }
  };

  const handleSubmit = async (values) => {
    try {
      setLoading(true);

      await updateResult(id, values);

      toast.success("Result updated successfully");

      navigate("/results");
    } catch (err) {
      console.error(err);

      toast.error(
        err?.response?.data?.message ||
          "Unable to update result."
      );
    } finally {
      setLoading(false);
    }
  };

  if (!initialData) {
    return (
      <div className="text-center py-10">
        Loading...
      </div>
    );
  }

  return (
    <div className="space-y-6">

      <div>
        <h1 className="text-3xl font-bold">
          Edit Result
        </h1>

        <p className="text-gray-500 mt-2">
          Update examination result.
        </p>
      </div>

      <ResultForm
        initialData={initialData}
        onSubmit={handleSubmit}
        loading={loading}
      />

    </div>
  );
};

export default EditResult;