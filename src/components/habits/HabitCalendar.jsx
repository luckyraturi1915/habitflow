export default function HabitCalendar({ habit, onToggle }) {
  const daysInMonth = new Date(
    new Date().getFullYear(),
    new Date().getMonth() + 1,
    0
  ).getDate();

  const currentYear = new Date().getFullYear();
  const currentMonth = String(new Date().getMonth() + 1).padStart(2, "0");

  const days = Array.from({ length: daysInMonth }, (_, i) => i + 1);

  return (
    <div className="mt-4">
      <div className="grid grid-cols-7 gap-2">
        {days.map((day) => {
          const dayKey = `${currentYear}-${currentMonth}-${String(day).padStart(
            2,
            "0"
          )}`;

          const completed = habit.completedDays?.[dayKey];

          return (
            <button
              key={day}
              onClick={() => onToggle(dayKey)}
              className={`
                h-10
                rounded-lg
                transition
                font-semibold
                ${
                  completed
                    ? "bg-green-500 text-white"
                    : "bg-gray-200 hover:bg-gray-300"
                }
              `}
            >
              {day}
            </button>
          );
        })}
      </div>
    </div>
  );
}