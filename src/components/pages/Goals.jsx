import MainLayout from "../components/layout/MainLayout";

export default function Goals({ user }) {
  return (
    <MainLayout user={user}>
      <h1 className="text-3xl font-bold mb-6">
        🎯 Goals
      </h1>

      <div className="bg-white rounded-xl shadow p-6">
        <p className="text-gray-600">
          Your goals will appear here.
        </p>
      </div>
    </MainLayout>
  );
}