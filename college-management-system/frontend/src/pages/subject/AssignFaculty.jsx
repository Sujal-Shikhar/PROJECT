import {
  useEffect,
  useState,
} from "react";

import {
  useNavigate,
  useParams,
} from "react-router-dom";

import toast from "react-hot-toast";

import {
  getSubjectById,
  assignFaculty,
} from "../../api/subjectApi";

import {
  getFaculty,
} from "../../api/facultyApi";

export default function AssignFaculty() {

  const { id } = useParams();

  const navigate =
    useNavigate();

  const [faculty,
    setFaculty] =
    useState([]);

  const [selected,
    setSelected] =
    useState("");

  const [subject,
    setSubject] =
    useState(null);

  useEffect(() => {

    load();

  }, []);

  const load =
    async () => {

      const sub =
        await getSubjectById(id);

      setSubject(
        sub.subject
      );

      if (sub.subject.faculty) {
        setSelected(
          sub.subject.faculty._id
        );
      }

      const fac =
        await getFaculty({
          limit: 500,
        });

      setFaculty(
        fac.faculty
      );

    };

  const submit =
    async () => {

      try {

        await assignFaculty(
          id,
          selected
        );

        toast.success(
          "Faculty Assigned"
        );

        navigate("/subjects");

      }

      catch {

        toast.error(
          "Assignment failed"
        );

      }

    };

  if (!subject)
    return <div>Loading...</div>;

  return (

    <div className="bg-white rounded-xl shadow p-8 max-w-xl">

      <h1 className="text-3xl font-bold mb-6">

        Assign Faculty

      </h1>

      <p className="mb-5">

        <strong>
          {subject.name}
        </strong>

      </p>

      <select
        value={selected}
        onChange={(e)=>
          setSelected(
            e.target.value
          )
        }
        className="w-full border rounded-lg p-3"
      >

        <option value="">
          Select Faculty
        </option>

        {faculty.map((f)=>(
          <option
            key={f._id}
            value={f._id}
          >
            {f.name}
          </option>
        ))}

      </select>

      <button
        onClick={submit}
        className="mt-6 bg-blue-600 text-white px-6 py-3 rounded-lg"
      >
        Assign Faculty
      </button>

    </div>

  );

}