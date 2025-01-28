import { FaTimes } from 'react-icons/fa';

export function ConfirmDeleteModal({ isOpen, onClose, onConfirm, userName }) {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white rounded-lg shadow-xl w-full max-w-md p-6">
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-xl font-bold text-[#001937]">Confirmar Eliminación</h2>
          <button onClick={onClose} className="text-gray-500 hover:text-[#001937]">
            <FaTimes />
          </button>
        </div>

        <div className="mb-6">
          <p className="text-gray-600">
            ¿Estás seguro de que deseas eliminar al usuario <span className="font-semibold">{userName}</span>? 
            Esta acción no se puede deshacer.
          </p>
        </div>

        <div className="flex justify-end space-x-3">
          <button
            onClick={onClose}
            className="px-4 py-2 border rounded-lg hover:bg-gray-50"
          >
            Cancelar
          </button>
          <button
            onClick={onConfirm}
            className="px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700"
          >
            Eliminar
          </button>
        </div>
      </div>
    </div>
  );
} 