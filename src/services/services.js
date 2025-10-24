import { gql } from "@apollo/client";

export const GET_APPOINTMENTS = gql`
  query GetAppointments {
    getAppointments {
      id
      name
      date
      barber
    }
  }
`;

export const GET_APPOINTMENTS_BY_BARBER = gql`
  query GetAppointmentsByBarber($barber: String!) {
    getAppointmentsByBarber(barber: $barber) {
      name
      date
    }
  }
`;

export const CREATE_APPOINTMENT = gql`
  mutation CreateAppointment(
    $name: String!
    $barber: String!
    $date: String!
    $time: String!
  ) {
    createAppointment(name: $name, barber: $barber, date: $date, time: $time) {
      name
    }
  }
`;

export const RUN_AGENT = gql`
  mutation runAgent($newMessage: String!) {
    runAgent(newMessage: $newMessage)
  }
`;
