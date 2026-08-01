import { useEffect, useState } from "react";

import DashboardCard from "./DashboardCard";
import { subscribeToHabits } from "../../services/firestore";

export default function QuickStats({ user }) {
  const [stats, setStats] = useState({
    totalHabits: 0,
    completedToday: 0,
    completion: 0,
    streak: 0,
  });

  useEffect(() => {
    if (!user) return;

    const unsubscribe = subscribeToHabits(user.uid, (habits) => {
      const today = new Date().toISOString().split("T")[0];

      const totalHabits = habits.length;

      const completedToday = habits.filter(
        (habit) => habit.completedDays?.[today]
      ).length;

      const completion =
        totalHabits === 0
          ? 0
          : Math.round((completedToday / totalHabits) * 100);

      // Temporary placeholder.
      // We'll replace this with a real streak calculation in Sprint 5.2.
      const streak = completedToday;

      setStats({
        totalHabits,
        completedToday,
        completion,
        streak,
      });
    });

    return () => unsubscribe();
  }, [user]);

  return (
    <div className="grid gap-6 md:grid-cols-4">
      <DashboardCard
        icon="🔥"
        title="Current Streak"
        value={stats.streak}
        subtitle="Days"
      />

      <DashboardCard
        icon="✅"
        title="Completion"
        value={`${stats.completion}%`}
        subtitle="Today"
      />

      <DashboardCard
        icon="📅"
        title="Completed Today"
        value={stats.completedToday}
        subtitle="Habits"
      />

      <DashboardCard
        icon="🎯"
        title="Total Habits"
        value={stats.totalHabits}
        subtitle="Active"
      />
    </div>
  );
}