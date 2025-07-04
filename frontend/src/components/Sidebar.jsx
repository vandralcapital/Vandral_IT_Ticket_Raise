import React from 'react';
import { useNavigate } from 'react-router-dom';

const Sidebar = () => {
  const navigate = useNavigate();

  const handleLogout = (e) => {
    e.preventDefault();
    localStorage.removeItem('token');
    navigate('/login');
  };

  return (
    <aside className="w-60 min-h-screen bg-[#f7f8fa] border-r border-gray-200 flex flex-col py-8 px-4 shadow-md">
      <div className="font-black text-2xl mb-10 pl-2 tracking-tight">Clearbizz</div>
      <nav className="flex flex-col gap-2">
        <button
          onClick={() => navigate(`/dashboard/${localStorage.getItem('username')}`)}
          className="flex items-center px-4 py-2.5 rounded-xl font-semibold text-blue-600 bg-blue-50 shadow group relative"
        >
          <span className="absolute left-0 top-1/2 -translate-y-1/2 w-2 h-2 bg-blue-600 rounded-full group-hover:scale-110 transition-transform"></span>
          <svg className="w-5 h-5 mr-3 text-blue-600" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><circle cx="12" cy="12" r="10" /></svg>
          Dashboard
        </button>
        <button
          onClick={() => navigate('/archived')}
          className="flex items-center px-4 py-2.5 rounded-xl font-medium text-gray-700 hover:bg-gray-100 transition group"
        >
          <svg className="w-5 h-5 mr-3 text-gray-400 group-hover:text-blue-600" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><path d="M12 20h9" /><path d="M12 4v16m8-8H4" /></svg>
          Resolved Tickets
        </button>
      </nav>
      <div className="mt-auto flex flex-col gap-2 pt-10">
        <button
          onClick={handleLogout}
          className="flex items-center px-4 py-2.5 rounded-xl font-medium text-gray-700 hover:bg-gray-100 transition"
        >
          <svg className="w-5 h-5 mr-3 text-gray-400" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><path d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a2 2 0 01-2 2H7a2 2 0 01-2-2V7a2 2 0 012-2h4a2 2 0 012 2v1" /></svg>
          Logout
        </button>
      </div>
    </aside>
  );
};

export default Sidebar; 