import { useState } from 'react';
import { Outlet, useNavigate, useLocation } from 'react-router-dom';
import { Box, Typography, Button, Avatar, Divider } from '@mui/material';
import { useAuth } from '../../context/AuthContext';

const menuItems = [
    { type: 'section', label: 'MAIN' },
    { label: 'Dashboard', icon: '📊', path: '/organizer/dashboard' },
    { label: 'My Events', icon: '🎪', path: '/organizer/my-events' },
    { label: 'Create Event', icon: '➕', path: '/organizer/create-event' },

    { type: 'section', label: 'MANAGEMENT' },
    { label: 'Bookings', icon: '🎫', path: '/organizer/booked-events' },
    { label: 'Analytics', icon: '📈', path: '/organizer/analytics' },
    { label: 'Notifications', icon: '📢', path: '/organizer/notifications' },
];

const OrganizerLayout = () => {
    const { user, logout } = useAuth();
    const navigate = useNavigate();
    const location = useLocation();
    const [collapsed] = useState(false);
    const handleLogout = () => {
        logout();
        navigate('/login');
    };

    return (
        <Box sx={{ display: 'flex', minHeight: '100vh' }}>

            {/* Sidebar */}
            <Box sx={{
                width: collapsed ? 80 : 260,
                backgroundColor: '#1a1a2e',
                display: 'flex',
                flexDirection: 'column',
                position: 'fixed',
                top: 0,
                left: 0,
                height: '100vh',
                zIndex: 100,
                transition: 'all 0.3s'
            }}>

                {/* Header */}
                <Box sx={{
                    p: 2,
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: collapsed ? 'center' : 'space-between',
                    borderBottom: '1px solid rgba(255,255,255,0.1)'
                }}>
                    {!collapsed ? (
                        <Typography variant="h6" fontWeight={700} sx={{ color: 'white' }}>
                            Event<span style={{ color: '#6C63FF' }}>Hub</span>
                        </Typography>
                    ) : (
                        <Typography sx={{ color: '#6C63FF', fontSize: 20 }}></Typography>
                    )}
                </Box>

                {/* User */}
                <Box sx={{
                    p: 2,
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: collapsed ? 'center' : 'flex-start',
                    gap: 2
                }}>
                    <Avatar sx={{ backgroundColor: '#6C63FF' }}>
                        {user?.name?.charAt(0).toUpperCase()}
                    </Avatar>

                    {!collapsed && (
                        <Box>
                            <Typography sx={{ color: 'white', fontSize: 14 }}>
                                {user?.name}
                            </Typography>
                            <Typography sx={{ color: '#aaa', fontSize: 12 }}>
                                Organizer
                            </Typography>
                        </Box>
                    )}
                </Box>

                <Divider sx={{ borderColor: 'rgba(255,255,255,0.1)' }} />

                {/* Menu */}
                <Box sx={{ flex: 1, py: 2 }}>
                    {menuItems.map((item, index) => {

                        // title section
                        if (item.type === 'section') {
                            return !collapsed ? (
                                <Typography
                                    key={index}
                                    sx={{
                                        px: 2,
                                        py: 1,
                                        color: '#888',
                                        fontSize: 11,
                                        letterSpacing: 1,
                                    }}
                                >
                                    {item.label}
                                </Typography>
                            ) : (
                                <Box key={index} sx={{ height: 10 }} />
                            );
                        }

                        const isActive = location.pathname === item.path;

                        return (
                            <Box
                                key={item.path}
                                onClick={() => navigate(item.path)}
                                title={collapsed ? item.label : ''}
                                sx={{
                                    display: 'flex',
                                    alignItems: 'center',
                                    justifyContent: collapsed ? 'center' : 'space-between',
                                    px: 2,
                                    py: 1.5,
                                    cursor: 'pointer',
                                    backgroundColor: isActive ? 'rgba(108,99,255,0.2)' : 'transparent',
                                    borderLeft: isActive ? '3px solid #6C63FF' : '3px solid transparent',
                                    '&:hover': {
                                        backgroundColor: 'rgba(108,99,255,0.1)'
                                    }
                                }}
                            >
                                {/* left side */}
                                <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
                                    <Typography fontSize={18}>{item.icon}</Typography>

                                    {!collapsed && (
                                        <Typography sx={{
                                            color: isActive ? '#6C63FF' : '#ccc',
                                            fontWeight: isActive ? 600 : 400,
                                            fontSize: 14,
                                        }}>
                                            {item.label}
                                        </Typography>
                                    )}
                                </Box>

                                {/* badge */}
                                {!collapsed && item.badge && (
                                    <Box sx={{
                                        backgroundColor: '#FF6B6B',
                                        color: 'white',
                                        fontSize: 11,
                                        px: 1,
                                        borderRadius: 10,
                                    }}>
                                        {item.badge}
                                    </Box>
                                )}
                            </Box>
                        );
                    })}
                </Box>

                {/* Footer */}
                <Box sx={{
                    p: 2,
                    borderTop: '1px solid rgba(255,255,255,0.1)',
                    textAlign: 'center'
                }}>
                    {!collapsed && (
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
                    )}
                </Box>

            </Box>
            {/* Main Content */}
            <Box sx={{ flex: 1, ml: '260px', backgroundColor: '#F7F7F7' }}>
                <Outlet />
            </Box>
        </Box>
    );
};

export default OrganizerLayout;