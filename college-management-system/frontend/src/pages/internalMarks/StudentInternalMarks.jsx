import {
  useEffect,
  useState,
} from "react";

import { useParams } from "react-router-dom";

import toast from "react-hot-toast";

import {
  getStudentInternalMarks,
} from "../../api/internalMarkApi";

import InternalMarkTable from "../../components/internalMarks/InternalMarkTable";

const StudentInternalMarks = () => {
  const { studentId } =
    useParams();

  const [records, setRecords] =
    useState([]);

  const [loading, setLoading] =
    useState(true);

  useEffect(() => {
    loadMarks();
  }, []);

  const loadMarks = async () => {
    try {
      const res =
        await getStudentInternalMarks(
          studentId
        );

      setRecords(
        res.internalMarks || []
      );
    } catch (error) {
      console.error(error);

      toast.error(
        "Unable to fetch records."
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="space-y-6">

      <div>

        <h1 className="text-3xl font-bold">
          Student Internal Marks
        </h1>

        <p className="text-gray-500 mt-2">
          Internal marks of selected
          student.
        </p>

      </div>

      <InternalMarkTable
        records={records}
        loading={loading}
      />

    </div>
  );
};

export default StudentInternalMarks;