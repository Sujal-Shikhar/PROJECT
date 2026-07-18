import { useEffect, useState } from "react";
import { getNoticeStats } from "../../api/noticeApi";
import StatCard from "../../components/common/StatCard";
import toast from "react-hot-toast";

const NoticeStatistics = () => {
  const [stats, setStats] = useState({});

  useEffect(() => {
    loadStats();
  }, []);

  const loadStats = async () => {
    try {
      const res = await getNoticeStats();
      setStats(res);
    } catch (err) {
      toast.error("Unable to load statistics");
    }
  };

  return (
    <div className="space-y-6">

      <h1 className="text-3xl font-bold">
        Notice Statistics
      </h1>

      <div className="grid md:grid-cols-5 gap-4">

        <StatCard
          title="Total"
          value={stats.totalNotices || 0}
        />

        <StatCard
          title="Published"
          value={stats.published || 0}
        />

        <StatCard
          title="Unpublished"
          value={stats.unpublished || 0}
        />

        <StatCard
          title="Active"
          value={stats.active || 0}
        />

        <StatCard
          title="Expired"
          value={stats.expired || 0}
        />

      </div>

    </div>
  );
};

export default NoticeStatistics;