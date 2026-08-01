import { useState } from "react";

export default function ActivityHeatmap({ habits }) {
  const [hoveredDay, setHoveredDay] = useState(null);

  const days = [];

  for (let i = 34; i >= 0; i--) {
    const date = new Date();
    date.setDate(date.getDate() - i);

    const key = date.toISOString().split("T")[0];

    const completed = habits.filter(
      (habit) => habit.completedDays?.[key]
    ).length;

    days.push({
      key,
      completed,
    });
  }

  function getColor(count) {
    if (count === 0) return "bg-gray-200";
    if (count === 1) return "bg-green-200";
    if (count === 2) return "bg-green-400";
    if (count === 3) return "bg-green-600";
    return "bg-green-800";
  }

  return (
    <div className="bg-white rounded-2xl shadow-md border p-6">
      <h2 className="text-xl font-bold mb-6">
        🔥 Activity Heatmap
      </h2>

      <div className="relative">
        <div className="grid grid-cols-7 gap-2">
          {days.map((day) => (
            <div
              key={day.key}
              onMouseEnter={() => setHoveredDay(day)}
              onMouseLeave={() => setHoveredDay(null)}
              className={`w-8 h-8 rounded cursor-pointer transition-transform hover:scale-110 ${getColor(
                day.completed
              )}`}
            />
          ))}
        </div>

        {hoveredDay && (
          <div className="absolute left-0 -top-20 bg-gray-900 text-white text-sm rounded-xl px-4 py-3 shadow-xl z-10 animate-fade">
            <div className="font-semibold">
              📅 {hoveredDay.key}
            </div>

            <div className="mt-1">
              ✅ Completed Habits:{" "}
              <span className="font-bold">
                {hoveredDay.completed}
              </span>
            </div>
          </div>
        )}
      </div>

      <div className="flex items-center gap-3 mt-6 text-sm text-gray-500">
        <span>Less</span>

        <div className="w-4 h-4 rounded bg-gray-200" />
        <div className="w-4 h-4 rounded bg-green-200" />
        <div className="w-4 h-4 rounded bg-green-400" />
        <div className="w-4 h-4 rounded bg-green-600" />
        <div className="w-4 h-4 rounded bg-green-800" />

        <span>More</span>
      </div>
    </div>
  );
}