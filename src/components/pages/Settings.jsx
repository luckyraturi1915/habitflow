import MainLayout from "../components/layout/MainLayout";

export default function Settings({ user }) {
  return (
    <MainLayout user={user}>
      <h1 className="text-3xl font-bold mb-6">
        ⚙️ Settings
      </h1>

      <div className="bg-white rounded-xl shadow p-6">
        <p className="text-gray-600">
          Settings page coming soon.
        </p>
      </div>
    </MainLayout>
  );
}