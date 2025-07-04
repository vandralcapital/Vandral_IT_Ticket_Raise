import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';

const statusColors = {
  'In Process': 'text-yellow-500',
  'Submitted': 'text-blue-600',
  'Resolved': 'text-green-600',
  'Cancelled': 'text-red-500',
};

const TicketTable = () => {
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
        const res = await fetch(`${API_BASE_URL}/tickets`, {
          headers: { Authorization: `Bearer ${token}` },
        });
        if (!res.ok) throw new Error('Could not fetch tickets');
        const data = await res.json();
        setTickets(data);
      } catch (err) {
        setError('Could not fetch tickets');
      } finally {
        setLoading(false);
      }
    };
    fetchTickets();
  }, []);

  return (
    <div className="bg-white border border-[#E5E7EB] rounded-xl px-8 py-6 shadow-sm">
      <div className="flex items-center justify-between mb-2">
        <div>
          <h3 className="font-extrabold text-xl mb-1">Support Ticket History</h3>
          <div className="text-gray-400 text-sm">Here's your support ticket history</div>
        </div>
        <button className="px-4 py-2 rounded-lg bg-gray-100 text-gray-700 font-semibold text-sm hover:bg-gray-200 border border-gray-200">Export</button>
      </div>
      <div className="overflow-x-auto">
        {loading ? (
          <div className="py-8 text-center text-gray-400 font-semibold">Loading...</div>
        ) : error ? (
          <div className="py-8 text-center text-red-500 font-semibold">{error}</div>
        ) : tickets.length === 0 ? (
          <div className="py-8 text-center text-gray-400 font-semibold">No tickets raised yet.</div>
        ) : (
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="bg-gray-50">
                <th className="py-3 px-4 text-gray-400 font-bold border-b text-sm">Ticket ID</th>
                <th className="py-3 px-4 text-gray-400 font-bold border-b text-sm">Raised By</th>
                <th className="py-3 px-4 text-gray-400 font-bold border-b text-sm">Type</th>
                <th className="py-3 px-4 text-gray-400 font-bold border-b text-sm">Description</th>
                <th className="py-3 px-4 text-gray-400 font-bold border-b text-sm">Date</th>
                <th className="py-3 px-4 text-gray-400 font-bold border-b text-sm">Status</th>
                <th className="py-3 px-4 text-gray-400 font-bold border-b text-sm">Expected Fix</th>
                <th className="py-3 px-4 text-gray-400 font-bold border-b text-sm">Assigned To</th>
                <th className="py-3 px-4 text-gray-400 font-bold border-b text-sm">Last Updated By</th>
              </tr>
            </thead>
            <tbody>
              {tickets.map((t, idx) => (
                <tr key={t._id || idx} className="hover:bg-gray-50">
                  <td className="py-3 px-4 border-b text-gray-700 font-medium text-base">
                    <Link
                      to={`/tickets/${encodeURIComponent(t.ticketId)}/conversation`}
                      className="text-blue-700 hover:underline"
                    >
                      {t.ticketId || ''}
                    </Link>
                  </td>
                  <td className="py-3 px-4 border-b text-gray-700 text-base">{t.username} <span className="block text-xs text-gray-400">{t.email}</span></td>
                  <td className="py-3 px-4 border-b text-gray-700 text-base">{t.ticketType}</td>
                  <td className="py-3 px-4 border-b text-gray-700 text-base">{t.remarks || ''}</td>
                  <td className="py-3 px-4 border-b text-gray-700 text-base">{t.dateRaised ? new Date(t.dateRaised).toLocaleDateString('en-GB', { day: '2-digit', month: 'short', year: 'numeric' }) : ''}</td>
                  <td className={`py-3 px-4 border-b font-bold text-base ${statusColors[t.status]}`}>{t.status}</td>
                  <td className="py-3 px-4 border-b text-gray-700 text-base">{t.expectedFix ? new Date(t.expectedFix).toLocaleDateString('en-GB', { day: '2-digit', month: 'short', year: 'numeric' }) : ''}</td>
                  <td className="py-3 px-4 border-b text-gray-700 text-base">
                    {t.assignedTo?.username || '-'}
                    {t.assignedTo?.email ? (
                      <span className="block text-xs text-gray-400">{t.assignedTo.email}</span>
                    ) : null}
                  </td>
                  <td className="py-3 px-4 border-b text-gray-700 text-base">{t.lastUpdatedBy || '-'}</td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </div>
    </div>
  );
};

export default TicketTable; 