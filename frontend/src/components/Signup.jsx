import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';

const skillOptions = [
  'Hardware',
  'Software',
  'Networking',
  'IT Support',
  'HR',
  'Admin',
  'Finance',
  'General',
];

const Signup = () => {
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [role, setRole] = useState('employee');
  const [error, setError] = useState('');
  const [skills, setSkills] = useState([]);
  const navigate = useNavigate();

  const handleSkillChange = (e) => {
    const value = e.target.value;
    setSkills(prev =>
      prev.includes(value)
        ? prev.filter(skill => skill !== value)
        : [...prev, value]
    );
  };

  const handleSubmit = async e => {
    e.preventDefault();
    setError('');
    try {
      const res = await fetch(`${import.meta.env.VITE_BACKEND_URL}/signup`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ username, email, password, role, skills: role === 'ithead' ? skills : [] })
      });
      if (!res.ok) {
        const data = await res.json();
        setError(data.error || 'Signup failed');
        return;
      }
      navigate('/login');
    } catch (err) {
      setError('Signup failed');
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-[#f7f8fa]">
      <form onSubmit={handleSubmit} className="bg-white border border-[#E5E7EB] rounded-xl px-8 py-8 shadow-sm w-full max-w-md">
        <h2 className="text-2xl font-extrabold mb-6 text-center">Sign Up</h2>
        {error && <div className="mb-4 text-red-500 text-center font-semibold">{error}</div>}
        <div className="mb-4">
          <label className="block text-gray-700 font-semibold mb-2">Username</label>
          <input
            className="w-full px-4 py-3 rounded-lg border border-gray-200 bg-gray-100 text-gray-800 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-200"
            type="text"
            placeholder="Choose a username"
            value={username}
            onChange={e => setUsername(e.target.value)}
            required
          />
        </div>
        <div className="mb-4">
          <label className="block text-gray-700 font-semibold mb-2">Email</label>
          <input
            className="w-full px-4 py-3 rounded-lg border border-gray-200 bg-gray-100 text-gray-800 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-200"
            type="email"
            placeholder="Enter your email"
            value={email}
            onChange={e => setEmail(e.target.value)}
            required
          />
        </div>
        <div className="mb-6">
          <label className="block text-gray-700 font-semibold mb-2">Password</label>
          <input
            className="w-full px-4 py-3 rounded-lg border border-gray-200 bg-gray-100 text-gray-800 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-200"
            type="password"
            placeholder="Create a password"
            value={password}
            onChange={e => setPassword(e.target.value)}
            required
          />
        </div>
        <div className="mb-6">
          <label className="block text-gray-700 font-semibold mb-2">Role</label>
          <select
            className="w-full px-4 py-3 rounded-lg border border-gray-200 bg-gray-100 text-gray-800 focus:outline-none focus:ring-2 focus:ring-blue-200"
            value={role}
            onChange={e => setRole(e.target.value)}
            required
          >
            <option value="employee">Employee</option>
            <option value="ithead">IT Head</option>
          </select>
        </div>
        {role === 'ithead' && (
          <div className="mb-6">
            <label className="block text-gray-700 font-semibold mb-2">Select your skills:</label>
            <div className="flex flex-wrap gap-3">
              {skillOptions.map(skill => (
                <label key={skill} className="flex items-center gap-1 text-gray-700">
                  <input
                    type="checkbox"
                    value={skill}
                    checked={skills.includes(skill)}
                    onChange={handleSkillChange}
                    className="accent-blue-600"
                  />
                  {skill}
                </label>
              ))}
            </div>
          </div>
        )}
        <button type="submit" className="w-full py-3 rounded-lg bg-blue-600 text-white font-bold hover:bg-blue-700 transition-colors text-base shadow mb-4">Sign Up</button>
        <div className="text-center text-sm text-gray-500">
          Already have an account?{' '}
          <Link to="/login" className="text-blue-600 hover:underline font-semibold">Sign In</Link>
        </div>
      </form>
    </div>
  );
};

export default Signup; 