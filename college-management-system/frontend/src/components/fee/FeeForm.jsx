import { useEffect, useState } from "react";

import { getStudents } from "../../api/studentApi";

const FeeForm = ({
  formData,
  setFormData,
  onSubmit,
  loading,
  isEdit = false,
}) => {

  const [students,setStudents] =
    useState([]);

  useEffect(() => {
    loadStudents();
  }, []);

  const loadStudents = async () => {

    try {

      const res =
        await getStudents({
          limit:1000,
        });

      setStudents(
        res.students || []
      );

    }

    catch(error){

      console.error(error);

    }

  };

  const handleChange = (
    e
  ) => {

    setFormData({

      ...formData,

      [e.target.name]:
        e.target.value,

    });

  };

  return (

    <form
      onSubmit={onSubmit}
      className="bg-white rounded-xl shadow p-8 space-y-6"
    >

      <div className="grid md:grid-cols-2 gap-6">

        <div>

          <label className="block mb-2 font-medium">
            Student
          </label>

          <select
            name="student"
            value={formData.student}
            onChange={handleChange}
            disabled={isEdit}
            required
            className="w-full border rounded-lg px-3 py-2"
          >

            <option value="">
              Select Student
            </option>

            {students.map(
              (student)=>(
                <option
                  key={student._id}
                  value={student._id}
                >
                  {student.name} (
                  {student.rollNumber})
                </option>
              )
            )}

          </select>

        </div>

        <div>

          <label className="block mb-2 font-medium">
            Academic Year
          </label>

          <input
            type="text"
            name="academicYear"
            value={formData.academicYear}
            onChange={handleChange}
            required
            placeholder="2025-2026"
            className="w-full border rounded-lg px-3 py-2"
          />

        </div>

        <div>

          <label className="block mb-2 font-medium">
            Semester
          </label>

          <select
            name="semester"
            value={formData.semester}
            onChange={handleChange}
            required
            className="w-full border rounded-lg px-3 py-2"
          >

            <option value="">
              Select Semester
            </option>

            {[1,2,3,4,5,6,7,8].map(
              (sem)=>(
                <option
                  key={sem}
                  value={sem}
                >
                  Semester {sem}
                </option>
              )
            )}

          </select>

        </div>

        <div>

          <label className="block mb-2 font-medium">
            Total Fee
          </label>

          <input
            type="number"
            name="totalFee"
            value={formData.totalFee}
            onChange={handleChange}
            required
            min={0}
            className="w-full border rounded-lg px-3 py-2"
          />

        </div>

        <div>

          <label className="block mb-2 font-medium">
            Amount Paid
          </label>

          <input
            type="number"
            name="amountPaid"
            value={formData.amountPaid}
            onChange={handleChange}
            min={0}
            className="w-full border rounded-lg px-3 py-2"
          />

        </div>

        <div>

          <label className="block mb-2 font-medium">
            Payment Method
          </label>

          <select
            name="paymentMethod"
            value={formData.paymentMethod}
            onChange={handleChange}
            className="w-full border rounded-lg px-3 py-2"
          >

            <option value="Cash">
              Cash
            </option>

            <option value="UPI">
              UPI
            </option>

            <option value="Card">
              Card
            </option>

            <option value="Bank Transfer">
              Bank Transfer
            </option>

          </select>

        </div>

      </div>

      <div>

        <label className="block mb-2 font-medium">
          Remarks
        </label>

        <textarea
          rows={4}
          name="remarks"
          value={formData.remarks}
          onChange={handleChange}
          className="w-full border rounded-lg px-3 py-2"
        />

      </div>

      <button
        disabled={loading}
        className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-2 rounded-lg"
      >
        {loading
          ? "Saving..."
          : isEdit
          ? "Update Fee"
          : "Create Fee"}
      </button>

    </form>

  );

};

export default FeeForm;