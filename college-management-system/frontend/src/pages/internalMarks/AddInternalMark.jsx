import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";

import InternalMarkForm from "../../components/internalMarks/InternalMarkForm";
import { createInternalMark } from "../../api/internalMarkApi";

import { getStudents } from "../../api/studentApi";
import { getSubjects } from "../../api/subjectApi";
import { getFaculty } from "../../api/facultyApi";
import { getExams } from "../../api/examApi";

const AddInternalMark = () => {
  const navigate = useNavigate();

  const [loading, setLoading] = useState(false);

  const [students, setStudents] = useState([]);
  const [subjects, setSubjects] = useState([]);
  const [faculty, setFaculty] = useState([]);
  const [exams, setExams] = useState([]);

  useEffect(() => {
    loadDropdowns();
  }, []);

  const loadDropdowns = async () => {
    try {
      const [
        studentsRes,
        subjectsRes,
        facultyRes,
        examsRes,
      ] = await Promise.all([
        getStudents(),
        getSubjects(),
        getFaculty(),
        getExams(),
      ]);

      console.log("Students:", studentsRes);
      console.log("Subjects:", subjectsRes);
      console.log("Faculty:", facultyRes);
      console.log("Exams:", examsRes);

      setStudents(
        studentsRes.students ||
          studentsRes.data ||
          studentsRes ||
          []
      );

      setSubjects(
        subjectsRes.subjects ||
          subjectsRes.data ||
          subjectsRes ||
          []
      );

      setFaculty(
        facultyRes.faculty ||
          facultyRes.faculties ||
          facultyRes.data ||
          facultyRes ||
          []
      );

      setExams(
        examsRes.exams ||
          examsRes.data ||
          examsRes ||
          []
      );
    } catch (err) {
      console.error(err);
      toast.error("Failed to load dropdown data.");
    }
  };

  const handleSubmit = async (values) => {
    try {
      setLoading(true);

      await createInternalMark(values);

      toast.success("Internal marks created successfully.");

      navigate("/internal-marks");
    } catch (error) {
      console.error(error);

      toast.error(
        error?.response?.data?.message ||
          "Unable to create record."
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold">
          Add Internal Marks
        </h1>

        <p className="text-gray-500 mt-2">
          Create a new internal assessment record.
        </p>
      </div>

      <div className="bg-white rounded-xl shadow p-6">
        <InternalMarkForm
          students={students}
          subjects={subjects}
          faculty={faculty}
          exams={exams}
          onSubmit={handleSubmit}
          loading={loading}
        />
      </div>
    </div>
  );
};

export default AddInternalMark;