import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";

import { getStudents, deleteStudent } from "../../api/studentApi";
import StudentTable from "../../components/students/StudentTable";

export default function StudentList() {
  const navigate = useNavigate();

  const [students, setStudents] = useState([]);
  const [pagination, setPagination] = useState({});

  const [filters, setFilters] = useState({
    page: 1,
    limit: 10,
    search: "",
    department: "",
    semester: "",
  });

  const [loading, setLoading] = useState(false);

  const loadStudents = async () => {
    try {
      setLoading(true);

      const data = await getStudents(filters);

      setStudents(data.students);
      setPagination(data.pagination);
    } catch (err) {
      toast.error("Unable to load students");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadStudents();
  }, [filters]);

  const handleDelete = async (id) => {
    if (!window.confirm("Delete this student?")) return;

    try {
      await deleteStudent(id);
      toast.success("Student deleted");
      loadStudents();
    } catch {
      toast.error("Delete failed");
    }
  };

  return (
    <div>

      <div className="flex justify-between items-center mb-6">

        <h1 className="text-3xl font-bold">
          Students
        </h1>

        <button
          onClick={() => navigate("/students/add")}
          className="bg-blue-600 hover:bg-blue-700 text-white px-5 py-2 rounded-lg"
        >
          Add Student
        </button>

      </div>

      <div className="bg-white rounded-lg shadow p-5 mb-5">

        <div className="grid md:grid-cols-3 gap-4">

          <input
            type="text"
            placeholder="Search..."
            value={filters.search}
            onChange={(e) =>
              setFilters({
                ...filters,
                search: e.target.value,
                page: 1,
              })
            }
            className="border rounded-lg p-2"
          />

          <input
            type="text"
            placeholder="Department"
            value={filters.department}
            onChange={(e) =>
              setFilters({
                ...filters,
                department: e.target.value,
                page: 1,
              })
            }
            className="border rounded-lg p-2"
          />

          <select
            value={filters.semester}
            onChange={(e) =>
              setFilters({
                ...filters,
                semester: e.target.value,
                page: 1,
              })
            }
            className="border rounded-lg p-2"
          >
            <option value="">All Semesters</option>

            {[1,2,3,4,5,6,7,8].map((sem)=>(
              <option key={sem} value={sem}>
                Semester {sem}
              </option>
            ))}
          </select>

        </div>

      </div>

      {loading ? (
        <div className="text-center py-10">
          Loading...
        </div>
      ) : (
        <StudentTable
          students={students}
          onView={(id)=>navigate(`/students/${id}`)}
          onEdit={(id)=>navigate(`/students/edit/${id}`)}
          onDelete={handleDelete}
        />
      )}

      <div className="flex justify-between mt-6">

        <button
          disabled={pagination.currentPage === 1}
          onClick={() =>
            setFilters({
              ...filters,
              page: filters.page - 1,
            })
          }
          className="bg-gray-300 px-4 py-2 rounded disabled:opacity-50"
        >
          Previous
        </button>

        <span className="font-semibold">

          Page {pagination.currentPage || 1} of{" "}
          {pagination.totalPages || 1}

        </span>

        <button
          disabled={
            pagination.currentPage ===
            pagination.totalPages
          }
          onClick={() =>
            setFilters({
              ...filters,
              page: filters.page + 1,
            })
          }
          className="bg-gray-300 px-4 py-2 rounded disabled:opacity-50"
        >
          Next
        </button>

      </div>

    </div>
  );
}