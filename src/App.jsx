import { BrowserRouter, Route, Routes } from "react-router-dom";
import "./App.css";
import { AppointmentChat } from "./pages/AppointmentChat";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<AppointmentChat />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
