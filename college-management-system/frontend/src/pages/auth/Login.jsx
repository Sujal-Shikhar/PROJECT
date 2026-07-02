import { useState } from "react";
import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";

import api from "../../api/axios";
import { useAuth } from "../../context/AuthContext";

export default function Login() {

  const navigate = useNavigate();

  const { login } = useAuth();

  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  const [loading, setLoading] =
    useState(false);

  const handleChange = (e) => {

    setFormData({
      ...formData,
      [e.target.name]:
        e.target.value,
    });

  };

  const handleSubmit = async (e) => {

    e.preventDefault();

    try {

      setLoading(true);

      const { data } =
        await api.post(
          "/auth/login",
          formData
        );

      login(
        data.token,
        data.user
      );

      toast.success(
        "Login Successful"
      );

      navigate("/");

    } catch (error) {

      toast.error(

        error.response?.data
          ?.message ||
          "Login failed"

      );

    } finally {

      setLoading(false);

    }

  };

  return (

    <div className="min-h-screen flex items-center justify-center bg-gray-100">

      <div className="bg-white shadow-lg rounded-lg p-8 w-full max-w-md">

        <h2 className="text-3xl font-bold text-center mb-8">

          College Management

        </h2>

        <form
          onSubmit={handleSubmit}
          className="space-y-5"
        >

          <input
            type="email"
            name="email"
            placeholder="Email"
            value={formData.email}
            onChange={handleChange}
            className="w-full border rounded-lg p-3"
            required
          />

          <input
            type="password"
            name="password"
            placeholder="Password"
            value={formData.password}
            onChange={handleChange}
            className="w-full border rounded-lg p-3"
            required
          />

          <button
            type="submit"
            disabled={loading}
            className="bg-blue-600 text-white w-full p-3 rounded-lg hover:bg-blue-700"
          >

            {loading
              ? "Logging in..."
              : "Login"}

          </button>

        </form>

      </div>

    </div>

  );

}