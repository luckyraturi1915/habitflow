import MainLayout from "../components/layout/MainLayout";
import HabitTracker from "../components/habits/HabitTracker";

export default function Habits({ user }) {
  return (
    <MainLayout user={user}>

      <h1 className="text-3xl font-bold mb-6">
        📅 Habit Tracker
      </h1>

      <HabitTracker user={user} />

    </MainLayout>
  );
}