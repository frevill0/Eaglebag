import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { FaUser } from 'react-icons/fa';

export function Inventory() {
    const navigate = useNavigate();
    const [inventory] = useState([
        { id: 1, socioCode: '001', socioName: 'Juan Pérez', factura: 'Temporal', ubicacion: 'Coche', talegas: 2 },
        { id: 2, socioCode: '002', socioName: 'Ana López', factura: 'Factura', ubicacion: 'Nicho', talegas: 1 },
        { id: 3, socioCode: '003', socioName: 'Carlos Díaz', factura: 'Temporal', ubicacion: 'Coche', talegas: 2 },
        { id: 4, socioCode: '004', socioName: 'María García', factura: 'Factura', ubicacion: 'Nicho', talegas: 1 },
        { id: 5, socioCode: '005', socioName: 'Luis Gómez', factura: 'Temporal', ubicacion: 'Coche', talegas: 2 },
    ]);

    return (
        <div className="min-h-screen bg-white">
            {/* Header */}
            <header className="border-b p-4 flex justify-between items-center">
                <div className="flex items-center space-x-2">
                    <span className="text-xl font-semibold">Eaglebag - Inventario</span>
                </div>
                <div className="flex items-center space-x-6">
                    <a href="/dashboard" className="text-gray-700 hover:text-gray-900">Home</a>
                    <a href="#" className="text-gray-700 hover:text-gray-900">Inventario</a>
                    <a href="/users" className="text-gray-700 hover:text-gray-900">Usuarios</a>
                    <button onClick={() => navigate('/')} className="p-2">
                        <FaUser className="text-xl text-gray-700" />
                    </button>
                </div>
            </header>

            {/* Main Content */}
            <main className="p-8">
                <div className="max-w-6xl mx-auto">
                    {/* Search and Add Entry */}
                    <div className="flex justify-between items-center mb-8">
                        <input
                            type="search"
                            placeholder="Buscar en Inventario"
                            className="px-4 py-2 border rounded-lg w-64"
                        />
                        <button className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700">
                            Añadir Nuevo Registro
                        </button>
                    </div>

                    {/* Inventory Table */}
                    <div className="bg-white rounded-lg shadow">
                        <table className="min-w-full">
                            <thead>
                                <tr className="border-b">
                                    <th className="text-left py-4 px-6">Código del Socio</th>
                                    <th className="text-left py-4 px-6">Nombre del Socio</th>
                                    <th className="text-left py-4 px-6">Factura o Temporal</th>
                                    <th className="text-left py-4 px-6">Ubicación de la Bodega</th>
                                    <th className="text-left py-4 px-6">Num. de Talegas</th>
                                    <th className="text-left py-4 px-6">Acciones</th>
                                </tr>
                            </thead>
                            <tbody>
                                {inventory.map((item) => (
                                    <tr key={item.id} className="border-b hover:bg-gray-50">
                                        <td className="py-4 px-6">{item.socioCode}</td>
                                        <td className="py-4 px-6">{item.socioName}</td>
                                        <td className="py-4 px-6">{item.factura}</td>
                                        <td className="py-4 px-6">{item.ubicacion}</td>
                                        <td className="py-4 px-6">{item.talegas}</td>
                                        <td className="py-4 px-6">
                                            <div className="flex space-x-2">
                                                <button className="bg-blue-600 text-white px-4 py-1 rounded hover:bg-blue-700">
                                                    Editar
                                                </button>
                                                <button className="bg-gray-400 text-white px-4 py-1 rounded hover:bg-gray-500">
                                                    Eliminar
                                                </button>
                                            </div>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                </div>
            </main>
        </div>
    );
}

export default Inventory;
