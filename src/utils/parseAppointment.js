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
    start: appointment.date,
    end: endDate(appointment.date),
  }));
};
