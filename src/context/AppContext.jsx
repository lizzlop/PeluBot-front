import { createContext, useContext, useReducer } from "react";
import { getLocalTime } from "../utils/parseAppointment";

const AppContext = createContext();

const appReducer = (store, action) => {
  switch (action.type) {
    case "SET_LOADING":
      return { ...store, loading: action.payload };
    case "ADD_CHAT_MESSAGE":
      return { ...store, messages: [...store.messages, action.payload] };
    default:
      return store;
  }
};

const initialStore = {
  loading: false,
  messages: [
    {
      id: 1,
      sender: "system",
      text: "Hola. ¿En qué puedo ayudarte hoy?\nPuedo crear, re-programar o cancelar citas",
      time: getLocalTime(),
    },
  ],
};

export const AppProvider = ({ children }) => {
  const [store, dispatch] = useReducer(appReducer, initialStore);

  return (
    <AppContext.Provider value={{ store, dispatch }}>
      {children}
    </AppContext.Provider>
  );
};

export const useApp = () => {
  const context = useContext(AppContext);
  if (!context) {
    throw new Error("useApp must be used within AppProvider");
  }
  return context;
};
