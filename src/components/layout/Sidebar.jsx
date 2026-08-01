export default function Sidebar() {

  const menus = [
    "🏠 Dashboard",
    "📅 Habits",
    "📝 Backlog",
    "🎯 Goals",
    "📈 Analytics",
    "⚙️ Settings",
  ];

  return (
    <aside className="w-64 bg-white border-r min-h-screen p-6">

      <h1 className="text-3xl font-bold mb-10">
        HabitFlow
      </h1>

      <div className="space-y-3">

        {menus.map((menu) => (

          <button
            key={menu}
            className="w-full text-left p-3 rounded-xl hover:bg-gray-100"
          >
            {menu}
          </button>

        ))}

      </div>

    </aside>
  );
}