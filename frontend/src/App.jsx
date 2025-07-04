import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import Dashboard from './components/Dashboard';
import Login from './components/Login';
import Signup from './components/Signup';
import ITHeadDashboard from './components/ITHeadDashboard';
import { lazy, Suspense } from 'react';
import Sidebar from './components/Sidebar';

const isAuthenticated = () => {
  // Replace with real auth logic (e.g., check localStorage for a token)
  return !!localStorage.getItem('token');
};

const ProtectedRoute = ({ children }) => {
  return isAuthenticated() ? children : <Navigate to="/login" />;
};

const ITHeadProtectedRoute = ({ children }) => {
  const role = localStorage.getItem('role');
  return isAuthenticated() && role === 'ithead' ? children : <Navigate to="/login" />;
};

const ResolvedTickets = lazy(() => import('./components/ResolvedTickets'));
const TicketConversation = lazy(() => import('./components/TicketConversation'));

function App() {
  return (
    <Routes>
      <Route path="/login" element={<Login />} />
      <Route path="/signup" element={<Signup />} />
      <Route path="/dashboard/:username" element={
        <ProtectedRoute>
          <Dashboard />
        </ProtectedRoute>
      } />
      <Route path="/ithead-dashboard/:itheadName" element={
        <ITHeadProtectedRoute>
          <ITHeadDashboard />
        </ITHeadProtectedRoute>
      } />
      <Route path="/tickets/:ticketId/conversation" element={
        <Suspense fallback={<div>Loading...</div>}>
          <TicketConversation />
        </Suspense>
      } />
      <Route path="/archived" element={
        <ProtectedRoute>
          <Suspense fallback={<div>Loading...</div>}>
            <ResolvedTickets />
          </Suspense>
        </ProtectedRoute>
      } />
      <Route path="/archived/:ticketId" element={
        <Suspense fallback={<div>Loading...</div>}>
          <TicketConversation archived />
        </Suspense>
      } />
      <Route path="*" element={<Navigate to="/login" />} />
    </Routes>
  );
}

export default App;
