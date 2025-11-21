import clock from "../../assets/clock-icon.png";
import info from "../../assets/info-icon.svg";

export const PopupDate = ({ selectedEvent, closeModal }) => {
  console.log("🎉 selectedEvent", selectedEvent.start);
  const formatDateCustom = (date) => {
    const options = {
      weekday: "long",
      year: "numeric",
      month: "long",
      day: "numeric",
      hour: "numeric",
      minute: "2-digit",
      hour12: true,
    };
    let formatted = date.toLocaleString("es-ES", options);
    formatted = formatted.charAt(0).toUpperCase() + formatted.slice(1);
    return formatted;
  };

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black/50 z-[9998]">
      <div className="bg-white rounded-xl w-130 shadow-xl overflow-hidden">
        {/* Header */}
        <div
          className="flex flex-col items-center justify-center py-6 text-white mb-6"
          style={{ backgroundColor: selectedEvent.extendedProps.color }}
        >
          <h2 className="text-xl font-bold mb-4">{selectedEvent.title}</h2>
          <p>
            <strong>{selectedEvent.extendedProps.phone}</strong>
          </p>
        </div>

        <div className="space-y-2">
          <div className="flex items-center justify-center gap-2">
            <img alt="clock-icon" src={clock} className="w-5 h-5"></img>
            <p>{formatDateCustom(selectedEvent.start)}</p>
          </div>
          {selectedEvent.extendedProps.message && (
            <div className="flex justify-center p-5">
              <img alt="info-icon" src={info} className="w-5 h-5"></img>
              <i>{selectedEvent.extendedProps.message}</i>
            </div>
          )}
        </div>

        <div className="m-6 flex justify-center space-x-3">
          <button
            onClick={closeModal}
            className="px-4 py-2 bg-indigo-950 rounded text-white hover:bg-indigo-900"
          >
            Cerrar
          </button>
        </div>
      </div>
    </div>
  );
};
