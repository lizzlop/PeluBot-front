import PropTypes from "prop-types";

export const FormSelect = ({
  label,
  name,
  options,
  register,
  rules,
  error,
}) => {
  const disableSelect = !options || options.length === 0;
  console.log("🎉 options", options);
  //TODO: make this dynamic and whit am and pm
  // const options =
  //   name == "barber"
  //     ? ["Santiago", "Daniel", "Luca"]
  //     : [
  //         "09:00",
  //         "10:00",
  //         "11:00",
  //         "12:00",
  //         "14:00",
  //         "15:00",
  //         "16:00",
  //         "17:00",
  //         "18:00",
  //         "19:00",
  //       ];

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
        disabled={disableSelect}
        className="w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-gray-900 disabled:bg-gray-100 disabled:text-gray-400"
        {...register(name, rules)}
      >
        {options?.map((option) => (
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
  options: PropTypes.array,
  placeholder: PropTypes.string.isRequired,
  register: PropTypes.func.isRequired,
  rules: PropTypes.object,
  error: PropTypes.object,
};
