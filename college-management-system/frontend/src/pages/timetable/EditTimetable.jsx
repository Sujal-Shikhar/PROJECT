import {
  useEffect,
  useState,
} from "react";

import {
  useNavigate,
  useParams,
} from "react-router-dom";

import toast from "react-hot-toast";

import TimetableForm from "../../components/timetable/TimetableForm";

import {
  getTimetableById,
  updateTimetable,
} from "../../api/timetableApi";

import { getSubjects } from "../../api/subjectApi";

import { getFaculties } from "../../api/facultyApi";

const EditTimetable = () => {

  const { id } = useParams();

  const navigate = useNavigate();

  const [timetable, setTimetable] =
    useState(null);

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

      const [
        timetableRes,
        subjectRes,
        facultyRes,
      ] = await Promise.all([
        getTimetableById(id),
        getSubjects(),
        getFaculties(),
      ]);

      setTimetable(
        timetableRes.timetable
      );

      setSubjects(
        subjectRes.subjects || []
      );

      setFaculties(
        facultyRes.faculty || []
      );

    } catch (error) {

      toast.error(
        "Unable to load timetable."
      );

      navigate("/timetable");

    }

  };

  const handleSubmit =
    async (data) => {

      try {

        setLoading(true);

        await updateTimetable(
          id,
          data
        );

        toast.success(
          "Timetable updated."
        );

        navigate("/timetable");

      } catch (error) {

        toast.error(
          error.response?.data
            ?.message ||
            "Unable to update timetable."
        );

      } finally {

        setLoading(false);

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

    <div className="space-y-6">

      <div>

        <h1 className="text-3xl font-bold">
          Edit Timetable
        </h1>

        <p className="text-gray-500">
          Update timetable entry.
        </p>

      </div>

      <TimetableForm
        initialData={timetable}
        subjects={subjects}
        faculties={faculties}
        loading={loading}
        onSubmit={handleSubmit}
      />

    </div>

  );

};

export default EditTimetable;