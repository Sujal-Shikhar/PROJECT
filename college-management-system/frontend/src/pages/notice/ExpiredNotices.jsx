import { useEffect, useState } from "react";
import { getExpiredNotices } from "../../api/noticeApi";
import NoticeTable from "../../components/notice/NoticeTable";
import toast from "react-hot-toast";

const ExpiredNotices = () => {

  const [notices, setNotices] = useState([]);

  useEffect(() => {
    loadNotices();
  }, []);

  const loadNotices = async () => {
    try {
      const res = await getExpiredNotices();
      setNotices(res.notices || []);
    } catch {
      toast.error("Unable to load notices");
    }
  };

  return (
    <div className="space-y-6">

      <h1 className="text-3xl font-bold">
        Expired Notices
      </h1>

      <NoticeTable notices={notices} />

    </div>
  );
};

export default ExpiredNotices;