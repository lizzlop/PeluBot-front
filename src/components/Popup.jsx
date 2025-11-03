import PropTypes from "prop-types";

export const Popup = ({ responsePopup, reset, onClose }) => {
  if (!responsePopup) return null;

  if (responsePopup.success) {
    return (
      <div className="fixed inset-0 flex items-center justify-center bg-black/50 z-[9999]">
        <div className="bg-white rounded-xl w-80 shadow-xl overflow-hidden">
          {/* Header */}
          <div className="bg-green-400 flex flex-col items-center justify-center py-6">
            <div className="text-white text-5xl">✅️</div>
          </div>

          {/* Contenido */}
          <div className="text-center px-6 py-4">
            <h2 className="text-xl font-bold text-gray-800 mb-2">
              Cita programada exitosamente
            </h2>
            <p className="text-gray-600">¡Gracias!</p>

            {/* Botón */}
            <button
              onClick={() => {
                onClose();
                if (reset) reset();
              }}
              className="mt-5 bg-indigo-950 text-white px-6 py-2 rounded-full font-semibold hover:bg-indigo-900 transition"
            >
              Cerrar
            </button>
          </div>
        </div>
      </div>
    );
  } else {
    return (
      <div className="fixed inset-0 flex items-center justify-center bg-black/50 z-[9999]">
        <div className="bg-white rounded-xl w-80 shadow-xl overflow-hidden">
          {/* Header */}
          <div className="bg-red-500 flex flex-col items-center justify-center py-6">
            <div className="text-white text-5xl">⚠️</div>
          </div>

          {/* Contenido */}
          <div className="text-center px-6 py-4">
            <h2 className="text-xl font-bold text-gray-800 mb-2">Error</h2>
            <p className="text-gray-600">{responsePopup.message}</p>

            {/* Botón */}
            <button
              onClick={onClose}
              className="mt-5 bg-indigo-950 text-white px-6 py-2 rounded-full font-semibold hover:bg-indigo-900 transition"
            >
              Cerrar
            </button>
          </div>
        </div>
      </div>
    );
  }
};

Popup.propTypes = {
  responsePopup: PropTypes.object,
  reset: PropTypes.func,
  onClose: PropTypes.func.isRequired,
};
