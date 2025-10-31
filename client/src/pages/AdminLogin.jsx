import React, { useState, useEffect } from 'react';
import API, { setAuthToken } from '../services/api';

export default function AdminLogin() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  // Clear fields on page load
  useEffect(() => {
    setEmail('');
    setPassword('');
  }, []);

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      const res = await API.post('/auth/login', { email, password });
      localStorage.setItem('token', res.data.token);
      setAuthToken(res.data.token);

      // Clear fields on successful login
      setEmail('');
      setPassword('');

      window.location.href = '/admin';
    } catch (err) {
      alert('Login failed: ' + (err.response?.data?.message || err.message));
      // Clear password on failed login
      setPassword('');
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      <form onSubmit={handleLogin} className="bg-white p-8 rounded shadow w-full max-w-sm">
        <h2 className="text-xl font-semibold mb-4">Admin Login</h2>
        <input
          type="email"
          autoComplete="off"
          placeholder="Email"
          value={email}
          onChange={e => setEmail(e.target.value)}
          className="border p-2 w-full mb-3 rounded"
          required
        />
        <input
          type="password"
          autoComplete="new-password"
          placeholder="Password"
          value={password}
          onChange={e => setPassword(e.target.value)}
          className="border p-2 w-full mb-3 rounded"
          required
        />
        <button className="bg-indigo-600 text-white px-4 py-2 rounded w-full">Login</button>
      </form>
    </div>
  );
}
