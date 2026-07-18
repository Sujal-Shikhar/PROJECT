import { useEffect, useState } from "react";
import { getSelectedPlacements } from "../../api/placementApi";
import PlacementTable from "../../components/placement/PlacementTable";

const SelectedPlacements = () => {
  const [placements, setPlacements] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      const res = await getSelectedPlacements();
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
        Selected Students
      </h1>

      <PlacementTable
        placements={placements}
        refresh={fetchData}
      />
    </div>
  );
};

export default SelectedPlacements;