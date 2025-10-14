import { useEffect, useState } from "react";
import { useQuery } from "@apollo/client/react";
import { gql } from "@apollo/client";

//Full calendar
import FullCalendar from "@fullcalendar/react";
import timeGridPlugin from "@fullcalendar/timegrid";
import interactionPlugin from "@fullcalendar/interaction";
import esLocale from "@fullcalendar/core/locales/es";
import { bussinessHours } from "../utils/utils";
import { parseAppointment } from "../utils/parseAppointment";

const GET_APPOINTMENTS = gql`
  query GetAppointments {
    getAppointments {
      id
      name
      date
      barber
      time
    }
  }
`;

const GET_APPOINTMENTS_BY_BARBER = gql`
  query GetAppointmentsByBarber($barber: String!) {
    getAppointmentsByBarber(barber: $barber) {
      name
      date
    }
  }
`;

export const AppointmentCalendar = () => {
  const [events, setEvents] = useState([{}]);

  const {
    data: getAppData,
    error: getAppError,
    loading: getAppLoading,
  } = useQuery(GET_APPOINTMENTS);

  const {
    data: getAppByBarberData,
    error: getAppByBarberError,
    loading: getAppByBarberLoading,
  } = useQuery(GET_APPOINTMENTS_BY_BARBER, {
    variables: { barber: "Santiago" },
  });

  useEffect(() => {
    if (getAppByBarberData?.getAppointmentsByBarber) {
      const newEvents = parseAppointment(
        getAppByBarberData.getAppointmentsByBarber
      );
      setEvents(newEvents);
    }
  }, [getAppByBarberData]);

  if (getAppByBarberLoading) return <p>Data loading...</p>;
  if (getAppByBarberError) return <p>Error: {error.message}</p>;

  return (
    <div className="p-4">
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
        businessHours={bussinessHours}
        allDaySlot={false}
        height="auto"
      />
    </div>
  );
};
