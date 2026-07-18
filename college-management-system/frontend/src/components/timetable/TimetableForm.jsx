import { useEffect, useState } from "react";

const TimetableForm = ({
  initialData,
  subjects = [],
  faculties = [],
  onSubmit,
  loading = false,
}) => {
  const [formData, setFormData] = useState({
    department: "",
    semester: "",
    section: "",
    day: "Monday",
    startTime: "",
    endTime: "",
    subject: "",
    faculty: "",
    roomNumber: "",
  });

  useEffect(() => {
    if (!initialData) return;
      setFormData({
        department: initialData.department || "",
        semester: initialData.semester || "",
        section: initialData.section || "",
        day: initialData.day || "Monday",
        startTime: initialData.startTime || "",
        endTime: initialData.endTime || "",
        subject:
          initialData.subject?._id ||
          initialData.subject ||
          "",
        faculty:
          initialData.faculty?._id ||
          initialData.faculty ||
          "",
        roomNumber:
          initialData.roomNumber || "",
      });
    
  }, [initialData]);

  const handleChange = (e) => {
    setFormData((prev) => ({
      ...prev,
      [e.target.name]:
        e.target.value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmit(formData);
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="bg-white rounded-xl shadow p-6 space-y-6"
    >
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">

        <div>
          <label className="block mb-2 font-medium">
            Department
          </label>

          <input
            type="text"
            name="department"
            value={formData.department}
            onChange={handleChange}
            required
            className="w-full border rounded-lg p-3"
          />
        </div>

        <div>
          <label className="block mb-2 font-medium">
            Semester
          </label>

          <input
            type="number"
            name="semester"
            min="1"
            max="8"
            value={formData.semester}
            onChange={handleChange}
            required
            className="w-full border rounded-lg p-3"
          />
        </div>

        <div>
          <label className="block mb-2 font-medium">
            Section
          </label>

          <input
            type="text"
            name="section"
            value={formData.section}
            onChange={handleChange}
            required
            className="w-full border rounded-lg p-3"
          />
        </div>

        <div>
          <label className="block mb-2 font-medium">
            Day
          </label>

          <select
            name="day"
            value={formData.day}
            onChange={handleChange}
            className="w-full border rounded-lg p-3"
          >
            <option>Monday</option>
            <option>Tuesday</option>
            <option>Wednesday</option>
            <option>Thursday</option>
            <option>Friday</option>
            <option>Saturday</option>
          </select>
        </div>

        <div>
          <label className="block mb-2 font-medium">
            Start Time
          </label>

          <input
            type="time"
            name="startTime"
            value={formData.startTime}
            onChange={handleChange}
            required
            className="w-full border rounded-lg p-3"
          />
        </div>

        <div>
          <label className="block mb-2 font-medium">
            End Time
          </label>

          <input
            type="time"
            name="endTime"
            value={formData.endTime}
            onChange={handleChange}
            required
            className="w-full border rounded-lg p-3"
          />
        </div>

        <div>
          <label className="block mb-2 font-medium">
            Subject
          </label>

          <select
            name="subject"
            value={formData.subject}
            onChange={handleChange}
            required
            className="w-full border rounded-lg p-3"
          >
            <option value="">
              Select Subject
            </option>

            {subjects.map((subject) => (
              <option
                key={subject._id}
                value={subject._id}
              >
                {subject.name} ({subject.code})
              </option>
            ))}
          </select>
        </div>

        <div>
          <label className="block mb-2 font-medium">
            Faculty
          </label>

          <select
            name="faculty"
            value={formData.faculty}
            onChange={handleChange}
            required
            className="w-full border rounded-lg p-3"
          >
            <option value="">
              Select Faculty
            </option>

            {faculties.map((faculty) => (
              <option
                key={faculty._id}
                value={faculty._id}
              >
                {faculty.name}
              </option>
            ))}
          </select>
        </div>

        <div>
          <label className="block mb-2 font-medium">
            Room Number
          </label>

          <input
            type="text"
            name="roomNumber"
            value={formData.roomNumber}
            onChange={handleChange}
            required
            className="w-full border rounded-lg p-3"
          />
        </div>

      </div>

      <button
        type="submit"
        disabled={loading}
        className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded-lg"
      >
        {loading
          ? "Saving..."
          : "Save Timetable"}
      </button>
    </form>
  );
};

export default TimetableForm;