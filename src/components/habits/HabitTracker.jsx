import { useEffect, useState } from "react";

import Card from "../ui/Card";
import Button from "../ui/Button";
import Input from "../ui/Input";

import {
  addHabit,
  getHabits,
  deleteHabit,
} from "../../services/firestore";

export default function HabitTracker({ user }) {
  const [habits, setHabits] = useState([]);
  const [newHabit, setNewHabit] = useState("");

  async function loadHabits() {
    const data = await getHabits(user.uid);
    setHabits(data);
  }

  useEffect(() => {
    loadHabits();
  }, []);

  async function handleAdd() {
    if (!newHabit.trim()) return;

    await addHabit(user.uid, newHabit);

    setNewHabit("");

    loadHabits();
  }

  async function handleDelete(id) {
    await deleteHabit(user.uid, id);
    loadHabits();
  }

  return (
    <Card>
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
          Add
        </Button>
      </div>

      {habits.length === 0 ? (
        <div className="text-gray-500">
          No habits yet.
        </div>
      ) : (
        <div className="space-y-4">
          {habits.map((habit) => (
            <div
              key={habit.id}
              className="border rounded-xl p-4 flex justify-between items-center"
            >
              <div>
                <h3 className="font-semibold text-lg">
                  {habit.name}
                </h3>

                <p className="text-gray-500 text-sm">
                  Ready for calendar tracking
                </p>
              </div>

              <Button
                className="bg-red-500 hover:bg-red-600"
                onClick={() => handleDelete(habit.id)}
              >
                Delete
              </Button>
            </div>
          ))}
        </div>
      )}
    </Card>
  );
}