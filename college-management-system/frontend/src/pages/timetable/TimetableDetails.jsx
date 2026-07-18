import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import toast from "react-hot-toast";

import { getTimetableById } from "../../api/timetableApi";

const TimetableDetails = () => {
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
      console.error(error);
      toast.error("Unable to load timetable.");
    }
  };

  if (!timetable) {
    return (
      <div className="text-center py-10">
        Loading...
      </div>
    );
  }

  return (
    <div className="bg-white rounded-xl shadow p-6 space-y-4">

      <h1 className="text-3xl font-bold">
        Timetable Details
      </h1>

      <div>
        <strong>Department:</strong>{" "}
        {timetable.department}
      </div>

      <div>
        <strong>Semester:</strong>{" "}
        {timetable.semester}
      </div>

      <div>
        <strong>Section:</strong>{" "}
        {timetable.section}
      </div>

      <div>
        <strong>Day:</strong>{" "}
        {timetable.day}
      </div>

      <div>
        <strong>Time:</strong>{" "}
        {timetable.startTime} - {timetable.endTime}
      </div>

      <div>
        <strong>Subject:</strong>{" "}
        {timetable.subject?.name}
      </div>

      <div>
        <strong>Faculty:</strong>{" "}
        {timetable.faculty?.name}
      </div>

      <div>
        <strong>Room:</strong>{" "}
        {timetable.roomNumber}
      </div>

    </div>
  );
};

export default TimetableDetails;