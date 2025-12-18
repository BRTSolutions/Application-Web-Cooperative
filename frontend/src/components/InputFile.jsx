export const InputFile = ({ label, name, onChange, accept }) => (
  <div>
    <label className="block text-sm font-medium text-gray-600 mb-1">
      {label}
    </label>
    <input
      type="file"
      name={name}
      accept={accept}
      onChange={onChange}
      required
      className="w-full border rounded-lg p-2"
    />
  </div>
);
