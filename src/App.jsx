import { BrowserRouter, Route, Routes } from "react-router-dom";
import "./App.css";
import { AppointmentForm } from "./pages/AppointmentForm";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<AppointmentForm />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
