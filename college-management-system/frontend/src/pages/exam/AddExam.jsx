import { useState } from "react";
import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";

import ExamForm from "../../components/exam/ExamForm";
import { createExam } from "../../api/examApi";

export default function AddExam() {

  const navigate = useNavigate();

  const [loading, setLoading] = useState(false);

  const handleSubmit = async (formData) => {

    try {

      setLoading(true);

      await createExam(formData);

      toast.success("Exam created successfully");

      navigate("/exams");

    } catch (error) {

      console.error(error);

      toast.error(
        error.response?.data?.message ||
        "Unable to create exam"
      );

    } finally {

      setLoading(false);

    }

  };

  return (

    <div className="space-y-6">

      <div>

        <h1 className="text-3xl font-bold text-gray-800">
          Add Exam
        </h1>

        <p className="text-gray-500">
          Create a new examination
        </p>

      </div>

      <ExamForm
        loading={loading}
        onSubmit={handleSubmit}
      />

    </div>

  );

}