import { useEffect, useState } from "react";

import {
  GraduationCap,
  Users,
  BookOpen,
  ClipboardCheck,
  FileText,
  IndianRupee,
  Briefcase,
} from "lucide-react";

import { getDashboardStats } from "../../api/dashboardApi";

import StatCard from "../../components/common/StatCard";

export default function Dashboard() {

  const [stats, setStats] = useState(null);

  const [loading, setLoading] =
    useState(true);

  useEffect(() => {

    loadDashboard();

  }, []);

  const loadDashboard = async () => {

    try {

      const data =
        await getDashboardStats();

      setStats(data);

    } catch (error) {

      console.error(error);

    } finally {

      setLoading(false);

    }

  };

  if (loading) {

    return (
      <h2 className="text-xl">
        Loading Dashboard...
      </h2>
    );

  }

  return (

    <div>

      <h1 className="text-3xl font-bold mb-8">

        Dashboard

      </h1>

      <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">

        <StatCard
          title="Students"
          value={stats.totalStudents}
          icon={<GraduationCap size={40} />}
        />

        <StatCard
          title="Faculty"
          value={stats.totalFaculty}
          icon={<Users size={40} />}
        />

        <StatCard
          title="Exams"
          value={stats.totalExams}
          icon={<FileText size={40} />}
        />

        <StatCard
          title="Attendance"
          value={stats.totalAttendance}
          icon={<ClipboardCheck size={40} />}
        />

        <StatCard
          title="Placements"
          value={stats.totalPlacements}
          icon={<Briefcase size={40} />}
        />

        <StatCard
          title="Fees Collected"
          value={`₹${stats.totalFeesCollected}`}
          icon={<IndianRupee size={40} />}
        />

        <StatCard
          title="Pending Fees"
          value={`₹${stats.totalPendingFees}`}
          icon={<IndianRupee size={40} />}
        />

      </div>

    </div>

  );

}