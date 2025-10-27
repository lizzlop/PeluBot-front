import { useForm } from "react-hook-form";
import { useMutation, useQuery } from "@apollo/client/react";
import { useEffect, useState } from "react";

import { rules } from "../utils/utils";
import { FormInput } from "../components/FormInput";
import { FormTextArea } from "../components/FormTextArea";
import { FormDate } from "../components/FormDate";
import { FormSelect } from "../components/FormSelect";
import { CREATE_APPOINTMENT, GET_BARBERS } from "../services/services";
import { Popup } from "../components/Popup";
import Loader from "../components/Loader";

export const AppointmentForm = () => {
  //TODO: Implementar popup cuando sale error en los servicios
  console.log("🎉 antes de llamar");
  const { data: getBarbersData, loading: getBarbersLoading } =
    useQuery(GET_BARBERS);

  //TODO: Implementar lo de traer las bussiness hours y activar la hora
  const [createAppointment] = useMutation(CREATE_APPOINTMENT);

  const [responsePopup, setResponsePopup] = useState(false);
  const [barberSelect, setBarberSelect] = useState([]);
  const [timeSelect, setTimeSelect] = useState([]);
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm();

  let optionsBarber = [];

  useEffect(() => {
    if (getBarbersData)
      setBarberSelect(getBarbersData.getBarbers.map((barber) => barber.name));
  }, [getBarbersData, getBarbersLoading]);

  const onSubmit = async (newAppointment) => {
    console.log("newAppointment", newAppointment);
    newAppointment.date = `${newAppointment.date}T${newAppointment.time}:00`;
    const { data } = await createAppointment({
      variables: {
        name: newAppointment.name,
        barber: newAppointment.barber,
        date: newAppointment.date,
        phone: newAppointment.phone,
        message: newAppointment.message,
      },
    });
    console.log("🎉 data", data);
    setResponsePopup(data.createAppointment);
  };

  if (getBarbersLoading) return <Loader />;

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
            options={[]}
            register={register}
            rules={rules.time}
            error={errors.time}
          />

          {/* Barber */}
          <FormSelect
            label="Selecciona un barbero"
            name="barber"
            options={barberSelect}
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
      <Popup
        responsePopup={responsePopup}
        reset={reset}
        onClose={() => setResponsePopup(false)}
      />
    </div>
  );
};
