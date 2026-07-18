import {
  useEffect,
  useState,
} from "react";

import {
  useNavigate,
  useParams,
} from "react-router-dom";

import toast from "react-hot-toast";

import InternalMarkForm from "../../components/internalMarks/InternalMarkForm";

import {
  getInternalMarkById,
  updateInternalMark,
} from "../../api/internalMarkApi";

const EditInternalMark = () => {
  const { id } = useParams();

  const navigate = useNavigate();

  const [record, setRecord] =
    useState(null);

  const [loading, setLoading] =
    useState(true);

  useEffect(() => {
    loadRecord();
  }, []);

  const loadRecord = async () => {
    try {
      const res =
        await getInternalMarkById(id);

      setRecord(
        res.internalMark
      );
    } catch (error) {
      console.error(error);

      toast.error(
        "Unable to load record."
      );

      navigate("/internal-marks");
    } finally {
      setLoading(false);
    }
  };

  const handleSubmit = async (
    values
  ) => {
    try {
      await updateInternalMark(
        id,
        values
      );

      toast.success(
        "Internal marks updated."
      );

      navigate("/internal-marks");
    } catch (error) {
      console.error(error);

      toast.error(
        error?.response?.data?.message ||
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
          Edit Internal Marks
        </h1>

        <p className="text-gray-500 mt-2">
          Update assessment marks.
        </p>

      </div>

      <div className="bg-white rounded-xl shadow p-6">

        <InternalMarkForm
          initialData={record}
          onSubmit={handleSubmit}
        />

      </div>

    </div>
  );
};

export default EditInternalMark;