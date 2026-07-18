import {
  FaClipboardList,
  FaCheckCircle,
  FaTimesCircle,
  FaUpload,
  FaChartLine,
  FaTrophy,
  FaArrowDown,
} from "react-icons/fa";

const StatCard = ({ icon, title, value, color }) => (
  <div className="bg-white rounded-xl shadow-md p-5 flex items-center gap-4 hover:shadow-lg transition">
    <div
      className={`w-14 h-14 rounded-full flex items-center justify-center text-white text-xl ${color}`}
    >
      {icon}
    </div>

    <div>
      <p className="text-sm text-gray-500">{title}</p>

      <h2 className="text-2xl font-bold text-gray-800">
        {value}
      </h2>
    </div>
  </div>
);

const ResultStatistics = ({
  stats,
  loading = false,
}) => {
  if (loading) {
    return (
      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-6">
        {[...Array(7)].map((_, index) => (
          <div
            key={index}
            className="bg-white rounded-xl shadow-md p-5 animate-pulse"
          >
            <div className="h-5 w-28 bg-gray-200 rounded mb-4"></div>
            <div className="h-8 w-16 bg-gray-300 rounded"></div>
          </div>
        ))}
      </div>
    );
  }

  if (!stats) {
    return (
      <div className="bg-white rounded-xl shadow-md p-10 text-center text-gray-500">
        No statistics available.
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-6">

      <StatCard
        title="Total Results"
        value={stats.total}
        color="bg-blue-600"
        icon={<FaClipboardList />}
      />

      <StatCard
        title="Passed"
        value={stats.pass}
        color="bg-green-600"
        icon={<FaCheckCircle />}
      />

      <StatCard
        title="Failed"
        value={stats.fail}
        color="bg-red-600"
        icon={<FaTimesCircle />}
      />

      <StatCard
        title="Published"
        value={stats.published}
        color="bg-purple-600"
        icon={<FaUpload />}
      />

      <StatCard
        title="Average Marks"
        value={Number(stats.average).toFixed(2)}
        color="bg-yellow-500"
        icon={<FaChartLine />}
      />

      <StatCard
        title="Highest Marks"
        value={stats.highest}
        color="bg-emerald-600"
        icon={<FaTrophy />}
      />

      <StatCard
        title="Lowest Marks"
        value={stats.lowest}
        color="bg-orange-500"
        icon={<FaArrowDown />}
      />

    </div>
  );
};

export default ResultStatistics;