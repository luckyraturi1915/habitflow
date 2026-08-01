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

export default function HabitTracker({ user }) {
  const [habits, setHabits] = useState([]);
  const [newHabit, setNewHabit] = useState("");

  useEffect(() => {
    if (!user) return;

    const unsubscribe = subscribeToHabits(
      user.uid,
      setHabits
    );

    return unsubscribe;
  }, [user]);

  async function handleAdd() {
    if (!newHabit.trim()) return;

    await addHabit(user.uid, newHabit);

    setNewHabit("");
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

      <div className="flex justify-between items-center mb-6">

        <h2 className="text-2xl font-bold">
          📅 Monthly Habits
        </h2>

      </div>

      <div className="flex gap-3 mb-8">

        <Input
          value={newHabit}
          onChange={(e) =>
            setNewHabit(e.target.value)
          }
          placeholder="Add a new habit..."
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