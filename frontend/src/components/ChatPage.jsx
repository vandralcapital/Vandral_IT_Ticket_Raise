import React from 'react';
import TicketConversation from './TicketConversation';
import { useNavigate } from 'react-router-dom';

const ChatPage = ({ ticketId }) => {
  const navigate = useNavigate();
  return (
    <div className="w-full h-full min-h-screen bg-gray-50 flex flex-col">
      <div className="w-full flex items-center p-6 pb-0">
        <button
          className="flex items-center gap-2 text-blue-600 font-semibold hover:underline hover:text-blue-800 transition"
          onClick={() => navigate(-1)}
        >
          <svg className="w-5 h-5" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" d="M15 19l-7-7 7-7" /></svg>
          Back
        </button>
      </div>
      <div className="flex-1 flex items-center justify-center w-full h-full">
        <div className="w-full h-full flex items-center justify-center">
          <TicketConversation ticketId={ticketId} fullScreen />
        </div>
      </div>
    </div>
  );
};

export default ChatPage; 