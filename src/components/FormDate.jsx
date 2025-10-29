import PropTypes from "prop-types";
import { Controller } from "react-hook-form";
import Flatpickr from "react-flatpickr";
import "flatpickr/dist/themes/airbnb.css"; // Temas disponibles: dark, material_blue, etc.

export const FormDate = ({ label, name, control, rules, error }) => {
  const opciones = {
    altInput: false,
    enableTime: true,
    noCalendar: false,
    dateFormat: "Y-m-d h:i K",
    minuteIncrement: 60,
    locale: "es",
    disable: [
      function (date) {
        return date.getDay() === 0 || date.getDay() === 6;
      },
      "2025-12-25",
      "2025-01-01",
    ],
    minDate: "today",
    maxDate: new Date().fp_incr(7),
  };

  return (
    <div>
      <label
        htmlFor={name}
        className="block text-sm font-medium text-gray-700 mb-1"
      >
        {label}
      </label>
      <Controller
        name={name}
        control={control}
        rules={rules}
        render={({ field }) => {
          console.log("🔍 Field object:", field);
          return (
            <Flatpickr
              value={field.value ? new Date(field.value) : null}
              options={opciones}
              onChange={([selected]) => field.onChange(selected)}
            />
          );
        }}
      />
      {error && <p className="text-red-500 text-sm mt-1">{error.message}</p>}
    </div>
  );
};

FormDate.propTypes = {
  label: PropTypes.string.isRequired,
  name: PropTypes.string.isRequired,
  control: PropTypes.object.isRequired,
  rules: PropTypes.object,
  error: PropTypes.object,
  classNameExtra: PropTypes.string,
};
