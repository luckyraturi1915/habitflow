export function calculateAnalytics(habits) {
  const today = new Date().toISOString().split("T")[0];

  let completedToday = 0;
  let totalHabits = habits.length;
  let totalCompletion = 0;

  let bestHabit = null;
  let bestCompletion = -1;

  let longestStreak = 0;

  habits.forEach((habit) => {
    const completedDays = habit.completedDays || {};

    if (completedDays[today]) {
      completedToday++;
    }

    const completedCount = Object.keys(completedDays).length;

    totalCompletion += completedCount;

    if (completedCount > bestCompletion) {
      bestCompletion = completedCount;
      bestHabit = habit.name;
    }

    let streak = 0;
    let current = new Date();

    while (true) {
      const key = current.toISOString().split("T")[0];

      if (completedDays[key]) {
        streak++;
        current.setDate(current.getDate() - 1);
      } else {
        break;
      }
    }

    if (streak > longestStreak) {
      longestStreak = streak;
    }
  });

  const daysThisMonth = new Date().getDate();

  const maxPossible = totalHabits * daysThisMonth;

  const monthlyCompletion =
    maxPossible === 0
      ? 0
      : Math.round((totalCompletion / maxPossible) * 100);

  return {
    totalHabits,
    completedToday,
    monthlyCompletion,
    longestStreak,
    bestHabit: bestHabit || "No habits yet",
  };
}