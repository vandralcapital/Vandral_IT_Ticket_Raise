import Sidebar from './Sidebar'
import Header from './Header'
import EmployeeDashboard from './EmployeeDashboard'
import FAQPanel from './FAQPanel'
import { useParams, useNavigate } from 'react-router-dom'
import { useEffect, useState } from 'react'

function Dashboard() {
  const { username } = useParams();
  const navigate = useNavigate();
  const [loading, setLoading] = useState(true);
  const API_BASE_URL = import.meta.env.VITE_API_URL;

  useEffect(() => {
    const checkAuth = async () => {
      const token = localStorage.getItem('token');
      if (!token) {
        navigate('/login');
        return;
      }
      try {
        const res = await fetch(`${API_BASE_URL}/me`, {
          headers: { Authorization: `Bearer ${token}` }
        });
        if (!res.ok) throw new Error('Not authenticated');
        const user = await res.json();
        if (user.role !== 'employee' || user.username !== username) {
          navigate('/login');
          return;
        }
        setLoading(false);
      } catch {
        navigate('/login');
      }
    };
    checkAuth();
  }, [navigate, username]);

  if (loading) {
    return <div className="min-h-screen flex items-center justify-center text-xl font-bold text-gray-500">Loading...</div>;
  }

  return (
    <div className="flex min-h-screen bg-[#f7f8fa]">
      <Sidebar />
      <div className="flex-1 flex flex-col">
        <Header />
        <div className="flex flex-1 gap-6 px-16 pt-12 pb-6">
          <div className="flex-1 flex flex-col gap-6">
            <EmployeeDashboard />
          </div>
          {/* <div className="w-[350px]">
            <FAQPanel />
          </div> */}
        </div>
      </div>
    </div>
  )
}

export default Dashboard 