import { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import toast from "react-hot-toast";

import { getTimetableById } from "../../api/timetableApi";

const ViewTimetable = () => {
  const { id } = useParams();

  const [timetable, setTimetable] = useState(null);

  useEffect(() => {
    fetchTimetable();
  }, []);

  const fetchTimetable = async () => {
    try {
      const res = await getTimetableById(id);
      setTimetable(res.timetable);
    } catch (error) {
      toast.error("Unable to load timetable.");
    }
  };

  if (!timetable)
    return (
      <div className="text-center py-10">
        Loading...
      </div>
    );

  return (
    <div className="bg-white rounded-xl shadow p-6 space-y-4">

      <h1 className="text-3xl font-bold">
        Timetable Details
      </h1>

      <div className="grid md:grid-cols-2 gap-4">

        <p><b>Department:</b> {timetable.department}</p>
        <p><b>Semester:</b> {timetable.semester}</p>
        <p><b>Section:</b> {timetable.section}</p>
        <p><b>Day:</b> {timetable.day}</p>
        <p><b>Time:</b> {timetable.startTime} - {timetable.endTime}</p>
        <p><b>Room:</b> {timetable.roomNumber}</p>
        <p><b>Subject:</b> {timetable.subject?.name}</p>
        <p><b>Faculty:</b> {timetable.faculty?.name}</p>

      </div>

      <Link
        to="/timetable"
        className="inline-block mt-4 bg-blue-600 text-white px-5 py-2 rounded"
      >
        Back
      </Link>

    </div>
  );
};

export default ViewTimetable;