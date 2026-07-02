import { useState } from "react";
import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";

import FacultyForm from "../../components/faculty/FacultyForm";

import { createFaculty } from "../../api/facultyApi";

export default function AddFaculty() {
  const navigate = useNavigate();

  const [loading, setLoading] =
    useState(false);

  const onSubmit = async (values) => {
    try {
      setLoading(true);

      if (
        values.profileImage &&
        values.profileImage.length > 0
      ) {
        values.profileImage =
          values.profileImage[0];
      }

      await createFaculty(values);

      toast.success(
        "Faculty created successfully"
      );

      navigate("/faculty");
    } catch (error) {
      toast.error(
        error.response?.data?.message ||
          "Creation failed"
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <div>

      <h1 className="text-3xl font-bold mb-6">
        Add Faculty
      </h1>

      <FacultyForm
        onSubmit={onSubmit}
        loading={loading}
      />

    </div>
  );
}