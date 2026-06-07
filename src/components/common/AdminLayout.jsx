import { Outlet, useNavigate, useLocation } from 'react-router-dom';
import { Box, Typography, Button, Avatar, Divider } from '@mui/material';
import { useAuth } from '../../context/AuthContext';

const menuItems = [
    { label: "Overview", icon: "📊", path: "/admin/overview" },
    { label: "Users", icon: "👥", path: "/admin/users" },
    { label: "Organizers", icon: "🎭", path: "/admin/organizers" },
    { label: "Event Moderation", icon: "🛡️", path: "/admin/events" },
    { label: "Reports", icon: "📋", path: "/admin/reports" },
];

export default function AdminLayout() {

    const { user, logout } = useAuth();
    const navigate = useNavigate();
    const location = useLocation();

    const handleLogout = () => {
        logout();
        navigate('/login');
    };

    return (
        <Box sx={{ display: 'flex', minHeight: '100vh' }}>

            {/* SIDEBAR */}
            <Box sx={{
                width: 260,
                backgroundColor: '#1a1a2e',
                display: 'flex',
                flexDirection: 'column',
                height: '100vh',
                position: 'fixed',
                left: 0,
                top: 0
            }}>

                {/* Logo */}
                <Box sx={{ p: 3, borderBottom: '1px solid rgba(255,255,255,0.1)' }}>
                    <Typography variant="h6" fontWeight={700} sx={{ color: 'white' }}>
                        Event<span style={{ color: '#6C63FF' }}>Hub</span>
                    </Typography>
                    <Typography variant="body2" sx={{ color: '#aaa' }}>
                        Admin Panel
                    </Typography>
                </Box>

                {/* User */}
                <Box sx={{ p: 3, display: 'flex', alignItems: 'center', gap: 2 }}>
                    <Avatar sx={{ bgcolor: '#6C63FF' }}>
                        {user?.name?.charAt(0)}
                    </Avatar>
                    <Box>
                        <Typography sx={{ color: 'white', fontSize: 14, fontWeight: 600 }}>
                            {user?.name}
                        </Typography>
                        <Typography sx={{ color: '#aaa', fontSize: 12 }}>
                            Administrator
                        </Typography>
                    </Box>
                </Box>

                <Divider sx={{ borderColor: 'rgba(255,255,255,0.1)' }} />

                {/* MENU */}
                <Box sx={{ flex: 1, py: 2 }}>
                    {menuItems.map((item) => {
                        const active = location.pathname === item.path;

                        return (
                            <Box
                                key={item.path}
                                onClick={() => navigate(item.path)}
                                sx={{
                                    display: 'flex',
                                    alignItems: 'center',
                                    gap: 2,
                                    px: 3,
                                    py: 1.5,
                                    cursor: 'pointer',
                                    color: active ? '#6C63FF' : '#ccc',
                                    backgroundColor: active ? 'rgba(108,99,255,0.15)' : 'transparent',
                                    borderLeft: active ? '3px solid #6C63FF' : '3px solid transparent',
                                    '&:hover': {
                                        backgroundColor: 'rgba(108,99,255,0.1)'
                                    }
                                }}
                            >
                                <Typography fontSize={18}>{item.icon}</Typography>
                                <Typography fontSize={14} fontWeight={active ? 600 : 400}>
                                    {item.label}
                                </Typography>
                            </Box>
                        );
                    })}
                </Box>

                {/* LOGOUT */}
                <Box sx={{ p: 3 }}>
                    <Button
                        fullWidth
                        onClick={handleLogout}
                        sx={{
                            color: '#FF6B6B',
                            border: '1px solid #FF6B6B',
                            borderRadius: 2,
                            '&:hover': {
                                backgroundColor: 'rgba(255,107,107,0.1)'
                            }
                        }}
                    >
                        Logout
                    </Button>
                </Box>

            </Box>

            {/* MAIN CONTENT */}
            <Box sx={{
                flex: 1,
                ml: '260px',
                backgroundColor: '#F7F7F7',
                minHeight: '100vh',
                p: 3
            }}>
                <Outlet />
            </Box>

        </Box>
    );
}