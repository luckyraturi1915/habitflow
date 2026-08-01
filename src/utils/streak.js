export function getCompletionPercentage(completedDays = {}) {
  const totalCompleted = Object.keys(completedDays).length;

  const now = new Date();

  const daysInMonth = new Date(
    now.getFullYear(),
    now.getMonth() + 1,
    0
  ).getDate();

  if (daysInMonth === 0) return 0;

  return Math.round((totalCompleted / daysInMonth) * 100);
}

export function getCurrentStreak(completedDays = {}) {
  let streak = 0;

  const today = new Date();

  while (true) {
    const key = today.toISOString().slice(0, 10);

    if (completedDays[key]) {
      streak++;
      today.setDate(today.getDate() - 1);
    } else {
      break;
    }
  }

  return streak;
}