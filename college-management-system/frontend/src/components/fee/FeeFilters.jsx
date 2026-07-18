import { Search } from "lucide-react";

const FeeFilters = ({
  filters,
  onChange,
  onReset,
}) => {
  return (
    <div className="bg-white rounded-xl shadow p-5 mb-6">

      <div className="grid grid-cols-1 md:grid-cols-5 gap-4">

        <div className="relative">

          <Search
            size={18}
            className="absolute left-3 top-3 text-gray-400"
          />

          <input
            type="text"
            name="search"
            value={filters.search}
            onChange={onChange}
            placeholder="Search student..."
            className="w-full border rounded-lg pl-10 pr-3 py-2 focus:ring-2 focus:ring-blue-500 outline-none"
          />

        </div>

        <select
          name="paymentStatus"
          value={filters.paymentStatus}
          onChange={onChange}
          className="border rounded-lg px-3 py-2"
        >
          <option value="">
            All Status
          </option>

          <option value="Pending">
            Pending
          </option>

          <option value="Partial">
            Partial
          </option>

          <option value="Paid">
            Paid
          </option>
        </select>

        <input
          type="text"
          name="academicYear"
          value={filters.academicYear}
          onChange={onChange}
          placeholder="Academic Year"
          className="border rounded-lg px-3 py-2"
        />

        <select
          name="semester"
          value={filters.semester}
          onChange={onChange}
          className="border rounded-lg px-3 py-2"
        >
          <option value="">
            Semester
          </option>

          {[1,2,3,4,5,6,7,8].map(
            (sem)=>(
              <option
                key={sem}
                value={sem}
              >
                Semester {sem}
              </option>
            )
          )}
        </select>

        <button
          onClick={onReset}
          className="bg-gray-700 hover:bg-gray-800 text-white rounded-lg px-4"
        >
          Reset
        </button>

      </div>

    </div>
  );
};

export default FeeFilters;