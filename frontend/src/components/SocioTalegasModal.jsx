import { FaTimes } from 'react-icons/fa';

export function SocioTalegasModal({ isOpen, onClose, socio }) {
  if (!isOpen || !socio) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white rounded-lg shadow-xl w-full max-w-3xl p-6 max-h-[90vh] overflow-y-auto">
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-2xl font-bold text-[#001937]">Información del Socio</h2>
          <button 
            onClick={onClose}
            className="text-gray-500 hover:text-[#001937] transition-colors"
          >
            <FaTimes size={24} />
          </button>
        </div>

        <div className="grid grid-cols-2 gap-6 mb-8">
          <div>
            <h3 className="font-semibold text-gray-700 mb-2">Información Personal</h3>
            <div className="space-y-3">
              <div>
                <p className="text-sm text-gray-500">Código de Socio</p>
                <p className="font-medium">{socio.codigo_socio}</p>
              </div>
              <div>
                <p className="text-sm text-gray-500">Nombre Completo</p>
                <p className="font-medium">{socio.nombres_completos}</p>
              </div>
              <div>
                <p className="text-sm text-gray-500">Correo Electrónico</p>
                <p className="font-medium">{socio.correo}</p>
              </div>
              <div>
                <p className="text-sm text-gray-500">Teléfono</p>
                <p className="font-medium">{socio.telefono || '-'}</p>
              </div>
            </div>
          </div>

          <div>
            <h3 className="font-semibold text-gray-700 mb-2">Información de Talegas</h3>
            <div className="space-y-3">
              <div>
                <p className="text-sm text-gray-500">Número de Talegas</p>
                <span className="inline-flex items-center px-3 py-1 rounded-full text-sm font-medium bg-blue-100 text-blue-800">
                  {socio.talegas?.length || 0} talegas
                </span>
              </div>
              {socio.talegas?.length > 0 && (
                <div>
                  <p className="text-sm text-gray-500 mb-2">Lista de Talegas</p>
                  <div className="space-y-2">
                    {socio.talegas.map((talega, index) => (
                      <div 
                        key={index}
                        className="flex justify-between items-center p-2 bg-gray-50 rounded-lg"
                      >
                        <span className="font-medium">Talega #{talega.numero}</span>
                        <span className={`px-2 py-1 rounded-full text-xs ${
                          talega.estado === 'Activa'
                            ? 'bg-green-100 text-green-800'
                            : 'bg-red-100 text-red-800'
                        }`}>
                          {talega.estado}
                        </span>
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>

        <div className="flex justify-end pt-4 border-t">
          <button
            onClick={onClose}
            className="px-4 py-2 bg-gray-100 text-gray-700 rounded-lg hover:bg-gray-200 transition-colors"
          >
            Cerrar
          </button>
        </div>
      </div>
    </div>
  );
} 