import { useForm } from "react-hook-form";
import { rules } from "../utils/utils";
import { FormInput } from "../components/FormInput";
import { FormTextArea } from "../components/FormTextArea";
import { FormDate } from "../components/FormDate";

export const AppointmentForm = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();
  const onSubmit = (data) => console.log(data);

  return (
    <div className="max-w-md mx-auto bg-white shadow-lg rounded-lg overflow-hidden">
      <div className="bg-red-900 text-white text-center py-4 font-semibold text-lg">
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
        <div>
          <label
            htmlFor="time"
            className="block text-sm font-medium text-gray-700 mb-1"
          >
            Hora de la cita
          </label>
          <input
            id="time"
            type="time"
            className="w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-gray-900"
            {...register("time", { required: true })}
          />
        </div>

        {/* Service */}
        <div>
          <label
            htmlFor="barber"
            className="block text-sm font-medium text-gray-700 mb-1"
          >
            Barbero
          </label>
          <select
            id="barber"
            className="w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-gray-900"
            {...register("barber", { required: true })}
          >
            {/* TODO: Ponerlo dinámico */}
            <option value="">Selecciona un barbero</option>
            <option value="Santiago">Santiago</option>
            <option value="Daniel">Daniel</option>
            <option value="Luca">Luca</option>
          </select>
        </div>

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
          className="w-full bg-gray-900 text-white py-2 rounded-md hover:bg-gray-800 transition"
        >
          Reserva
        </button>
      </form>
    </div>
  );
};
