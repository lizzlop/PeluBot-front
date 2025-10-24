import { useEffect, useState } from "react";
import { useQuery } from "@apollo/client/react";

//Full calendar
import FullCalendar from "@fullcalendar/react";
import timeGridPlugin from "@fullcalendar/timegrid";
import interactionPlugin from "@fullcalendar/interaction";
import esLocale from "@fullcalendar/core/locales/es";
import { bussinessHours } from "../utils/utils";
import { parseAppointment } from "../utils/parseAppointment";
import {
  GET_APPOINTMENTS,
  GET_APPOINTMENTS_BY_BARBER,
} from "../services/services";

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
    if (getAppData?.getAppointments) {
      const newEvents = parseAppointment(getAppData.getAppointments);
      console.log("🎉 newEvents", newEvents);
      setEvents(newEvents);
    }
  }, [getAppData]);

  if (getAppLoading) return <p>Data loading...</p>;
  if (getAppError) return <p>Error: {getAppError.message}</p>;

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
        dayCellDidMount={(arg) => {
          if (arg.isToday) {
            arg.el.style.backgroundColor = "#FFF5EF";
          }
        }}
      />
    </div>
  );
};
