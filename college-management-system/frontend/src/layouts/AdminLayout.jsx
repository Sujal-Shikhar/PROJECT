import Sidebar from "../components/layout/Sidebar";
import Navbar from "../components/layout/Navbar";

export default function AdminLayout({

  children,

}) {

  return (

    <div className="flex">

      <Sidebar />

      <div className="flex-1 bg-gray-100 min-h-screen">

        <Navbar />

        <main className="p-8">

          {children}

        </main>

      </div>

    </div>

  );

}