import {
  FaHome,
  FaCheckCircle,
  FaClipboardList,
  FaBullseye,
  FaChartLine,
  FaCog,
} from "react-icons/fa";

import { NavLink } from "react-router-dom";

export default function Sidebar() {
  const menu = [
    {
      icon: <FaHome />,
      label: "Dashboard",
      path: "/",
    },
    {
      icon: <FaCheckCircle />,
      label: "Habits",
      path: "/habits",
    },
    {
      icon: <FaClipboardList />,
      label: "Backlog",
      path: "/backlog",
    },
    {
      icon: <FaBullseye />,
      label: "Goals",
      path: "/goals",
    },
    {
      icon: <FaChartLine />,
      label: "Analytics",
      path: "/analytics",
    },
    {
      icon: <FaCog />,
      label: "Settings",
      path: "/settings",
    },
  ];

  return (
    <aside className="w-64 bg-white shadow-lg border-r min-h-screen">
      <div className="p-8">
        <h1 className="text-3xl font-bold text-blue-600">
          HabitFlow
        </h1>

        <p className="text-gray-500 mt-2">
          Productivity Hub
        </p>
      </div>

      <nav className="px-4">
        {menu.map((item) => (
          <NavLink
            key={item.label}
            to={item.path}
            className={({ isActive }) =>
              `flex items-center gap-4 px-4 py-4 rounded-xl mb-2 transition ${
                isActive
                  ? "bg-blue-600 text-white"
                  : "hover:bg-blue-50 hover:text-blue-600"
              }`
            }
          >
            <span className="text-lg">{item.icon}</span>

            <span className="font-medium">
              {item.label}
            </span>
          </NavLink>
        ))}
      </nav>
    </aside>
  );
}