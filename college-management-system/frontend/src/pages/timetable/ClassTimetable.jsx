import { useState } from "react";
import { getClassTimetable } from "../../api/timetableApi";
import TimetableTable from "../../components/timetable/TimetableTable";

const ClassTimetable = () => {

  const [department, setDepartment] =
    useState("");

  const [semester, setSemester] =
    useState("");

  const [section, setSection] =
    useState("");

  const [timetable, setTimetable] =
    useState([]);

  const loadData = async () => {

    const res =
      await getClassTimetable(
        department,
        semester,
        section
      );

    setTimetable(
      res.timetable || []
    );

  };

  return (
    <div className="space-y-5">

      <h1 className="text-3xl font-bold">
        Class Timetable
      </h1>

      <div className="grid md:grid-cols-4 gap-4">

        <input
          placeholder="Department"
          className="border p-3 rounded"
          value={department}
          onChange={(e) =>
            setDepartment(
              e.target.value
            )
          }
        />

        <input
          placeholder="Semester"
          className="border p-3 rounded"
          value={semester}
          onChange={(e) =>
            setSemester(
              e.target.value
            )
          }
        />

        <input
          placeholder="Section"
          className="border p-3 rounded"
          value={section}
          onChange={(e) =>
            setSection(
              e.target.value
            )
          }
        />

        <button
          onClick={loadData}
          className="bg-blue-600 text-white rounded"
        >
          Search
        </button>

      </div>

      <TimetableTable
        timetable={timetable}
        onDelete={() => {}}
      />

    </div>
  );
};

export default ClassTimetable;