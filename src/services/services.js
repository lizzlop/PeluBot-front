import { gql } from "@apollo/client";

export const GET_BARBERS = gql`
  query GetBarbers {
    getBarbers {
      id
      name
      color
    }
  }
`;

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

export const CREATE_APPOINTMENT = gql`
  mutation CreateAppointment(
    $name: String!
    $barber: String!
    $date: String!
    $phone: String!
    $message: String
  ) {
    createAppointment(
      name: $name
      barber: $barber
      date: $date
      phone: $phone
      message: $message
    ) {
      success
      message
    }
  }
`;

export const RUN_AGENT = gql`
  mutation runAgent($newMessage: String!) {
    runAgent(newMessage: $newMessage)
  }
`;
