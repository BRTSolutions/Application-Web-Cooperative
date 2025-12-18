export const Info = ({ label, value, badge = false, multiline = false }) => (
  <div>
    <p className="text-gray-500 mb-1">{label}</p>

    {badge ? (
      <span
        className={`inline-block px-3 py-1 rounded-full text-xs font-medium ${
          value === "Actif"
            ? "bg-green-100 text-green-700"
            : "bg-red-100 text-red-700"
        }`}
      >
        {value}
      </span>
    ) : (
      <p
        className={`text-gray-800 font-medium ${
          multiline ? "whitespace-pre-line" : ""
        }`}
      >
        {value}
      </p>
    )}
  </div>
);
