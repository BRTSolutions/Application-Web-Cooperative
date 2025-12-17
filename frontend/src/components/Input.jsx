export default function Input({
  type = "text",
  name,
  value,
  onChange,
  placeholder,
  icon,
  LabelName,
}) {
  return (
    <div className="relative w-full">
       <label className="block text-sm mb-1">{LabelName}</label>
      {icon && (
        <span className="absolute left-3 top-11 transform -translate-y-1/2 text-gray-400">
          {icon}
        </span>
      )}
      <input
        type={type}
        name={name}
        value={value}
        onChange={onChange}
        placeholder={placeholder}
        className="
          w-full
          bg-gray-100
          border border-black
          rounded-lg
          px-3 py-2
          shadow-md
          placeholder-gray-500
          focus:outline-none
          focus:bg-white
          focus:ring-2 focus:ring-indigo-500
          transition
          pl-10
        "
      />
    </div>
  );
}
