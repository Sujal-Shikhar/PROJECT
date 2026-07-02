import { useState } from "react";
import API from "../../api/axios";

const ExamForm = ({ refreshExams }) => {
  const [formData, setFormData] = useState({
    subject: "",
    examType: "midterm",
    date: "",
    totalMarks: "",
    passMarks: "",
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
      await API.post("/exams", formData);

      alert("Exam Added Successfully");

      setFormData({
        subject: "",
        examType: "midterm",
        date: "",
        totalMarks: "",
        passMarks: "",
      });

      refreshExams();
    } catch (error) {
      console.log(error);

      alert(
        error?.response?.data?.message ||
        "Failed to add exam"
      );
    }
  };

  return (
    <div className="bg-white shadow rounded p-5 mb-6">
      <h2 className="text-xl font-bold mb-4">
        Add Exam
      </h2>

      <form
        onSubmit={handleSubmit}
        className="grid md:grid-cols-2 gap-4"
      >
        <input
          type="text"
          name="subject"
          placeholder="Subject"
          value={formData.subject}
          onChange={handleChange}
          className="border p-2 rounded"
          required
        />

        <select
          name="examType"
          value={formData.examType}
          onChange={handleChange}
          className="border p-2 rounded"
        >
          <option value="midterm">
            Midterm
          </option>

          <option value="final">
            Final
          </option>

          <option value="unit test">
            Unit Test
          </option>
        </select>

        <input
          type="date"
          name="date"
          value={formData.date}
          onChange={handleChange}
          className="border p-2 rounded"
          required
        />

        <input
          type="number"
          name="totalMarks"
          placeholder="Total Marks"
          value={formData.totalMarks}
          onChange={handleChange}
          className="border p-2 rounded"
          required
        />

        <input
          type="number"
          name="passMarks"
          placeholder="Pass Marks"
          value={formData.passMarks}
          onChange={handleChange}
          className="border p-2 rounded"
          required
        />

        <button
          type="submit"
          className="bg-purple-600 text-white p-2 rounded md:col-span-2"
        >
          Add Exam
        </button>
      </form>
    </div>
  );
};

export default ExamForm;