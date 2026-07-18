import { useEffect, useState } from "react";
import { getAttendanceStats } from "../../api/attendanceApi";

export default function AttendanceDashboard() {
  const [stats, setStats] = useState({
    total: 0,
    present: 0,
    absent: 0,
    late: 0,
    medical: 0,
  });

  useEffect(() => {
    loadStats();
  }, []);

  const loadStats = async () => {
    try {
      const data = await getAttendanceStats();
      setStats(data.stats);
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div className="grid grid-cols-2 md:grid-cols-5 gap-4 mb-6">
      <Card title="Total" value={stats.total} color="bg-blue-600" />
      <Card title="Present" value={stats.present} color="bg-green-600" />
      <Card title="Absent" value={stats.absent} color="bg-red-600" />
      <Card title="Late" value={stats.late} color="bg-yellow-500" />
      <Card title="Medical" value={stats.medical} color="bg-purple-600" />
    </div>
  );
}

function Card({ title, value, color }) {
  return (
    <div className={`${color} rounded-xl text-white p-5 shadow`}>
      <h2 className="text-sm">{title}</h2>

      <p className="text-3xl font-bold mt-2">
        {value}
      </p>
    </div>
  );
}