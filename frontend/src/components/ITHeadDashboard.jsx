import React, { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';

const Sidebar = () => {
  const navigate = useNavigate();
  return (
    <aside className="w-60 min-h-screen bg-[#f5f6fa] border-r border-gray-200 flex flex-col py-8 px-4 shadow-md">
      <div className="font-black text-2xl mb-10 pl-2 tracking-tight">IT Admin</div>
      <nav className="flex flex-col gap-2">
        <a href="#" className="flex items-center px-4 py-2.5 rounded-xl font-semibold text-blue-600 bg-blue-50 shadow group relative">
          <span className="absolute left-0 top-1/2 -translate-y-1/2 w-2 h-2 bg-blue-600 rounded-full group-hover:scale-110 transition-transform"></span>
          <svg className="w-5 h-5 mr-3 text-blue-600" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><circle cx="12" cy="12" r="10" /></svg>
          Overview
        </a>
        <a href="#" className="flex items-center px-4 py-2.5 rounded-xl font-medium text-gray-700 hover:bg-gray-100 transition group">
          <svg className="w-5 h-5 mr-3 text-gray-400 group-hover:text-blue-600" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><rect x="4" y="4" width="16" height="16" rx="2" /></svg>
          Tickets
          <span className="ml-auto text-xs bg-blue-100 text-blue-600 rounded-full px-2 py-0.5 font-semibold">3</span>
        </a>
        <button
          onClick={() => navigate('/archived')}
          className="flex items-center px-4 py-2.5 rounded-xl font-medium text-gray-700 hover:bg-gray-100 transition group"
        >
          <svg className="w-5 h-5 mr-3 text-gray-400 group-hover:text-blue-600" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><path d="M12 20h9" /><path d="M12 4v16m8-8H4" /></svg>
          Resolved Tickets
        </button>
      </nav>
      <div className="mt-auto flex flex-col gap-2 pt-10">
        <button className="flex items-center px-4 py-2.5 rounded-xl font-medium text-gray-700 hover:bg-gray-100 transition">
          <svg className="w-5 h-5 mr-3 text-gray-400" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><path d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a2 2 0 01-2 2H7a2 2 0 01-2-2V7a2 2 0 012-2h4a2 2 0 012 2v1" /></svg>
          Logout
        </button>
      </div>
    </aside>
  );
};

const Topbar = () => (
  <header className="flex items-center justify-between px-10 pt-8 pb-6 border-b border-gray-100 bg-white sticky top-0 z-10">
    <div className="flex items-center gap-4 w-1/2">
      <input className="w-full px-5 py-3 rounded-xl border border-gray-200 bg-gray-100 text-gray-800 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-200 shadow" placeholder="Search anything..." />
    </div>
    <div className="flex items-center gap-4">
      <button className="px-6 py-2 rounded-xl bg-blue-600 text-white font-bold hover:bg-blue-700 transition-colors text-base shadow-lg">Create</button>
      <div className="w-11 h-11 rounded-full bg-gray-200 flex items-center justify-center font-bold text-gray-500 text-lg hover:ring-2 hover:ring-blue-200 transition">IT</div>
    </div>
  </header>
);

const StatCard = ({ label, value, change, positive }) => (
  <div className="flex-1 bg-white rounded-xl shadow border border-gray-100 p-6 flex flex-col min-h-[120px] mr-2 last:mr-0">
    <div className="flex items-center justify-between mb-1">
      <div className="text-base font-bold text-gray-900">{label}</div>
      <span className={`text-xs px-2 py-0.5 rounded-full font-semibold ${positive ? 'bg-green-100 text-green-600' : 'bg-red-100 text-red-600'}`}>{change}</span>
    </div>
    <div className="text-4xl font-extrabold text-gray-900 mb-0.5">{value}</div>
    <div className="text-xs text-gray-400">vs last month</div>
  </div>
);

const AvatarsRow = ({ topStaff }) => (
  <div className="flex items-center gap-3 mt-4 min-h-[36px]">
    {topStaff.length === 0 ? (
      <span className="text-gray-400 text-base font-semibold">No ticket assigned</span>
    ) : (
      topStaff.map((staff, i) => (
        <div key={i} className="w-9 h-9 rounded-full flex items-center justify-center font-bold text-white text-base border-2 border-white shadow" style={{background: staff.color}}>{staff.initials}</div>
      ))
    )}
    <a href="#" className="ml-2 text-xs text-blue-600 font-semibold px-3 py-1 rounded-full bg-blue-50 hover:bg-blue-100 transition">View all</a>
  </div>
);

const DonutChart = ({ categories }) => {
  // categories: { Hardware: n, Software: n, Network: n }
  const total = Object.values(categories).reduce((a, b) => a + b, 0) || 1;
  const hardwarePct = (categories.Hardware || 0) / total;
  const softwarePct = (categories.Software || 0) / total;
  const networkPct = (categories.Network || 0) / total;
  // SVG donut math
  const CIRC = 302;
  return (
    <div className="flex flex-col items-center justify-center h-full relative">
      <svg width="110" height="110" viewBox="0 0 110 110">
        <circle cx="55" cy="55" r="48" stroke="#e5e7eb" strokeWidth="12" fill="none" />
        <circle cx="55" cy="55" r="48" stroke="#f59e42" strokeWidth="12" fill="none" strokeDasharray={CIRC} strokeDashoffset={CIRC * (1 - hardwarePct)} strokeLinecap="round" />
        <circle cx="55" cy="55" r="48" stroke="#60a5fa" strokeWidth="12" fill="none" strokeDasharray={CIRC} strokeDashoffset={CIRC * (1 - softwarePct - hardwarePct)} strokeLinecap="round" />
        <circle cx="55" cy="55" r="48" stroke="#a78bfa" strokeWidth="12" fill="none" strokeDasharray={CIRC} strokeDashoffset={CIRC * (1 - networkPct - softwarePct - hardwarePct)} strokeLinecap="round" />
      </svg>
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 text-2xl font-extrabold text-gray-900">{Math.round(hardwarePct * 100)}%</div>
      <div className="text-xs text-gray-400 mt-2">Hardware</div>
    </div>
  );
};

const TicketList = ({ recent }) => (
  <div className="flex flex-col gap-4 mt-2">
    {recent.length === 0 ? (
      [1,2,3,4].map((_, i) => (
        <div key={i} className="flex items-center justify-between opacity-50">
          <div className="flex items-center gap-3">
            <div className="w-9 h-9 rounded-full flex items-center justify-center font-bold text-white text-base border border-gray-200 bg-gray-300">T</div>
            <div>
              <div className="font-semibold text-gray-900 text-sm">Loading...</div>
              <div className="text-xs text-gray-400">TCK-00{i+1}</div>
            </div>
          </div>
          <span className="text-xs px-2 py-0.5 rounded-full font-semibold bg-gray-100 text-gray-400 border border-gray-200">...</span>
        </div>
      ))
    ) : (
      recent.map((t, i) => (
        <div key={i} className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-9 h-9 rounded-full flex items-center justify-center font-bold text-white text-base border border-gray-200" style={{background: i===0?'#fbbf24':i===1?'#60a5fa':i===2?'#f472b6':'#a78bfa'}}>{t.ticketType ? t.ticketType[0] : 'T'}</div>
            <div>
              <div className="font-semibold text-gray-900 text-sm">{t.ticketType || 'Ticket'}</div>
              <div className="text-xs text-gray-400">{t.ticketId || t._id}</div>
            </div>
          </div>
          <span className={`text-xs px-2 py-0.5 rounded-full font-semibold ${t.status === 'Resolved' ? 'bg-green-100 text-green-600 border-green-200' : t.status === 'In Progress' ? 'bg-orange-100 text-orange-600 border-orange-200' : 'bg-blue-100 text-blue-600 border-blue-200'}`}>{t.status}</span>
        </div>
      ))
    )}
  </div>
);

const FCFSTable = ({ tickets, onUpdate }) => {
  const [editRows, setEditRows] = useState({});
  const [saving, setSaving] = useState({});

  const handleChange = (id, field, value) => {
    setEditRows(prev => ({
      ...prev,
      [id]: {
        ...prev[id],
        [field]: value
      }
    }));
  };

  const handleSave = async (ticket) => {
    setSaving(prev => ({ ...prev, [ticket._id]: true }));
    const edit = editRows[ticket._id] || {};
    let expectedFix = edit.expectedFix || ticket.expectedFix || '';
    if (expectedFix && expectedFix.length === 5 && expectedFix.includes(':')) {
      const today = new Date();
      expectedFix = new Date(
        today.getFullYear(),
        today.getMonth(),
        today.getDate(),
        ...expectedFix.split(':')
      ).toISOString();
    }
    try {
      await onUpdate(ticket.ticketId, {
        status: edit.status || ticket.status,
        expectedFix
      });
      setEditRows(prev => {
        const newEdit = { ...prev };
        delete newEdit[ticket._id];
        return newEdit;
      });
    } catch {}
    setSaving(prev => ({ ...prev, [ticket._id]: false }));
  };

  return (
    <div className="overflow-x-auto mt-4">
      <table className="min-w-full bg-blue-50 rounded-xl">
        <thead>
          <tr className="text-xs text-gray-500">
            <th className="px-3 py-2 text-left">Ticket ID</th>
            <th className="px-3 py-2 text-left">Type</th>
            <th className="px-3 py-2 text-left">Date</th>
            <th className="px-3 py-2 text-left">Status</th>
            <th className="px-3 py-2 text-left">Expected Fix</th>
            <th className="px-3 py-2 text-left">Action</th>
          </tr>
        </thead>
        <tbody>
          {tickets.map((t, i) => {
            const edit = editRows[t._id] || {};
            const expectedFixValue =
              edit.expectedFix !== undefined
                ? edit.expectedFix
                : t.expectedFix
                ? new Date(t.expectedFix).toISOString().substring(11, 16)
                : '';
            return (
              <tr key={t._id || i} className={`bg-white border-b last:border-0 ${i === 0 ? 'border-l-4 border-blue-500' : ''}`}>
                <td className="px-3 py-2 font-bold">
                  <Link
                    to={`/tickets/${encodeURIComponent(t.ticketId)}/conversation`}
                    className="text-blue-700 hover:underline"
                  >
                    {t.ticketId || t._id}
                  </Link>
                </td>
                <td className="px-3 py-2 text-gray-700">{t.ticketType}</td>
                <td className="px-3 py-2 text-gray-500 text-xs">{t.dateRaised ? new Date(t.dateRaised).toLocaleDateString() : '-'}</td>
                <td className="px-3 py-2">
                  <select
                    className="border rounded px-2 py-1 text-xs"
                    value={edit.status || t.status}
                    onChange={e => handleChange(t._id, 'status', e.target.value)}
                  >
                    <option value="Open">Open</option>
                    <option value="In Process">In Process</option>
                    <option value="Resolved">Resolved</option>
                  </select>
                </td>
                <td className="px-3 py-2">
                  <input
                    type="time"
                    className="border rounded px-2 py-1 text-xs"
                    value={expectedFixValue}
                    onChange={e => handleChange(t._id, 'expectedFix', e.target.value)}
                  />
                </td>
                <td className="px-3 py-2">
                  <button
                    className="bg-blue-600 text-white rounded px-3 py-1 text-xs font-semibold hover:bg-blue-700 disabled:opacity-50"
                    onClick={() => handleSave(t)}
                    disabled={saving[t._id]}
                  >
                    {saving[t._id] ? 'Saving...' : 'Save'}
                  </button>
                </td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );
};

const ITHeadDashboard = () => {
  const [tickets, setTickets] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    const fetchTickets = async () => {
      setLoading(true);
      setError('');
      try {
        const token = localStorage.getItem('token');
        // Only fetch non-resolved tickets
        const res = await fetch('http://localhost:5050/tickets?status!=Resolved', {
          headers: { Authorization: 'Bearer ' + token }
        });
        if (!res.ok) throw new Error('Failed to fetch tickets');
        const data = await res.json();
        // Filter out resolved tickets if backend doesn't support status!=Resolved
        setTickets(data.filter(t => t.status !== 'Resolved'));
      } catch (err) {
        setError('Could not load tickets');
      }
      setLoading(false);
    };
    fetchTickets();
  }, []);

  // Process data
  const totalTickets = tickets.length;
  const resolvedTickets = tickets.filter(t => t.status === 'Resolved').length;
  const openTickets = tickets.filter(t => t.status === 'Open' || t.status === 'In Progress').length;
  // For demo, fake change %
  const totalChange = '+5.2%';
  const resolvedChange = '+3.1%';
  const openChange = '-1.2%';
  // Categories
  const categories = { Hardware: 0, Software: 0, Network: 0 };
  tickets.forEach(t => {
    if (t.ticketType && categories[t.ticketType] !== undefined) categories[t.ticketType]++;
  });
  // Recent tickets
  const recent = [...tickets].sort((a, b) => new Date(b.dateRaised) - new Date(a.dateRaised)).slice(0, 4);
  // Calculate new tickets for last 7 days and previous 7 days
  const now = new Date();
  const ticketsLast7Days = tickets.filter(t => t.dateRaised && (now - new Date(t.dateRaised)) / (1000 * 60 * 60 * 24) < 7);
  const ticketsPrev7Days = tickets.filter(t => t.dateRaised && (now - new Date(t.dateRaised)) / (1000 * 60 * 60 * 24) >= 7 && (now - new Date(t.dateRaised)) / (1000 * 60 * 60 * 24) < 14);
  const newTickets = ticketsLast7Days.length;
  const prevTickets = ticketsPrev7Days.length;
  const percentChange = prevTickets === 0 ? (newTickets > 0 ? 100 : 0) : ((newTickets - prevTickets) / prevTickets) * 100;
  // Trends: tickets per day for last 7 days
  const trends = Array(7).fill(0);
  tickets.forEach(t => {
    if (t.dateRaised) {
      const d = new Date(t.dateRaised);
      const diff = Math.floor((now - d) / (1000 * 60 * 60 * 24));
      if (diff >= 0 && diff < 7) trends[6 - diff]++;
    }
  });
  // Top IT staff: by assignedTo (for tickets assigned to this IT Head)
  const staffMap = {};
  tickets.forEach(t => {
    if (t.assignedTo && t.assignedTo.username) {
      const key = t.assignedTo.username;
      if (!staffMap[key]) staffMap[key] = { count: 0, name: t.assignedTo.username, email: t.assignedTo.email };
      staffMap[key].count++;
    }
  });
  const topStaff = Object.values(staffMap)
    .sort((a, b) => b.count - a.count)
    .slice(0, 5)
    .map((staff, i) => ({
      initials: staff.name ? staff.name.split(' ').map(n => n[0]).join('').toUpperCase() : (staff.email ? staff.email[0].toUpperCase() : 'U'),
      color: ['#fbbf24','#60a5fa','#f472b6','#34d399','#a78bfa'][i % 5]
    }));

  // FCFS tickets: oldest 7 tickets
  const fcfsTickets = [...tickets].sort((a, b) => new Date(a.dateRaised) - new Date(b.dateRaised)).slice(0, 7);

  // Update ticket status/expectedFix
  const handleUpdateTicket = async (ticketId, { status, expectedFix }) => {
    const token = localStorage.getItem('token');
    await fetch(`http://localhost:5050/tickets/${encodeURIComponent(ticketId)}/status`, {
      method: 'PATCH',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': 'Bearer ' + token
      },
      body: JSON.stringify({ status, expectedFix })
    });
    // Refresh tickets
    const res = await fetch('http://localhost:5050/tickets', {
      headers: { Authorization: 'Bearer ' + token }
    });
    const data = await res.json();
    setTickets(data);
  };

  return (
    <div className="min-h-screen bg-[#f7f8fa] flex">
      <Sidebar />
      <div className="flex-1 flex flex-col">
        <Topbar />
        <main className="flex-1 p-8 grid grid-cols-1 xl:grid-cols-3 gap-6 bg-[#f7f8fa]">
          <section className="xl:col-span-2 flex flex-col gap-6">
            {/* Overview Grouped Card */}
            <div className="bg-white rounded-2xl shadow-2xl border border-gray-100 p-8 flex flex-col min-h-[260px] mb-2">
              <div className="flex items-center justify-between mb-6">
                <div className="text-lg font-bold text-gray-900">Overview</div>
                <span className="text-xs text-gray-400">Last 7 days</span>
              </div>
              <div className="flex gap-4 mb-4">
                <StatCard label="Total Tickets" value={loading ? '...' : totalTickets} change={totalChange} positive={true} />
                <StatCard label="Resolved Tickets" value={loading ? '...' : resolvedTickets} change={resolvedChange} positive={true} />
                <StatCard label="Open Tickets" value={loading ? '...' : openTickets} change={openChange} positive={false} />
              </div>
              <div className="text-sm text-gray-500 mb-2">{loading ? 'Loading...' : `${tickets.length} new tickets today!`} <span className="text-blue-600 font-semibold cursor-pointer">Notify IT team</span></div>
              <div className="text-xs text-gray-400 mb-1 font-semibold">Top IT Staff</div>
              <AvatarsRow topStaff={topStaff} />
            </div>
            {/* Ticket Trends Card (FCFS Table) */}
            <div className="bg-white rounded-2xl shadow-2xl border border-gray-100 p-8 flex flex-col min-h-[220px]">
              <div className="flex items-center justify-between mb-4">
                <div className="text-lg font-bold text-gray-900">Ticket Trends</div>
                <span className="text-xs text-gray-400">Last 7 days</span>
              </div>
              <div className="text-3xl font-extrabold text-gray-900 mb-1">{percentChange > 0 ? '+' : ''}{percentChange.toFixed(1)}%</div>
              {/* <span className="text-xs bg-blue-100 text-blue-600 px-2 py-0.5 rounded-full font-semibold mb-2">New Tickets</span> */}
              <div className="text-lg font-bold text-gray-700 mb-2">{newTickets} new tickets</div>
              <FCFSTable tickets={fcfsTickets} onUpdate={handleUpdateTicket} />
            </div>
          </section>
          <section className="flex flex-col gap-6">
            {/* Ticket Categories Card */}
            <div className="bg-white rounded-2xl shadow-2xl border border-gray-100 p-8 flex flex-col min-h-[220px] mb-2">
              <div className="flex items-center justify-between mb-4">
                <div className="text-lg font-bold text-gray-900">Ticket Categories</div>
                <span className="text-xs text-gray-400">Last 7 days</span>
              </div>
              <div className="relative flex flex-col items-center justify-center flex-1">
                <DonutChart categories={categories} />
                <div className="flex justify-between w-full mt-4 text-xs text-gray-500">
                  <div>Hardware <span className="font-bold text-gray-900 ml-1">{categories.Hardware}</span></div>
                  <div>Software <span className="font-bold text-gray-900 ml-1">{categories.Software}</span></div>
                  <div>Network <span className="font-bold text-gray-900 ml-1">{categories.Network}</span></div>
                </div>
              </div>
            </div>
            {/* Recent Tickets Card */}
            <div className="bg-white rounded-2xl shadow-2xl border border-gray-100 p-8 flex flex-col min-h-[220px]">
              <div className="flex items-center justify-between mb-4">
                <div className="text-lg font-bold text-gray-900">Recent Tickets</div>
                <a href="#" className="text-xs text-blue-600 font-semibold cursor-pointer px-3 py-1 rounded-full bg-blue-50 hover:bg-blue-100 transition">All tickets</a>
              </div>
              <TicketList recent={recent} />
            </div>
          </section>
        </main>
      </div>
    </div>
  );
};

export default ITHeadDashboard; 