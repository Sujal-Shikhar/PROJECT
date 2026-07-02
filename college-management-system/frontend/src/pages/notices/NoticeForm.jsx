import { useState } from "react";
import API from "../../api/axios";

const NoticeForm = ({ refreshNotices }) => {
  const [formData, setFormData] = useState({
    title: "",
    description: "",
    audience: "All",
  });

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      await API.post("/notices", formData);

      setFormData({
        title: "",
        description: "",
        audience: "All",
      });

      refreshNotices();
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="bg-white p-5 rounded shadow mb-6">
      <h2 className="text-xl font-bold mb-4">
        Add Notice
      </h2>

      <form
        onSubmit={handleSubmit}
        className="grid gap-4"
      >
        <input
          type="text"
          name="title"
          placeholder="Notice Title"
          value={formData.title}
          onChange={handleChange}
          className="border p-2 rounded"
          required
        />

        <textarea
          name="description"
          placeholder="Notice Description"
          value={formData.description}
          onChange={handleChange}
          className="border p-2 rounded"
          rows="4"
          required
        />

        <select
          name="audience"
          value={formData.audience}
          onChange={handleChange}
          className="border p-2 rounded"
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

        <button
          type="submit"
          className="bg-blue-600 text-white p-2 rounded"
        >
          Save Notice
        </button>
      </form>
    </div>
  );
};

export default NoticeForm;