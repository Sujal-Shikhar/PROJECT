import {
  useEffect,
  useState,
} from "react";

import { useParams } from "react-router-dom";

import toast from "react-hot-toast";

import {
  getSubjectInternalMarks,
} from "../../api/internalMarkApi";

import InternalMarkTable from "../../components/internalMarks/InternalMarkTable";

const SubjectInternalMarks = () => {
  const { subjectId } =
    useParams();

  const [records, setRecords] =
    useState([]);

  const [loading, setLoading] =
    useState(true);

  useEffect(() => {
    fetchRecords();
  }, []);

  const fetchRecords = async () => {
    try {
      const res =
        await getSubjectInternalMarks(
          subjectId
        );

      setRecords(
        res.internalMarks || []
      );
    } catch (error) {
      console.error(error);

      toast.error(
        "Unable to fetch subject marks."
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="space-y-6">

      <div>

        <h1 className="text-3xl font-bold">
          Subject Internal Marks
        </h1>

        <p className="text-gray-500 mt-2">
          Internal marks of all students
          for this subject.
        </p>

      </div>

      <InternalMarkTable
        records={records}
        loading={loading}
      />

    </div>
  );
};

export default SubjectInternalMarks;