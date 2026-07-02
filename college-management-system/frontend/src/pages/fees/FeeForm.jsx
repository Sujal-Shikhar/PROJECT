import { useEffect, useState } from "react";
import API from "../../api/axios";

const FeeForm = ({ refreshFees }) => {
  const [students, setStudents] = useState([]);

  const [formData, setFormData] = useState({
    student: "",
    semester: "",
    totalFee: "",
    paidAmount: "",
    paymentDate: "",
    status: "Pending",
  });

  useEffect(() => {
    fetchStudents();
  }, []);

  const fetchStudents = async () => {
    try {
      const res = await API.get("/students");
      setStudents(res.data.students || []);
    } catch (error) {
      console.log(error);
      setStudents([]);
    }
  };

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const totalFee = Number(
        formData.totalFee
      );

      const paidAmount = Number(
        formData.paidAmount
      );

      const dueAmount =
        totalFee - paidAmount;

      await API.post("/fees", {
        student: formData.student,
        semester: Number(
          formData.semester
        ),
        totalFee,
        paidAmount,
        dueAmount,
        paymentDate:
          formData.paymentDate,
        status: formData.status,
      });

      alert("Fee Added");

      setFormData({
        student: "",
        semester: "",
        totalFee: "",
        paidAmount: "",
        paymentDate: "",
        status: "Pending",
      });

      refreshFees();
    } catch (error) {
      console.log(error);

      alert(
        error?.response?.data
          ?.message ||
          "Failed to add fee"
      );
    }
  };

  return (
    <div className="bg-white shadow rounded p-5 mb-6">
      <h2 className="text-xl font-bold mb-4">
        Add Fee Record
      </h2>

      <form
        onSubmit={handleSubmit}
        className="grid md:grid-cols-2 gap-4"
      >
        <select
          name="student"
          value={formData.student}
          onChange={handleChange}
          className="border p-2 rounded"
          required
        >
          <option value="">
            Select Student
          </option>

          {students.map(
            (student) => (
              <option
                key={
                  student._id
                }
                value={
                  student._id
                }
              >
                {student.name}
              </option>
            )
          )}
        </select>

        <input
          type="number"
          name="semester"
          placeholder="Semester"
          value={
            formData.semester
          }
          onChange={handleChange}
          className="border p-2 rounded"
          required
        />

        <input
          type="number"
          name="totalFee"
          placeholder="Total Fee"
          value={
            formData.totalFee
          }
          onChange={handleChange}
          className="border p-2 rounded"
          required
        />

        <input
          type="number"
          name="paidAmount"
          placeholder="Paid Amount"
          value={
            formData.paidAmount
          }
          onChange={handleChange}
          className="border p-2 rounded"
          required
        />

        <input
          type="date"
          name="paymentDate"
          value={
            formData.paymentDate
          }
          onChange={handleChange}
          className="border p-2 rounded"
          required
        />

        <select
          name="status"
          value={
            formData.status
          }
          onChange={handleChange}
          className="border p-2 rounded"
        >
          <option value="Pending">
            Pending
          </option>

          <option value="Partial">
            Partial
          </option>

          <option value="Paid">
            Paid
          </option>
        </select>

        <button
          type="submit"
          className="bg-blue-600 text-white p-2 rounded md:col-span-2"
        >
          Save Fee
        </button>
      </form>
    </div>
  );
};

export default FeeForm;