import { useState } from "react";
import { getFacultyTimetable } from "../../api/timetableApi";
import TimetableTable from "../../components/timetable/TimetableTable";

const FacultyTimetable = () => {

  const [facultyId, setFacultyId] =
    useState("");

  const [timetable, setTimetable] =
    useState([]);

  const loadData = async () => {
    if (!facultyId) return;

    const res =
      await getFacultyTimetable(
        facultyId
      );

    setTimetable(
      res.timetable || []
    );
  };

  return (
    <div className="space-y-6">

      <h1 className="text-3xl font-bold">
        Faculty Timetable
      </h1>

      <div className="flex gap-3">

        <input
          className="border p-3 rounded flex-1"
          placeholder="Faculty ID"
          value={facultyId}
          onChange={(e) =>
            setFacultyId(
              e.target.value
            )
          }
        />

        <button
          onClick={loadData}
          className="bg-blue-600 text-white px-5 rounded"
        >
          Load
        </button>

      </div>

      <TimetableTable
        timetable={timetable}
        onDelete={() => {}}
      />

    </div>
  );
};

export default FacultyTimetable;