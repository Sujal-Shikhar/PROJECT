import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import toast from "react-hot-toast";

import { getStudent } from "../../api/studentApi";

export default function StudentDetails() {
  const { id } = useParams();

  const navigate = useNavigate();

  const [student, setStudent] = useState(null);

  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadStudent();
  }, []);

  const loadStudent = async () => {
    try {
      const data = await getStudent(id);

      setStudent(data.student);
    } catch (error) {
      toast.error("Unable to load student");
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <div className="text-center py-10 text-xl">
        Loading...
      </div>
    );
  }

  if (!student) {
    return (
      <div className="text-center py-10 text-red-600">
        Student not found
      </div>
    );
  }

  return (
    <div>

      <div className="flex justify-between items-center mb-6">

        <h1 className="text-3xl font-bold">
          Student Details
        </h1>

        <button
          onClick={() => navigate("/students")}
          className="bg-gray-600 text-white px-5 py-2 rounded-lg"
        >
          Back
        </button>

      </div>

      <div className="bg-white rounded-xl shadow p-8">

        <div className="grid md:grid-cols-2 gap-6">

          <Detail
            label="Name"
            value={student.name}
          />

          <Detail
            label="Email"
            value={student.email}
          />

          <Detail
            label="Phone"
            value={student.phone}
          />

          <Detail
            label="Gender"
            value={student.gender}
          />

          <Detail
            label="Roll Number"
            value={student.rollNumber}
          />

          <Detail
            label="Admission Number"
            value={student.admissionNumber}
          />

          <Detail
            label="Department"
            value={student.department}
          />

          <Detail
            label="Semester"
            value={student.semester}
          />

          <Detail
            label="Section"
            value={student.section}
          />

          <Detail
            label="Batch"
            value={student.batch}
          />

          <Detail
            label="Date of Birth"
            value={student.dateOfBirth}
          />

          <Detail
            label="Address"
            value={student.address}
          />

          <Detail
            label="Guardian Name"
            value={student.guardianName}
          />

          <Detail
            label="Guardian Phone"
            value={student.guardianPhone}
          />

          <Detail
            label="Status"
            value={
              student.isActive
                ? "Active"
                : "Inactive"
            }
          />

          <Detail
            label="Created At"
            value={
              student.createdAt
                ? new Date(
                    student.createdAt
                  ).toLocaleDateString()
                : "-"
            }
          />

        </div>

      </div>

    </div>
  );
}

function Detail({
  label,
  value,
}) {
  return (
    <div>

      <p className="text-sm text-gray-500">
        {label}
      </p>

      <p className="text-lg font-semibold">
        {value || "-"}
      </p>

    </div>
  );
}