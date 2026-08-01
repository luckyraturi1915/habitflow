import { useEffect, useState } from "react";

import Card from "../ui/Card";
import Button from "../ui/Button";
import Input from "../ui/Input";
import HabitCard from "./HabitCard";

import {
  addHabit,
  deleteHabit,
  updateHabit,
  subscribeToHabits,
} from "../../services/firestore";

const categories = [
  "Personal",
  "Fitness",
  "Study",
  "Work",
  "Health",
  "Reading",
  "Finance",
  "Hobby",
];

const colors = [
  "#22c55e",
  "#3b82f6",
  "#a855f7",
  "#f97316",
  "#ef4444",
  "#06b6d4",
  "#eab308",
  "#ec4899",
];

export default function HabitTracker({ user }) {
  const [habits, setHabits] = useState([]);
  const [newHabit, setNewHabit] = useState("");
  const [category, setCategory] = useState("Personal");
  const [color, setColor] = useState("#22c55e");

  useEffect(() => {
    if (!user) return;

    const unsubscribe = subscribeToHabits(user.uid, setHabits);

    return unsubscribe;
  }, [user]);

  async function handleAdd() {
    if (!newHabit.trim()) return;

    await addHabit(
      user.uid,
      newHabit,
      category,
      color
    );

    setNewHabit("");
    setCategory("Personal");
    setColor("#22c55e");
  }

  async function handleDelete(id) {
    await deleteHabit(user.uid, id);
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
  }

  return (
    <Card className="mt-8">
      <h2 className="text-2xl font-bold mb-6">
        📅 Monthly Habits
      </h2>

      <div className="grid md:grid-cols-4 gap-3 mb-8">
        <Input
          value={newHabit}
          onChange={(e) => setNewHabit(e.target.value)}
          placeholder="Habit name..."
        />

        <select
          value={category}
          onChange={(e) => setCategory(e.target.value)}
          className="border rounded-xl px-4 py-3"
        >
          {categories.map((item) => (
            <option key={item}>
              {item}
            </option>
          ))}
        </select>

        <input
          type="color"
          value={color}
          onChange={(e) => setColor(e.target.value)}
          className="w-full h-12 rounded-xl border cursor-pointer"
        />

        <Button onClick={handleAdd}>
          Add Habit
        </Button>
      </div>

      {habits.length === 0 ? (
        <div className="text-center py-10 text-gray-500">
          No habits yet.
        </div>
      ) : (
        <div className="space-y-6">
          {habits.map((habit) => (
            <HabitCard
              key={habit.id}
              habit={habit}
              onDelete={handleDelete}
              onToggle={toggleDay}
            />
          ))}
        </div>
      )}
    </Card>
  );
}