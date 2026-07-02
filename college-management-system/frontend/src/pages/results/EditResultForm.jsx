import { useState } from "react";
import API from "../../api/axios";

const EditResultForm = ({
  result,
  refreshResults,
  closeModal,
}) => {
  const [formData, setFormData] = useState({
    semester: result.semester,
    subject: result.subject,
    marks: result.marks,
    maxMarks: result.maxMarks,
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
      await API.put(
        `/results/${result._id}`,
        formData
      );

      refreshResults();
      closeModal();

      alert("Result Updated");
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <div className="fixed inset-0 bg-black/40 flex items-center justify-center">

      <div className="bg-white p-6 rounded w-[500px]">

        <h2 className="text-xl font-bold mb-4">
          Edit Result
        </h2>

        <form
          onSubmit={handleSubmit}
          className="grid gap-3"
        >
          <input
            type="number"
            name="semester"
            value={formData.semester}
            onChange={handleChange}
            className="border p-2"
          />

          <input
            name="subject"
            value={formData.subject}
            onChange={handleChange}
            className="border p-2"
          />

          <input
            type="number"
            name="marks"
            value={formData.marks}
            onChange={handleChange}
            className="border p-2"
          />

          <input
            type="number"
            name="maxMarks"
            value={formData.maxMarks}
            onChange={handleChange}
            className="border p-2"
          />

          <div className="flex gap-3">
            <button
              className="bg-green-600 text-white px-4 py-2 rounded"
            >
              Update
            </button>

            <button
              type="button"
              onClick={closeModal}
              className="bg-gray-500 text-white px-4 py-2 rounded"
            >
              Cancel
            </button>
          </div>

        </form>

      </div>

    </div>
  );
};

export default EditResultForm;