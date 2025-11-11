/**
 * Palette
    space: indigo-950
    brown: amber-700
    pale yellow: amber-100
    khaki: orange-100
    gris: gray-700
 */

const regex = {
  lettersOnly: /^[a-záéíóúñ\s]+$/i,
  numbersOnly: /^\d+$/,
};

export const rules = {
  name: {
    required: "El nombre es obligatorio",
    pattern: {
      value: regex.lettersOnly,
      message: "Solo se permiten letras y espacios",
    },
  },
  phone: {
    required: "El celular es obligatorio",
    pattern: {
      value: regex.numbersOnly,
      message: "Solo se permiten números",
    },
    minLength: {
      value: 10,
      message: "El número de celular debe tener 10 dígitos",
    },
    maxLength: {
      value: 10,
      message: "El número de celular debe tener 10 dígitos",
    },
  },
  message: {
    maxLength: {
      value: 100,
      message: "El mensaje no puede tener más de 100 caracteres",
    },
  },
  date: {
    required: "La fecha es obligatoria",
  },
  barber: {
    required: "La fecha es obligatoria",
  },
  time: {
    required: "La hora es obligatoria",
  },
};

export const businessHours = [
  {
    daysOfWeek: [0, 1, 2, 3, 4, 5, 6],
    startTime: "09:00",
    endTime: "20:00",
  },
];
