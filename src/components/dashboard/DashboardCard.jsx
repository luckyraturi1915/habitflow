export default function DashboardCard({
  title,
  value,
  subtitle,
  icon,
}) {
  return (
    <div className="bg-white rounded-2xl p-6 shadow-sm border border-gray-200">
      <div className="text-3xl mb-3">{icon}</div>

      <h3 className="text-lg font-semibold">
        {title}
      </h3>

      <h1 className="text-4xl font-bold mt-3">
        {value}
      </h1>

      <p className="text-gray-500 mt-2">
        {subtitle}
      </p>
    </div>
  );
}