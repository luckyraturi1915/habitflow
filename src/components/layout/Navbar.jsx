import { logoutUser } from "../../services/auth";

export default function Navbar({ user }) {

  return (

    <div className="flex justify-between items-center">

      <div>

        <h1 className="text-3xl font-bold">
          Dashboard
        </h1>

        <p className="text-gray-500">
          Welcome back, {user.displayName}
        </p>

      </div>

      <button
        onClick={logoutUser}
        className="bg-black text-white px-5 py-3 rounded-xl"
      >
        Logout
      </button>

    </div>

  );

}