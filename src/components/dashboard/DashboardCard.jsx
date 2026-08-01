export default function DashboardCard({
  icon,
  title,
  value,
  subtitle,
}) {
  return (
    <div className="bg-white rounded-2xl shadow-md p-6 hover:shadow-lg transition">

      <div className="text-4xl mb-4">
        {icon}
      </div>

      <h3 className="text-gray-500 font-medium">
        {title}
      </h3>

      <h2 className="text-3xl font-bold mt-2">
        {value}
      </h2>

      <p className="text-gray-400 mt-2">
        {subtitle}
      </p>

    </div>
  );
}