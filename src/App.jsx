import { BrowserRouter, Route, Routes } from "react-router-dom";
import { AppProvider } from "./context/AppContext";
import Layout from "./pages/Layout";
import { AppointmentCalendar } from "./pages/AppointmentCalendar";
import { AppointmentChat } from "./pages/AppointmentChat";
import { AppointmentForm } from "./pages/AppointmentForm";
import "./App.css";

function App() {
  return (
    <BrowserRouter>
      <AppProvider>
        <Routes>
          <Route path="/" element={<Layout />}>
            <Route index element={<AppointmentChat />} />
            <Route path="calendar" element={<AppointmentCalendar />} />
            <Route path="form" element={<AppointmentForm />} />
          </Route>
        </Routes>
      </AppProvider>
    </BrowserRouter>
  );
}

export default App;
