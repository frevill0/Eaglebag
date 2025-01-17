import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { FaChevronDown, FaUser, FaHome, FaBoxes, FaUsers } from 'react-icons/fa';
import productImage from '../assets/sets.jpg';

export function Dashboard() {
  
  const navigate = useNavigate();
  const [categoryOpen, setCategoryOpen] = useState(true);
  const [brandOpen, setBrandOpen] = useState(true);
  
  const [products] = useState([
    {
      id: 1,
      name: 'Titleist Pro V1 Golf Balls',
      description: 'High-performance golf balls for professional players.',
      stock: 120,
      image: productImage
    },
    // Más productos aquí
  ]);

  return (
    <div className="min-h-screen flex flex-col bg-white">
      {/* Header */}
      <header className="border-b p-4 flex justify-between items-center">
        <div className="flex items-center space-x-2">
          <span className="text-xl font-semibold">Eaglebag</span>
        </div>
        
        {/* Espacio flexible para empujar elementos a la derecha */}
        <div className="flex-1"></div>
        
        <nav className="flex items-center space-x-6">
          <a href="#" className="flex items-center space-x-1 text-gray-700 hover:text-gray-900">
            <FaHome className="text-lg" />
            <span>Home</span>
          </a>
          <a href="#" className="flex items-center space-x-1 text-gray-700 hover:text-gray-900">
            <FaBoxes className="text-lg" />
            <span>Inventory</span>
          </a>
          <a href="/dashboard/users" className="flex items-center space-x-1 text-gray-700 hover:text-gray-900">
            <FaUsers className="text-lg" />
            <span>Users</span>
          </a>
        </nav>
        <div className="ml-6">
          <button 
            onClick={() => navigate('/')} 
            className="p-2">
            <FaUser className="text-xl text-gray-700" />
          </button>
        </div>
      </header>

      <div className="flex flex-1">
        {/* Sidebar */}
        <aside className="w-64 p-6 border-r">
          <div className="space-y-6">
            <div>
              <h3 className="text-lg font-semibold mb-4">Filters</h3>
              
              {/* Category Dropdown */}
              <div className="mb-4">
                <button
                  onClick={() => setCategoryOpen(!categoryOpen)}
                  className="flex items-center justify-between w-full py-2 px-4 bg-gray-100 rounded-lg"
                >
                  <span className="font-medium">Category</span>
                  <FaChevronDown className={`transform transition-transform ${categoryOpen ? 'rotate-180' : ''}`} />
                </button>
                {categoryOpen && (
                  <ul className="mt-2 ml-4 space-y-2">
                    <li className="text-gray-600 hover:text-gray-900 cursor-pointer">Golf Clubs</li>
                    <li className="text-gray-600 hover:text-gray-900 cursor-pointer">Golf Balls</li>
                    <li className="text-gray-600 hover:text-gray-900 cursor-pointer">Accessories</li>
                  </ul>
                )}
              </div>

              {/* Brand Dropdown */}
              <div className="mb-4">
                <button
                  onClick={() => setBrandOpen(!brandOpen)}
                  className="flex items-center justify-between w-full py-2 px-4 bg-gray-100 rounded-lg"
                >
                  <span className="font-medium">Brand</span>
                  <FaChevronDown className={`transform transition-transform ${brandOpen ? 'rotate-180' : ''}`} />
                </button>
                {brandOpen && (
                  <ul className="mt-2 ml-4 space-y-2">
                    <li className="text-gray-600 hover:text-gray-900 cursor-pointer">Titleist</li>
                    <li className="text-gray-600 hover:text-gray-900 cursor-pointer">Callaway</li>
                    <li className="text-gray-600 hover:text-gray-900 cursor-pointer">Ping</li>
                  </ul>
                )}
              </div>
            </div>
          </div>
        </aside>

        {/* Main Content */}
        <main className="flex-1 p-6 overflow-auto">
          {/* Barra de búsqueda centrada */}
          <div className="flex justify-center mb-8">
            <div className="w-2/3">
              <input
                type="search"
                placeholder="Search inventory..."
                className="w-full px-4 py-2 border rounded-lg shadow-sm focus:ring-1 focus:ring-gray-200 focus:border-gray-200"
              />
            </div>
          </div>

          {/* Grid de productos */}
          <div className="grid grid-cols-3 gap-6">
            {products.map((product) => (
              <div key={product.id} className="border rounded-lg p-4 shadow-sm hover:shadow-md transition-shadow">
                <img
                  src={product.image}
                  alt={product.name}
                  className="w-full h-48 object-cover rounded-lg mb-4"
                />
                <h3 className="font-semibold text-lg">{product.name}</h3>
                <p className="text-sm text-gray-600 mb-2">{product.description}</p>
                <p className="text-sm">Stock: {product.stock}</p>
              </div>
            ))}
          </div>
        </main>
      </div>

      {/* Footer */}
      <footer className="border-t p-4 bg-white">
        <div className="flex justify-between items-center text-sm text-gray-600">
          <p>© 2023 Golf Storage. All rights reserved.</p>
          <div className="space-x-4">
            <a href="#" className="hover:text-gray-900">Help</a>
            <a href="#" className="hover:text-gray-900">Support</a>
          </div>
        </div>
      </footer>
    </div>
  );
}

export default Dashboard;
