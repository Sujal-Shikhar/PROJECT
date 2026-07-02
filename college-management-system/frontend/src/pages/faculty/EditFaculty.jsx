import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import toast from "react-hot-toast";

import FacultyForm from "../../components/faculty/FacultyForm";

import {
  getFacultyById,
  updateFaculty,
} from "../../api/facultyApi";

export default function EditFaculty() {
  const { id } = useParams();

  const navigate = useNavigate();

  const [faculty, setFaculty] =
    useState(null);

  const [loading, setLoading] =
    useState(false);

  const [pageLoading, setPageLoading] =
    useState(true);

  useEffect(() => {
    loadFaculty();
  }, []);

  const loadFaculty = async () => {
    try {
      const data =
        await getFacultyById(id);

      setFaculty(data.faculty);
    } catch (error) {
      toast.error("Unable to load faculty");
      navigate("/faculty");
    } finally {
      setPageLoading(false);
    }
  };

  const onSubmit = async (values) => {
    try {
      setLoading(true);

      if (
        values.profileImage &&
        values.profileImage.length > 0
      ) {
        values.profileImage =
          values.profileImage[0];
      } else {
        delete values.profileImage;
      }

      await updateFaculty(id, values);

      toast.success(
        "Faculty updated successfully"
      );

      navigate("/faculty");
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
        Edit Faculty
      </h1>

      <FacultyForm
        defaultValues={faculty}
        onSubmit={onSubmit}
        loading={loading}
      />

    </div>
  );
}