import { useState } from "react";
import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";

import StudentForm from "../../components/students/StudentForm";
import { createStudent } from "../../api/studentApi";

export default function AddStudent() {
  const navigate = useNavigate();

  const [loading, setLoading] =
    useState(false);

  const onSubmit = async (formData) => {
    try {
      setLoading(true);

      await createStudent(formData);

      toast.success(
        "Student added successfully"
      );

      navigate("/students");
    } catch (err) {
      console.log(err.response?.data);

toast.error(
  err.response?.data?.message ||
  "Failed to add student"
);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div>

      <h1 className="text-3xl font-bold mb-6">
        Add Student
      </h1>

      <StudentForm
        onSubmit={onSubmit}
        loading={loading}
      />

    </div>
  );
}