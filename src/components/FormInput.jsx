import PropTypes from "prop-types";

export const FormInput = ({
  label,
  name,
  placeholder,
  register,
  rules,
  error,
  classNameExtra,
}) => {
  return (
    <div>
      <label
        htmlFor={name}
        className="block text-sm font-medium text-gray-700 mb-1"
      >
        {label}
      </label>
      <input
        id={name}
        type="text"
        placeholder={placeholder}
        className={`w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-gray-900 ${
          error
            ? "border-red-500 focus:ring-red-300"
            : "border-gray-300 focus:ring-gray-900"
        } ${classNameExtra} `}
        {...register(name, rules)}
      />
      {error && <p className="text-red-500 text-sm mt-1">{error.message}</p>}
    </div>
  );
};

FormInput.propTypes = {
  label: PropTypes.string.isRequired,
  name: PropTypes.string.isRequired,
  placeholder: PropTypes.string.isRequired,
  register: PropTypes.func.isRequired,
  rules: PropTypes.object,
  error: PropTypes.object,
  classNameExtra: PropTypes.string,
};
