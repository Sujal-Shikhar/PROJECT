import { useForm } from "react-hook-form";
import { useEffect, useState } from "react";

import { getFaculty } from "../../api/facultyApi";

const departments = [
  "CSE",
  "IT",
  "ECE",
  "EEE",
  "ME",
  "CE",
  "AI",
  "DS",
];

const subjectTypes = [
  "Theory",
  "Lab",
  "Elective",
];

export default function SubjectForm({
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

  const [faculty, setFaculty] =
    useState([]);

  useEffect(() => {
    loadFaculty();
  }, []);

  const loadFaculty = async () => {
    try {
      const data =
        await getFaculty({
          limit: 500,
        });

      setFaculty(data.faculty);
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className="bg-white rounded-xl shadow p-6 space-y-8"
    >
      {/* BASIC */}

      <div>

        <h2 className="text-xl font-bold mb-4">
          Subject Information
        </h2>

        <div className="grid md:grid-cols-2 gap-5">

          <Input
            label="Subject Name"
            name="name"
            register={register}
            errors={errors}
            required
          />

          <Input
            label="Subject Code"
            name="code"
            register={register}
            errors={errors}
            required
          />

          <Select
            label="Department"
            name="department"
            options={departments}
            register={register}
            required
          />

          <Input
            label="Semester"
            name="semester"
            type="number"
            register={register}
            errors={errors}
            required
          />

          <Input
            label="Credits"
            name="credits"
            type="number"
            register={register}
            errors={errors}
            required
          />

          <Select
            label="Type"
            name="type"
            options={subjectTypes}
            register={register}
          />

        </div>

      </div>

      {/* FACULTY */}

      <div>

        <h2 className="text-xl font-bold mb-4">
          Faculty Assignment
        </h2>

        <div>

          <label className="block mb-1 font-medium">
            Faculty
          </label>

          <select
            {...register("faculty")}
            className="w-full border rounded-lg p-2"
          >
            <option value="">
              Not Assigned
            </option>

            {faculty.map((f) => (
              <option
                key={f._id}
                value={f._id}
              >
                {f.name} ({f.employeeId})
              </option>
            ))}

          </select>

        </div>

      </div>

      <button
        disabled={loading}
        className="bg-blue-600 hover:bg-blue-700 text-white px-8 py-3 rounded-lg"
      >
        {loading
          ? "Saving..."
          : "Save Subject"}
      </button>

    </form>
  );
}

function Input({
  label,
  name,
  register,
  errors,
  required,
  type = "text",
}) {
  return (
    <div>

      <label className="block mb-1 font-medium">
        {label}
      </label>

      <input
        type={type}
        {...register(name, {
          required: required
            ? `${label} is required`
            : false,
        })}
        className="w-full border rounded-lg p-2"
      />

      {errors[name] && (
        <p className="text-red-500 text-sm">
          {errors[name].message}
        </p>
      )}

    </div>
  );
}

function Select({
  label,
  name,
  options,
  register,
}) {
  return (
    <div>

      <label className="block mb-1 font-medium">
        {label}
      </label>

      <select
        {...register(name)}
        className="w-full border rounded-lg p-2"
      >
        <option value="">
          Select {label}
        </option>

        {options.map((item) => (
          <option
            key={item}
            value={item}
          >
            {item}
          </option>
        ))}

      </select>

    </div>
  );
}