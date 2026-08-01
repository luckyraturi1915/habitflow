import MainLayout from "../components/layout/MainLayout";
import DashboardCard from "../components/dashboard/DashboardCard";
import HabitTracker from "../components/habits/HabitTracker";

export default function Dashboard({ user }) {
  return (
    <MainLayout user={user}>

      <div className="grid gap-6 md:grid-cols-3">

        <DashboardCard
          icon="🔥"
          title="Current Streak"
          value="12 Days"
          subtitle="Keep it going!"
        />

        <DashboardCard
          icon="✅"
          title="Completion"
          value="84%"
          subtitle="This Month"
        />

        <DashboardCard
          icon="🎯"
          title="Goals"
          value="4"
          subtitle="Active Goals"
        />

      </div>

      <div className="mt-8">

        <HabitTracker user={user} />

      </div>

    </MainLayout>
  );
}