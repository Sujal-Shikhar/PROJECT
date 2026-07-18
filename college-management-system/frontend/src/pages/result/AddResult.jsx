import { useState } from "react";
import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";

import ResultForm from "../../components/result/ResultForm";
import { createResult } from "../../api/resultApi";

const AddResult = () => {
  const navigate = useNavigate();

  const [loading, setLoading] = useState(false);

  const initialValues = {
    student: "",
    subject: "",
    exam: "",
    externalMarks: "",
    remarks: "",
  };

  const handleSubmit = async (values) => {
    try {
      setLoading(true);

      await createResult(values);

      toast.success("Result created successfully");

      navigate("/results");
    } catch (error) {
      console.error(error);

      toast.error(
        error?.response?.data?.message ||
          "Unable to create result."
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="space-y-6">

      <div>
        <h1 className="text-3xl font-bold">
          Add Result
        </h1>

        <p className="text-gray-500 mt-2">
          Create a new examination result.
        </p>
      </div>

      <ResultForm
        initialValues={initialValues}
        onSubmit={handleSubmit}
        loading={loading}
      />

    </div>
  );
};

export default AddResult;