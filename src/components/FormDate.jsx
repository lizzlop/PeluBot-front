import PropTypes from "prop-types";
import { Controller } from "react-hook-form";
import Flatpickr from "react-flatpickr";
import "flatpickr/dist/themes/dark.css";

import { parseDisabledDays, parseHoursSelect } from "../utils/parseAppointment";

export const FormDate = ({
  label,
  name,
  setTimeSelect,
  businessHours,
  control,
  rules,
  error,
}) => {
  const disabledDays = businessHours ? parseDisabledDays(businessHours) : [];
  const opciones = {
    noCalendar: false,
    dateFormat: "Y-m-d",
    disable: [
      function (date) {
        return disabledDays
          ? disabledDays.includes(date.getDay().toString())
          : false;
      },
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
          return (
            <Flatpickr
              value={field.value ? new Date(field.value) : null}
              options={opciones}
              onChange={([selected]) => {
                field.onChange(selected);
                const daySelected = businessHours.find(
                  (day) => day.id == selected.getDay()
                );
                setTimeSelect(parseHoursSelect(daySelected.hours));
              }}
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
  businessHours: PropTypes.array,
  setTimeSelect: PropTypes.func.isRequired,
  control: PropTypes.object.isRequired,
  rules: PropTypes.object,
  error: PropTypes.object,
};
