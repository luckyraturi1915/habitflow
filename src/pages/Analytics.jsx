import { useEffect, useState } from "react";

import MainLayout from "../components/layout/MainLayout";

import { subscribeToHabits } from "../services/firestore";
import { calculateAnalytics } from "../utils/analytics";

export default function Analytics({ user }) {
  const [stats, setStats] = useState({
    totalHabits: 0,
    completedToday: 0,
    monthlyCompletion: 0,
    longestStreak: 0,
    bestHabit: "No habits yet",
  });

  useEffect(() => {
    if (!user) return;

    return subscribeToHabits(user.uid, (habits) => {
      setStats(calculateAnalytics(habits));
    });
  }, [user]);

  const cards = [
    {
      title: "Total Habits",
      value: stats.totalHabits,
      icon: "📋",
      color: "bg-blue-500",
    },
    {
      title: "Completed Today",
      value: stats.completedToday,
      icon: "📅",
      color: "bg-green-500",
    },
    {
      title: "Monthly Completion",
      value: `${stats.monthlyCompletion}%`,
      icon: "📊",
      color: "bg-purple-500",
    },
    {
      title: "Longest Streak",
      value: `${stats.longestStreak} Days`,
      icon: "🔥",
      color: "bg-orange-500",
    },
    {
      title: "Best Habit",
      value: stats.bestHabit,
      icon: "⭐",
      color: "bg-pink-500",
    },
  ];

  return (
    <MainLayout user={user}>
      <h1 className="text-3xl font-bold mb-8">
        📈 Analytics Dashboard
      </h1>

      <div className="grid gap-6 md:grid-cols-2 xl:grid-cols-3">
        {cards.map((card) => (
          <div
            key={card.title}
            className="bg-white rounded-2xl shadow-md border p-6 hover:shadow-xl transition"
          >
            <div
              className={`w-14 h-14 rounded-xl flex items-center justify-center text-3xl text-white ${card.color}`}
            >
              {card.icon}
            </div>

            <h2 className="mt-5 text-lg text-gray-500">
              {card.title}
            </h2>

            <p className="mt-2 text-3xl font-bold break-words">
              {card.value}
            </p>
          </div>
        ))}
      </div>
    </MainLayout>
  );
}