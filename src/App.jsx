import { Routes, Route, Navigate } from 'react-router-dom';
import { useAuth } from './context/AuthContext';

// Layout
import Navbar from './components/common/Navbar';
import OrganizerLayout from './components/common/OrganizerLayout';
import AdminLayout from './components/common/AdminLayout';

// Auth
import LoginPage from './pages/auth/LoginPage';
import RegisterPage from './pages/auth/RegisterPage';

// Participant
import HomePage from './pages/participant/HomePage';
import EventDetailsPage from './pages/participant/EventDetailsPage';
import FavoritesPage from './pages/participant/FavoritesPage';
import MyTicketsPage from './pages/participant/MyTicketsPage';
import PaymentPage from './pages/participant/PaymentPage';

// Organizer
import DashboardPage from './pages/organizer/DashboardPage';
import CreateEventPage from './pages/organizer/CreateEventPage';
import EditEventPage from './pages/organizer/EditEventPage';
import AnalyticsPage from './pages/organizer/AnalyticsPage';
import MyEventsPage from './pages/organizer/MyEventsPage';
import BookedEventsPage from './pages/organizer/BookedEventsPage';
import SendNotificationPage from './pages/organizer/SendNotificationPage';

// Admin
import ApproveOrganizersPage from './pages/admin/ApproveOrganizersPage';
import ApproveEventsPage from './pages/admin/ApproveEventsPage';
import AdminOverviewPage from './pages/admin/AdminOverviewPage';
import AdminUsers from './pages/admin/AdminUsersPage';
import AdminReports from './pages/admin/AdminReportsPage';

const ProtectedRoute = ({ children, allowedRoles }) => {
    const { user } = useAuth();

    if (!user) return <Navigate to="/login" replace />;
    if (!allowedRoles.includes(user.role)) return <Navigate to="/" replace />;

    return children;
};

function App() {
    return (
        <Routes>

            {/* Auth */}
            <Route path="/login" element={<><Navbar /><LoginPage /></>} />
            <Route path="/register" element={<><Navbar /><RegisterPage /></>} />

            {/* Default redirect (important for GitHub Pages) */}
            <Route path="/" element={<Navigate to="/home" replace />} />

            {/* Participant */}
            <Route path="/home" element={<><Navbar /><HomePage /></>} />
            <Route path="/event/:id" element={<><Navbar /><EventDetailsPage /></>} />

            <Route
                path="/payment/:id"
                element={
                    <ProtectedRoute allowedRoles={['PARTICIPANT']}>
                        <>
                            <Navbar />
                            <PaymentPage />
                        </>
                    </ProtectedRoute>
                }
            />

            <Route
                path="/favorites"
                element={
                    <ProtectedRoute allowedRoles={['PARTICIPANT']}>
                        <>
                            <Navbar />
                            <FavoritesPage />
                        </>
                    </ProtectedRoute>
                }
            />

            <Route
                path="/my-tickets"
                element={
                    <ProtectedRoute allowedRoles={['PARTICIPANT']}>
                        <>
                            <Navbar />
                            <MyTicketsPage />
                        </>
                    </ProtectedRoute>
                }
            />

            {/* Organizer */}
            <Route
                path="/organizer/*"
                element={
                    <ProtectedRoute allowedRoles={['ORGANIZER']}>
                        <OrganizerLayout />
                    </ProtectedRoute>
                }
            >
                <Route path="dashboard" element={<DashboardPage />} />
                <Route path="create-event" element={<CreateEventPage />} />
                <Route path="edit-event/:id" element={<EditEventPage />} />
                <Route path="my-events" element={<MyEventsPage />} />
                <Route path="analytics" element={<AnalyticsPage />} />
                <Route path="booked-events" element={<BookedEventsPage />} />
                <Route path="notifications" element={<SendNotificationPage />} />
            </Route>

            {/* Admin */}
            <Route
                path="/admin/*"
                element={
                    <ProtectedRoute allowedRoles={['ADMIN']}>
                        <AdminLayout />
                    </ProtectedRoute>
                }
            >
                <Route path="organizers" element={<ApproveOrganizersPage />} />
                <Route path="events" element={<ApproveEventsPage />} />
                <Route path="overview" element={<AdminOverviewPage />} />
                <Route path="users" element={<AdminUsers />} />
                <Route path="reports" element={<AdminReports />} />
            </Route>

            {/* Catch all */}
            <Route path="*" element={<Navigate to="/home" replace />} />

        </Routes>
    );
}

export default App;