import { useForm } from "react-hook-form";
import { useMutation, useQuery } from "@apollo/client/react";
import { useEffect, useState } from "react";

import { rules, parseDateToSend } from "../utils";
import {
  FormInput,
  FormTextArea,
  FormDate,
  FormSelect,
} from "../components/forms";
import {
  CREATE_APPOINTMENT,
  GET_BARBERS,
  GET_BUSINESS_HOURS,
} from "../graphql";
import { Popup } from "../components/Popup";
import Loader from "../components/Loader";

export const AppointmentForm = () => {
  const {
    data: getBarbersData,
    error: getBarbersError,
    loading: getBarbersLoading,
  } = useQuery(GET_BARBERS);
  const {
    data: getBHData,
    error: getBHError,
    loading: getBHLoading,
  } = useQuery(GET_BUSINESS_HOURS);

  const [createAppointment] = useMutation(CREATE_APPOINTMENT);

  const [responsePopup, setResponsePopup] = useState(false);
  const [businessHours, setBusinessHours] = useState();
  const [barberSelect, setBarberSelect] = useState([]);
  const [timeSelect, setTimeSelect] = useState([]);
  const {
    register,
    handleSubmit,
    reset,
    control,
    formState: { errors },
  } = useForm();

  useEffect(() => {
    if (getBarbersData)
      setBarberSelect(getBarbersData.getBarbers.map((barber) => barber.name));
  }, [getBarbersData, getBarbersLoading]);

  useEffect(() => {
    if (getBHData) {
      console.log("🎉 getBHData", getBHData);
      setBusinessHours(getBHData.getBusinessHours);
    }
  }, [getBHData, getBHLoading]);

  useEffect(() => {
    if (getBarbersError || getBHError) {
      setResponsePopup({
        success: false,
        message: `Error en el servicio ${
          getBarbersError ? "GET_BARBERS" : "GET_BUSINESS_HOURS"
        }: ${getBarbersError?.message || getBHError?.message}`,
      });
    }
  }, [getBHError, getBarbersError]);

  const onSubmit = async (newAppointment) => {
    const { data } = await createAppointment({
      variables: {
        input: {
          name: newAppointment.name,
          barber: newAppointment.barber,
          date: parseDateToSend(newAppointment.date, newAppointment.time),
          phone: newAppointment.phone,
          message: newAppointment.message,
        },
      },
    });
    setResponsePopup(data.createAppointment);
  };

  if (getBarbersLoading || getBHLoading) return <Loader />;

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
            businessHours={businessHours}
            setTimeSelect={setTimeSelect}
            control={control}
            rules={rules.date}
            error={errors.date}
          />

          {/* Time */}
          <FormSelect
            label="Selecciona el horario de tu cita"
            name="time"
            options={timeSelect}
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
