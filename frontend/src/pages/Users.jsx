import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { FaUser, FaHome, FaBoxes, FaUsers, FaPlus, FaGolfBall } from 'react-icons/fa';
import { NewUserModal } from '../components/NewUserModal';
import Header from '../components/Header';

export function Users() {
    const navigate = useNavigate();
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [users] = useState([
        { id: 1, name: 'John Smith', email: 'john.smith@example.com' },
        { id: 2, name: 'Emily Davis', email: 'emily.davis@example.com' },
        { id: 3, name: 'Michael Johnson', email: 'michael.johnson@example.com' },
        { id: 4, name: 'Sarah Lee', email: 'sarah.lee@example.com' },
        { id: 5, name: 'Laura Brown', email: 'laura.brown@example.com' },
        { id: 6, name: 'David Wilson', email: 'david.wilson@example.com' },
        { id: 7, name: 'Samantha Green', email: 'samantha.green@example.com' },
        { id: 8, name: 'Chris Evans', email: 'chris.evans@example.com' },
        { id: 9, name: 'Alice Cooper', email: 'alice.cooper@example.com' },
    ]);

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
                    <div className="bg-white rounded-lg shadow">
                        <table className="min-w-full">
                            <thead>
                                <tr className="bg-[#001937] text-white">
                                    <th className="text-left py-4 px-6">Nombre</th>
                                    <th className="text-left py-4 px-6">Correo Electrónico</th>
                                    <th className="text-left py-4 px-6">Acciones</th>
                                </tr>
                            </thead>
                            <tbody>
                                {users.map((user, index) => (
                                    <tr
                                        key={user.id}
                                        className={index % 2 === 0 ? 'bg-[#F9F9F9] text-[#001937]' : 'bg-white text-[#001937]'}
                                    >
                                        <td className="py-4 px-6">{user.name}</td>
                                        <td className="py-4 px-6">{user.email}</td>
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

            {isModalOpen && (
                <NewUserModal
                    isOpen={isModalOpen}
                    onClose={() => setIsModalOpen(false)}
                />
            )}
        </div>
    );
}

export default Users;
