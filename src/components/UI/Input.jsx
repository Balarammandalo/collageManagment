export default function Input({ className = "", ...props }) {
  return (
    <input
      className={`w-full rounded-xl border border-gray-200 bg-gray-50 px-3 py-2.5 text-sm text-gray-900 placeholder:text-gray-400 focus:border-blue-600 focus:ring-2 focus:ring-blue-600/20 ${className}`}
      {...props}
    />
  );
}
