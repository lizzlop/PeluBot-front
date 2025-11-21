/**
 * Utility functions for parsing appointment data
 *
 * Full Calendar event format:
 * {
 *   id: ID,
 *   title: String,
 *   start: ISO string (YYYY-MM-DDTHH:mm:ss),
 *   end: ISO string (YYYY-MM-DDTHH:mm:ss),
 *   color: String
 *   extendedProps: { ... }
 * }
 */

const APPOINTMENT_DURATION_HOURS = 1;
const TIME_ZONE = "America/Bogota";

/**
 * Calculate end date based on start date and duration
 */
const endDate = (startDate) => {
  const date = new Date(startDate);
  return date.setHours(date.getHours() + APPOINTMENT_DURATION_HOURS);
};

/**
 * Parse appointments data for Full Calendar
 */
export const parseAppointment = (data) => {
  return data.map((appointment) => ({
    id: appointment._id,
    title: appointment.name,
    start: appointment.date,
    end: endDate(appointment.date),
    color: appointment.barberDetails.color || "#3788d8",
    extendedProps: {
      barber: appointment.barber,
      phone: appointment.phone,
      message: appointment.message,
      color: appointment.barberDetails.color || "#3788d8",
    },
  }));
};

/**
 * Parse business hours to get disabled days
 */
export const parseDisabledDays = (businessHours) => {
  const disabledDays = [];
  for (const day of businessHours) {
    if (!day.hours || day.hours.length === 0) {
      disabledDays.push(day._id);
    }
  }
  return disabledDays;
};

/**
 * Parse hours array for select inputs
 */
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

/**
 * Convert 12h time to 24h format for API
 */
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

/**
 * Parse date and time for API submission
 */
export const parseDateToSend = (date, hour) => {
  const formatDate = new Date(date).toLocaleString("en-CA", {
    timeZone: TIME_ZONE,
    year: "numeric",
    month: "2-digit",
    day: "2-digit",
  });
  const formatTime = parseHoursToSend(hour);
  return `${formatDate}T${formatTime}`;
};

/**
 * Get local time
 */
export const getLocalTime = () => {
  return new Date().toLocaleTimeString("es-CO", {
    hour12: true,
    timeStyle: "short",
  });
};
