import {
  useEffect,
  useState,
} from "react";

import {
  useNavigate,
} from "react-router-dom";

import toast from "react-hot-toast";

import SubjectTable from "../../components/subject/SubjectTable";

import SubjectDashboard from "../../components/subject/SubjectDashboard";

import {
  getSubjects,
  deleteSubject,
} from "../../api/subjectApi";

export default function SubjectList() {

  const navigate =
    useNavigate();

  const [subjects, setSubjects] =
    useState([]);

  const [pagination,
    setPagination] =
    useState({});

  const [page, setPage] =
    useState(1);

  const [search,
    setSearch] =
    useState("");

  useEffect(() => {
    loadSubjects();
  }, [page, search]);

  const loadSubjects =
    async () => {

      try {

        const data =
          await getSubjects({
            page,
            search,
          });

        setSubjects(
          data.subjects
        );

        setPagination({
  currentPage: data.currentPage,
  totalPages: data.totalPages,
  total: data.total,
});

      } catch {

        toast.error(
          "Unable to load subjects"
        );

      }

    };

  const remove =
    async (id) => {

      if (
        !window.confirm(
          "Delete subject?"
        )
      )
        return;

      await deleteSubject(id);

      toast.success(
        "Subject deleted"
      );

      loadSubjects();

    };

  return (

    <div>

      <div className="flex justify-between mb-6">

        <h1 className="text-3xl font-bold">
          Subjects
        </h1>

        <button
          onClick={() =>
            navigate("/subjects/add")
          }
          className="bg-blue-600 text-white px-5 py-2 rounded-lg"
        >
          Add Subject
        </button>

      </div>
      <SubjectDashboard />

      <input
        placeholder="Search..."
        value={search}
        onChange={(e) =>
          setSearch(
            e.target.value
          )
        }
        className="border rounded-lg p-2 w-full mb-5"
      />

      <SubjectTable
        subjects={subjects}
        onView={(id)=>
          navigate(`/subjects/${id}`)
        }
        onEdit={(id)=>
          navigate(`/subjects/edit/${id}`)
        }
        onDelete={remove}
      />

      <div className="flex justify-between mt-6">

        <button
          disabled={page<=1}
          onClick={()=>
            setPage(page-1)
          }
        >
          Previous
        </button>

        <span>

          {pagination.currentPage||1}

          /

          {pagination.totalPages||1}

        </span>

        <button
          disabled={
            page>=
            (pagination.totalPages||1)
          }
          onClick={()=>
            setPage(page+1)
          }
        >
          Next
        </button>

      </div>

    </div>

  );

}