const PriceInput = ({
  id,
  label,
  register,
  error,
  disabled = false,
  placeholder = "0.00",
  validation,
  ...rest
}) => (
  <div>
    <label htmlFor={id} className="block font-medium text-gray-700 dark:text-gray-300 mb-2 text-sm">
      {label}
    </label>
    <div className="relative">
      <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
        <span className="text-gray-500 dark:text-gray-400">$</span>
      </div>
      <input
        id={id}
        type="number"
        step="0.01"
        {...register(id, validation)}
        className={`w-full pl-8 pr-3 py-2.5 rounded-lg text-sm border ${error ? "border-red-500" : "border-gray-300 dark:border-gray-600"} focus:ring-2 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-800 dark:text-white`}
        placeholder={placeholder}
        disabled={disabled}
        {...rest}
      />
    </div>
    {error && (
      <p className="mt-1 text-sm text-red-600 dark:text-red-400">{error.message}</p>
    )}
  </div>
);

export default PriceInput;
