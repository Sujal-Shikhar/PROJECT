import { useEffect, useState } from "react";
import { getStudents } from "../../api/studentApi";
import { getSubjects } from "../../api/subjectApi";
import { getExams } from "../../api/examApi";

const ResultFilters = ({
  filters,
  setFilters,
}) => {
  const [students, setStudents] = useState([]);
  const [subjects, setSubjects] = useState([]);
  const [exams, setExams] = useState([]);

  useEffect(() => {
    loadData();
  }, []);

  const loadData = async () => {
    try {
      const [studentRes, subjectRes, examRes] =
        await Promise.all([
          getStudents(),
          getSubjects(),
          getExams(),
        ]);

      setStudents(studentRes.students || []);
      setSubjects(subjectRes.subjects || []);
      setExams(examRes.exams || []);
    } catch (err) {
      console.error(err);
    }
  };

  const handleChange = (e) => {
    setFilters((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  return (
    <div className="bg-white rounded-xl shadow p-5">

      <div className="grid md:grid-cols-4 gap-4">

        {/* Student */}

        <select
          name="student"
          value={filters.student}
          onChange={handleChange}
          className="border rounded-lg px-3 py-2"
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

        {/* Subject */}

        <select
          name="subject"
          value={filters.subject}
          onChange={handleChange}
          className="border rounded-lg px-3 py-2"
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

        {/* Exam */}

        <select
          name="exam"
          value={filters.exam}
          onChange={handleChange}
          className="border rounded-lg px-3 py-2"
        >
          <option value="">
            All Exams
          </option>

          {exams.map((exam) => (
            <option
              key={exam._id}
              value={exam._id}
            >
              {exam.name}
            </option>
          ))}
        </select>

        {/* Published */}

        <select
          name="published"
          value={filters.published}
          onChange={handleChange}
          className="border rounded-lg px-3 py-2"
        >
          <option value="">
            All Results
          </option>

          <option value="true">
            Published
          </option>

          <option value="false">
            Unpublished
          </option>

        </select>

      </div>

    </div>
  );
};

export default ResultFilters;