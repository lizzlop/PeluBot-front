import { useQuery, useMutation } from "@apollo/client/react";
import { gql } from "@apollo/client";

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
      id
      name
      date
      time
    }
  }
`;

export const Calendar = () => {
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

  // if (getAppLoading) return <p>Data loading...</p>;
  // if (getAppError) return <p>Error: {error.message}</p>;
  // return (
  //   <div>
  //     {getAppData.getAppointments.map((appointment) => (
  //       <div key={appointment.id}>{appointment.name}</div>
  //     ))}
  //   </div>
  // );

  if (getAppByBarberLoading) return <p>Data loading...</p>;
  if (getAppByBarberError) return <p>Error: {error.message}</p>;
  return (
    <div>
      {getAppByBarberData.getAppointmentsByBarber.map((appointment) => (
        <div key={appointment.id}>{appointment.name}</div>
      ))}
    </div>
  );
};
