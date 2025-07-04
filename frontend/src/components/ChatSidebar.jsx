import React from 'react';

const recentChats = [
  {
    id: 1,
    name: 'Real estate deals',
    avatar: 'https://randomuser.me/api/portraits/men/32.jpg',
    lastMessage: 'typing...',
    time: '11:15',
    typing: true,
  },
  {
    id: 2,
    name: 'Kate Johnson',
    avatar: 'https://randomuser.me/api/portraits/women/44.jpg',
    lastMessage: 'I will send the document s...',
    time: '11:15',
    typing: false,
  },
  {
    id: 3,
    name: 'Tamara Shevchenko',
    avatar: 'https://randomuser.me/api/portraits/women/65.jpg',
    lastMessage: 'are you going to a busine...',
    time: '10:05',
    typing: false,
  },
  {
    id: 4,
    name: 'Joshua Clarkson',
    avatar: 'https://randomuser.me/api/portraits/men/76.jpg',
    lastMessage: 'I suggest to start, I have n...',
    time: '15:09',
    typing: false,
  },
  {
    id: 5,
    name: 'Jeroen Zoet',
    avatar: 'https://randomuser.me/api/portraits/men/85.jpg',
    lastMessage: 'We need to start a new re...',
    time: '14:09',
    typing: false,
  },
];

const ChatSidebar = () => {
  return (
    <aside className="w-80 bg-white h-full flex flex-col border-r border-gray-100 shadow-sm rounded-l-2xl p-6">
      {/* User Profile */}
      <div className="flex flex-col items-center mb-8">
        <img
          src="https://randomuser.me/api/portraits/men/31.jpg"
          alt="User avatar"
          className="w-16 h-16 rounded-full border-4 border-white shadow"
        />
        <div className="mt-3 text-lg font-semibold">Jontray Arnold</div>
        <select className="mt-1 px-2 py-1 rounded bg-green-100 text-green-700 text-xs font-medium focus:outline-none">
          <option value="available">available</option>
          <option value="busy">busy</option>
          <option value="offline">offline</option>
        </select>
      </div>
      {/* Search Bar */}
      <div className="mb-4">
        <input
          type="text"
          placeholder="Search"
          className="w-full px-4 py-2 rounded-lg bg-gray-100 focus:bg-white focus:outline-none text-sm"
        />
      </div>
      {/* Recent Chats */}
      <div className="flex-1 overflow-y-auto">
        <div className="text-xs text-gray-400 mb-2">Last chats</div>
        <ul className="space-y-2">
          {recentChats.map(chat => (
            <li key={chat.id} className="flex items-center gap-3 p-2 rounded-lg hover:bg-gray-50 cursor-pointer transition">
              <img src={chat.avatar} alt={chat.name} className="w-10 h-10 rounded-full" />
              <div className="flex-1 min-w-0">
                <div className="font-medium text-gray-900 truncate">{chat.name}</div>
                <div className={`text-xs truncate ${chat.typing ? 'text-green-500 font-semibold' : 'text-gray-400'}`}>{chat.lastMessage}</div>
              </div>
              <div className="text-xs text-gray-400 ml-2">{chat.time}</div>
            </li>
          ))}
        </ul>
      </div>
    </aside>
  );
};

export default ChatSidebar; 