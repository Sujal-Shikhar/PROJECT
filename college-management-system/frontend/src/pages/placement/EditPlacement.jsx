import { useEffect, useState } from "react";

import { useNavigate, useParams } from "react-router-dom";

import toast from "react-hot-toast";

import PlacementForm from "../../components/placement/PlacementForm";

import {
  getPlacementById,
  updatePlacement,
} from "../../api/placementApi";

import { getStudents } from "../../api/studentApi";



const EditPlacement = () => {

  const { id } = useParams();

  const navigate = useNavigate();

  const [students, setStudents] =
    useState([]);

  const [placement, setPlacement] =
    useState(null);

  const [loading, setLoading] =
    useState(true);

  const [saving, setSaving] =
    useState(false);

  useEffect(() => {

    fetchData();

  }, []);

  const fetchData = async () => {

    try {

      const [studentRes, placementRes] =
        await Promise.all([
          getStudents(),
          getPlacementById(id),
        ]);

      setStudents(
        studentRes.students || []
      );

      setPlacement(
        placementRes.placement
      );

    } catch (error) {

      console.error(error);

      toast.error(
        "Unable to load placement."
      );

      navigate("/placements");

    } finally {

      setLoading(false);

    }

  };

  const handleSubmit = async (
    data
  ) => {

    try {

      setSaving(true);

      await updatePlacement(
        id,
        data
      );

      toast.success(
        "Placement updated successfully."
      );

      navigate("/placements");

    } catch (error) {

      console.error(error);

      toast.error(
        error.response?.data
          ?.message ||
          "Unable to update placement."
      );

    } finally {

      setSaving(false);

    }

  };

  if (loading) {
  return (
    <div className="flex justify-center items-center h-64">
      <p className="text-lg font-semibold">
        Loading...
      </p>
    </div>
  );
}

  return (

    <div className="space-y-6">

      <div>

        <h1 className="text-3xl font-bold">

          Edit Placement

        </h1>

        <p className="text-gray-500">

          Update placement details.

        </p>

      </div>

      <PlacementForm
        initialData={placement}
        students={students}
        onSubmit={handleSubmit}
        loading={saving}
      />

    </div>

  );

};

export default EditPlacement;