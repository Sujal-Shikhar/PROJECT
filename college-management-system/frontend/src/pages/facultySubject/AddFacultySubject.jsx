import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";

import FacultySubjectForm from "../../components/facultySubject/FacultySubjectForm";

import { getFaculty } from "../../api/facultyApi";
import { getSubjects } from "../../api/subjectApi";
import { createAssignment } from "../../api/facultySubjectApi";

const AddFacultySubject = () => {
  const navigate = useNavigate();

  const [faculties, setFaculties] = useState([]);
  const [subjects, setSubjects] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    loadData();
  }, []);

  const loadData = async () => {
    try {
      const facultyRes = await getFaculty();
      const subjectRes = await getSubjects();

      setFaculties(facultyRes.faculties || []);
      setSubjects(subjectRes.subjects || []);
    } catch (error) {
      console.error(error);
      toast.error("Unable to load data.");
    }
  };

  const handleSubmit = async (formData) => {
    try {
      setLoading(true);

      await createAssignment(formData);

      toast.success("Assignment created.");

      navigate("/faculty-subjects");
    } catch (error) {
      console.error(error);

      toast.error(
        error.response?.data?.message ||
          "Unable to create assignment."
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="space-y-6">

      <div>

        <h1 className="text-3xl font-bold">
          Add Faculty Subject
        </h1>

        <p className="text-gray-500">
          Create a new assignment.
        </p>

      </div>

      <FacultySubjectForm
        faculties={faculties}
        subjects={subjects}
        onSubmit={handleSubmit}
        loading={loading}
      />

    </div>
  );
};

export default AddFacultySubject;