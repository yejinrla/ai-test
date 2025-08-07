import React from 'react';
import { Link, useLocation } from 'react-router-dom';

const Navigation: React.FC = () => {
  const location = useLocation();

  return (
    <nav className="bg-white shadow-lg">
      <div className="max-w-6xl mx-auto px-4">
        <div className="flex justify-between items-center h-16">
          <div className="flex items-center space-x-8">
            <Link
              to="/"
              className={`text-lg font-semibold transition-colors ${
                location.pathname === '/' 
                  ? 'text-blue-600' 
                  : 'text-gray-700 hover:text-blue-600'
              }`}
            >
              홈
            </Link>
            <Link
              to="/about"
              className={`text-lg font-semibold transition-colors ${
                location.pathname === '/about' 
                  ? 'text-blue-600' 
                  : 'text-gray-700 hover:text-blue-600'
              }`}
            >
              About
            </Link>
          </div>
          <div className="text-sm text-gray-500">
            React Router 데모
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navigation; 