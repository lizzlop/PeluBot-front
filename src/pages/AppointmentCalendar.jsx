import { useEffect, useState } from "react";
import { useQuery } from "@apollo/client/react";
import FullCalendar from "@fullcalendar/react";
import timeGridPlugin from "@fullcalendar/timegrid";
import interactionPlugin from "@fullcalendar/interaction";
import esLocale from "@fullcalendar/core/locales/es";

import { parseAppointment } from "../utils";
import Loader from "../components/Loader";
import { Popup } from "../components/Popup";
import { GET_APPOINTMENTS, GET_BARBERS } from "../graphql";

export const AppointmentCalendar = () => {
  const [events, setEvents] = useState([{}]);
  const [barbers, setBarbers] = useState([]);
  const [responsePopup, setResponsePopup] = useState(false);

  const {
    data: getBarbersData,
    error: getBarbersError,
    loading: getBarbersLoading,
  } = useQuery(GET_BARBERS);

  const {
    data: getAppData,
    error: getAppError,
    loading: getAppLoading,
  } = useQuery(GET_APPOINTMENTS);

  const handleClickBarber = (barber) => {
    const appointments = parseAppointment(getAppData.getAppointments);
    let appointmentsByBarber;
    if (barber == "Todos") {
      appointmentsByBarber = appointments;
    } else {
      appointmentsByBarber = appointments.filter((app) => app.barber == barber);
    }
    setEvents(appointmentsByBarber);
  };

  useEffect(() => {
    if (getAppData?.getAppointments) {
      const newEvents = parseAppointment(getAppData.getAppointments);
      setEvents(newEvents);
    }
  }, [getAppData, getAppLoading]);

  useEffect(() => {
    if (getBarbersData)
      setBarbers(getBarbersData.getBarbers.map((barber) => barber.name));
  }, [getBarbersData, getBarbersLoading]);

  useEffect(() => {
    if (getBarbersError || getAppError) {
      setResponsePopup({
        success: false,
        message: `Error en el servicio ${
          getBarbersError ? "GET_BARBERS" : "GET_APPOINTMENTS"
        }: ${getAppError?.message || getBarbersError?.message}`,
      });
    }
  }, [getAppError, getBarbersError]);

  if (getAppLoading) return <Loader />;

  return (
    <div className="p-4">
      <div className="flex flex-row justify-center mb-10">
        <span className="px-4 py-2">Filtra citas por barbero: </span>
        {barbers.map((barber) => (
          <button
            className="px-4 py-2 ml-5 rounded-sm cursor-pointer transition-colors duration-200 bg-indigo-950 text-gray-100"
            key={barber}
            value={barber}
            onClick={() => handleClickBarber(barber)}
          >
            {barber}
          </button>
        ))}
      </div>
      <FullCalendar
        plugins={[timeGridPlugin, interactionPlugin]}
        initialDate={new Date()}
        initialView="timeGridWeek"
        headerToolbar={{
          left: "prev,next today",
          center: "title",
          right: "timeGridWeek,timeGridDay",
        }}
        events={events}
        locale={esLocale}
        firstDay={1}
        slotMinTime="09:00:00"
        slotMaxTime="20:00:00"
        slotLabelFormat={{
          hour: "2-digit",
          minute: "2-digit",
          hour12: true,
        }}
        allDaySlot={false}
        height="auto"
        dayCellDidMount={(arg) => {
          if (arg.isToday) {
            arg.el.style.backgroundColor = "#FFFBEB";
          }
        }}
      />
      <Popup
        responsePopup={responsePopup}
        onClose={() => setResponsePopup(false)}
      />
    </div>
  );
};
