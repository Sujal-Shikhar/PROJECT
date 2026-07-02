import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";

import FacultyTable from "../../components/faculty/FacultyTable";

import {
  getFaculty,
  deleteFaculty,
} from "../../api/facultyApi";

export default function FacultyList() {
  const navigate = useNavigate();

  const [faculty, setFaculty] = useState([]);

  const [loading, setLoading] =
    useState(true);

  const [page, setPage] =
    useState(1);

  const [search, setSearch] =
    useState("");

  const [pagination, setPagination] =
    useState({});

  useEffect(() => {
    loadFaculty();
  }, [page, search]);

  const loadFaculty = async () => {
    try {
      setLoading(true);

      const data = await getFaculty({
        page,
        search,
      });

      setFaculty(data.faculty);

      setPagination(data.pagination);
    } catch (error) {
      toast.error("Unable to load faculty");
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (id) => {
    if (
      !window.confirm(
        "Deactivate this faculty?"
      )
    )
      return;

    try {
      await deleteFaculty(id);

      toast.success(
        "Faculty deactivated"
      );

      loadFaculty();
    } catch (error) {
      toast.error(
        error.response?.data?.message ||
          "Delete failed"
      );
    }
  };

  return (
    <div>

      <div className="flex justify-between items-center mb-6">

        <h1 className="text-3xl font-bold">
          Faculty
        </h1>

        <button
          onClick={() =>
            navigate("/faculty/add")
          }
          className="bg-blue-600 text-white px-5 py-2 rounded-lg"
        >
          Add Faculty
        </button>

      </div>

      <input
        placeholder="Search faculty..."
        value={search}
        onChange={(e) =>
          setSearch(e.target.value)
        }
        className="border rounded-lg p-2 w-full mb-5"
      />

      {loading ? (
        <div className="text-center py-10">
          Loading...
        </div>
      ) : (
        <>
          <FacultyTable
            faculty={faculty}
            onView={(id) =>
              navigate(`/faculty/${id}`)
            }
            onEdit={(id) =>
              navigate(
                `/faculty/edit/${id}`
              )
            }
            onDelete={handleDelete}
          />

          <div className="flex justify-between items-center mt-6">

            <button
              disabled={page <= 1}
              onClick={() =>
                setPage(page - 1)
              }
              className="bg-gray-200 px-4 py-2 rounded"
            >
              Previous
            </button>

            <span>
              Page {pagination.currentPage || 1}
              {" / "}
              {pagination.totalPages || 1}
            </span>

            <button
              disabled={
                page >=
                (pagination.totalPages ||
                  1)
              }
              onClick={() =>
                setPage(page + 1)
              }
              className="bg-gray-200 px-4 py-2 rounded"
            >
              Next
            </button>

          </div>

        </>
      )}

    </div>
  );
}