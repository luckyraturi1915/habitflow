import MainLayout from "../components/layout/MainLayout";

export default function Backlog({ user }) {
  return (
    <MainLayout user={user}>
      <h1 className="text-3xl font-bold mb-6">
        📝 Backlog
      </h1>

      <div className="bg-white rounded-xl shadow p-6">
        <p className="text-gray-600">
          Your Kanban board will appear here.
        </p>
      </div>
    </MainLayout>
  );
}