import React, { useEffect, useState } from 'react';

const API_BASE_URL = import.meta.env.VITE_API_URL;

const getInitials = (name, email) => {
  if (name && name.trim()) {
    return name.split(' ').map(n => n[0]).join('').toUpperCase();
  }
  if (email) {
    return email[0].toUpperCase();
  }
  return 'U';
};

const Header = () => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchUser = async () => {
      const token = localStorage.getItem('token');
      if (!token) return;
      try {
        const res = await fetch(`${API_BASE_URL}/me`, {
          headers: { Authorization: `Bearer ${token}` },
        });
        if (!res.ok) throw new Error('Not authenticated');
        const data = await res.json();
        setUser(data);
      } catch {
        setUser(null);
      } finally {
        setLoading(false);
      }
    };
    fetchUser();
  }, []);

  if (loading) {
    return <div className="h-24 flex items-center justify-end px-16 pt-12 pb-6">Loading...</div>;
  }

  return (
    <header className="flex items-center justify-between px-16 pt-12 pb-6 border-b border-gray-100 bg-transparent">
      <h2 className="font-extrabold text-4xl tracking-tight">
        Hi there, How can we <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-500 to-purple-500">help you?</span>
      </h2>
      <div className="flex items-center gap-4">
        <div className="w-12 h-12 rounded-full bg-gray-200 flex items-center justify-center font-bold text-gray-500 text-xl">
          {getInitials(user?.username, user?.email)}
        </div>
        <div className="text-left">
          <div className="font-semibold text-gray-700 text-lg">{user?.username || 'Employee'}</div>
          <div className="text-xs text-gray-400">{user?.email || ''}</div>
        </div>
      </div>
    </header>
  );
};

export default Header; 