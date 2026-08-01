import Button from "../ui/Button";

export default function GoalCard({
  goal,
  onDelete,
}) {
  const progress = goal.progress || 0;

  function getStatusColor(status) {
    switch (status) {
      case "Completed":
        return "bg-green-100 text-green-700";

      case "In Progress":
        return "bg-blue-100 text-blue-700";

      case "Overdue":
        return "bg-red-100 text-red-700";

      default:
        return "bg-gray-100 text-gray-700";
    }
  }

  return (
    <div className="bg-white rounded-2xl shadow-md border border-gray-200 p-6 hover:shadow-lg transition">

      <div className="flex justify-between items-start">

        <div className="flex-1">

          <h2 className="text-2xl font-bold mb-5">
            🎯 {goal.title}
          </h2>

          <div className="w-full h-4 bg-gray-200 rounded-full overflow-hidden">

            <div
              className="h-full bg-blue-600 transition-all duration-500"
              style={{
                width: `${progress}%`,
              }}
            />

          </div>

          <p className="mt-2 font-semibold text-blue-600">
            {progress}% Complete
          </p>

          <div className="flex flex-wrap gap-3 mt-5">

            <span
              className={`px-3 py-1 rounded-full text-sm font-semibold ${getStatusColor(
                goal.status
              )}`}
            >
              {goal.status}
            </span>

            <span className="text-gray-500 text-sm">
              📅{" "}
              {goal.dueDate
                ? goal.dueDate
                : "No deadline"}
            </span>

          </div>

        </div>

        <Button
          className="bg-red-500 hover:bg-red-600"
          onClick={() => onDelete(goal.id)}
        >
          Delete
        </Button>

      </div>

    </div>
  );
}