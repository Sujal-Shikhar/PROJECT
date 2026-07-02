import { useEffect, useState } from "react";
import API from "../../api/axios";

const TimetableForm = ({
  refreshTimetable,
}) => {
  const [subjects, setSubjects] =
    useState([]);

  const [faculty, setFaculty] =
    useState([]);

  const [formData, setFormData] =
    useState({
      subject: "",
      faculty: "",
      semester: "",
      day: "Monday",
      startTime: "",
      endTime: "",
      classroom: "",
    });

  useEffect(() => {
    fetchSubjects();
    fetchFaculty();
  }, []);

  const fetchSubjects = async () => {
    const res = await API.get("/subjects");
    setSubjects(res.data.subjects);
  };

  const fetchFaculty = async () => {
    const res = await API.get("/faculty");
    setFaculty(res.data.faculty);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    await API.post(
      "/timetable",
      formData
    );

    refreshTimetable();
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="bg-white p-4 rounded shadow mb-5"
    >
      <div className="grid md:grid-cols-3 gap-4">

        <select
          value={formData.subject}
          onChange={(e) =>
            setFormData({
              ...formData,
              subject: e.target.value,
            })
          }
          className="border p-2"
        >
          <option>Select Subject</option>

          {subjects.map((s) => (
            <option
              key={s._id}
              value={s._id}
            >
              {s.subjectName}
            </option>
          ))}
        </select>

        <select
          value={formData.faculty}
          onChange={(e) =>
            setFormData({
              ...formData,
              faculty: e.target.value,
            })
          }
          className="border p-2"
        >
          <option>Select Faculty</option>

          {faculty.map((f) => (
            <option
              key={f._id}
              value={f._id}
            >
              {f.name}
            </option>
          ))}
        </select>

        <input
          type="number"
          placeholder="Semester"
          className="border p-2"
          onChange={(e) =>
            setFormData({
              ...formData,
              semester: e.target.value,
            })
          }
        />

        <input
          type="time"
          className="border p-2"
          onChange={(e) =>
            setFormData({
              ...formData,
              startTime: e.target.value,
            })
          }
        />

        <input
          type="time"
          className="border p-2"
          onChange={(e) =>
            setFormData({
              ...formData,
              endTime: e.target.value,
            })
          }
        />

        <input
          placeholder="Room"
          className="border p-2"
          onChange={(e) =>
            setFormData({
              ...formData,
              classroom: e.target.value,
            })
          }
        />

        <select
          className="border p-2"
          onChange={(e) =>
            setFormData({
              ...formData,
              day: e.target.value,
            })
          }
        >
          <option>Monday</option>
          <option>Tuesday</option>
          <option>Wednesday</option>
          <option>Thursday</option>
          <option>Friday</option>
          <option>Saturday</option>
        </select>

      </div>

      <button className="bg-green-600 text-white px-4 py-2 mt-4 rounded">
        Save Timetable
      </button>
    </form>
  );
};

export default TimetableForm;