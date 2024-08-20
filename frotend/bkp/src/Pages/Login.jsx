import React, { useState } from 'react';
import axios from 'axios';

function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post(`${process.env.REACT_APP_API_URL}/organizer/login`, { org_mail: email, org_pass: password });
      console.log(response.data);
      localStorage.setItem('token', response.data.token);
      localStorage.setItem('org_id', response.data.user.id);

      window.location.href = '/dashboard';
    } catch (error) {
      console.error(error);
    }
  };

  

  return (
    <div className="min-h-[80vh] login-background flex items-center justify-center bg-gray-100 p-4">
      <form onSubmit={handleLogin} className="bg-white p-6 rounded-lg shadow-md w-full max-w-xl">
        <h2 className="text-2xl font-bold mb-4 text-center">Organizer Login</h2>
        <div className="mb-4">
          <label htmlFor="email" className="block text-gray-700 font-semibold mb-2">Email:</label>
          <input
            type="email"
            id="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
            className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-[#034F75]"
          />
        </div>
        <div className="mb-4">
          <label htmlFor="password" className="block text-gray-700 font-semibold mb-2">Password:</label>
          <input
            type="password"
            id="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
            className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-[#034F75]"
          />
        </div>
        <button
          type="submit"
          className="w-full bg-[#034F75] text-white py-2 mt-8 rounded-md hover:bg-teal-600 transition-colors duration-300"
        >
          Login
        </button>
      </form>
    </div>
  );
}

export default Login;
