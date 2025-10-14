import { BrowserRouter, Route, Routes } from "react-router-dom";
import "./App.css";
import { AppointmentCalendar } from "./pages/AppointmentCalendar";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<AppointmentCalendar />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
