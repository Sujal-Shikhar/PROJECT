import { useEffect, useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import toast from "react-hot-toast";

import { getPlacementById } from "../../api/placementApi";

const ViewPlacement = () => {
  const { id } = useParams();
  const navigate = useNavigate();

  const [placement, setPlacement] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchPlacement();
  }, []);

  const fetchPlacement = async () => {
    try {
      const res = await getPlacementById(id);

      setPlacement(res.placement);
    } catch (error) {
      console.error(error);

      toast.error("Unable to load placement.");

      navigate("/placements");
    } finally {
      setLoading(false);
    }
  };

  if (loading) return <LoadingSpinner />;

  if (!placement) return null;

  return (
    <div className="space-y-6">

      <div className="flex justify-between">

        <div>

          <h1 className="text-3xl font-bold">
            Placement Details
          </h1>

          <p className="text-gray-500">
            View placement information
          </p>

        </div>

        <Link
          to={`/placements/edit/${placement._id}`}
          className="bg-yellow-500 hover:bg-yellow-600 text-white px-5 py-2 rounded-lg"
        >
          Edit
        </Link>

      </div>

      <div className="bg-white rounded-xl shadow p-8">

        <div className="grid md:grid-cols-2 gap-6">

          <div>
            <label className="text-gray-500">
              Student
            </label>
            <p className="font-semibold">
              {placement.student?.name}
            </p>
          </div>

          <div>
            <label className="text-gray-500">
              Roll Number
            </label>
            <p className="font-semibold">
              {placement.student?.rollNumber}
            </p>
          </div>

          <div>
            <label className="text-gray-500">
              Department
            </label>
            <p className="font-semibold">
              {placement.student?.department}
            </p>
          </div>

          <div>
            <label className="text-gray-500">
              Semester
            </label>
            <p className="font-semibold">
              {placement.student?.semester}
            </p>
          </div>

          <div>
            <label className="text-gray-500">
              Company
            </label>
            <p className="font-semibold">
              {placement.companyName}
            </p>
          </div>

          <div>
            <label className="text-gray-500">
              Job Role
            </label>
            <p className="font-semibold">
              {placement.jobRole}
            </p>
          </div>

          <div>
            <label className="text-gray-500">
              Package
            </label>
            <p className="font-semibold">
              ₹ {placement.package} LPA
            </p>
          </div>

          <div>
            <label className="text-gray-500">
              Location
            </label>
            <p className="font-semibold">
              {placement.location}
            </p>
          </div>

          <div>
            <label className="text-gray-500">
              Drive Date
            </label>
            <p className="font-semibold">
              {new Date(
                placement.driveDate
              ).toLocaleDateString()}
            </p>
          </div>

          <div>
            <label className="text-gray-500">
              Joining Date
            </label>
            <p className="font-semibold">
              {placement.joiningDate
                ? new Date(
                    placement.joiningDate
                  ).toLocaleDateString()
                : "-"}
            </p>
          </div>

          <div>

            <label className="text-gray-500">
              Status
            </label>

            <span
              className={`inline-block mt-2 px-3 py-1 rounded-full text-white text-sm
              ${
                placement.status ===
                "Selected"
                  ? "bg-green-600"
                  : placement.status ===
                    "Rejected"
                  ? "bg-red-600"
                  : placement.status ===
                    "Interview"
                  ? "bg-blue-600"
                  : placement.status ===
                    "Shortlisted"
                  ? "bg-yellow-500"
                  : "bg-gray-600"
              }`}
            >
              {placement.status}
            </span>

          </div>

        </div>

        <div className="mt-8">

          <label className="text-gray-500">
            Remarks
          </label>

          <div className="border rounded-lg p-4 mt-2">
            {placement.remarks || "-"}
          </div>

        </div>

      </div>

      <Link
        to="/placements"
        className="inline-block bg-gray-700 hover:bg-gray-800 text-white px-5 py-2 rounded-lg"
      >
        Back
      </Link>

    </div>
  );
};

export default ViewPlacement;