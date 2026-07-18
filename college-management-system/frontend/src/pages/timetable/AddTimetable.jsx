import {
  useEffect,
  useState,
} from "react";

import { useNavigate } from "react-router-dom";

import toast from "react-hot-toast";

import TimetableForm from "../../components/timetable/TimetableForm";

import { createTimetable } from "../../api/timetableApi";

import { getSubjects } from "../../api/subjectApi";

import { getFaculties } from "../../api/facultyApi";

const AddTimetable = () => {

  const navigate = useNavigate();

  const [subjects, setSubjects] =
    useState([]);

  const [faculties, setFaculties] =
    useState([]);

  const [loading, setLoading] =
    useState(false);

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {

    try {

      const subjectRes =
        await getSubjects();

      const facultyRes =
        await getFaculties();

      setSubjects(
        subjectRes.subjects || []
      );

      setFaculties(
        facultyRes.faculty || []
      );

    } catch (error) {

      toast.error(
        "Unable to load data."
      );

    }

  };

  const handleSubmit =
    async (data) => {

      try {

        setLoading(true);

        await createTimetable(data);

        toast.success(
          "Timetable created."
        );

        navigate("/timetable");

      } catch (error) {

        console.error(error);

        toast.error(
          error.response?.data
            ?.message ||
            "Unable to create timetable."
        );

      } finally {

        setLoading(false);

      }

    };

  return (

    <div className="space-y-6">

      <div>

        <h1 className="text-3xl font-bold">
          Add Timetable
        </h1>

        <p className="text-gray-500">
          Create timetable entry.
        </p>

      </div>

      <TimetableForm
        subjects={subjects}
        faculties={faculties}
        loading={loading}
        onSubmit={handleSubmit}
      />

    </div>

  );

};

export default AddTimetable;