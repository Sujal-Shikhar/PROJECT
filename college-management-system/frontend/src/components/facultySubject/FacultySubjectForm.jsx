import { useEffect, useState } from "react";

const departments = [
  "CSE",
  "IT",
  "ECE",
  "EEE",
  "ME",
  "CE",
  "AI",
  "DS",
];

const FacultySubjectForm = ({
  initialData = {},
  faculties = [],
  subjects = [],
  onSubmit,
  loading = false,
}) => {
  const [formData, setFormData] = useState({
    faculty: "",
    subject: "",
    department: "",
    semester: 1,
    section: "A",
    academicYear: "",
    isCoordinator: false,
    remarks: "",
  });

  useEffect(() => {
    if (initialData && Object.keys(initialData).length) {
      setFormData({
        faculty:
          initialData.faculty?._id ||
          initialData.faculty ||
          "",
        subject:
          initialData.subject?._id ||
          initialData.subject ||
          "",
        department:
          initialData.department || "",
        semester:
          initialData.semester || 1,
        section:
          initialData.section || "A",
        academicYear:
          initialData.academicYear || "",
        isCoordinator:
          initialData.isCoordinator || false,
        remarks:
          initialData.remarks || "",
      });
    }
  }, [initialData]);

  const handleChange = (e) => {
    const { name, value, type, checked } =
      e.target;

    setFormData((prev) => ({
      ...prev,
      [name]:
        type === "checkbox"
          ? checked
          : value,
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
      <div className="grid grid-cols-1 md:grid-cols-2 gap-5">

        <div>
          <label className="block mb-2">
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
          <label className="block mb-2">
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
                {subject.name}
              </option>
            ))}
          </select>
        </div>

        <div>
          <label className="block mb-2">
            Department
          </label>

          <select
            name="department"
            value={formData.department}
            onChange={handleChange}
            required
            className="w-full border rounded-lg p-3"
          >
            <option value="">
              Select Department
            </option>

            {departments.map((dept) => (
              <option
                key={dept}
                value={dept}
              >
                {dept}
              </option>
            ))}
          </select>
        </div>

        <div>
          <label className="block mb-2">
            Semester
          </label>

          <input
            type="number"
            min="1"
            max="8"
            name="semester"
            value={formData.semester}
            onChange={handleChange}
            className="w-full border rounded-lg p-3"
          />
        </div>

        <div>
          <label className="block mb-2">
            Section
          </label>

          <input
            type="text"
            name="section"
            value={formData.section}
            onChange={handleChange}
            className="w-full border rounded-lg p-3"
          />
        </div>

        <div>
          <label className="block mb-2">
            Academic Year
          </label>

          <input
            type="text"
            placeholder="2025-26"
            name="academicYear"
            value={formData.academicYear}
            onChange={handleChange}
            className="w-full border rounded-lg p-3"
          />
        </div>

      </div>

      <div className="flex items-center gap-3">
        <input
          type="checkbox"
          name="isCoordinator"
          checked={
            formData.isCoordinator
          }
          onChange={handleChange}
        />

        <label>
          Class Coordinator
        </label>
      </div>

      <div>
        <label className="block mb-2">
          Remarks
        </label>

        <textarea
          rows="4"
          name="remarks"
          value={formData.remarks}
          onChange={handleChange}
          className="w-full border rounded-lg p-3"
        />
      </div>

      <button
        type="submit"
        disabled={loading}
        className="bg-blue-600 text-white px-6 py-3 rounded-lg"
      >
        {loading
          ? "Saving..."
          : "Save Assignment"}
      </button>
    </form>
  );
};

export default FacultySubjectForm;