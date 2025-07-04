import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import Sidebar from './Sidebar';

const ResolvedTickets = () => {
  const [tickets, setTickets] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  const API_BASE_URL = import.meta.env.VITE_API_URL;

  useEffect(() => {
    const fetchTickets = async () => {
      setLoading(true);
      setError('');
      try {
        const token = localStorage.getItem('token');
        const res = await fetch(`${API_BASE_URL}/tickets?status=Resolved`, {
          headers: { Authorization: `Bearer ${token}` },
        });
        if (!res.ok) throw new Error('Could not fetch resolved tickets');
        const data = await res.json();
        setTickets(data);
      } catch (err) {
        setError('Could not fetch resolved tickets');
      } finally {
        setLoading(false);
      }
    };
    fetchTickets();
  }, []);

  return (
    <div className="flex min-h-screen bg-[#f7f8fa]">
      <Sidebar />
      <div className="flex-1 flex flex-col items-center justify-start p-12">
        <div className="bg-white border border-[#E5E7EB] rounded-xl px-8 py-6 shadow-sm w-full max-w-4xl mt-8">
          <h2 className="font-extrabold text-2xl mb-4">Resolved Tickets</h2>
          {loading ? (
            <div className="py-8 text-center text-gray-400 font-semibold">Loading...</div>
          ) : error ? (
            <div className="py-8 text-center text-red-500 font-semibold">{error}</div>
          ) : tickets.length === 0 ? (
            <div className="py-8 text-center text-gray-400 font-semibold">No resolved tickets found.</div>
          ) : (
            <table className="w-full text-left border-collapse">
              <thead>
                <tr className="bg-gray-50">
                  <th className="py-3 px-4 text-gray-400 font-bold border-b text-sm">Ticket ID</th>
                  <th className="py-3 px-4 text-gray-400 font-bold border-b text-sm">Type</th>
                  <th className="py-3 px-4 text-gray-400 font-bold border-b text-sm">Remarks</th>
                  <th className="py-3 px-4 text-gray-400 font-bold border-b text-sm">Date</th>
                  <th className="py-3 px-4 text-gray-400 font-bold border-b text-sm">Conversation</th>
                </tr>
              </thead>
              <tbody>
                {tickets.map((t, idx) => (
                  <tr key={t._id || idx} className="hover:bg-gray-50">
                    <td className="py-3 px-4 border-b text-gray-700 font-medium text-base">{t.ticketId || ''}</td>
                    <td className="py-3 px-4 border-b text-gray-700 text-base">{t.ticketType}</td>
                    <td className="py-3 px-4 border-b text-gray-700 text-base">{t.remarks || ''}</td>
                    <td className="py-3 px-4 border-b text-gray-700 text-base">{t.dateRaised ? new Date(t.dateRaised).toLocaleDateString('en-GB', { day: '2-digit', month: 'short', year: 'numeric' }) : ''}</td>
                    <td className="py-3 px-4 border-b text-blue-700 font-semibold">
                      <Link to={`/archived/${encodeURIComponent(t.ticketId)}`}>View Conversation</Link>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          )}
        </div>
      </div>
    </div>
  );
};

export default ResolvedTickets; 