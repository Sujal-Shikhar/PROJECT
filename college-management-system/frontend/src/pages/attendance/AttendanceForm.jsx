import { useEffect, useState } from "react";
import {
  useNavigate,
  useParams,
} from "react-router-dom";
import {
  useForm,
} from "react-hook-form";
import toast from "react-hot-toast";

import {
  createAttendance,
  updateAttendance,
  getAttendanceById,
} from "../../api/attendanceApi";

import { getStudents } from "../../api/studentApi";
import { getFaculty } from "../../api/facultyApi";
import { getSubjects } from "../../api/subjectApi";

export default function AttendanceForm() {
  const navigate = useNavigate();

  const { id } = useParams();

  const editing = Boolean(id);

  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors },
  } = useForm();

  const [students, setStudents] = useState([]);

  const [faculty, setFaculty] = useState([]);

  const [subjects, setSubjects] = useState([]);

  const [loading, setLoading] = useState(false);

  useEffect(() => {
    loadDropdowns();

    if (editing) {
      loadAttendance();
    }
  }, []);

  const loadDropdowns = async () => {
    try {
      const [
        studentData,
        facultyData,
        subjectData,
      ] = await Promise.all([
        getStudents({ limit: 1000 }),
        getFaculty({ limit: 1000 }),
        getSubjects({ limit: 1000 }),
      ]);

      setStudents(studentData.students);

      setFaculty(facultyData.faculty);

      setSubjects(subjectData.subjects);
    } catch (error) {
      console.error(error);
    }
  };

  const loadAttendance = async () => {
    try {
      const data =
        await getAttendanceById(id);

      const attendance =
        data.attendance;

      setValue(
        "student",
        attendance.student._id
      );

      setValue(
        "faculty",
        attendance.faculty._id
      );

      setValue(
        "subject",
        attendance.subject._id
      );

      setValue(
        "lectureNumber",
        attendance.lectureNumber
      );

      setValue(
        "status",
        attendance.status
      );

      setValue(
        "remarks",
        attendance.remarks
      );

      setValue(
        "date",
        attendance.date.substring(0, 10)
      );
    } catch (error) {
      toast.error(
        "Unable to load attendance"
      );
    }
  };

  const submit = async (formData) => {
    try {
      setLoading(true);

      if (editing) {
        await updateAttendance(
          id,
          formData
        );

        toast.success(
          "Attendance updated"
        );
      } else {
        await createAttendance(
          formData
        );

        toast.success(
          "Attendance marked"
        );
      }

      navigate("/attendance");
    } catch (error) {
      toast.error(
        error?.response?.data?.message ||
          "Operation failed"
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-4xl mx-auto bg-white rounded-xl shadow p-8">

      <h1 className="text-3xl font-bold mb-8">

        {editing
          ? "Edit Attendance"
          : "Mark Attendance"}

      </h1>

      <form
        onSubmit={handleSubmit(submit)}
        className="grid md:grid-cols-2 gap-5"
      >

        <div>

          <label className="font-medium">
            Student
          </label>

          <select
            {...register(
              "student",
              {
                required:
                  "Student required",
              }
            )}
            className="w-full border rounded-lg p-3 mt-1"
          >

            <option value="">
              Select Student
            </option>

            {students.map(
              (student) => (
                <option
                  key={student._id}
                  value={
                    student._id
                  }
                >
                  {student.name}
                </option>
              )
            )}

          </select>

          <p className="text-red-500 text-sm">
            {errors.student?.message}
          </p>

        </div>

        <div>

          <label className="font-medium">
            Faculty
          </label>

          <select
            {...register(
              "faculty",
              {
                required:
                  "Faculty required",
              }
            )}
            className="w-full border rounded-lg p-3 mt-1"
          >

            <option value="">
              Select Faculty
            </option>

            {faculty.map(
              (item) => (
                <option
                  key={item._id}
                  value={item._id}
                >
                  {item.name}
                </option>
              )
            )}

          </select>

          <p className="text-red-500 text-sm">
            {errors.faculty?.message}
          </p>

        </div>

        <div>

          <label className="font-medium">
            Subject
          </label>

          <select
            {...register(
              "subject",
              {
                required:
                  "Subject required",
              }
            )}
            className="w-full border rounded-lg p-3 mt-1"
          >

            <option value="">
              Select Subject
            </option>

            {subjects.map(
              (subject) => (
                <option
                  key={subject._id}
                  value={
                    subject._id
                  }
                >
                  {subject.name}
                </option>
              )
            )}

          </select>

          <p className="text-red-500 text-sm">
            {errors.subject?.message}
          </p>

        </div>

        <div>

          <label className="font-medium">
            Lecture Number
          </label>

          <input
            type="number"
            min="1"
            max="10"
            {...register(
              "lectureNumber",
              {
                required:
                  "Lecture required",
              }
            )}
            className="w-full border rounded-lg p-3 mt-1"
          />

          <p className="text-red-500 text-sm">
            {
              errors.lectureNumber
                ?.message
            }
          </p>

        </div>

        <div>

          <label className="font-medium">
            Date
          </label>

          <input
            type="date"
            {...register("date", {
              required:
                "Date required",
            })}
            className="w-full border rounded-lg p-3 mt-1"
          />

          <p className="text-red-500 text-sm">
            {errors.date?.message}
          </p>

        </div>

        <div>

          <label className="font-medium">
            Status
          </label>

          <select
            {...register(
              "status",
              {
                required:
                  "Status required",
              }
            )}
            className="w-full border rounded-lg p-3 mt-1"
          >

            <option value="">
              Select Status
            </option>

            <option value="Present">
              Present
            </option>

            <option value="Absent">
              Absent
            </option>

            <option value="Late">
              Late
            </option>

            <option value="Medical Leave">
              Medical Leave
            </option>

          </select>

          <p className="text-red-500 text-sm">
            {errors.status?.message}
          </p>

        </div>

        <div className="md:col-span-2">

          <label className="font-medium">
            Remarks
          </label>

          <textarea
            rows="4"
            {...register("remarks")}
            className="w-full border rounded-lg p-3 mt-1"
          />

        </div>

        <div className="md:col-span-2 flex gap-4">

          <button
            type="submit"
            disabled={loading}
            className="bg-blue-600 hover:bg-blue-700 text-white px-8 py-3 rounded-lg"
          >

            {loading
              ? "Saving..."
              : editing
              ? "Update Attendance"
              : "Mark Attendance"}

          </button>

          <button
            type="button"
            onClick={() =>
              navigate("/attendance")
            }
            className="bg-gray-500 text-white px-8 py-3 rounded-lg"
          >
            Cancel
          </button>

        </div>

      </form>

    </div>
  );
}