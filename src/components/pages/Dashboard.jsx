import MainLayout from "../components/layout/MainLayout";

import QuickStats from "../components/dashboard/QuickStats";
import HabitTracker from "../components/habits/HabitTracker";

export default function Dashboard({ user }) {
  return (
    <MainLayout user={user}>

      <QuickStats user={user} />

      <div className="mt-8">

        <HabitTracker user={user} />

      </div>

    </MainLayout>
  );
}