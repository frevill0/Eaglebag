import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { FaUser, FaHome, FaBoxes, FaUsers, FaPlus, FaGolfBall, FaSearch, FaFilter, FaDownload } from 'react-icons/fa';
import { CSVLink } from 'react-csv';

export function Inventory() {
    const navigate = useNavigate();
    const [searchTerm, setSearchTerm] = useState('');
    const [filterOpen, setFilterOpen] = useState(false);
    const [selectedLocation, setSelectedLocation] = useState('todos');
    const [selectedStatus, setSelectedStatus] = useState('todos');

    const [inventory] = useState([
        { id: 1, socioCode: '001', socioName: 'Juan Pérez', factura: 'Temporal', ubicacion: 'Coche', talegas: 2, estado: 'Activo' },
        { id: 2, socioCode: '002', socioName: 'Ana López', factura: 'Factura', ubicacion: 'Nicho', talegas: 1, estado: 'Inactivo' },
        { id: 3, socioCode: '003', socioName: 'Carlos Díaz', factura: 'Temporal', ubicacion: 'Coche', talegas: 2, estado: 'Activo' },
        { id: 4, socioCode: '004', socioName: 'María García', factura: 'Factura', ubicacion: 'Nicho', talegas: 1, estado: 'Activo' },
        { id: 5, socioCode: '005', socioName: 'Luis Gómez', factura: 'Temporal', ubicacion: 'Coche', talegas: 2, estado: 'Inactivo' },
    ]);

    const headers = [
        { label: 'Código del Socio', key: 'socioCode' },
        { label: 'Nombre del Socio', key: 'socioName' },
        { label: 'Factura/Temporal', key: 'factura' },
        { label: 'Ubicación', key: 'ubicacion' },
        { label: 'Número de Talegas', key: 'talegas' },
        { label: 'Estado', key: 'estado' },
    ];

    const filteredInventory = inventory.filter(item => {
        const matchesSearch = 
            item.socioCode.toLowerCase().includes(searchTerm.toLowerCase()) ||
            item.socioName.toLowerCase().includes(searchTerm.toLowerCase()) ||
            item.factura.toLowerCase().includes(searchTerm.toLowerCase());
        
        const matchesLocation = selectedLocation === 'todos' || item.ubicacion.toLowerCase() === selectedLocation.toLowerCase();
        const matchesStatus = selectedStatus === 'todos' || item.estado.toLowerCase() === selectedStatus.toLowerCase();
        
        return matchesSearch && matchesLocation && matchesStatus;
    });

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

            <div className="flex flex-1">
                {/* Filtros laterales */}
                <aside className={`transform ${
                    filterOpen ? 'translate-x-0' : '-translate-x-full'
                } transition-transform duration-300 md:translate-x-0 fixed md:static md:block w-64 p-6 border-r bg-[#F9F9F9] z-10 h-full`}>
                    <h3 className="text-lg font-semibold mb-6 text-[#001937]">Filtros</h3>
                    
                    <div className="space-y-6">
                        {/* Filtro por ubicación */}
                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-2">
                                Ubicación
                            </label>
                            <select
                                value={selectedLocation}
                                onChange={(e) => setSelectedLocation(e.target.value)}
                                className="w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-[#FFC800] focus:outline-none"
                            >
                                <option value="todos">Todas</option>
                                <option value="coche">Coche</option>
                                <option value="nicho">Nicho</option>
                            </select>
                        </div>

                        {/* Filtro por estado */}
                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-2">
                                Estado
                            </label>
                            <select
                                value={selectedStatus}
                                onChange={(e) => setSelectedStatus(e.target.value)}
                                className="w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-[#FFC800] focus:outline-none"
                            >
                                <option value="todos">Todos</option>
                                <option value="activo">Activo</option>
                                <option value="inactivo">Inactivo</option>
                            </select>
                        </div>
                    </div>
                </aside>

                {/* Contenido principal */}
                <main className="flex-1 p-8">
                    <div className="max-w-screen-xl w-full mx-auto">
                        <div className="flex justify-between items-center mb-6">
                            <h2 className="text-2xl font-bold text-[#001937]">Inventario de Talegas</h2>
                            <button
                                onClick={() => setFilterOpen(!filterOpen)}
                                className="md:hidden bg-[#FFC800] text-white p-2 rounded-lg"
                            >
                                <FaFilter />
                            </button>
                        </div>

                        {/* Barra de búsqueda y botones */}
                        <div className="mb-6 flex flex-col sm:flex-row justify-between items-center gap-4">
                            <div className="relative w-full sm:w-96">
                                <input
                                    type="search"
                                    placeholder="Buscar por código, nombre o factura..."
                                    value={searchTerm}
                                    onChange={(e) => setSearchTerm(e.target.value)}
                                    className="w-full pl-10 pr-4 py-2 border rounded-lg focus:ring-2 focus:ring-[#FFC800] focus:outline-none"
                                />
                                <FaSearch className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
                            </div>
                            
                            <div className="flex gap-4">
                                <button className="px-4 py-2 bg-[#FFC800] text-white rounded-lg shadow hover:bg-[#001937] hover:text-[#FFC800] transition flex items-center gap-2">
                                    <FaPlus />
                                    Nuevo Registro
                                </button>
                                <CSVLink
                                    data={filteredInventory}
                                    headers={headers}
                                    filename={"inventario_talegas.csv"}
                                    className="px-4 py-2 bg-[#FFC800] text-white rounded-lg shadow hover:bg-[#001937] hover:text-[#FFC800] transition flex items-center gap-2"
                                >
                                    <FaDownload />
                                    Exportar
                                </CSVLink>
                            </div>
                        </div>

                        {/* Tabla mejorada */}
                        <div className="overflow-x-auto bg-white rounded-lg shadow">
                            <table className="min-w-full">
                                <thead className="bg-[#001937] text-white">
                                    <tr>
                                        <th className="px-6 py-3 text-left">Código del Socio</th>
                                        <th className="px-6 py-3 text-left">Nombre del Socio</th>
                                        <th className="px-6 py-3 text-left">Factura/Temporal</th>
                                        <th className="px-6 py-3 text-left">Ubicación</th>
                                        <th className="px-6 py-3 text-left">Num. de Talegas</th>
                                        <th className="px-6 py-3 text-left">Estado</th>
                                        <th className="px-6 py-3 text-left">Acciones</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {filteredInventory.map((item, index) => (
                                        <tr
                                            key={item.id}
                                            className={index % 2 === 0 ? 'bg-[#F9F9F9]' : 'bg-white'}
                                        >
                                            <td className="px-6 py-4 border-b">{item.socioCode}</td>
                                            <td className="px-6 py-4 border-b">{item.socioName}</td>
                                            <td className="px-6 py-4 border-b">
                                                <span className={`px-2 py-1 rounded-full text-sm ${
                                                    item.factura === 'Factura' 
                                                        ? 'bg-green-100 text-green-800' 
                                                        : 'bg-yellow-100 text-yellow-800'
                                                }`}>
                                                    {item.factura}
                                                </span>
                                            </td>
                                            <td className="px-6 py-4 border-b">{item.ubicacion}</td>
                                            <td className="px-6 py-4 border-b">{item.talegas}</td>
                                            <td className="px-6 py-4 border-b">
                                                <span className={`px-2 py-1 rounded-full text-sm ${
                                                    item.estado === 'Activo' 
                                                        ? 'bg-green-100 text-green-800' 
                                                        : 'bg-red-100 text-red-800'
                                                }`}>
                                                    {item.estado}
                                                </span>
                                            </td>
                                            <td className="px-6 py-4 border-b">
                                                <div className="flex space-x-2">
                                                    <button className="text-blue-600 hover:text-blue-800">
                                                        Ver detalles
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
