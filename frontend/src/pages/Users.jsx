import { useState, useEffect } from 'react';
import { FaPlus, FaEdit, FaTrash } from 'react-icons/fa';
import { NewUserModal } from '../components/NewUserModal';
import Header from '../components/Header';

export function Users() {
    const [users, setUsers] = useState([]);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    const fetchUsers = async () => {
        try {
            const token = localStorage.getItem('token');
            if (!token) {
                throw new Error('No hay sesión activa');
            }

            const response = await fetch(`${import.meta.env.VITE_API_URL}/usuarios/obtener`, {
                headers: {
                    'Authorization': `Bearer ${token}`
                }
            });

            if (!response.ok) {
                if (response.status === 404) {
                    throw new Error('Recurso no encontrado');
                }
                const errorData = await response.json().catch(() => ({
                    error: 'Error de conexión con el servidor'
                }));
                throw new Error(errorData.error || 'Error al obtener usuarios');
            }

            const data = await response.json();
            if (Array.isArray(data)) {
                setUsers(data.map(user => ({
                    ...user,
                    codigo_colaborador: user.codigo_colaborador.toString()
                })));
            } else {
                throw new Error('Formato de datos inválido');
            }
        } catch (err) {
            setError(err.message);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchUsers();
    }, []);

    return (
        <div className="min-h-screen flex flex-col bg-white">
            <Header setSidebarOpen={() => {}} />

            {/* Main Content */}
            <main className="p-8 flex-1">
                <div className="max-w-6xl mx-auto">
                    {/* Search and Add User */}
                    <div className="flex justify-between items-center mb-8">
                        <input
                            type="search"
                            placeholder="Buscar Usuarios"
                            className="px-4 py-2 border rounded-lg w-64"
                        />
                        <button
                            onClick={() => setIsModalOpen(true)}
                            className="bg-[#FFC800] text-white px-4 py-2 rounded-lg shadow hover:bg-[#001937] hover:text-[#FFC800] flex items-center space-x-2"
                        >
                            <FaPlus />
                            <span>Añadir Nuevo Usuario</span>
                        </button>
                    </div>

                    {/* Users Table */}
                    {loading ? (
                        <div className="text-center py-4">Cargando usuarios...</div>
                    ) : error ? (
                        <div className="text-red-600 text-center py-4">{error}</div>
                    ) : (
                        <div className="bg-white rounded-lg shadow overflow-hidden">
                            <table className="min-w-full">
                                <thead>
                                    <tr className="bg-[#001937] text-white">
                                        <th className="text-left py-4 px-6">Código</th>
                                        <th className="text-left py-4 px-6">Usuario</th>
                                        <th className="text-left py-4 px-6">Correo</th>
                                        <th className="text-left py-4 px-6">Rol</th>
                                        <th className="text-center py-4 px-6">Estado</th>
                                        <th className="text-center py-4 px-6">Acciones</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {users.map((user, index) => (
                                        <tr
                                            key={user.codigo_colaborador}
                                            className={index % 2 === 0 ? 'bg-[#F9F9F9]' : 'bg-white'}
                                        >
                                            <td className="py-4 px-6">{user.codigo_colaborador}</td>
                                            <td className="py-4 px-6">{user.nombre_usuario}</td>
                                            <td className="py-4 px-6">{user.correo}</td>
                                            <td className="py-4 px-6">
                                                <span className={`px-2 py-1 rounded-full text-sm ${
                                                    user.rol === 'ADMIN' 
                                                        ? 'bg-purple-100 text-purple-800'
                                                        : user.rol === 'OPERADOR'
                                                        ? 'bg-blue-100 text-blue-800'
                                                        : 'bg-gray-100 text-gray-800'
                                                }`}>
                                                    {user.rol}
                                                </span>
                                            </td>
                                            <td className="py-4 px-6 text-center">
                                                <span className={`px-2 py-1 rounded-full text-sm ${
                                                    user.estado === 1
                                                        ? 'bg-green-100 text-green-800'
                                                        : 'bg-red-100 text-red-800'
                                                }`}>
                                                    {user.estado === 1 ? 'Activo' : 'Inactivo'}
                                                </span>
                                            </td>
                                            <td className="py-4 px-6">
                                                <div className="flex justify-center space-x-3">
                                                    <button 
                                                        className="text-blue-600 hover:text-blue-800"
                                                        title="Editar usuario"
                                                    >
                                                        <FaEdit size={18} />
                                                    </button>
                                                    <button 
                                                        className="text-red-600 hover:text-red-800"
                                                        title="Eliminar usuario"
                                                    >
                                                        <FaTrash size={18} />
                                                    </button>
                                                </div>
                                            </td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        </div>
                    )}
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

            {isModalOpen && (
                <NewUserModal
                    isOpen={isModalOpen}
                    onClose={() => setIsModalOpen(false)}
                    onUserCreated={fetchUsers}
                />
            )}
        </div>
    );
}

export default Users;
