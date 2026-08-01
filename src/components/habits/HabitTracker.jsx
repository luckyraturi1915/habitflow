import { useEffect, useMemo, useState } from "react";

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
  "All",
  "Personal",
  "Fitness",
  "Study",
  "Work",
  "Health",
  "Reading",
  "Finance",
  "Hobby",
];

export default function HabitTracker({ user }) {
  const [habits, setHabits] = useState([]);
  const [newHabit, setNewHabit] = useState("");
  const [category, setCategory] = useState("Personal");
  const [color, setColor] = useState("#22c55e");
  const [search, setSearch] = useState("");
  const [filterCategory, setFilterCategory] = useState("All");

  const [saving, setSaving] = useState(false);
  const [error, setError] = useState("");

  useEffect(() => {
    if (!user) return;

    return subscribeToHabits(user.uid, setHabits);
  }, [user]);

  async function handleAdd() {
    const habitName = newHabit.trim();

    if (!habitName) {
      setError("Please enter a habit name.");
      return;
    }

    const duplicate = habits.some(
      (habit) =>
        habit.name.toLowerCase() === habitName.toLowerCase()
    );

    if (duplicate) {
      setError("A habit with this name already exists.");
      return;
    }

    try {
      setSaving(true);
      setError("");

      await addHabit(
        user.uid,
        habitName,
        category,
        color
      );

      setNewHabit("");
      setCategory("Personal");
      setColor("#22c55e");
    } finally {
      setSaving(false);
    }
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

  const filteredHabits = useMemo(() => {
    return habits.filter((habit) => {
      const matchesSearch = habit.name
        .toLowerCase()
        .includes(search.toLowerCase());

      const matchesCategory =
        filterCategory === "All" ||
        (habit.category || "Personal") ===
          filterCategory;

      return matchesSearch && matchesCategory;
    });
  }, [habits, search, filterCategory]);

  return (
    <Card className="mt-8">
      <h2 className="text-2xl font-bold mb-6">
        📅 Monthly Habits
      </h2>

      <div className="grid md:grid-cols-4 gap-3 mb-3">
        <Input
          value={newHabit}
          onChange={(e) => {
            setNewHabit(e.target.value);
            if (error) setError("");
          }}
          onKeyDown={(e) => {
            if (e.key === "Enter") {
              handleAdd();
            }
          }}
          placeholder="Habit name..."
        />

        <select
          className="border rounded-xl px-4 py-3"
          value={category}
          onChange={(e) => setCategory(e.target.value)}
        >
          {categories
            .filter((c) => c !== "All")
            .map((c) => (
              <option key={c}>
                {c}
              </option>
            ))}
        </select>

        <input
          type="color"
          value={color}
          onChange={(e) => setColor(e.target.value)}
          className="w-full h-12 rounded-xl border cursor-pointer"
        />

        <Button
          onClick={handleAdd}
          disabled={saving}
        >
          {saving ? "Adding..." : "Add Habit"}
        </Button>
      </div>

      {error && (
        <p className="text-red-500 text-sm mb-6">
          {error}
        </p>
      )}

      <div className="grid md:grid-cols-2 gap-4 mb-8">
        <Input
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          placeholder="🔍 Search habits..."
        />

        <select
          className="border rounded-xl px-4 py-3"
          value={filterCategory}
          onChange={(e) =>
            setFilterCategory(e.target.value)
          }
        >
          {categories.map((c) => (
            <option key={c}>
              {c}
            </option>
          ))}
        </select>
      </div>

      {filteredHabits.length === 0 ? (
        <div className="text-center py-10 text-gray-500">
          No habits found.
        </div>
      ) : (
        <div className="space-y-6">
          {filteredHabits.map((habit) => (
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