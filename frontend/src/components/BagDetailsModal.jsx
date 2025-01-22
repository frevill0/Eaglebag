import { FaTimes, FaHistory } from 'react-icons/fa';

export function BagDetailsModal({ bag, onClose }) {
  if (!bag) return null;

  const movementHistory = [
    { date: '2024-03-20', type: 'Entrada', location: 'Coche A-1' },
    { date: '2024-03-15', type: 'Salida', location: 'Nicho B-2' },
    { date: '2024-03-10', type: 'Entrada', location: 'Coche C-3' },
  ];

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white rounded-lg shadow-xl w-full max-w-4xl p-6 max-h-[90vh] overflow-y-auto">
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-2xl font-bold text-[#001937]">Detalles de la Talega</h2>
          <button 
            onClick={onClose} 
            className="text-gray-500 hover:text-[#001937] transition-colors"
          >
            <FaTimes className="text-xl" />
          </button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {/* Información Principal */}
          <div className="space-y-6">
            <img 
              src={bag.image} 
              alt={`Talega ${bag.bagCode}`}
              className="w-full h-64 object-cover rounded-lg shadow"
            />
            
            <div className="bg-gray-50 p-4 rounded-lg">
              <h3 className="font-semibold text-lg text-[#001937] mb-4">Información General</h3>
              <div className="space-y-3">
                <div>
                  <span className="text-sm text-gray-500">Código de Talega</span>
                  <p className="font-semibold text-[#001937]">{bag.bagCode}</p>
                </div>
                <div>
                  <span className="text-sm text-gray-500">Socio</span>
                  <p className="font-semibold text-[#001937]">{bag.socioName}</p>
                  <p className="text-sm text-gray-600">Código: {bag.socioCode}</p>
                </div>
                <div>
                  <span className="text-sm text-gray-500">Estado</span>
                  <span className={`inline-block px-2 py-1 rounded-full text-sm mt-1 ${
                    bag.status === 'Activo' 
                      ? 'bg-green-100 text-green-800' 
                      : 'bg-red-100 text-red-800'
                  }`}>
                    {bag.status}
                  </span>
                </div>
              </div>
            </div>
          </div>

          {/* Historial y Detalles */}
          <div className="space-y-6">
            <div className="bg-gray-50 p-4 rounded-lg">
              <h3 className="font-semibold text-lg text-[#001937] mb-4">Ubicación Actual</h3>
              <div className="space-y-2">
                <p className="text-lg font-semibold text-[#001937]">{bag.location}</p>
                <p className="text-sm text-gray-600">Último movimiento: {bag.lastMovement}</p>
              </div>
            </div>

            <div className="bg-gray-50 p-4 rounded-lg">
              <h3 className="flex items-center gap-2 font-semibold text-lg text-[#001937] mb-4">
                <FaHistory className="text-[#FFC800]" />
                Historial de Movimientos
              </h3>
              <div className="space-y-4">
                {movementHistory.map((movement, index) => (
                  <div 
                    key={index}
                    className="flex items-center justify-between border-b pb-2 last:border-0"
                  >
                    <div>
                      <p className="font-medium text-[#001937]">{movement.type}</p>
                      <p className="text-sm text-gray-500">{movement.location}</p>
                    </div>
                    <span className="text-sm text-gray-500">{movement.date}</span>
                  </div>
                ))}
              </div>
            </div>

            <div className="bg-gray-50 p-4 rounded-lg">
              <h3 className="font-semibold text-lg text-[#001937] mb-4">Descripción</h3>
              <p className="text-gray-600">{bag.description}</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
} 