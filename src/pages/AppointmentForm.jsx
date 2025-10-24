import { useForm } from "react-hook-form";
import { useMutation } from "@apollo/client/react";

import { rules } from "../utils/utils";
import { FormInput } from "../components/FormInput";
import { FormTextArea } from "../components/FormTextArea";
import { FormDate } from "../components/FormDate";
import { FormSelect } from "../components/FormSelect";
import { CREATE_APPOINTMENT } from "../services/services";

export const AppointmentForm = () => {
  const [createAppointment] = useMutation(CREATE_APPOINTMENT);
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const onSubmit = (newAppointment) => {
    console.log(newAppointment);
    createAppointment({
      variables: {
        name: newAppointment.name,
        barber: newAppointment.barber,
        date: newAppointment.date,
        time: newAppointment.time,
      },
    });
  };

  return (
    <div className="bg-white flex items-center justify-center mt-20 p-5">
      <div className="bg-white rounded-2xl shadow-lg w-full max-w-md">
        <div className="bg-amber-700 text-white p-4 rounded-t-2xl font-semibold">
          Haz una reserva
        </div>

        <form className="p-6 space-y-4" onSubmit={handleSubmit(onSubmit)}>
          {/* Name */}
          <FormInput
            label="Nombre completo"
            name="name"
            placeholder="Ingresa tu nombre"
            register={register}
            rules={rules.name}
            error={errors.name}
          />

          {/* Phone */}
          <FormInput
            label="Número de celular"
            name="phone"
            placeholder="Ingresa tu número de celular"
            register={register}
            rules={rules.phone}
            error={errors.phone}
          />

          {/* Date */}
          <FormDate
            label="Fecha de la cita"
            name="date"
            register={register}
            rules={rules.date}
            error={errors.date}
          />

          {/* Time */}
          <FormSelect
            label="Selecciona el horario de tu cita"
            name="time"
            register={register}
            rules={rules.time}
            error={errors.time}
          />

          {/* Barber */}
          <FormSelect
            label="Selecciona un barbero"
            name="barber"
            register={register}
            rules={rules.barber}
            error={errors.barber}
          />

          {/* Message */}
          <FormTextArea
            label="Mensaje extra"
            name="message"
            placeholder="Ingresa cualquier información adicional"
            register={register}
            rules={rules.message}
            error={errors.message}
          />

          <button
            type="submit"
            className="w-full bg-indigo-950 text-white py-2 rounded-md hover:bg-indigo-900 transition"
          >
            Reserva
          </button>
        </form>
      </div>
    </div>
  );
};
