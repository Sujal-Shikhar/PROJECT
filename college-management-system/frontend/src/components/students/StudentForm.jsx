import { useForm } from "react-hook-form";

export default function StudentForm({
  defaultValues = {},
  onSubmit,
  loading = false,
}) {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    defaultValues,
  });

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className="bg-white rounded-lg shadow p-6 space-y-5"
    >
      <div className="grid md:grid-cols-2 gap-5">

        <div>
          <label className="block mb-1 font-medium">
            Name
          </label>

          <input
            {...register("name", {
              required: "Name is required",
            })}
            className="w-full border rounded-lg p-2"
          />

          <p className="text-red-500 text-sm">
            {errors.name?.message}
          </p>
        </div>

        <div>
          <label className="block mb-1 font-medium">
            Email
          </label>

          <input
            type="email"
            {...register("email", {
              required: "Email is required",
            })}
            className="w-full border rounded-lg p-2"
          />

          <p className="text-red-500 text-sm">
            {errors.email?.message}
          </p>
        </div>

        <div>
          <label className="block mb-1 font-medium">
            Roll Number
          </label>

          <input
            {...register("rollNumber", {
              required: "Roll Number is required",
            })}
            className="w-full border rounded-lg p-2"
          />

          <p className="text-red-500 text-sm">
            {errors.rollNumber?.message}
          </p>
        </div>

        <div>
          <label className="block mb-1 font-medium">
            Admission Number
          </label>

          <input
            {...register("admissionNumber", {
              required: "Admission Number is required",
            })}
            className="w-full border rounded-lg p-2"
          />

          <p className="text-red-500 text-sm">
            {errors.admissionNumber?.message}
          </p>
        </div>

        <div>
          <label className="block mb-1 font-medium">
            Department
          </label>

          <input
            {...register("department", {
              required: "Department is required",
            })}
            className="w-full border rounded-lg p-2"
          />

          <p className="text-red-500 text-sm">
            {errors.department?.message}
          </p>
        </div>

        <div>
          <label className="block mb-1 font-medium">
            Semester
          </label>

          <select
            {...register("semester", {
              required: true,
            })}
            className="w-full border rounded-lg p-2"
          >
            <option value="">Select Semester</option>

            {[1,2,3,4,5,6,7,8].map((sem)=>(
              <option key={sem} value={sem}>
                Semester {sem}
              </option>
            ))}
          </select>
        </div>

        <div>
          <label className="block mb-1 font-medium">
            Section
          </label>

          <select
            {...register("section")}
            className="w-full border rounded-lg p-2"
          >
            <option>A</option>
            <option>B</option>
            <option>C</option>
          </select>
        </div>

        <div>
          <label className="block mb-1 font-medium">
            Batch
          </label>

          <input
            {...register("batch")}
            className="w-full border rounded-lg p-2"
          />
        </div>

      </div>

      <button
        disabled={loading}
        className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded-lg"
      >
        {loading ? "Saving..." : "Save Student"}
      </button>
    </form>
  );
}