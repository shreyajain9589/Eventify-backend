import React from 'react';
import { Link } from 'react-router-dom';

export default function Navbar() {
  // Check if admin token exists in localStorage
  const isAdminLoggedIn = !!localStorage.getItem('adminToken');

  return (
    <nav className="bg-gradient-to-r from-indigo-500 to-purple-500 text-white shadow-md">
      <div className="max-w-6xl mx-auto px-4 py-3 flex justify-between items-center">
        {/* Logo */}
        <Link to="/" className="font-bold text-xl">Eventify</Link>

        {/* Navigation Links */}
        <div className="flex gap-4 items-center">
          <Link to="/" className="hover:underline">Home</Link>
          <Link to="/events" className="hover:underline">Events</Link>

          {/* User login */}
          <Link to="/auth" className="hover:underline">Login</Link>

          {/* Admin Links */}
          {isAdminLoggedIn && (
            <Link to="/admin" className="hover:underline">Admin Dashboard</Link>
          )}
          <Link to="/admin/login" className="hover:underline">Admin Login</Link>
        </div>
      </div>
    </nav>
  );
}
