/**
 * Time format for Full Calendar: YYYY-MM-DDTHH:mm:ss
 * 
 * {
    title: "Appointment"
    start: YYYY-MM-DDTHH:mm:ss
    end: YYYY-MM-DDTHH:mm:ss
    }
 */

const endDate = (startDate) => {
  const date = new Date(startDate);
  return date.setHours(date.getHours() + 1);
};

export const parseAppointment = (data) => {
  return data.map((appointment) => ({
    title: appointment.name,
    barber: appointment.barber,
    start: appointment.date,
    end: endDate(appointment.date),
    color: "#845442", //TODO: Cambiar cuando ya este la BD
  }));
};

export const parseDisabledDays = (businessHours) => {
  const disabledDays = [];
  for (const day of businessHours) {
    if (!day.hours || day.hours.length === 0) {
      disabledDays.push(day.id);
    }
  }
  return disabledDays;
};

export const parseHoursSelect = (hoursArray) => {
  if (!Array.isArray(hoursArray) || hoursArray.length === 0) {
    return [];
  }

  return hoursArray.map((hour) => {
    const [h, m, s] = hour.split(":");
    const date = new Date();
    date.setHours(Number.parseInt(h), Number.parseInt(m), Number.parseInt(s));

    return date.toLocaleTimeString("en-US", {
      hour: "2-digit",
      minute: "2-digit",
      hour12: true,
    });
  });
};

const parseHoursToSend = (time) => {
  const [timePart, period] = time.split(" ");
  const [hour, minutes] = timePart.split(":");
  let hour24 = Number.parseInt(hour);
  if (period === "PM" && hour24 !== 12) {
    hour24 += 12;
  } else if (period === "AM" && hour24 === 12) {
    hour24 = 0;
  }
  return `${hour24.toString().padStart(2, "0")}:${minutes}:00`;
};

export const parseDateToSend = (date, hour) => {
  const formatDate = new Date(date).toLocaleString("en-CA", {
    timeZone: "America/Bogota",
    year: "numeric",
    month: "2-digit",
    day: "2-digit",
  });
  const formatTime = parseHoursToSend(hour);
  return `${formatDate}T${formatTime}`;
};
