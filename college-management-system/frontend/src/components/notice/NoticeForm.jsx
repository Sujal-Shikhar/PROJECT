import { useEffect, useState } from "react";

const NoticeForm = ({
  initialData,
  faculties = [],
  onSubmit,
  loading = false,
}) => {
  const [formData, setFormData] = useState({
    title: "",
    description: "",
    audience: "All",
    department: "",
    semester: "",
    publishedBy: "",
    publishDate: "",
    expiryDate: "",
  });

  useEffect(() => {
  if (!initialData) return;

  setFormData({
    title: initialData.title || "",
    description: initialData.description || "",
    audience: initialData.audience || "All",
    department: initialData.department || "",
    semester: initialData.semester || "",
    publishedBy:
      initialData.publishedBy?._id ||
      initialData.publishedBy ||
      "",
    publishDate: initialData.publishDate
      ? initialData.publishDate.slice(0, 10)
      : "",
    expiryDate: initialData.expiryDate
      ? initialData.expiryDate.slice(0, 10)
      : "",
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
      <div className="grid md:grid-cols-2 gap-6">

        <div>
          <label className="block mb-2 font-medium">
            Title
          </label>

          <input
            type="text"
            name="title"
            required
            value={formData.title}
            onChange={handleChange}
            className="w-full border rounded-lg p-3"
          />
        </div>

        <div>
          <label className="block mb-2 font-medium">
            Audience
          </label>

          <select
            name="audience"
            value={formData.audience}
            onChange={handleChange}
            className="w-full border rounded-lg p-3"
          >
            <option value="All">
              All
            </option>

            <option value="Students">
              Students
            </option>

            <option value="Faculty">
              Faculty
            </option>
          </select>
        </div>

        <div>
          <label className="block mb-2 font-medium">
            Department
          </label>

          <input
            type="text"
            name="department"
            value={formData.department}
            onChange={handleChange}
            className="w-full border rounded-lg p-3"
          />
        </div>

        <div>
          <label className="block mb-2 font-medium">
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
          <label className="block mb-2 font-medium">
            Published By
          </label>

          <select
            name="publishedBy"
            required
            value={formData.publishedBy}
            onChange={handleChange}
            className="w-full border rounded-lg p-3"
          >
            <option value="">
              Select Faculty
            </option>

            {faculties.map(
              (faculty) => (
                <option
                  key={faculty._id}
                  value={faculty._id}
                >
                  {faculty.name}
                </option>
              )
            )}
          </select>
        </div>

        <div>
          <label className="block mb-2 font-medium">
            Publish Date
          </label>

          <input
            type="date"
            name="publishDate"
            value={formData.publishDate}
            onChange={handleChange}
            className="w-full border rounded-lg p-3"
          />
        </div>

        <div>
          <label className="block mb-2 font-medium">
            Expiry Date
          </label>

          <input
            type="date"
            name="expiryDate"
            value={formData.expiryDate}
            onChange={handleChange}
            className="w-full border rounded-lg p-3"
          />
        </div>

      </div>

      <div>
        <label className="block mb-2 font-medium">
          Description
        </label>

        <textarea
          rows="6"
          required
          name="description"
          value={formData.description}
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
          : "Save Notice"}
      </button>

    </form>
  );
};

export default NoticeForm;