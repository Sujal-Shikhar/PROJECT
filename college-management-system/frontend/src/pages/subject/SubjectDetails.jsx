import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import toast from "react-hot-toast";

import { getSubjectById } from "../../api/subjectApi";

function Row({ label, value }) {
  return (
    <div className="flex justify-between border-b py-3">
      <span className="font-semibold">{label}</span>
      <span>{value || "-"}</span>
    </div>
  );
}

export default function SubjectDetails() {
  const { id } = useParams();

  const navigate = useNavigate();

  const [subject, setSubject] = useState(null);

  useEffect(() => {
    loadSubject();
  }, []);

  const loadSubject = async () => {
    try {
      const data = await getSubjectById(id);
      setSubject(data.subject);
    } catch {
      toast.error("Unable to load subject");
      navigate("/subjects");
    }
  };

  if (!subject)
    return <div className="text-center py-10">Loading...</div>;

  return (
    <div className="bg-white rounded-xl shadow p-8">

      <h1 className="text-3xl font-bold mb-8">
        Subject Details
      </h1>

      <Row label="Subject Name" value={subject.name} />

      <Row label="Subject Code" value={subject.code} />

      <Row label="Department" value={subject.department} />

      <Row label="Semester" value={subject.semester} />

      <Row label="Credits" value={subject.credits} />

      <Row label="Type" value={subject.type} />

      <Row
        label="Faculty"
        value={subject.faculty?.name}
      />

      <Row
        label="Status"
        value={
          subject.isActive
            ? "Active"
            : "Inactive"
        }
      />

      <Row
        label="Created"
        value={new Date(
          subject.createdAt
        ).toLocaleString()}
      />

      <Row
        label="Updated"
        value={new Date(
          subject.updatedAt
        ).toLocaleString()}
      />

    </div>
  );
}