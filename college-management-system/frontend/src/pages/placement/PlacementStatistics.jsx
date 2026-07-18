import { useEffect, useState } from "react";

import { getPlacementStats } from "../../api/placementApi";


import StatCard from "../../components/common/StatCard";

const PlacementStatistics = () => {

  const [stats, setStats] =
    useState(null);

  const [loading, setLoading] =
    useState(true);

  useEffect(() => {

    loadStats();

  }, []);

  const loadStats = async () => {

    try {

      const res =
        await getPlacementStats();

      setStats(res);

    } finally {

      setLoading(false);

    }

  };

  if (loading)
    return <LoadingSpinner />;

  return (

    <div className="space-y-6">

      <h1 className="text-3xl font-bold">
        Placement Statistics
      </h1>

      <div className="grid md:grid-cols-4 gap-6">

        <StatCard
          title="Total Placements"
          value={stats.totalPlacements}
        />

        <StatCard
          title="Selected"
          value={stats.selected}
        />

        <StatCard
          title="Rejected"
          value={stats.rejected}
        />

        <StatCard
          title="Interview"
          value={stats.interview}
        />

        <StatCard
          title="Shortlisted"
          value={stats.shortlisted}
        />

        <StatCard
          title="Highest Package"
          value={`${stats.highestPackage} LPA`}
        />

        <StatCard
          title="Average Package"
          value={`${Number(
            stats.averagePackage
          ).toFixed(2)} LPA`}
        />

        <StatCard
          title="Lowest Package"
          value={`${stats.lowestPackage} LPA`}
        />

      </div>

    </div>

  );

};

export default PlacementStatistics;