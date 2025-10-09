import PropTypes from "prop-types";

export const FormDate = ({ label, name, register, rules, error }) => {
  const today = new Date();
  const oneMonthLater = new Date();
  oneMonthLater.setMonth(today.getMonth() + 1);

  const formatDate = (date) => date.toISOString().split("T")[0];

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
        type="date"
        min={formatDate(today)}
        max={formatDate(oneMonthLater)}
        className="w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-gray-900"
        {...register(name, rules)}
      />
      {error && <p className="text-red-500 text-sm mt-1">{error.message}</p>}
    </div>
  );
};

FormDate.propTypes = {
  label: PropTypes.string.isRequired,
  name: PropTypes.string.isRequired,
  placeholder: PropTypes.string.isRequired,
  register: PropTypes.func.isRequired,
  rules: PropTypes.object,
  error: PropTypes.object,
  classNameExtra: PropTypes.string,
};
