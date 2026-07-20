import { useEffect, useState } from "react";
import {
  GraduationCap,
  Users,
  ClipboardCheck,
  FileText,
  IndianRupee,
  Briefcase,
  UserPlus,
  CalendarDays,
  Bell,
  ArrowRight,
} from "lucide-react";

import { getDashboardStats } from "../../api/dashboardApi";
import StatCard from "../../components/common/StatCard";

export default function Dashboard() {
  const [stats, setStats] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadDashboard();
  }, []);

  const loadDashboard = async () => {
    try {
      const data = await getDashboardStats();
      setStats(data);
    } catch (err) {
      console.log(err);
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center h-[70vh]">
        <h2 className="text-xl font-semibold">
          Loading Dashboard...
        </h2>
      </div>
    );
  }

  return (
    <div className="space-y-8">

      {/* Welcome Banner */}

      <div className="rounded-xl bg-gradient-to-r from-blue-600 to-indigo-600 text-white p-8 shadow">

        <h1 className="text-3xl font-bold">
          Welcome Back!
        </h1>

        

      </div>

      {/* Statistics */}

      <div className="grid gap-6 md:grid-cols-2 xl:grid-cols-4">

        <StatCard
          title="Students"
          value={stats.totalStudents}
          icon={<GraduationCap size={38} />}
        />

        <StatCard
          title="Faculty"
          value={stats.totalFaculty}
          icon={<Users size={38} />}
        />

        <StatCard
          title="Exams"
          value={stats.totalExams}
          icon={<FileText size={38} />}
        />

        <StatCard
          title="Attendance"
          value={stats.totalAttendance}
          icon={<ClipboardCheck size={38} />}
        />

        <StatCard
          title="Placements"
          value={stats.totalPlacements}
          icon={<Briefcase size={38} />}
        />

        <StatCard
          title="Fees Collected"
          value={`₹${stats.totalFeesCollected}`}
          icon={<IndianRupee size={38} />}
        />

        <StatCard
          title="Pending Fees"
          value={`₹${stats.totalPendingFees}`}
          icon={<IndianRupee size={38} />}
        />

      </div>

      {/* Bottom Section */}

      <div className="grid lg:grid-cols-2 gap-6">

        {/* Quick Actions */}

        <div className="bg-white rounded-xl shadow p-6">

          <h2 className="text-xl font-semibold mb-5">
            Quick Actions
          </h2>

          <div className="grid grid-cols-2 gap-4">

            <button className="flex items-center justify-between p-4 rounded-lg border hover:bg-blue-50 transition">
              <span>Add Student</span>
              <UserPlus size={18} />
            </button>

            <button className="flex items-center justify-between p-4 rounded-lg border hover:bg-blue-50 transition">
              <span>Add Faculty</span>
              <Users size={18} />
            </button>

            <button className="flex items-center justify-between p-4 rounded-lg border hover:bg-blue-50 transition">
              <span>Attendance</span>
              <ClipboardCheck size={18} />
            </button>

            <button className="flex items-center justify-between p-4 rounded-lg border hover:bg-blue-50 transition">
              <span>Create Exam</span>
              <FileText size={18} />
            </button>

          </div>

        </div>

        {/* Activity */}

        <div className="bg-white rounded-xl shadow p-6">

          <h2 className="text-xl font-semibold mb-5">
            Recent Overview
          </h2>

          <div className="space-y-4">

            <div className="flex justify-between">
              <span>Total Students</span>
              <span>{stats.totalStudents}</span>
            </div>

            <div className="flex justify-between">
              <span>Total Faculty</span>
              <span>{stats.totalFaculty}</span>
            </div>

            <div className="flex justify-between">
              <span>Total Exams</span>
              <span>{stats.totalExams}</span>
            </div>

            <div className="flex justify-between">
              <span>Total Placements</span>
              <span>{stats.totalPlacements}</span>
            </div>

            <div className="flex justify-between">
              <span>Attendance Records</span>
              <span>{stats.totalAttendance}</span>
            </div>

          </div>

        </div>

      </div>

      {/* Third Row */}

      <div className="grid lg:grid-cols-2 gap-6">

        <div className="bg-white rounded-xl shadow p-6">

          <div className="flex items-center justify-between">

            <h2 className="text-xl font-semibold">
              Upcoming Features
            </h2>

            <ArrowRight size={18} />

          </div>

          <ul className="mt-5 space-y-3 text-gray-600">

            <li>📅 Timetable Management</li>

            <li>📊 Attendance Analytics</li>

            <li>📢 Notice Board</li>

            <li>🎓 Result Reports</li>

            <li>📈 Placement Statistics</li>

          </ul>

        </div>

        <div className="bg-white rounded-xl shadow p-6">

          <h2 className="text-xl font-semibold mb-5">
            Calendar & Notifications
          </h2>

          <div className="space-y-4">

            <div className="flex items-center gap-3">
              <CalendarDays />
              <span>Semester Exams Next Week</span>
            </div>

            <div className="flex items-center gap-3">
              <Bell />
              <span>Fee Submission Ends Soon</span>
            </div>

          </div>

        </div>

      </div>

    </div>
  );
}