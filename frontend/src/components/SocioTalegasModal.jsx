import { FaTimes } from 'react-icons/fa';

export function SocioTalegasModal({ isOpen, onClose, socio }) {
  if (!isOpen || !socio) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white rounded-lg shadow-xl w-full max-w-3xl p-4 max-h-[90vh] overflow-y-auto">
        <div className="flex justify-between items-center mb-4">
          <div>
            <h2 className="text-xl font-bold text-[#001937]">Talegas del Socio</h2>
            <p className="text-sm text-gray-600">{socio.nombre} - {socio.codigo}</p>
          </div>
          <button 
            onClick={onClose}
            className="text-gray-500 hover:text-[#001937] transition-colors"
          >
            <FaTimes className="text-xl" />
          </button>
        </div>

        <div className="space-y-4">
          {socio.talegas.map((talega) => (
            <div 
              key={talega.id}
              className="bg-gray-50 p-4 rounded-lg"
            >
              <div className="flex justify-between items-start">
                <div>
                  <h3 className="font-semibold text-[#001937]">{talega.codigo}</h3>
                  <p className="text-sm text-gray-600">Ubicación: {talega.ubicacion}</p>
                </div>
                <span className={`px-2 py-1 rounded-full text-sm ${
                  talega.estado === 'Activo' 
                    ? 'bg-green-100 text-green-800' 
                    : 'bg-red-100 text-red-800'
                }`}>
                  {talega.estado}
                </span>
              </div>
            </div>
          ))}
        </div>

        <div className="flex justify-end mt-4 pt-4 border-t">
          <button
            onClick={onClose}
            className="px-4 py-2 bg-gray-100 text-gray-700 rounded-lg hover:bg-gray-200"
          >
            Cerrar
          </button>
        </div>
      </div>
    </div>
  );
} 