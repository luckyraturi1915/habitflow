import { useEffect, useState } from "react";

import MainLayout from "../components/layout/MainLayout";
import Card from "../components/ui/Card";
import Input from "../components/ui/Input";
import Button from "../components/ui/Button";
import GoalCard from "../components/goals/GoalCard";

import {
  addGoal,
  deleteGoal,
  subscribeToGoals,
} from "../services/goals";

export default function Goals({ user }) {
  const [goals, setGoals] = useState([]);
  const [newGoal, setNewGoal] = useState("");
  const [dueDate, setDueDate] = useState("");

  useEffect(() => {
    if (!user) return;

    return subscribeToGoals(user.uid, setGoals);
  }, [user]);

  async function handleAdd() {
    if (!newGoal.trim()) return;

    await addGoal(
      user.uid,
      newGoal,
      dueDate
    );

    setNewGoal("");
    setDueDate("");
  }

  async function handleDelete(goalId) {
    await deleteGoal(user.uid, goalId);
  }

  return (
    <MainLayout user={user}>
      <h1 className="text-3xl font-bold mb-8">
        🎯 Goals
      </h1>

      <Card className="mb-8">
        <div className="grid md:grid-cols-3 gap-3">
          <Input
            value={newGoal}
            onChange={(e) =>
              setNewGoal(e.target.value)
            }
            placeholder="Enter a goal..."
            onKeyDown={(e) => {
              if (e.key === "Enter") {
                handleAdd();
              }
            }}
          />

          <input
            type="date"
            value={dueDate}
            onChange={(e) =>
              setDueDate(e.target.value)
            }
            className="border border-gray-300 rounded-xl px-4 py-2"
          />

          <Button onClick={handleAdd}>
            Add Goal
          </Button>
        </div>
      </Card>

      {goals.length === 0 ? (
        <Card>
          <div className="text-center py-10 text-gray-500">
            No goals yet.
          </div>
        </Card>
      ) : (
        <div className="space-y-6">
          {goals.map((goal) => (
            <GoalCard
              key={goal.id}
              goal={goal}
              onDelete={handleDelete}
            />
          ))}
        </div>
      )}
    </MainLayout>
  );
}