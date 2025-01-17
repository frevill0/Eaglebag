import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { FaUser } from 'react-icons/fa';

export function Users() {
    const navigate = useNavigate();
  const [users] = useState([
    { id: 1, name: 'John Smith', email: 'john.smith@example.com' },
    { id: 2, name: 'Emily Davis', email: 'emily.davis@example.com' },
    { id: 3, name: 'Michael Johnson', email: 'michael.johnson@example.com' },
    { id: 4, name: 'John Smith', email: 'john.smith@example.com' },
    { id: 5, name: 'Emily Davis', email: 'emily.davis@example.com' },
    { id: 6, name: 'Michael Johnson', email: 'michael.johnson@example.com' },
    { id: 7, name: 'John Smith', email: 'john.smith@example.com' },
    { id: 8, name: 'Emily Davis', email: 'emily.davis@example.com' },
    { id: 9, name: 'Michael Johnson', email: 'michael.johnson@example.com' },
  ]);

  return (
    <div className="min-h-screen bg-white">
      {/* Header */}
      <header className="border-b p-4 flex justify-between items-center">
        <div className="flex items-center space-x-2">
          <span className="text-xl font-semibold">Eaglebag</span>
        </div>
        <div className="flex items-center space-x-6">
          <a href="/dashboard" className="text-gray-700 hover:text-gray-900">Home</a>
          <a href="#" className="text-gray-700 hover:text-gray-900">Inventory</a>
          <a href="#" className="text-gray-700 hover:text-gray-900">Users</a>
          <button  onClick={() => navigate('/')}
                     className="p-2">
            <FaUser className="text-xl text-gray-700" />
          </button>
        </div>
      </header>

      {/* Main Content */}
      <main className="p-8">
        <div className="max-w-6xl mx-auto">
          {/* Search and Add User */}
          <div className="flex justify-between items-center mb-8">
            <input
              type="search"
              placeholder="Search Users"
              className="px-4 py-2 border rounded-lg w-64"
            />
            <button className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700">
              Add New User
            </button>
          </div>

          {/* Users Table */}
          <div className="bg-white rounded-lg shadow">
            <table className="min-w-full">
              <thead>
                <tr className="border-b">
                  <th className="text-left py-4 px-6">Name</th>
                  <th className="text-left py-4 px-6">Email</th>
                  <th className="text-left py-4 px-6">Actions</th>
                </tr>
              </thead>
              <tbody>
                {users.map((user) => (
                  <tr key={user.id} className="border-b hover:bg-gray-50">
                    <td className="py-4 px-6">{user.name}</td>
                    <td className="py-4 px-6">{user.email}</td>
                    <td className="py-4 px-6">
                      <div className="flex space-x-2">
                        <button className="bg-blue-600 text-white px-4 py-1 rounded hover:bg-blue-700">
                          Edit
                        </button>
                        <button className="bg-gray-400 text-white px-4 py-1 rounded hover:bg-gray-500">
                          Delete
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

export default Users;
