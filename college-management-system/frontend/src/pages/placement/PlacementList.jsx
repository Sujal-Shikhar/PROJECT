import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import toast from "react-hot-toast";

import {
  getPlacements,
  deletePlacement,
} from "../../api/placementApi";

import PlacementTable from "../../components/placement/PlacementTable";

const PlacementList = () => {
  const [placements, setPlacements] = useState([]);
  const [loading, setLoading] = useState(true);

  const [search, setSearch] = useState("");

  useEffect(() => {
    fetchPlacements();
  }, []);

  const fetchPlacements = async () => {
    try {
      setLoading(true);

      const res = await getPlacements();

      setPlacements(res.placements || []);
    } catch (error) {
      console.error(error);

      toast.error(
        "Unable to load placements."
      );
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (id) => {
    if (
      !window.confirm(
        "Delete this placement?"
      )
    )
      return;

    try {
      await deletePlacement(id);

      toast.success(
        "Placement deleted successfully."
      );

      fetchPlacements();
    } catch (error) {
      console.error(error);

      toast.error(
        "Unable to delete placement."
      );
    }
  };

  const filteredPlacements =
    placements.filter((placement) => {
      const keyword =
        search.toLowerCase();

      return (
        placement.student?.name
          ?.toLowerCase()
          .includes(keyword) ||
        placement.student?.rollNumber
          ?.toLowerCase()
          .includes(keyword) ||
        placement.companyName
          ?.toLowerCase()
          .includes(keyword) ||
        placement.jobRole
          ?.toLowerCase()
          .includes(keyword)
      );
    });

  if (loading) {
  return (
    <div className="flex justify-center items-center py-10">
      Loading...
    </div>
  );
}

  return (
    <div className="space-y-6">

      <div className="flex justify-between items-center">

        <div>

          <h1 className="text-3xl font-bold">
            Placements
          </h1>

          <p className="text-gray-500">
            Manage placement records
          </p>

        </div>

        <Link
          to="/placements/add"
          className="bg-blue-600 hover:bg-blue-700 text-white px-5 py-2 rounded-lg"
        >
          Add Placement
        </Link>

      </div>

      <input
        type="text"
        placeholder="Search by student, company or role..."
        value={search}
        onChange={(e) =>
          setSearch(e.target.value)
        }
        className="w-full border rounded-lg px-4 py-3"
      />

      <PlacementTable
        placements={filteredPlacements}
        onDelete={handleDelete}
      />

    </div>
  );
};

export default PlacementList;