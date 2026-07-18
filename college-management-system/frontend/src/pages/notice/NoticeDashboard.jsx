import { useEffect, useState } from "react";
import { getNoticeDashboard } from "../../api/noticeApi";
import NoticeTable from "../../components/notice/NoticeTable";
import toast from "react-hot-toast";

const NoticeDashboard = () => {

  const [notices, setNotices] = useState([]);

  useEffect(() => {
    loadDashboard();
  }, []);

  const loadDashboard = async () => {
    try {
      const res = await getNoticeDashboard();
      setNotices(res.latestNotices || []);
    } catch {
      toast.error("Unable to load dashboard");
    }
  };

  return (
    <div className="space-y-6">

      <h1 className="text-3xl font-bold">
        Notice Dashboard
      </h1>

      <NoticeTable notices={notices} />

    </div>
  );
};

export default NoticeDashboard;