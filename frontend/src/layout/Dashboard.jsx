import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { FaChevronDown, FaUser, FaHome, FaBoxes, FaUsers, FaGolfBall, FaBars } from 'react-icons/fa';
import productImage from '../assets/sets.jpg';

export function Dashboard() {
  const navigate = useNavigate();
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [categoryOpen, setCategoryOpen] = useState(false);
  const [brandOpen, setBrandOpen] = useState(false);

  const [products] = useState([
    {
      id: 1,
      name: 'Titleist Pro V1 Golf Balls',
      description: 'High-performance golf balls for professional players.',
      stock: 120,
      image: productImage,
    },
    {
      id: 2,
      name: 'Callaway Rogue ST Driver',
      description: 'Innovative driver for maximum distance and forgiveness.',
      stock: 50,
      image: productImage,
    },
    {
      id: 3,
      name: 'Ping G425 Irons',
      description: 'Precision-engineered irons for improved control.',
      stock: 30,
      image: productImage,
    },
    {
      id: 4,
      name: 'TaylorMade Spider GT Putter',
      description: 'Stability and control on the green.',
      stock: 70,
      image: productImage,
    },
    {
      id: 5,
      name: 'Titleist Players 4 Stand Bag',
      description: 'Lightweight and durable golf bag.',
      stock: 25,
      image: productImage,
    },
    {
      id: 6,
      name: 'Ping G425 Driver',
      description: 'Advanced technology for maximum distance.',
      stock: 60,
      image: productImage,
    },
    {
      id: 7,
      name: 'Callaway Apex 21 Irons',
      description: 'Blended performance with forged design.',
      stock: 45,
      image: productImage,
    },
    {
      id: 8,
      name: 'TaylorMade SIM2 Driver',
      description: 'Revolutionary design for distance and forgiveness.',
      stock: 80,
      image: productImage,
    },
    {
      id: 9,
      name: 'Titleist TSi2 Fairway Wood',
      description: 'Innovative design for versatility and performance.',
      stock: 40,
      image: productImage,
    },
    {
      id: 10,
      name: 'Callaway Big Bertha B21 Irons',
      description: 'Maximum forgiveness for high handicappers.',
      stock: 35,
      image: productImage,
    },
  ]);

  return (
    <div className="min-h-screen flex flex-col bg-white">
      {/* Header */}
      <header className="border-b p-4 flex justify-between items-center bg-white shadow">
        <div className="flex items-center space-x-3">
          <button onClick={() => setSidebarOpen(!sidebarOpen)} className="text-[#001937] hover:text-[#FFC800] md:hidden">
            <FaBars className="text-2xl" />
          </button>
          <FaGolfBall className="text-[#FFC800] text-2xl" />
          <span className="text-2xl font-bold text-[#001937]">Eaglebag</span>
        </div>

        <nav className="flex items-center space-x-8">
          <a href="#" className="flex items-center space-x-2 text-[#001937] hover:text-[#FFC800]">
            <FaHome className="text-lg" />
            <span>Home</span>
          </a>
          <a href="/dashboard/inventory" className="flex items-center space-x-2 text-[#001937] hover:text-[#FFC800]">
            <FaBoxes className="text-lg" />
            <span>Inventory</span>
          </a>
          <a href="/dashboard/users" className="flex items-center space-x-2 text-[#001937] hover:text-[#FFC800]">
            <FaUsers className="text-lg" />
            <span>Users</span>
          </a>
        </nav>

        <button onClick={() => navigate('/')} className="p-2 text-[#001937] hover:text-[#FFC800]">
          <FaUser className="text-xl" />
        </button>
      </header>

      <div className="flex flex-1">
        {/* Sidebar */}
        <aside
          className={`transform ${
            sidebarOpen ? 'translate-x-0' : '-translate-x-full'
          } transition-transform duration-300 md:translate-x-0 fixed md:static md:block w-64 p-6 border-r bg-[#F9F9F9] z-10`}
        >
          <h3 className="text-lg font-semibold mb-6 text-[#001937]">Filters</h3>

          {/* Category Dropdown */}
          <div className="mb-6">
            <button
              onClick={() => setCategoryOpen(!categoryOpen)}
              className="flex items-center justify-between w-full py-3 px-4 bg-white rounded-lg hover:shadow-md transition-shadow"
            >
              <span className="font-medium text-[#001937]">Category</span>
              <FaChevronDown
                className={`text-[#001937] transform transition-transform ${
                  categoryOpen ? 'rotate-180' : ''
                }`}
              />
            </button>
            {categoryOpen && (
              <ul className="mt-3 space-y-2 pl-4">
                <li className="text-gray-700 hover:text-[#007B3E] cursor-pointer">Golf Clubs</li>
                <li className="text-gray-700 hover:text-[#007B3E] cursor-pointer">Golf Balls</li>
                <li className="text-gray-700 hover:text-[#007B3E] cursor-pointer">Accessories</li>
              </ul>
            )}
          </div>

          {/* Brand Dropdown */}
          <div className="mb-6">
            <button
              onClick={() => setBrandOpen(!brandOpen)}
              className="flex items-center justify-between w-full py-3 px-4 bg-white rounded-lg hover:shadow-md transition-shadow"
            >
              <span className="font-medium text-[#001937]">Brand</span>
              <FaChevronDown
                className={`text-[#001937] transform transition-transform ${
                  brandOpen ? 'rotate-180' : ''
                }`}
              />
            </button>
            {brandOpen && (
              <ul className="mt-3 space-y-2 pl-4">
                <li className="text-gray-700 hover:text-[#007B3E] cursor-pointer">Titleist</li>
                <li className="text-gray-700 hover:text-[#007B3E] cursor-pointer">Callaway</li>
                <li className="text-gray-700 hover:text-[#007B3E] cursor-pointer">Ping</li>
              </ul>
            )}
          </div>
        </aside>

        {/* Main Content */}
        <main className="flex-1 p-8 md:ml-16 flex justify-center">
          <div className="max-w-screen-xl w-full">
            <div className="flex justify-center mb-8">
              <input
                type="search"
                placeholder="Search inventory..."
                className="w-2/3 px-4 py-3 border rounded-lg shadow-sm focus:ring-2 focus:ring-[#FFC800] focus:outline-none"
              />
            </div>

            <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-6 md:gap-8">
              {products.map((product) => (
                <div
                  key={product.id}
                  className="border rounded-lg p-4 shadow-md bg-white hover:shadow-lg transition-shadow"
                >
                  <img
                    src={product.image}
                    alt={product.name}
                    className="w-full h-48 object-cover rounded-lg mb-4"
                  />
                  <h3 className="font-semibold text-lg text-[#001937]">{product.name}</h3>
                  <p className="text-sm text-gray-600 mb-2">{product.description}</p>
                  <p className="text-sm font-medium">Stock: {product.stock}</p>
                </div>
              ))}
            </div>
          </div>
        </main>
      </div>

      {/* Footer */}
      <footer className="border-t p-4 bg-white text-sm text-gray-600">
        <div className="flex justify-between items-center">
          <p>© 2025 Quito Tenis & Golf Club. Todos los derechos reservados.</p>
          <div className="space-x-4">
            <a href="#" className="hover:text-[#001937]">Help</a>
            <a href="#" className="hover:text-[#001937]">Support</a>
          </div>
        </div>
      </footer>
    </div>
  );
}

export default Dashboard;
