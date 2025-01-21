import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { FaUser, FaHome, FaBoxes, FaUsers, FaPlus, FaGolfBall } from 'react-icons/fa';

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
        <div className="min-h-screen flex flex-col bg-white">
            {/* Header */}
            <header className="border-b p-4 flex justify-between items-center bg-white shadow">
                <div className="flex items-center space-x-3">
                    <FaGolfBall className="text-[#FFC800] text-2xl" />
                    <span className="text-2xl font-bold text-[#001937]">Eaglebag</span>
                </div>
                <nav className="flex items-center space-x-8">
                    <a href="/dashboard" className="flex items-center space-x-2 text-[#001937] hover:text-[#FFC800]">
                        <FaHome className="text-lg" />
                        <span>Inicio</span>
                    </a>
                    <a href="/dashboard/inventory" className="flex items-center space-x-2 text-[#001937] hover:text-[#FFC800]">
                        <FaBoxes className="text-lg" />
                        <span>Inventario</span>
                    </a>
                    <a href="/dashboard/register" className="flex items-center space-x-2 text-[#001937] hover:text-[#FFC800]">
                        <FaPlus className="text-lg" />
                        <span>Registrar</span>
                    </a>
                    <a href="/dashboard/users" className="flex items-center space-x-2 text-[#001937] hover:text-[#FFC800]">
                        <FaUsers className="text-lg" />
                        <span>Usuarios</span>
                    </a>
                </nav>
                <button onClick={() => navigate('/')} className="p-2 text-[#001937] hover:text-[#FFC800]">
                    <FaUser className="text-xl" />
                </button>
            </header>

            {/* Main Content */}
            <main className="p-8 flex-1">
                <div className="max-w-6xl mx-auto">
                    {/* Search and Add Entry */}
                    <div className="flex justify-between items-center mb-8">
                        <input
                            type="search"
                            placeholder="Buscar en Inventario"
                            className="px-4 py-2 border rounded-lg w-64"
                        />
                        <button className="bg-[#FFC800] text-white px-4 py-2 rounded-lg shadow hover:bg-[#001937] hover:text-[#FFC800]">
                            Añadir Nuevo Registro
                        </button>
                    </div>

                    {/* Inventory Table */}
                    <div className="bg-white rounded-lg shadow">
                        <table className="min-w-full">
                            <thead>
                                <tr className="bg-[#001937] text-white">
                                    <th className="text-left py-4 px-6">Código del Socio</th>
                                    <th className="text-left py-4 px-6">Nombre del Socio</th>
                                    <th className="text-left py-4 px-6">Factura o Temporal</th>
                                    <th className="text-left py-4 px-6">Ubicación de la Bodega</th>
                                    <th className="text-left py-4 px-6">Num. de Talegas</th>
                                    <th className="text-left py-4 px-6">Acciones</th>
                                </tr>
                            </thead>
                            <tbody>
                                {inventory.map((item, index) => (
                                    <tr
                                        key={item.id}
                                        className={index % 2 === 0 ? 'bg-[#F9F9F9] text-[#001937]' : 'bg-white text-[#001937]'}
                                    >
                                        <td className="py-4 px-6">{item.socioCode}</td>
                                        <td className="py-4 px-6">{item.socioName}</td>
                                        <td className="py-4 px-6">{item.factura}</td>
                                        <td className="py-4 px-6">{item.ubicacion}</td>
                                        <td className="py-4 px-6">{item.talegas}</td>
                                        <td className="py-4 px-6">
                                            <div className="flex space-x-2">
                                                <button className="bg-[#FFC800] text-white px-4 py-1 rounded hover:bg-[#001937] hover:text-[#FFC800]">
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

            {/* Footer */}
            <footer className="border-t p-4 bg-white text-sm text-gray-600">
                <div className="flex justify-between items-center">
                    <p>© 2025 Quito Tenis & Golf Club. Todos los derechos reservados.</p>
                    <div className="space-x-4">
                        <a href="#" className="hover:text-[#001937]">Ayuda</a>
                        <a href="#" className="hover:text-[#001937]">Soporte</a>
                    </div>
                </div>
            </footer>
        </div>
    );
}

export default Inventory;
