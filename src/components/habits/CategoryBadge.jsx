export default function CategoryBadge({
  category = "Personal",
  color = "#22c55e",
}) {
  return (
    <span
      className="inline-flex items-center gap-2 px-3 py-1 rounded-full text-sm font-semibold text-white"
      style={{
        backgroundColor: color,
      }}
    >
      <span
        className="w-2 h-2 rounded-full bg-white"
      />

      {category}
    </span>
  );
}