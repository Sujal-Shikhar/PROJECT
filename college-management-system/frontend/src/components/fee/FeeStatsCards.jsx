const Card = ({
  title,
  value,
  color,
}) => (
  <div className="bg-white rounded-xl shadow p-5">

    <p className="text-gray-500 text-sm">
      {title}
    </p>

    <h2
      className={`text-3xl font-bold mt-2 ${color}`}
    >
      {value}
    </h2>

  </div>
);

const FeeStatsCards = ({
  stats,
}) => {

  if (!stats) return null;

  return (

    <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">

      <Card
  title="Total Records"
  value={stats.totalRecords || 0}
  color="text-blue-600"
/>

<Card
  title="Paid"
  value={stats.paidFees || 0}
  color="text-green-600"
/>

<Card
  title="Partial"
  value={stats.partialFees || 0}
  color="text-yellow-600"
/>

<Card
  title="Pending"
  value={stats.pendingFees || 0}
  color="text-red-600"
/>

    </div>

  );

};

export default FeeStatsCards;