import PropTypes from "prop-types";

export const FormSelect = ({ label, name, register, rules, error }) => {
  //TODO: make this dynamic
  const options =
    name == "barber"
      ? ["Santiago", "Daniel", "Luca"]
      : [
          "9:00 am",
          "10:00am",
          "11:00am",
          "12:00pm",
          "2:00pm",
          "3:00pm",
          "4:00pm",
          "5:00pm",
          "6:00pm",
          "7:00pm",
        ];

  return (
    <div>
      <label
        htmlFor={name}
        className="block text-sm font-medium text-gray-700 mb-1"
      >
        {label}
      </label>
      <select
        id={name}
        className="w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-gray-900"
        {...register(name, rules)}
      >
        {options.map((option) => (
          <option key={option} value={option}>
            {option}
          </option>
        ))}
      </select>
      {error && <p className="text-red-500 text-sm mt-1">{error.message}</p>}
    </div>
  );
};

FormSelect.propTypes = {
  label: PropTypes.string.isRequired,
  name: PropTypes.string.isRequired,
  placeholder: PropTypes.string.isRequired,
  register: PropTypes.func.isRequired,
  rules: PropTypes.object,
  error: PropTypes.object,
};
