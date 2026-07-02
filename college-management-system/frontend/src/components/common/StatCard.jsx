export default function StatCard({
  title,
  value,
  icon,
}) {
  return (
    <div className="bg-white rounded-xl shadow p-6 hover:shadow-lg transition">

      <div className="flex justify-between items-center">

        <div>

          <h3 className="text-gray-500 text-sm">
            {title}
          </h3>

          <p className="text-3xl font-bold mt-2">
            {value}
          </p>

        </div>

        <div className="text-blue-600">
          {icon}
        </div>

      </div>

    </div>
  );
}