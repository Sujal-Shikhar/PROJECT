import { useEffect, useState } from "react";

const PlacementForm = ({
  initialData = {},
  students = [],
  onSubmit,
  loading = false,
}) => {
  const [formData, setFormData] = useState({
    student: "",
    companyName: "",
    jobRole: "",
    package: "",
    location: "",
    driveDate: "",
    status: "Applied",
    joiningDate: "",
    remarks: "",
  });

  useEffect(() => {
  if (!initialData || Object.keys(initialData).length === 0) {
    return;
  }

  setFormData({
    student: initialData.student?._id || initialData.student || "",
    companyName: initialData.companyName || "",
    jobRole: initialData.jobRole || "",
    package: initialData.package || "",
    location: initialData.location || "",
    driveDate: initialData.driveDate
      ? initialData.driveDate.substring(0, 10)
      : "",
    status: initialData.status || "Applied",
    joiningDate: initialData.joiningDate
      ? initialData.joiningDate.substring(0, 10)
      : "",
    remarks: initialData.remarks || "",
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
            Student
          </label>

          <select
            name="student"
            value={formData.student}
            onChange={handleChange}
            required
            className="w-full border rounded-lg p-3"
          >
            <option value="">
              Select Student
            </option>

            {students.map((student) => (
              <option
                key={student._id}
                value={student._id}
              >
                {student.name} (
                {student.rollNumber})
              </option>
            ))}
          </select>
        </div>

        <div>
          <label className="block mb-2 font-medium">
            Company Name
          </label>

          <input
            type="text"
            name="companyName"
            value={formData.companyName}
            onChange={handleChange}
            required
            className="w-full border rounded-lg p-3"
          />
        </div>

        <div>
          <label className="block mb-2 font-medium">
            Job Role
          </label>

          <input
            type="text"
            name="jobRole"
            value={formData.jobRole}
            onChange={handleChange}
            required
            className="w-full border rounded-lg p-3"
          />
        </div>

        <div>
          <label className="block mb-2 font-medium">
            Package (LPA)
          </label>

          <input
            type="number"
            name="package"
            value={formData.package}
            onChange={handleChange}
            required
            min="0"
            step="0.01"
            className="w-full border rounded-lg p-3"
          />
        </div>

        <div>
          <label className="block mb-2 font-medium">
            Location
          </label>

          <input
            type="text"
            name="location"
            value={formData.location}
            onChange={handleChange}
            required
            className="w-full border rounded-lg p-3"
          />
        </div>

        <div>
          <label className="block mb-2 font-medium">
            Drive Date
          </label>

          <input
            type="date"
            name="driveDate"
            value={formData.driveDate}
            onChange={handleChange}
            required
            className="w-full border rounded-lg p-3"
          />
        </div>

        <div>
          <label className="block mb-2 font-medium">
            Status
          </label>

          <select
            name="status"
            value={formData.status}
            onChange={handleChange}
            className="w-full border rounded-lg p-3"
          >
            <option>Applied</option>
            <option>Shortlisted</option>
            <option>Interview</option>
            <option>Selected</option>
            <option>Rejected</option>
          </select>
        </div>

        <div>
          <label className="block mb-2 font-medium">
            Joining Date
          </label>

          <input
            type="date"
            name="joiningDate"
            value={formData.joiningDate}
            onChange={handleChange}
            className="w-full border rounded-lg p-3"
          />
        </div>

      </div>

      <div>
        <label className="block mb-2 font-medium">
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
        className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded-lg"
      >
        {loading
          ? "Saving..."
          : "Save Placement"}
      </button>
    </form>
  );
};

export default PlacementForm;