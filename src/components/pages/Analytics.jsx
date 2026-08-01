import MainLayout from "../components/layout/MainLayout";

export default function Analytics({ user }) {
  return (
    <MainLayout user={user}>
      <h1 className="text-3xl font-bold mb-6">
        📊 Analytics
      </h1>

      <div className="bg-white rounded-xl shadow p-6">
        <p className="text-gray-600">
          Analytics dashboard coming soon.
        </p>
      </div>
    </MainLayout>
  );
}