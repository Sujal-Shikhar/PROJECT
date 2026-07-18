import ResultStatistics from "./ResultStatistics";
import ResultTable from "./ResultTable";

const ResultDashboard = ({
  statistics,
  latestResults = [],
  loading = false,
}) => {
  return (
    <div className="space-y-8">

      <div>
        <h1 className="text-3xl font-bold text-gray-800">
          Result Dashboard
        </h1>

        <p className="text-gray-500 mt-2">
          Overview of examination results.
        </p>
      </div>

      <ResultStatistics
        stats={statistics}
        loading={loading}
      />

      <div className="bg-white rounded-xl shadow-md">

        <div className="border-b px-6 py-4">
          <h2 className="text-xl font-semibold">
            Latest Results
          </h2>
        </div>

        <div className="p-6">

          <ResultTable
            results={latestResults}
            loading={loading}
            showActions={false}
            onDelete={() => {}}
            onPublish={() => {}}
          />

        </div>

      </div>

    </div>
  );
};

export default ResultDashboard;