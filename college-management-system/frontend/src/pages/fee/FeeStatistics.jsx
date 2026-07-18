import { useEffect, useState } from "react";

import { getFeeStats } from "../../api/feeApi";

import FeeStatsCards from "../../components/fee/FeeStatsCards";

const FeeStatistics = () => {

  const [stats, setStats] =
    useState(null);

  useEffect(() => {

    loadStats();

  }, []);

  const loadStats = async () => {

    const res =
      await getFeeStats();

    setStats(res);

  };

  return (

    <div className="space-y-8">

      <div>

        <h1 className="text-3xl font-bold">

          Fee Statistics

        </h1>

      </div>

      <FeeStatsCards
        stats={stats}
      />

      {stats && (

        <div className="bg-white rounded-xl shadow p-8">

          <div className="grid md:grid-cols-2 gap-6">

            <Stat
              title="Total Collection"
              value={`₹${stats.totalCollection || 0}`}
            />

            <Stat
              title="Outstanding Balance"
              value={`₹${stats.outstanding || 0}`}
            />

            <Stat
              title="Paid Students"
              value={stats.paid}
            />

            <Stat
              title="Pending Students"
              value={stats.pending}
            />

          </div>

        </div>

      )}

    </div>

  );

};

const Stat = ({
  title,
  value,
}) => (

  <div className="border rounded-lg p-5">

    <p className="text-gray-500">

      {title}

    </p>

    <h2 className="text-2xl font-bold mt-2">

      {value}

    </h2>

  </div>

);

export default FeeStatistics;