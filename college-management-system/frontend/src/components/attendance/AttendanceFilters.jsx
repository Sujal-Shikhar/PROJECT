import { useEffect, useState } from "react";

import { getStudents } from "../../api/studentApi";
import { getFaculty } from "../../api/facultyApi";
import { getSubjects } from "../../api/subjectApi";

export default function AttendanceFilters({
  filters,
  setFilters,
}) {
  const [students, setStudents] = useState([]);
  const [faculty, setFaculty] = useState([]);
  const [subjects, setSubjects] = useState([]);

  useEffect(() => {
    loadData();
  }, []);

  const loadData = async () => {
    try {
      const [
        studentData,
        facultyData,
        subjectData,
      ] = await Promise.all([
        getStudents({ limit: 1000 }),
        getFaculty({ limit: 1000 }),
        getSubjects({ limit: 1000 }),
      ]);

      setStudents(studentData.students);
      setFaculty(facultyData.faculty);
      setSubjects(subjectData.subjects);
    } catch (error) {
      console.log(error);
    }
  };

  const update = (key, value) => {
    setFilters({
      ...filters,
      [key]: value,
    });
  };

  return (
    <div className="grid md:grid-cols-5 gap-3 mb-6">
      <select
        className="border rounded-lg p-2"
        value={filters.student}
        onChange={(e) =>
          update("student", e.target.value)
        }
      >
        <option value="">
          All Students
        </option>

        {students.map((student) => (
          <option
            key={student._id}
            value={student._id}
          >
            {student.name}
          </option>
        ))}
      </select>

      <select
        className="border rounded-lg p-2"
        value={filters.faculty}
        onChange={(e) =>
          update("faculty", e.target.value)
        }
      >
        <option value="">
          All Faculty
        </option>

        {faculty.map((item) => (
          <option
            key={item._id}
            value={item._id}
          >
            {item.name}
          </option>
        ))}
      </select>

      <select
        className="border rounded-lg p-2"
        value={filters.subject}
        onChange={(e) =>
          update("subject", e.target.value)
        }
      >
        <option value="">
          All Subjects
        </option>

        {subjects.map((subject) => (
          <option
            key={subject._id}
            value={subject._id}
          >
            {subject.name}
          </option>
        ))}
      </select>

      <select
        className="border rounded-lg p-2"
        value={filters.status}
        onChange={(e) =>
          update("status", e.target.value)
        }
      >
        <option value="">Status</option>
        <option>Present</option>
        <option>Absent</option>
        <option>Late</option>
        <option>Medical Leave</option>
      </select>

      <input
        type="date"
        className="border rounded-lg p-2"
        value={filters.date}
        onChange={(e) =>
          update("date", e.target.value)
        }
      />
    </div>
  );
}