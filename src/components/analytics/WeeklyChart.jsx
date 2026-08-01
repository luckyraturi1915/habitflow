import {
  ResponsiveContainer,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  CartesianGrid,
} from "recharts";

export default function WeeklyChart({ data }) {
  return (
    <div className="bg-white rounded-2xl shadow-md border p-6">
      <h2 className="text-xl font-bold mb-6">
        📈 Weekly Activity
      </h2>

      <div className="h-80">
        <ResponsiveContainer width="100%" height="100%">
          <BarChart data={data}>
            <CartesianGrid strokeDasharray="3 3" />

            <XAxis dataKey="day" />

            <YAxis allowDecimals={false} />

            <Tooltip />

            <Bar
              dataKey="completed"
              radius={[8, 8, 0, 0]}
              fill="#2563eb"
            />
          </BarChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
}