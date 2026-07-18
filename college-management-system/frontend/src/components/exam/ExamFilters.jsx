import { Search } from "lucide-react";

export default function ExamFilters({
  filters = {
    search: "",
    department: "",
    semester: "",
    examType: "",
    status: "",
  },
  setFilters = () => {},
}) {
  const handleChange = (e) => {
    setFilters({
      ...filters,
      [e.target.name]:
        e.target.value,
    });
  };

  return (
    <div className="bg-white rounded-xl shadow p-5 mb-6">

      <div className="grid grid-cols-1 md:grid-cols-5 gap-4">

        <div>
          <label className="block text-sm font-medium mb-1">
            Search
          </label>

          <div className="relative">

            <Search
              size={18}
              className="absolute left-3 top-3 text-gray-400"
            />

            <input
              type="text"
              name="search"
              placeholder="Exam Name..."
              value={filters.search}
              onChange={handleChange}
              className="w-full pl-10 border rounded-lg px-3 py-2"
            />

          </div>
        </div>

        <div>
          <label className="block text-sm font-medium mb-1">
            Department
          </label>

          <select
            name="department"
            value={filters.department}
            onChange={handleChange}
            className="w-full border rounded-lg px-3 py-2"
          >
            <option value="">
              All
            </option>

            <option>CSE</option>
            <option>IT</option>
            <option>ECE</option>
            <option>EEE</option>
            <option>ME</option>
            <option>CE</option>
            <option>AI</option>
            <option>DS</option>

          </select>
        </div>

        <div>

          <label className="block text-sm font-medium mb-1">
            Semester
          </label>

          <select
            name="semester"
            value={filters.semester}
            onChange={handleChange}
            className="w-full border rounded-lg px-3 py-2"
          >
            <option value="">
              All
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

        </div>

        <div>

          <label className="block text-sm font-medium mb-1">
            Type
          </label>

          <select
            name="examType"
            value={filters.examType}
            onChange={handleChange}
            className="w-full border rounded-lg px-3 py-2"
          >

            <option value="">
              All
            </option>

            <option>Internal</option>
            <option>Mid Semester</option>
            <option>End Semester</option>
            <option>Practical</option>
            <option>Viva</option>

          </select>

        </div>

        <div>

          <label className="block text-sm font-medium mb-1">
            Status
          </label>

          <select
            name="status"
            value={filters.status}
            onChange={handleChange}
            className="w-full border rounded-lg px-3 py-2"
          >

            <option value="">
              All
            </option>

            <option>Scheduled</option>
            <option>Completed</option>
            <option>Cancelled</option>

          </select>

        </div>

      </div>

    </div>
  );
}