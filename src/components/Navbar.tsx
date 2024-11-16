import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Code2, LogOut, BookOpen } from 'lucide-react';
import { auth } from '../firebase';
import { signOut } from 'firebase/auth';

const Navbar = () => {
  const navigate = useNavigate();

  const handleLogout = async () => {
    try {
      await signOut(auth);
      navigate('/login');
    } catch (error) {
      console.error('Error logging out:', error);
    }
  };

  return (
    <nav className="bg-white shadow-lg">
      <div className="max-w-7xl mx-auto px-4">
        <div className="flex justify-between h-16">
          <div className="flex items-center">
            <Link to="/" className="flex items-center space-x-2">
              <Code2 className="h-8 w-8 text-blue-600" />
              <span className="text-xl font-bold text-gray-900">JavaLab</span>
            </Link>
          </div>
          <div className="flex items-center space-x-4">
            <Link to="/editor" className="flex items-center space-x-1 text-gray-700 hover:text-blue-600">
              <Code2 className="h-5 w-5" />
              <span>Editor</span>
            </Link>
            <Link to="/" className="flex items-center space-x-1 text-gray-700 hover:text-blue-600">
              <BookOpen className="h-5 w-5" />
              <span>Tutorials</span>
            </Link>
            <button
              onClick={handleLogout}
              className="flex items-center space-x-1 text-gray-700 hover:text-red-600"
            >
              <LogOut className="h-5 w-5" />
              <span>Logout</span>
            </button>
          </div>
        </div>
      </div>
    </nav>
  );
}

export default Navbar;