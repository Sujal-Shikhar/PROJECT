import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import toast from "react-hot-toast";

import FacultySubjectForm from "../../components/facultySubject/FacultySubjectForm";

import {
  getAssignmentById,
  updateAssignment,
} from "../../api/facultySubjectApi";

import { getFaculty } from "../../api/facultyApi";
import { getSubjects } from "../../api/subjectApi";

const EditFacultySubject = () => {
  const { id } = useParams();
  const navigate = useNavigate();

  const [assignment, setAssignment] = useState({});
  const [faculties, setFaculties] = useState([]);
  const [subjects, setSubjects] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      const [assignmentRes, facultyRes, subjectRes] =
        await Promise.all([
          getAssignmentById(id),
          getFaculty(),
          getSubjects(),
        ]);

      setAssignment(assignmentRes.assignment);

      setFaculties(
        facultyRes.faculties ||
          facultyRes.faculty ||
          []
      );

      setSubjects(
        subjectRes.subjects || []
      );
    } catch (error) {
      console.error(error);
      toast.error("Unable to load assignment.");
    }
  };

  const handleSubmit = async (formData) => {
    try {
      setLoading(true);

      await updateAssignment(id, formData);

      toast.success(
        "Assignment updated successfully."
      );

      navigate("/faculty-subjects");
    } catch (error) {
      console.error(error);

      toast.error(
        error.response?.data?.message ||
          "Unable to update assignment."
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold">
          Edit Faculty Subject
        </h1>

        <p className="text-gray-500">
          Update faculty subject assignment.
        </p>
      </div>

      <FacultySubjectForm
        initialData={assignment}
        faculties={faculties}
        subjects={subjects}
        onSubmit={handleSubmit}
        loading={loading}
      />
    </div>
  );
};

export default EditFacultySubject;