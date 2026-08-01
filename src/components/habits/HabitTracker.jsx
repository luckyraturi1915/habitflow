import { useEffect, useState } from "react";
import { addHabit, getHabits } from "../../services/firestore";

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

  return (
    <div className="card">
      <h2>📅 Monthly Habits</h2>

      <div style={{ marginTop: 20 }}>
        <input
          value={newHabit}
          onChange={(e) => setNewHabit(e.target.value)}
          placeholder="New Habit"
        />

        <button onClick={handleAdd}>
          Add
        </button>
      </div>

      <ul style={{ marginTop: 20 }}>
        {habits.map((habit) => (
          <li key={habit.id}>
            {habit.name}
          </li>
        ))}
      </ul>
    </div>
  );
}