import Button from "../ui/Button";
import HabitCalendar from "./HabitCalendar";

import {
  getCompletionPercentage,
  getCurrentStreak,
} from "../../utils/streak";

export default function HabitCard({
  habit,
  onDelete,
  onToggle,
}) {
  const completion = getCompletionPercentage(
    habit.completedDays
  );

  const streak = getCurrentStreak(
    habit.completedDays
  );

  return (
    <div className="bg-white rounded-2xl shadow-md border p-6 hover:shadow-lg transition">

      <div className="flex justify-between items-start">

        <div>

          <div className="flex items-center gap-3">

            <div
              className="w-4 h-4 rounded-full"
              style={{
                backgroundColor:
                  habit.color || "#22c55e",
              }}
            />

            <span className="text-sm text-gray-500">
              Habit
            </span>

          </div>

          <h3 className="text-2xl font-bold mt-2">
            {habit.name}
          </h3>

        </div>

        <Button
          className="bg-red-500 hover:bg-red-600"
          onClick={() => onDelete(habit.id)}
        >
          Delete
        </Button>

      </div>

      <div className="mt-6">

        <div className="flex justify-between mb-2">

          <span className="text-sm font-medium">
            Progress
          </span>

          <span className="font-semibold">
            {completion}%
          </span>

        </div>

        <div className="h-3 bg-gray-200 rounded-full overflow-hidden">

          <div
            className="h-full rounded-full"
            style={{
              width: `${completion}%`,
              backgroundColor:
                habit.color || "#22c55e",
            }}
          />

        </div>

      </div>

      <div className="flex gap-4 mt-6">

        <div className="bg-gray-100 rounded-xl px-4 py-2">

          🔥 {streak} Day Streak

        </div>

        <div className="bg-gray-100 rounded-xl px-4 py-2">

          📊 {completion}% Complete

        </div>

      </div>

      <div className="mt-6">

        <HabitCalendar
          habit={habit}
          onToggle={(day) => onToggle(habit, day)}
        />

      </div>

    </div>
  );
}