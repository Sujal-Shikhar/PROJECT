import {
  useEffect,
  useState,
} from "react";

import toast from "react-hot-toast";

import {
  getInternalMarkStats,
} from "../../api/internalMarkApi";

const Card = ({
  title,
  value,
}) => (
  <div className="bg-white rounded-xl shadow p-6">

    <h3 className="text-gray-500 text-sm">
      {title}
    </h3>

    <h2 className="text-3xl font-bold mt-2">
      {value}
    </h2>

  </div>
);

const InternalMarkStatistics = () => {
  const [stats, setStats] =
    useState(null);

  const [loading, setLoading] =
    useState(true);

  useEffect(() => {
    fetchStats();
  }, []);

  const fetchStats = async () => {
    try {
      const res =
        await getInternalMarkStats();

      setStats(res.stats);
    } catch (error) {
      console.error(error);

      toast.error(
        "Unable to fetch statistics."
      );
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <div className="text-center py-12">
        Loading...
      </div>
    );
  }

  return (
    <div className="space-y-8">

      <div>

        <h1 className="text-3xl font-bold">
          Internal Mark Statistics
        </h1>

        <p className="text-gray-500 mt-2">
          Overall analytics of internal
          assessments.
        </p>

      </div>

      <div className="grid md:grid-cols-4 gap-6">

        <Card
          title="Total Records"
          value={stats.totalRecords}
        />

        <Card
          title="Published"
          value={stats.published}
        />

        <Card
          title="Unpublished"
          value={stats.unpublished}
        />

        <Card
          title="Locked"
          value={stats.locked}
        />

        <Card
          title="Unlocked"
          value={stats.unlocked}
        />

        <Card
          title="Average Marks"
          value={stats.average.toFixed(2)}
        />

        <Card
          title="Highest"
          value={stats.highest}
        />

        <Card
          title="Lowest"
          value={stats.lowest}
        />

      </div>

    </div>
  );
};

export default InternalMarkStatistics;