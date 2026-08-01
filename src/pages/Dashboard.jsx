import Sidebar from "../components/layout/Sidebar";
import Navbar from "../components/layout/Navbar";
import DashboardCard from "../components/dashboard/DashboardCard";
import HabitTracker from "../components/habits/HabitTracker";

export default function Dashboard({ user }) {
  return (
    <div className="flex bg-gray-100 min-h-screen">
      <Sidebar />

      <main className="flex-1 p-8">
        <Navbar user={user} />

        <div className="grid md:grid-cols-3 gap-6 mt-8">
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
            subtitle="Active"
          />
        </div>

        <div className="mt-8">
          <HabitTracker user={user} />
        </div>
      </main>
    </div>
  );
}