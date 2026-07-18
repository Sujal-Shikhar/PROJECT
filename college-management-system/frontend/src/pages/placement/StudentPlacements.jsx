import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import toast from "react-hot-toast";

import { getStudentPlacements } from "../../api/placementApi";
import PlacementTable from "../../components/placement/PlacementTable";


const StudentPlacements = () => {
  const { studentId } = useParams();

  const [placements, setPlacements] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadPlacements();
  }, []);

  const loadPlacements = async () => {
    try {
      const res = await getStudentPlacements(studentId);

      setPlacements(res.placements || []);
    } catch (error) {
      console.error(error);
      toast.error("Unable to load placements.");
    } finally {
      setLoading(false);
    }
  };

  if (loading) return <LoadingSpinner />;

  return (
    <div className="space-y-6">

      <h1 className="text-3xl font-bold">
        Student Placements
      </h1>

      <PlacementTable
        placements={placements}
        onDelete={() => {}}
      />

    </div>
  );
};

export default StudentPlacements;