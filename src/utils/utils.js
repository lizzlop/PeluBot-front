const regex = {
  lettersOnly: /^[A-Za-zÁÉÍÓÚáéíóúñÑ\s]+$/i,
  numbersOnly: /^[0-9]{10}$/,
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
