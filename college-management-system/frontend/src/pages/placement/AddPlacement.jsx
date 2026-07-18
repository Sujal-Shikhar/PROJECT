import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";

import PlacementForm from "../../components/placement/PlacementForm";

import { createPlacement } from "../../api/placementApi";
import { getStudents } from "../../api/studentApi";

const AddPlacement = () => {
  const navigate = useNavigate();

  const [students, setStudents] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    fetchStudents();
  }, []);

  const fetchStudents = async () => {
    try {
      const res = await getStudents();

      setStudents(res.students || []);
    } catch (error) {
      console.error(error);

      toast.error("Unable to load students.");
    }
  };

  const handleSubmit = async (data) => {
    try {
      setLoading(true);

      await createPlacement(data);

      toast.success(
        "Placement created successfully."
      );

      navigate("/placements");
    } catch (error) {
      console.error(error);

      toast.error(
        error.response?.data?.message ||
          "Unable to create placement."
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="space-y-6">

      <div>

        <h1 className="text-3xl font-bold">
          Add Placement
        </h1>

        <p className="text-gray-500">
          Create a new placement record.
        </p>

      </div>

      <PlacementForm
        students={students}
        onSubmit={handleSubmit}
        loading={loading}
      />

    </div>
  );
};

export default AddPlacement;