import Sidebar from "./Sidebar";
import Navbar from "./Navbar";

export default function MainLayout({ user, children }) {
  return (
    <div className="min-h-screen flex bg-gray-100">

      <Sidebar />

      <div className="flex-1 flex flex-col">

        <Navbar user={user} />

        <main className="flex-1 p-8">
          {children}
        </main>

      </div>

    </div>
  );
}