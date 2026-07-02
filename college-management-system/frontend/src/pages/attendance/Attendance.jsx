import { useEffect, useMemo, useState } from "react";
import API from "../../api/axios";
import Layout from "../../components/layout/Layout";
import AttendanceForm from "./AttendanceForm";




const Attendance = () => {
  const user = JSON.parse(
    localStorage.getItem("user")
  );

  const [students, setStudents] =
    useState([]);

  const [subjects, setSubjects] =
    useState([]);

  const [attendance, setAttendance] =
    useState([]);

  const [loading, setLoading] =
    useState(false);

  const [saving, setSaving] =
    useState(false);

  const [search, setSearch] =
    useState("");

  const [form, setForm] =
    useState({
      subject: "",
      semester: "",
      department: "",
    });

  /*
  ====================================
  FETCH SUBJECTS
  ====================================
  */

  const fetchSubjects =
    async () => {
      try {
        const res =
          await API.get(
            "/subjects"
          );

        setSubjects(
          res.data.subjects || []
        );
      } catch (error) {
        console.log(error);
      }
    };

  /*
  ====================================
  FETCH STUDENTS
  ====================================
  */

  const fetchStudents =
    async () => {
      try {
        if (
          !form.department ||
          !form.semester
        )
          return;

        setLoading(true);

        const res =
          await API.get(
            "/students",
            {
              params: {
                department:
                  form.department,
                semester:
                  form.semester,
              },
            }
          );

        const studentData =
          res.data.students || [];

        setStudents(
          studentData
        );

        const initial =
          studentData.map(
            (student) => ({
              student:
                student._id,
              status:
                "Present",
            })
          );

        setAttendance(
          initial
        );
      } catch (error) {
        console.log(error);
      } finally {
        setLoading(false);
      }
    };

  /*
  ====================================
  LOAD SUBJECTS
  ====================================
  */

  useEffect(() => {
    fetchSubjects();
  }, []);

  /*
  ====================================
  LOAD STUDENTS
  ====================================
  */

  useEffect(() => {
    fetchStudents();
  }, [
    form.department,
    form.semester,
  ]);

  /*
  ====================================
  HANDLE CHANGE
  ====================================
  */

  const handleChange = (
    e
  ) => {
    setForm({
      ...form,
      [e.target.name]:
        e.target.value,
    });
  };

  /*
  ====================================
  MARK ATTENDANCE
  ====================================
  */

  const updateStatus = (
    studentId,
    status
  ) => {
    setAttendance(
      attendance.map(
        (item) =>
          item.student ===
          studentId
            ? {
                ...item,
                status,
              }
            : item
      )
    );
  };

  /*
  ====================================
  MARK ALL PRESENT
  ====================================
  */

  const markAllPresent =
    () => {
      setAttendance(
        attendance.map(
          (item) => ({
            ...item,
            status:
              "Present",
          })
        )
      );
    };

  /*
  ====================================
  MARK ALL ABSENT
  ====================================
  */

  const markAllAbsent =
    () => {
      setAttendance(
        attendance.map(
          (item) => ({
            ...item,
            status:
              "Absent",
          })
        )
      );
    };

  /*
  ====================================
  SAVE ATTENDANCE
  ====================================
  */

  const handleSubmit =
    async () => {
      try {
        if (
          !form.subject ||
          !form.semester ||
          !form.department
        ) {
          return alert(
            "Fill all fields"
          );
        }

        setSaving(true);

        await API.post(
          "/attendance/bulk",
          {
            subject:
              form.subject,
            faculty:
              user?._id,
            semester:
              form.semester,
            department:
              form.department,
            attendanceData:
              attendance,
          }
        );

        alert(
          "Attendance Saved Successfully"
        );

        fetchStudents();
      } catch (
        error
      ) {
        console.log(error);

        alert(
          error.response
            ?.data
            ?.message ||
            "Unable to Save"
        );
      } finally {
        setSaving(false);
      }
    };

  /*
  ====================================
  SEARCH
  ====================================
  */

  const filteredStudents =
    useMemo(() => {
      return students.filter(
        (student) =>
          student.name
            .toLowerCase()
            .includes(
              search.toLowerCase()
            ) ||
          student.rollNumber
            .toLowerCase()
            .includes(
              search.toLowerCase()
            )
      );
    }, [
      students,
      search,
    ]);

  /*
  ====================================
  COUNTS
  ====================================
  */

  const presentCount =
    attendance.filter(
      (a) =>
        a.status ===
        "Present"
    ).length;

  const absentCount =
    attendance.filter(
      (a) =>
        a.status ===
        "Absent"
    ).length;

  return (
    <Layout>
      <div className="p-6">

        <h1 className="text-3xl font-bold mb-6">
          Attendance Management
        </h1>

        {/* FILTERS */}

        <div className="bg-white p-5 rounded shadow mb-6">

          <div className="grid md:grid-cols-4 gap-4">

            <select
              name="department"
              value={
                form.department
              }
              onChange={
                handleChange
              }
              className="border p-2 rounded"
            >
              <option value="">
                Department
              </option>

              <option value="CSE">
                CSE
              </option>

              <option value="IT">
                IT
              </option>

              <option value="ECE">
                ECE
              </option>

              <option value="EEE">
                EEE
              </option>

              <option value="MECH">
                MECH
              </option>
            </select>

            <input
              type="number"
              name="semester"
              value={
                form.semester
              }
              onChange={
                handleChange
              }
              placeholder="Semester"
              className="border p-2 rounded"
            />

            <select
              name="subject"
              value={
                form.subject
              }
              onChange={
                handleChange
              }
              className="border p-2 rounded"
            >
              <option value="">
                Select Subject
              </option>

              {subjects.map(
                (
                  subject
                ) => (
                  <option
                    key={
                      subject._id
                    }
                    value={
                      subject._id
                    }
                  >
                    {
                      subject.subjectName
                    }
                  </option>
                )
              )}
            </select>

            <input
              placeholder="Search Student"
              value={
                search
              }
              onChange={(
                e
              ) =>
                setSearch(
                  e.target
                    .value
                )
              }
              className="border p-2 rounded"
            />

          </div>
        </div>

        {/* ANALYTICS */}

        <div className="grid md:grid-cols-3 gap-5 mb-6">

          <div className="bg-white shadow p-5 rounded">
            <h3 className="text-gray-500">
              Total Students
            </h3>

            <p className="text-3xl font-bold">
              {
                students.length
              }
            </p>
          </div>

          <div className="bg-white shadow p-5 rounded">
            <h3 className="text-gray-500">
              Present
            </h3>

            <p className="text-3xl font-bold text-green-600">
              {
                presentCount
              }
            </p>
          </div>

          <div className="bg-white shadow p-5 rounded">
            <h3 className="text-gray-500">
              Absent
            </h3>

            <p className="text-3xl font-bold text-red-600">
              {
                absentCount
              }
            </p>
          </div>

        </div>

        {/* ACTIONS */}

        <div className="flex gap-4 mb-5">

          <button
            onClick={
              markAllPresent
            }
            className="bg-green-600 text-white px-4 py-2 rounded"
          >
            Mark All Present
          </button>

          <button
            onClick={
              markAllAbsent
            }
            className="bg-red-600 text-white px-4 py-2 rounded"
          >
            Mark All Absent
          </button>

        </div>

        {/* TABLE */}

        <div className="bg-white rounded shadow overflow-x-auto">

          <table className="w-full">

            <thead className="bg-gray-100">
              <tr>

                <th className="p-3 text-left">
                  Roll No
                </th>

                <th className="p-3 text-left">
                  Student Name
                </th>

                <th className="p-3 text-center">
                  Status
                </th>

              </tr>
            </thead>

            <tbody>

              {loading ? (
                <tr>
                  <td
                    colSpan="3"
                    className="p-6 text-center"
                  >
                    Loading...
                  </td>
                </tr>
              ) : filteredStudents.length ===
                0 ? (
                <tr>
                  <td
                    colSpan="3"
                    className="p-6 text-center"
                  >
                    No Students Found
                  </td>
                </tr>
              ) : (
                filteredStudents.map(
                  (
                    student
                  ) => {
                    const item =
                      attendance.find(
                        (
                          a
                        ) =>
                          a.student ===
                          student._id
                      );

                    return (
                      <tr
                        key={
                          student._id
                        }
                        className="border-t"
                      >
                        <td className="p-3">
                          {
                            student.rollNumber
                          }
                        </td>

                        <td className="p-3">
                          {
                            student.name
                          }
                        </td>

                        <td className="p-3 text-center">

                          <button
                            onClick={() =>
                              updateStatus(
                                student._id,
                                "Present"
                              )
                            }
                            className={`px-3 py-1 rounded mr-2 ${
                              item?.status ===
                              "Present"
                                ? "bg-green-600 text-white"
                                : "bg-gray-200"
                            }`}
                          >
                            Present
                          </button>

                          <button
                            onClick={() =>
                              updateStatus(
                                student._id,
                                "Absent"
                              )
                            }
                            className={`px-3 py-1 rounded ${
                              item?.status ===
                              "Absent"
                                ? "bg-red-600 text-white"
                                : "bg-gray-200"
                            }`}
                          >
                            Absent
                          </button>

                        </td>
                      </tr>
                    );
                  }
                )
              )}

            </tbody>

          </table>
        </div>

        {/* SAVE BUTTON */}

        <button
          onClick={
            handleSubmit
          }
          disabled={
            saving
          }
          className="bg-blue-600 text-white px-6 py-3 rounded mt-6 disabled:bg-gray-400"
        >
          {saving
            ? "Saving..."
            : "Save Attendance"}
        </button>

      </div>
    </Layout>
  );
};

export default Attendance;