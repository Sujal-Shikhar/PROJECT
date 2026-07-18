import { useEffect, useState } from "react";
import { getTimetableStats } from "../../api/timetableApi";
import StatCard from "../../components/common/StatCard";

const TimetableStatistics = () => {

  const [stats, setStats] = useState({});

  useEffect(() => {
    loadStats();
  }, []);

  const loadStats = async () => {
    const res = await getTimetableStats();
    setStats(res);
  };

  return (
    <div>

      <h1 className="text-3xl font-bold mb-6">
        Timetable Statistics
      </h1>

      <div className="grid md:grid-cols-4 gap-5">

        <StatCard
          title="Total Classes"
          value={stats.totalClasses || 0}
        />

        <StatCard
          title="Departments"
          value={stats.departments || 0}
        />

        <StatCard
          title="Faculties"
          value={stats.faculties || 0}
        />

        <StatCard
          title="Subjects"
          value={stats.subjects || 0}
        />

      </div>

    </div>
  );
};

export default TimetableStatistics;