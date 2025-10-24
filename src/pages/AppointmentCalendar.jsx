import { useEffect, useState } from "react";
import { useQuery } from "@apollo/client/react";

//Full calendar
import FullCalendar from "@fullcalendar/react";
import timeGridPlugin from "@fullcalendar/timegrid";
import interactionPlugin from "@fullcalendar/interaction";
import esLocale from "@fullcalendar/core/locales/es";
import { bussinessHours } from "../utils/utils";
import { parseAppointment } from "../utils/parseAppointment";
import Loader from "../components/Loader";
import { GET_APPOINTMENTS } from "../services/services";

export const AppointmentCalendar = () => {
  const [events, setEvents] = useState([{}]);
  const barbers = ["Todos", "Santiago", "Luca", "Daniel"];

  const {
    data: getAppData,
    error: getAppError,
    loading: getAppLoading,
  } = useQuery(GET_APPOINTMENTS);

  const handleClickBarber = (barber) => {
    console.log("🎉 barber", barber);
    const appontments = parseAppointment(getAppData.getAppointments);
    let appointmentsByBarber;
    if (barber == "Todos") {
      appointmentsByBarber = appontments;
    } else {
      appointmentsByBarber = appontments.filter((app) => app.barber == barber);
    }
    console.log("🎉 appointmentsByBarber", appointmentsByBarber);
    setEvents(appointmentsByBarber);
  };

  useEffect(() => {
    if (getAppData?.getAppointments) {
      const newEvents = parseAppointment(getAppData.getAppointments);
      console.log("🎉 newEvents", newEvents);
      setEvents(newEvents);
    }
  }, [getAppData]);

  if (getAppLoading) return <Loader />;
  if (getAppError) return <p>Error: {getAppError.message}</p>;

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
        businessHours={bussinessHours}
        allDaySlot={false}
        height="auto"
        dayCellDidMount={(arg) => {
          if (arg.isToday) {
            arg.el.style.backgroundColor = "#FFFBEB";
          }
        }}
      />
    </div>
  );
};
