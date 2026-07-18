import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import toast from "react-hot-toast";

import {
  getTimetable,
  deleteTimetable,
} from "../../api/timetableApi";

import TimetableTable from "../../components/timetable/TimetableTable";

const TimetableList = () => {
  const [timetable, setTimetable] =
    useState([]);

  const [loading, setLoading] =
    useState(true);

  useEffect(() => {
    fetchTimetable();
  }, []);

  const fetchTimetable = async () => {
    try {
      setLoading(true);

      const res = await getTimetable();

      setTimetable(res.timetable || []);
    } catch (error) {
      console.error(error);

      toast.error(
        "Unable to load timetable."
      );
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (id) => {
    if (
      !window.confirm(
        "Delete this timetable entry?"
      )
    )
      return;

    try {
      await deleteTimetable(id);

      toast.success(
        "Timetable deleted."
      );

      fetchTimetable();
    } catch (error) {
      console.error(error);

      toast.error(
        "Unable to delete timetable."
      );
    }
  };

  if (loading) {
    return (
      <div className="text-center py-10">
        Loading...
      </div>
    );
  }

  return (
    <div className="space-y-6">

      <div className="flex justify-between items-center">

        <div>

          <h1 className="text-3xl font-bold">
            Timetable
          </h1>

          <p className="text-gray-500">
            Manage class timetable.
          </p>

        </div>

        <Link
          to="/timetable/add"
          className="bg-blue-600 text-white px-5 py-3 rounded-lg"
        >
          Add Timetable
        </Link>

      </div>

      <TimetableTable
        timetable={timetable}
        onDelete={handleDelete}
      />

    </div>
  );
};

export default TimetableList;