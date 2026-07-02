import {
  useAuth,
} from "../../context/AuthContext";

export default function Navbar() {

  const { user } = useAuth();

  return (

    <header className="bg-white shadow px-8 py-4 flex justify-between items-center">

      <h1 className="text-2xl font-semibold">
        College Management System
      </h1>

      <div className="text-right">

        <p className="font-semibold">

          {user?.name}

        </p>

        <p className="text-sm text-gray-500 capitalize">

          {user?.role}

        </p>

      </div>

    </header>

  );

}