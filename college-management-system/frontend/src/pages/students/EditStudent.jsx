import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import toast from "react-hot-toast";

import StudentForm from "../../components/students/StudentForm";

import {
  getStudent,
  updateStudent,
} from "../../api/studentApi";

export default function EditStudent() {
  const { id } = useParams();

  const navigate = useNavigate();

  const [student, setStudent] =
    useState(null);

  const [loading, setLoading] =
    useState(false);

  const [pageLoading, setPageLoading] =
    useState(true);

  useEffect(() => {
    loadStudent();
  }, []);

  const loadStudent = async () => {
    try {
      const data = await getStudent(id);

      setStudent(data.student);
    } catch (error) {
      toast.error("Unable to load student");
    } finally {
      setPageLoading(false);
    }
  };

  const onSubmit = async (formData) => {
    try {
      setLoading(true);

      await updateStudent(id, formData);

      toast.success(
        "Student updated successfully"
      );

      navigate("/students");
    } catch (error) {
      toast.error(
        error.response?.data?.message ||
          "Update failed"
      );
    } finally {
      setLoading(false);
    }
  };

  if (pageLoading) {
    return (
      <div className="text-center py-10">
        Loading...
      </div>
    );
  }

  return (
    <div>

      <h1 className="text-3xl font-bold mb-6">
        Edit Student
      </h1>

      <StudentForm
        defaultValues={student}
        onSubmit={onSubmit}
        loading={loading}
      />

    </div>
  );
}