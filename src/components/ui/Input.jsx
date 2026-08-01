export default function Input({
  value,
  onChange,
  placeholder,
  ...props
}) {
  return (
    <input
      value={value}
      onChange={onChange}
      placeholder={placeholder}
      className="w-full border border-gray-300 rounded-xl px-4 py-2 focus:outline-none focus:ring-2 focus:ring-black"
      {...props}
    />
  );
}