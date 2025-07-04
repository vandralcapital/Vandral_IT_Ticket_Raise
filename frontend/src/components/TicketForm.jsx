import React, { useState, useRef, useEffect } from 'react';

const ticketCategories = [
  {
    label: 'IT Support',
    icon: '🔧',
    options: [
      'Laptop/Desktop Issue',
      'Email/Outlook Problem',
      'VPN/Network Connectivity',
      'Software Installation/Access',
      'System Performance Issue',
      'Password Reset / MFA',
    ],
  },
  {
    label: 'HR & Payroll',
    icon: '👥',
    options: [
      'Leave Request / Correction',
      'Payroll/Salary Issue',
      'PF/ESI/Tax Form Request',
      'Policy/Compliance Query',
      'ID Card/Joining Kit Issue',
    ],
  },
  {
    label: 'Admin & Facilities',
    icon: '🏢',
    options: [
      'Stationery Request',
      'Cabin/Desk Allocation',
      'Access Card / Entry Issue',
      'Cleanliness/Maintenance',
      'Pantry/Cafeteria Issue',
    ],
  },
  {
    label: 'Finance',
    icon: '🏦',
    options: [
      'Reimbursement Request',
      'Invoice/Bill Processing',
      'Budget Allocation Query',
      'Vendor Payment Status',
    ],
  },
  {
    label: 'Procurement',
    icon: '📦',
    options: [
      'Hardware Request (Laptop, Mouse, etc.)',
      'Software License Request',
      'Approval for Vendor Purchase',
    ],
  },
  {
    label: 'General or Misc',
    icon: '⚠️',
    options: [
      'Other',
      'Suggestion / Feedback',
    ],
  },
];

const flattenOptions = ticketCategories.flatMap(cat => cat.options);

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
const difficultyOptions = ['Easy', 'Medium', 'Hard'];

const API_BASE_URL = import.meta.env.VITE_API_URL;

const TicketForm = ({ onTicketCreated }) => {
  const [ticketType, setTicketType] = useState('');
  const [showDropdown, setShowDropdown] = useState(false);
  const [customDescription, setCustomDescription] = useState('');
  const [remarks, setRemarks] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const dropdownRef = useRef(null);
  const [skillRequired, setSkillRequired] = useState('');
  const [difficulty, setDifficulty] = useState('Easy');

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setShowDropdown(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const handleDropdownSelect = (option) => {
    setTicketType(option);
    setShowDropdown(false);
    if (option !== 'Other') setCustomDescription('');
  };

  const handleSubmit = async e => {
    e.preventDefault();
    setError('');
    setLoading(true);
    const token = localStorage.getItem('token');
    if (!token) {
      setError('Not authenticated');
      setLoading(false);
      return;
    }
    try {
      const res = await fetch(`${API_BASE_URL}/tickets`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({
          ticketType: ticketType === 'Other' ? customDescription : ticketType,
          remarks,
          skillRequired,
          difficulty,
        }),
      });
      if (!res.ok) {
        setError('Could not submit ticket');
        setLoading(false);
        return;
      }
      setTicketType('');
      setCustomDescription('');
      setRemarks('');
      if (onTicketCreated) onTicketCreated();
    } catch {
      setError('Could not submit ticket');
    } finally {
      setLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="bg-white border border-[#E5E7EB] rounded-xl px-8 py-6 shadow-sm mb-4">
      <h3 className="font-extrabold text-xl mb-2">Create a New Ticket</h3>
      <div className="mb-4 text-gray-400 text-sm">Fill up all the information here, then click submit</div>
      <div className="flex flex-wrap gap-4 items-center">
        {/* Custom Dropdown for Ticket Type */}
        <div className="relative" ref={dropdownRef}>
          <button
            type="button"
            className="px-4 py-3 rounded-lg border border-gray-200 bg-gray-100 text-gray-800 w-64 text-left flex items-center justify-between focus:outline-none focus:ring-2 focus:ring-blue-200"
            onClick={() => setShowDropdown(v => !v)}
          >
            {ticketType ? (
              <span>{ticketType}</span>
            ) : (
              <span className="text-gray-400">Select Ticket Type</span>
            )}
            <svg className="w-4 h-4 ml-2 text-gray-400" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" d="M19 9l-7 7-7-7" /></svg>
          </button>
          {showDropdown && (
            <div className="absolute z-10 mt-2 w-64 bg-white border border-gray-200 rounded-lg shadow-lg max-h-72 overflow-y-auto">
              {ticketCategories.map((cat, i) => (
                <div key={cat.label}>
                  <div className="px-4 py-2 text-xs font-bold text-gray-500 flex items-center bg-gray-50 sticky top-0 z-10">
                    <span className="mr-2">{cat.icon}</span> {cat.label}
                  </div>
                  {cat.options.map(option => (
                    <button
                      key={option}
                      type="button"
                      className={`w-full text-left px-6 py-2 text-sm hover:bg-blue-50 ${ticketType === option ? 'bg-blue-50 text-blue-600 font-semibold' : 'text-gray-700'}`}
                      onClick={() => handleDropdownSelect(option)}
                    >
                      {option}
                    </button>
                  ))}
                </div>
              ))}
            </div>
          )}
        </div>
        {/* Show description input if 'Other' is selected */}
        {ticketType === 'Other' && (
          <input
            className="px-4 py-3 rounded-lg border border-gray-200 bg-gray-100 text-gray-800 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-200 w-64 text-base"
            type="text"
            placeholder="Describe your issue"
            value={customDescription}
            onChange={e => setCustomDescription(e.target.value)}
            required
          />
        )}
        {/* Remarks input */}
        <input
          className="px-4 py-3 rounded-lg border border-gray-200 bg-gray-100 text-gray-800 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-200 w-64 text-base"
          type="text"
          placeholder="Write your remarks"
          value={remarks}
          onChange={e => setRemarks(e.target.value)}
        />
        {/* Skill Required Dropdown */}
        <select
          className="px-4 py-3 rounded-lg border border-gray-200 bg-gray-100 text-gray-800 focus:outline-none focus:ring-2 focus:ring-blue-200 w-48 text-base"
          value={skillRequired}
          onChange={e => setSkillRequired(e.target.value)}
          required
        >
          <option value="" disabled>Select Skill Required</option>
          {skillOptions.map(skill => (
            <option key={skill} value={skill}>{skill}</option>
          ))}
        </select>
        {/* Difficulty Dropdown */}
        <select
          className="px-4 py-3 rounded-lg border border-gray-200 bg-gray-100 text-gray-800 focus:outline-none focus:ring-2 focus:ring-blue-200 w-32 text-base"
          value={difficulty}
          onChange={e => setDifficulty(e.target.value)}
          required
        >
          {difficultyOptions.map(diff => (
            <option key={diff} value={diff}>{diff}</option>
          ))}
        </select>
        <button
          className="px-8 py-3 rounded-lg bg-blue-600 text-white font-bold hover:bg-blue-700 transition-colors text-base shadow"
          type="submit"
          disabled={loading}
        >
          {loading ? 'Submitting...' : 'Submit Ticket'}
        </button>
      </div>
      {error && <div className="mt-4 text-red-500 font-semibold text-center">{error}</div>}
    </form>
  );
};

export default TicketForm; 