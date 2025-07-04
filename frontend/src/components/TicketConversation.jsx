import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';

const TicketConversation = ({ ticketId: propTicketId, archived }) => {
  const params = useParams();
  const ticketId = propTicketId || params.ticketId;
  const [messages, setMessages] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [newMsg, setNewMsg] = useState('');
  const [image, setImage] = useState(null);
  const [sending, setSending] = useState(false);
  const [modalImage, setModalImage] = useState(null);

  const senderAvatars = {
    ithead: 'https://randomuser.me/api/portraits/men/31.jpg',
    employee: 'https://randomuser.me/api/portraits/women/65.jpg',
  };

  useEffect(() => {
    const fetchMessages = async () => {
      setLoading(true);
      setError('');
      try {
        const token = localStorage.getItem('token');
        const res = await fetch(`${import.meta.env.VITE_BACKEND_URL}/tickets/${encodeURIComponent(ticketId)}/messages`, {
          headers: { Authorization: 'Bearer ' + token }
        });
        if (!res.ok) throw new Error('Could not fetch messages');
        const data = await res.json();
        setMessages(data);
      } catch (err) {
        setError('Could not load messages');
      }
      setLoading(false);
    };
    fetchMessages();
  }, [ticketId]);

  const handleSend = async (e) => {
    e.preventDefault();
    if (!newMsg.trim() && !image) return;
    setSending(true);
    try {
      const token = localStorage.getItem('token');
      let res, msg;
      if (image) {
        const formData = new FormData();
        if (newMsg.trim()) formData.append('text', newMsg);
        formData.append('image', image);
        res = await fetch(`${import.meta.env.VITE_BACKEND_URL}/tickets/${encodeURIComponent(ticketId)}/messages`, {
          method: 'POST',
          headers: {
            'Authorization': 'Bearer ' + token
          },
          body: formData
        });
      } else {
        res = await fetch(`${import.meta.env.VITE_BACKEND_URL}/tickets/${encodeURIComponent(ticketId)}/messages`, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            'Authorization': 'Bearer ' + token
          },
          body: JSON.stringify({ text: newMsg })
        });
      }
      if (!res.ok) throw new Error('Could not send message');
      msg = await res.json();
      setMessages(msgs => [...msgs, msg]);
      setNewMsg('');
      setImage(null);
    } catch {
      // Optionally show error
    }
    setSending(false);
  };

  return (
    <div className="w-full h-full min-h-screen flex flex-col bg-white">
      <h2 className="text-xl font-bold mb-4 px-8 pt-8">Ticket Conversation</h2>
      {loading ? (
        <div className="text-gray-400 flex-1 flex items-center justify-center">Loading...</div>
      ) : error ? (
        <div className="text-red-500 flex-1 flex items-center justify-center">{error}</div>
      ) : (
        <div className="flex-1 overflow-y-auto mb-4 space-y-6 px-8">
          {messages.length === 0 ? (
            <div className="text-gray-400 text-center">No messages yet.</div>
          ) : (
            messages.map((msg, i) => {
              const isMe = msg.sender === 'ithead';
              return (
                <div key={i} className={`flex ${isMe ? 'justify-end' : 'justify-start'}`}> 
                  <div className={`flex items-end gap-2 max-w-[70%] ${isMe ? 'flex-row-reverse' : ''}`}>
                    {/* Avatar */}
                    <img
                      src={senderAvatars[msg.sender] || 'https://randomuser.me/api/portraits/lego/1.jpg'}
                      alt={msg.sender}
                      className="w-8 h-8 rounded-full border shadow"
                    />
                    <div>
                      {/* Name & Timestamp */}
                      <div className={`text-xs mb-1 ${isMe ? 'text-blue-500 text-right' : 'text-gray-500 text-left'}`}>{msg.sender} • {new Date(msg.timestamp).toLocaleString()}</div>
                      {/* Bubble */}
                      <div className={`rounded-3xl px-5 py-3 shadow ${isMe ? 'bg-blue-100 text-blue-900' : 'bg-gray-100 text-gray-800'} relative`}>
                        {msg.text && <div className="whitespace-pre-line break-words">{msg.text}</div>}
                        {msg.imageUrl && (
                          <img
                            src={`${import.meta.env.VITE_BACKEND_URL}${msg.imageUrl}`}
                            alt="attachment"
                            className="mt-2 max-w-[200px] max-h-[200px] rounded-lg border cursor-pointer hover:opacity-80 transition"
                            onClick={() => setModalImage(`${import.meta.env.VITE_BACKEND_URL}${msg.imageUrl}`)}
                          />
                        )}
                      </div>
                    </div>
                  </div>
                </div>
              );
            })
          )}
        </div>
      )}
      {!archived && (
        <form onSubmit={handleSend} className="flex gap-2 items-center px-8 pb-8 pt-2 w-full">
          <input
            className="flex-1 border rounded-lg px-4 py-2 text-base"
            placeholder="Type a message..."
            value={newMsg}
            onChange={e => setNewMsg(e.target.value)}
            disabled={sending}
          />
          <label className="cursor-pointer">
            <input
              type="file"
              accept="image/*"
              className="hidden"
              onChange={e => setImage(e.target.files[0])}
              disabled={sending}
            />
            <span className="inline-block px-2 py-2 bg-gray-100 rounded hover:bg-gray-200">
              <svg className="w-5 h-5 text-gray-500" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" d="M15.172 7l-6.586 6.586a2 2 0 002.828 2.828l6.586-6.586M16 5v6h6" /></svg>
            </span>
          </label>
          <button
            type="submit"
            className="bg-blue-600 text-white rounded-lg px-4 py-2 font-semibold hover:bg-blue-700 disabled:opacity-50"
            disabled={sending || (!newMsg.trim() && !image)}
          >
            Send
          </button>
        </form>
      )}
      {image && (
        <div className="px-8 pb-2 text-xs text-gray-500">Selected: {image.name}</div>
      )}
      {modalImage && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-70"
          onClick={() => setModalImage(null)}
        >
          <div
            className="relative"
            onClick={e => e.stopPropagation()}
          >
            <img
              src={modalImage}
              alt="Full view"
              className="max-w-[90vw] max-h-[90vh] rounded shadow-lg"
            />
            <button
              className="absolute top-2 right-2 bg-white bg-opacity-80 rounded-full p-1 hover:bg-opacity-100 transition"
              onClick={() => setModalImage(null)}
              aria-label="Close"
            >
              <svg className="w-6 h-6 text-gray-700" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" /></svg>
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default TicketConversation; 