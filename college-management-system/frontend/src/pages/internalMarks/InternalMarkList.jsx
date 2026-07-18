import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import toast from "react-hot-toast";

import {
  getInternalMarks,
  deleteInternalMark,
  publishMarks,
  unpublishMarks,
  lockMarks,
  unlockMarks,
} from "../../api/internalMarkApi";

import InternalMarkTable from "../../components/internalMarks/InternalMarkTable";


const InternalMarkList = () => {
  const [records, setRecords] = useState([]);
  const [loading, setLoading] = useState(true);

  const loadMarks = async () => {
    try {
      setLoading(true);

      const res = await getInternalMarks();

      setRecords(
        res.internalMarks || []
      );
    } catch (err) {
      console.error(err);
      toast.error(
        "Unable to load internal marks."
      );
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadMarks();
  }, []);

  const handleDelete = async (id) => {
    if (
      !window.confirm(
        "Delete this record?"
      )
    )
      return;

    try {
      await deleteInternalMark(id);

      toast.success(
        "Record deleted."
      );

      loadMarks();
    } catch {
      toast.error("Delete failed.");
    }
  };

  const handlePublish = async (
    id,
    published
  ) => {
    try {
      if (published) {
        await unpublishMarks(id);
      } else {
        await publishMarks(id);
      }

      toast.success(
        published
          ? "Marks unpublished."
          : "Marks published."
      );

      loadMarks();
    } catch {
      toast.error("Operation failed.");
    }
  };

  const handleLock = async (
    id,
    locked
  ) => {
    try {
      if (locked) {
        await unlockMarks(id);
      } else {
        await lockMarks(id);
      }

      toast.success(
        locked
          ? "Unlocked."
          : "Locked."
      );

      loadMarks();
    } catch {
      toast.error("Operation failed.");
    }
  };

  if (loading)
    return (
  <div className="flex justify-center items-center py-10">
    <div className="h-10 w-10 animate-spin rounded-full border-4 border-blue-600 border-t-transparent"></div>
  </div>
);

  return (
    <div className="space-y-6">

      <div className="flex justify-between items-center">

        <div>
          <h1 className="text-3xl font-bold">
            Internal Marks
          </h1>

          <p className="text-gray-500">
            Manage student internal
            assessment marks.
          </p>
        </div>

        <Link
          to="/internal-marks/add"
          className="bg-blue-600 text-white px-5 py-2 rounded-lg"
        >
          Add Record
        </Link>

      </div>

      

      <InternalMarkTable
        records={records}
        onDelete={handleDelete}
        onPublish={handlePublish}
        onLock={handleLock}
      />

    </div>
  );
};

export default InternalMarkList;