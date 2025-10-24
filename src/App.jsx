import { BrowserRouter, Route, Routes } from "react-router-dom";
import "./App.css";
import Layout from "./pages/Layout";
import { AppointmentCalendar } from "./pages/AppointmentCalendar";
import { AppointmentChat } from "./pages/AppointmentChat";
import { AppointmentForm } from "./pages/AppointmentForm";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route index element={<AppointmentChat />} />
          <Route path="/calendar" element={<AppointmentCalendar />} />
          <Route path="/form" element={<AppointmentForm />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
