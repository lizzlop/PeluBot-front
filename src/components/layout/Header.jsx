import { useNavigate, useLocation } from "react-router-dom";

export const Header = () => {
  const navigate = useNavigate();
  const location = useLocation();

  return (
    <header className="bg-gray-100 shadow-sm border-b border-gray-200 w-screen">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-26">
          <h1 className="text-3xl font-bold text-indigo-950">💈PeluBot</h1>

          <nav className="flex space-x-2">
            <button
              onClick={() => navigate("/")}
              className={
                "px-4 py-2 rounded-sm cursor-pointer transition-colors duration-200 bg-indigo-950 text-gray-100 hover:bg-indigo-900"
              }
            >
              💬 Chat
            </button>
            <button
              onClick={() => navigate("/calendar")}
              className={
                "px-4 py-2 rounded-sm cursor-pointer transition-colors duration-200 bg-indigo-950 text-gray-100 hover:bg-indigo-900"
              }
            >
              📅 Calendario
            </button>
          </nav>
        </div>
      </div>
    </header>
  );
};
