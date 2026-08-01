import {
  FaChartLine,
  FaCheckCircle,
  FaClipboardList,
  FaCog,
  FaHome,
  FaBullseye,
} from "react-icons/fa";

export default function Sidebar() {
  const menu = [
    {
      icon: <FaHome />,
      label: "Dashboard",
    },
    {
      icon: <FaCheckCircle />,
      label: "Habits",
    },
    {
      icon: <FaClipboardList />,
      label: "Backlog",
    },
    {
      icon: <FaBullseye />,
      label: "Goals",
    },
    {
      icon: <FaChartLine />,
      label: "Analytics",
    },
    {
      icon: <FaCog />,
      label: "Settings",
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
          <button
            key={item.label}
            className="w-full flex items-center gap-4 px-4 py-4 rounded-xl text-left hover:bg-blue-50 hover:text-blue-600 transition mb-2"
          >
            <span className="text-lg">
              {item.icon}
            </span>

            <span className="font-medium">
              {item.label}
            </span>
          </button>
        ))}

      </nav>

    </aside>
  );
}