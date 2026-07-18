import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";

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

const designations = [
  "Professor",
  "Associate Professor",
  "Assistant Professor",
  "HOD",
  "Lecturer",
  "Lab Assistant",
];

const genders = ["Male", "Female", "Other"];

const bloodGroups = [
  "A+",
  "A-",
  "B+",
  "B-",
  "AB+",
  "AB-",
  "O+",
  "O-",
];

const maritalStatus = ["Single", "Married"];

export default function FacultyForm({
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

  const [preview, setPreview] = useState("");

  useEffect(() => {
    if (defaultValues?.profileImage?.url) {
      setPreview(defaultValues.profileImage.url);
    }
  }, [defaultValues]);

  const imageChange = (e) => {
    const file = e.target.files[0];

    if (!file) return;

    setPreview(URL.createObjectURL(file));
  };

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className="bg-white shadow rounded-xl p-6 space-y-8"
    >
      {/* Profile Image */}

      <div>
        <label className="block mb-2 font-semibold">
          Profile Image
        </label>

        {preview && (
          <img
            src={preview}
            alt="Preview"
            className="w-28 h-28 rounded-full object-cover mb-4"
          />
        )}

        <input
          type="file"
          accept="image/*"
          {...register("profileImage")}
          onChange={imageChange}
        />
      </div>

      {/* Basic Information */}

      <div>
        <h2 className="text-xl font-bold mb-4">
          Basic Information
        </h2>

        <div className="grid md:grid-cols-2 gap-5">
          <Input
            label="Faculty Name"
            name="name"
            register={register}
            errors={errors}
            required
          />

          <Input
            label="Employee ID"
            name="employeeId"
            register={register}
            errors={errors}
            required
          />

          <Input
            label="Email"
            name="email"
            type="email"
            register={register}
            errors={errors}
            required
          />

          <Input
            label="Phone"
            name="phone"
            register={register}
            errors={errors}
            required
          />
        </div>
      </div>

      {/* Professional */}

      <div>
        <h2 className="text-xl font-bold mb-4">
          Professional Details
        </h2>

        <div className="grid md:grid-cols-2 gap-5">
          <Select
            label="Department"
            name="department"
            options={departments}
            register={register}
          />

          <Select
            label="Designation"
            name="designation"
            options={designations}
            register={register}
          />

          <Input
            label="Qualification"
            name="qualification"
            register={register}
            errors={errors}
            required
          />

          <Input
            label="Experience"
            name="experience"
            type="number"
            register={register}
            errors={errors}
          />

          <Input
            label="Specialization"
            name="specialization"
            register={register}
            errors={errors}
          />

          <Input
            label="Joining Date"
            name="joiningDate"
            type="date"
            register={register}
            errors={errors}
          />

          <Input
            label="Salary"
            name="salary"
            type="number"
            register={register}
            errors={errors}
          />
        </div>
      </div>

      {/* Personal */}

      <div>
        <h2 className="text-xl font-bold mb-4">
          Personal Details
        </h2>

        <div className="grid md:grid-cols-2 gap-5">
          <Select
            label="Gender"
            name="gender"
            options={genders}
            register={register}
          />

          <Input
            label="Date of Birth"
            name="dob"
            type="date"
            register={register}
            errors={errors}
          />

          <Select
            label="Blood Group"
            name="bloodGroup"
            options={bloodGroups}
            register={register}
          />

          <Select
            label="Marital Status"
            name="maritalStatus"
            options={maritalStatus}
            register={register}
          />
        </div>
      </div>

      {/* Address */}

      <div>
        <h2 className="text-xl font-bold mb-4">
          Address
        </h2>

        <div className="grid md:grid-cols-2 gap-5">
          <Input
            label="Street"
            name="address.street"
            register={register}
            errors={errors}
          />

          <Input
            label="City"
            name="address.city"
            register={register}
            errors={errors}
          />

          <Input
            label="District"
            name="address.district"
            register={register}
            errors={errors}
          />

          <Input
            label="State"
            name="address.state"
            register={register}
            errors={errors}
          />

          <Input
            label="Pincode"
            name="address.pincode"
            register={register}
            errors={errors}
          />

          <Input
            label="Country"
            name="address.country"
            register={register}
            errors={errors}
          />
        </div>
      </div>

      <button
        type="submit"
        disabled={loading}
        className="bg-blue-600 hover:bg-blue-700 text-white px-8 py-3 rounded-lg disabled:opacity-50"
      >
        {loading ? "Saving..." : "Save Faculty"}
      </button>
    </form>
  );
}

function Input({
  label,
  name,
  register,
  errors = {},
  required = false,
  type = "text",
}) {
  const getNestedError = (obj, path) => {
    return path.split(".").reduce((acc, key) => acc?.[key], obj);
  };

  const error = getNestedError(errors, name);

  return (
    <div>
      <label className="block mb-1 font-medium">
        {label}
      </label>

      <input
        type={type}
        {...register(name, {
          required: required ? `${label} is required` : false,
        })}
        className="w-full border rounded-lg p-2"
      />

      {error && (
        <p className="text-red-500 text-sm mt-1">
          {error.message}
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

        {options.map((option) => (
          <option
            key={option}
            value={option}
          >
            {option}
          </option>
        ))}
      </select>
    </div>
  );
}