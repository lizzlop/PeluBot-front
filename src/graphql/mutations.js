import { gql } from "@apollo/client";

export const CREATE_APPOINTMENT = gql`
  mutation CreateAppointment($input: CreateAppointmentInput!) {
    createAppointment(input: $input) {
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
