import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import toast from "react-hot-toast";

import { getFacultyById } from "../../api/facultyApi";

export default function FacultyDetails() {
  const { id } = useParams();

  const navigate = useNavigate();

  const [faculty, setFaculty] = useState(null);

  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadFaculty();
  }, []);

  const loadFaculty = async () => {
    try {
      const data = await getFacultyById(id);

      setFaculty(data.faculty);
    } catch (error) {
      toast.error("Unable to load faculty");

      navigate("/faculty");
    } finally {
      setLoading(false);
    }
  };

  if (loading)
    return (
      <div className="text-center py-10">
        Loading...
      </div>
    );

  if (!faculty)
    return (
      <div className="text-center py-10">
        Faculty not found
      </div>
    );

  return (
    <div className="space-y-6">

      <div className="bg-white rounded-xl shadow p-6">

        <div className="flex flex-col md:flex-row gap-8">

          <img
            src={
              faculty.profileImage?.url ||
              "https://via.placeholder.com/180"
            }
            alt={faculty.name}
            className="w-44 h-44 rounded-full object-cover border"
          />

          <div className="grid md:grid-cols-2 gap-x-10 gap-y-3 flex-1">

            <Info
              title="Name"
              value={faculty.name}
            />

            <Info
              title="Employee ID"
              value={faculty.employeeId}
            />

            <Info
              title="Email"
              value={faculty.email}
            />

            <Info
              title="Phone"
              value={faculty.phone}
            />

            <Info
              title="Department"
              value={faculty.department}
            />

            <Info
              title="Designation"
              value={faculty.designation}
            />

            <Info
              title="Qualification"
              value={faculty.qualification}
            />

            <Info
              title="Experience"
              value={`${faculty.experience} Years`}
            />

            <Info
              title="Specialization"
              value={faculty.specialization}
            />

            <Info
              title="Salary"
              value={`₹${faculty.salary}`}
            />

            <Info
              title="Joining Date"
              value={
                faculty.joiningDate
                  ? new Date(
                      faculty.joiningDate
                    ).toLocaleDateString()
                  : "-"
              }
            />

            <Info
              title="Status"
              value={
                faculty.isActive
                  ? "Active"
                  : "Inactive"
              }
            />

          </div>

        </div>

      </div>

      <div className="bg-white rounded-xl shadow p-6">

        <h2 className="text-xl font-bold mb-4">
          Personal Details
        </h2>

        <div className="grid md:grid-cols-2 gap-4">

          <Info
            title="Gender"
            value={faculty.gender}
          />

          <Info
            title="Date of Birth"
            value={
              faculty.dob
                ? new Date(
                    faculty.dob
                  ).toLocaleDateString()
                : "-"
            }
          />

          <Info
            title="Blood Group"
            value={faculty.bloodGroup}
          />

          <Info
            title="Marital Status"
            value={faculty.maritalStatus}
          />

        </div>

      </div>

      <div className="bg-white rounded-xl shadow p-6">

        <h2 className="text-xl font-bold mb-4">
          Address
        </h2>

        <div className="grid md:grid-cols-2 gap-4">

          <Info
            title="Street"
            value={faculty.address?.street}
          />

          <Info
            title="City"
            value={faculty.address?.city}
          />

          <Info
            title="District"
            value={faculty.address?.district}
          />

          <Info
            title="State"
            value={faculty.address?.state}
          />

          <Info
            title="Pincode"
            value={faculty.address?.pincode}
          />

          <Info
            title="Country"
            value={faculty.address?.country}
          />

        </div>

      </div>

      <div className="bg-white rounded-xl shadow p-6">

        <h2 className="text-xl font-bold mb-4">
          Audit Information
        </h2>

        <div className="grid md:grid-cols-2 gap-4">

          <Info
            title="Created By"
            value={
              faculty.createdBy?.name ||
              "-"
            }
          />

          <Info
            title="Updated By"
            value={
              faculty.updatedBy?.name ||
              "-"
            }
          />

          <Info
            title="Created At"
            value={new Date(
              faculty.createdAt
            ).toLocaleString()}
          />

          <Info
            title="Updated At"
            value={new Date(
              faculty.updatedAt
            ).toLocaleString()}
          />

        </div>

      </div>

    </div>
  );
}

function Info({
  title,
  value,
}) {
  return (
    <div>

      <p className="text-gray-500 text-sm">
        {title}
      </p>

      <p className="font-semibold">
        {value || "-"}
      </p>

    </div>
  );
}