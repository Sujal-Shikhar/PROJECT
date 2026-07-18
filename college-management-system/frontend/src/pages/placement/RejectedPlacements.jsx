import { useEffect, useState } from "react";
import { getRejectedPlacements } from "../../api/placementApi";
import PlacementTable from "../../components/placement/PlacementTable";

const RejectedPlacements = () => {
  const [placements, setPlacements] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      const res = await getRejectedPlacements();
      setPlacements(res.placements || []);
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  if (loading) return <p>Loading...</p>;

  return (
    <div className="space-y-6">
      <h1 className="text-2xl font-bold">
        Rejected Students
      </h1>

      <PlacementTable
        placements={placements}
        refresh={fetchData}
      />
    </div>
  );
};

export default RejectedPlacements;