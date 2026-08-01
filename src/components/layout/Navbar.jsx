import { logoutUser } from "../../services/auth";

export default function Navbar({ user }) {
  return (
    <header className="bg-white shadow-sm border-b sticky top-0 z-40">

      <div className="px-8 py-5 flex justify-between items-center">

        <div>

          <h1 className="text-3xl font-bold text-gray-800">
            Dashboard
          </h1>

          <p className="text-gray-500 mt-1">
            Welcome back,{" "}
            <span className="font-semibold">
              {user.displayName || user.email}
            </span>
          </p>

        </div>

        <button
          onClick={logoutUser}
          className="bg-black hover:bg-gray-800 text-white px-5 py-3 rounded-xl transition"
        >
          Logout
        </button>

      </div>

    </header>
  );
}