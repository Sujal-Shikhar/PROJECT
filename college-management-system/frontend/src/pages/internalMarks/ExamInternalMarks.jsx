import {
  useEffect,
  useState,
} from "react";

import { useParams } from "react-router-dom";

import toast from "react-hot-toast";

import {
  getExamInternalMarks,
} from "../../api/internalMarkApi";

import InternalMarkTable from "../../components/internalMarks/InternalMarkTable";

const ExamInternalMarks = () => {
  const { examId } =
    useParams();

  const [records, setRecords] =
    useState([]);

  const [loading, setLoading] =
    useState(true);

  useEffect(() => {
    fetchMarks();
  }, []);

  const fetchMarks = async () => {
    try {
      const res =
        await getExamInternalMarks(
          examId
        );

      setRecords(
        res.internalMarks || []
      );
    } catch (error) {
      console.error(error);

      toast.error(
        "Unable to fetch exam marks."
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="space-y-6">

      <div>

        <h1 className="text-3xl font-bold">
          Exam Internal Marks
        </h1>

        <p className="text-gray-500 mt-2">
          Internal marks for the selected
          examination.
        </p>

      </div>

      <InternalMarkTable
        records={records}
        loading={loading}
      />

    </div>
  );
};

export default ExamInternalMarks;