import { BrowserRouter, Route, Routes } from "react-router-dom";
import { AppointmentForm } from "./pages/AppointmentForm";
import "./App.css";

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
