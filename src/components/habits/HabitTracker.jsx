import { useEffect, useState } from "react";

import Card from "../ui/Card";
import Button from "../ui/Button";
import Input from "../ui/Input";
import HabitCalendar from "./HabitCalendar";

import {
  addHabit,
  getHabits,
  deleteHabit,
  updateHabit,
} from "../../services/firestore";

import {
  getCompletionPercentage,
  getCurrentStreak,
} from "../../utils/streak";

export default function HabitTracker({ user }) {
  const [habits, setHabits] = useState([]);
  const [newHabit, setNewHabit] = useState("");

  useEffect(() => {
    loadHabits();
  }, []);

  async function loadHabits() {
    const data = await getHabits(user.uid);
    setHabits(data);
  }

  async function handleAdd() {
    if (!newHabit.trim()) return;

    await addHabit(user.uid, newHabit);

    setNewHabit("");

    loadHabits();
  }

  async function handleDelete(habitId) {
    await deleteHabit(user.uid, habitId);
    loadHabits();
  }

  async function toggleDay(habit, dayKey) {
    const completedDays = {
      ...(habit.completedDays || {}),
    };

    if (completedDays[dayKey]) {
      delete completedDays[dayKey];
    } else {
      completedDays[dayKey] = true;
    }

    await updateHabit(user.uid, habit.id, {
      completedDays,
    });

    loadHabits();
  }

  return (
    <Card className="mt-8">
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-2xl font-bold">
          📅 Monthly Habits
        </h2>
      </div>

      <div className="flex gap-3 mb-8">
        <Input
          value={newHabit}
          onChange={(e) => setNewHabit(e.target.value)}
          placeholder="Add a new habit..."
        />

        <Button onClick={handleAdd}>
          Add Habit
        </Button>
      </div>

      {habits.length === 0 ? (
        <div className="text-center text-gray-500 py-10">
          No habits yet. Add your first habit above.
        </div>
      ) : (
        <div className="space-y-6">
          {habits.map((habit) => (
            <div
              key={habit.id}
              className="bg-gray-50 rounded-2xl border border-gray-200 p-6"
            >
              <div className="flex justify-between items-start gap-4">

                <div className="flex-1">

                  <div className="flex items-center justify-between">

                    <h3 className="text-xl font-bold">
                      {habit.name}
                    </h3>

                    <Button
                      className="bg-red-500 hover:bg-red-600"
                      onClick={() => handleDelete(habit.id)}
                    >
                      Delete
                    </Button>

                  </div>

                  <div className="flex gap-6 mt-4 mb-5 text-sm">

                    <div className="bg-white px-4 py-2 rounded-xl shadow-sm">
                      🔥
                      <span className="font-semibold ml-2">
                        {getCurrentStreak(habit.completedDays)} Day Streak
                      </span>
                    </div>

                    <div className="bg-white px-4 py-2 rounded-xl shadow-sm">
                      📊
                      <span className="font-semibold ml-2">
                        {getCompletionPercentage(habit.completedDays)}%
                        Complete
                      </span>
                    </div>

                  </div>

                  <HabitCalendar
                    habit={habit}
                    onToggle={(dayKey) =>
                      toggleDay(habit, dayKey)
                    }
                  />

                </div>

              </div>
            </div>
          ))}
        </div>
      )}
    </Card>
  );
}