import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import toast from "react-hot-toast";

import {
  getResults,
  deleteResult,
  publishResult,
  unpublishResult,
  getResultStats,
} from "../../api/resultApi";

import ResultStatistics from "../../components/result/ResultStatistics";
import ResultTable from "../../components/result/ResultTable";

const Results = () => {
  const [results, setResults] = useState([]);
  const [statistics, setStatistics] = useState(null);
  const [loading, setLoading] = useState(true);

  const loadResults = async () => {
    try {
      setLoading(true);

      const res = await getResults();

      setResults(res.results || []);
    } catch (err) {
      console.error(err);
      toast.error("Unable to load results");
    } finally {
      setLoading(false);
    }
  };

  const loadStatistics = async () => {
    try {
      const res = await getResultStats();

      setStatistics(res);
    } catch (err) {
      console.error(err);
    }
  };

  useEffect(() => {
    loadResults();
    loadStatistics();
  }, []);

  const handleDelete = async (id) => {
    if (!window.confirm("Delete this result?")) return;

    try {
      await deleteResult(id);

      toast.success("Result deleted");

      loadResults();
      loadStatistics();
    } catch (err) {
      console.error(err);
      toast.error("Delete failed");
    }
  };

  const handlePublish = async (row) => {
    try {
      if (row.isPublished) {
        await unpublishResult(row._id);
        toast.success("Result unpublished");
      } else {
        await publishResult(row._id);
        toast.success("Result published");
      }

      loadResults();
      loadStatistics();
    } catch (err) {
      console.error(err);
      toast.error("Operation failed");
    }
  };

  return (
    <div className="space-y-8">

      <div className="flex justify-between items-center">

        <div>
          <h1 className="text-3xl font-bold">
            Result Management
          </h1>

          <p className="text-gray-500">
            Manage examination results
          </p>
        </div>

        <Link
          to="/results/add"
          className="bg-blue-600 text-white px-5 py-2 rounded-lg hover:bg-blue-700"
        >
          + Add Result
        </Link>

      </div>

      <ResultStatistics
        stats={statistics}
        loading={loading}
      />

      <ResultTable
        results={results}
        loading={loading}
        onDelete={handleDelete}
        onPublish={handlePublish}
      />

    </div>
  );
};

export default Results;