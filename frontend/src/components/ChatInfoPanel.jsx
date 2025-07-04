import React from 'react';

// Mock ticket data (replace with real fetch later)
const mockTicket = {
  ticketId: '#TID-2',
  groupName: 'Internet Issue',
  groupAvatar: 'https://images.unsplash.com/photo-1464983953574-0892a716854b?auto=format&fit=facearea&w=256&q=80',
  participants: [
    {
      role: 'employee',
      name: 'Alice Smith',
      email: 'alice@example.com',
      avatar: 'https://randomuser.me/api/portraits/women/65.jpg',
    },
    {
      role: 'ithead',
      name: 'Jontray Arnold',
      email: 'jontray@example.com',
      avatar: 'https://randomuser.me/api/portraits/men/31.jpg',
    },
  ],
  messages: [
    { sender: 'employee', text: 'see', imageUrl: '/uploads/mock1.png', timestamp: new Date() },
    { sender: 'ithead', text: 'ok', imageUrl: null, timestamp: new Date() },
    { sender: 'employee', text: '', imageUrl: '/uploads/mock2.png', timestamp: new Date() },
  ],
};

const fileTypes = [
  { name: 'Documents', count: 2, size: '1MB', color: 'bg-indigo-100', icon: (
    <svg className="w-6 h-6 text-indigo-400" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" d="M7 7V3a1 1 0 011-1h6a1 1 0 011 1v4m-8 0h8m-8 0v12a1 1 0 001 1h6a1 1 0 001-1V7m-8 0h8" /></svg>
  ) },
  { name: 'Photos', count: mockTicket.messages.filter(m => m.imageUrl).length, size: '2MB', color: 'bg-yellow-100', icon: (
    <svg className="w-6 h-6 text-yellow-400" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" d="M3 7a2 2 0 012-2h14a2 2 0 012 2v10a2 2 0 01-2 2H5a2 2 0 01-2-2V7zm0 0l7 7 4-4 5 5" /></svg>
  ) },
  { name: 'Movies', count: 0, size: '0MB', color: 'bg-cyan-100', icon: (
    <svg className="w-6 h-6 text-cyan-400" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" d="M15 10l4.553-2.276A1 1 0 0121 8.618v6.764a1 1 0 01-1.447.894L15 14M4 6v12a2 2 0 002 2h8a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2z" /></svg>
  ) },
  { name: 'Other', count: 1, size: '0.5MB', color: 'bg-rose-100', icon: (
    <svg className="w-6 h-6 text-rose-400" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" d="M12 4v16m8-8H4" /></svg>
  ) },
];

const ChatInfoPanel = () => {
  return (
    <aside className="w-80 bg-white h-full border-l border-gray-100 shadow-sm rounded-r-2xl p-6 flex flex-col">
      {/* Group/Chat Info */}
      <div className="flex flex-col items-center mb-8">
        <img
          src={mockTicket.groupAvatar}
          alt="Group avatar"
          className="w-16 h-16 rounded-full border-4 border-white shadow"
        />
        <div className="mt-3 text-lg font-semibold">{mockTicket.groupName}</div>
        <div className="text-xs text-gray-400 mt-1">{mockTicket.participants.length} members</div>
      </div>
      {/* Participants */}
      <div className="mb-6">
        <div className="text-xs text-gray-400 mb-2">Participants</div>
        <ul className="flex flex-col gap-2">
          {mockTicket.participants.map(p => (
            <li key={p.email} className="flex items-center gap-3">
              <img src={p.avatar} alt={p.name} className="w-8 h-8 rounded-full border" />
              <div>
                <div className="font-medium text-gray-900 text-sm">{p.name}</div>
                <div className="text-xs text-gray-400">{p.role}</div>
              </div>
            </li>
          ))}
        </ul>
      </div>
      {/* Shared Files Preview */}
      <div className="mb-6">
        <div className="text-xs text-gray-400 mb-2">Shared files</div>
        <div className="flex gap-2 overflow-x-auto">
          {mockTicket.messages.filter(m => m.imageUrl).map((m, i) => (
            <img
              key={i}
              src={m.imageUrl}
              alt="shared file"
              className="w-16 h-16 object-cover rounded-lg border shadow"
            />
          ))}
        </div>
      </div>
      {/* File Type Stats */}
      <div className="flex-1">
        <div className="text-xs text-gray-400 mb-2">File type</div>
        <ul className="space-y-2">
          {fileTypes.map(type => (
            <li key={type.name} className={`flex items-center gap-3 p-3 rounded-lg ${type.color}`}>
              {type.icon}
              <div className="flex-1 min-w-0">
                <div className="font-medium text-gray-900 truncate">{type.name}</div>
                <div className="text-xs text-gray-400">{type.count} files, {type.size}</div>
              </div>
              <svg className="w-4 h-4 text-gray-300" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7" /></svg>
            </li>
          ))}
        </ul>
      </div>
    </aside>
  );
};

export default ChatInfoPanel; 