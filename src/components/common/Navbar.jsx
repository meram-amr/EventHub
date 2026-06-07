import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import {
    AppBar, Toolbar, Typography, Button,
    Box, IconButton, Menu, MenuItem, Avatar, Badge
} from '@mui/material';
import NotificationsIcon from '@mui/icons-material/Notifications';

const Navbar = () => {
    const { user, logout } = useAuth();
    const navigate = useNavigate();

    const [anchorEl, setAnchorEl] = useState(null);
    const [notifAnchor, setNotifAnchor] = useState(null);

    const handleLogout = () => {
        logout();
        navigate('/login');
    };

    // 🔔 Notifications data
    const [notifications, setNotifications] = useState([
        { id: 1, title: 'Booking Confirmed 🎉', message: 'Your ticket is confirmed', time: '2m ago', read: false, type: 'success' },
        { id: 2, title: 'Event Reminder ⏰', message: 'Don’t miss your event', time: '1h ago', read: false, type: 'warning' },
        { id: 3, title: 'New Event Available 🔥', message: 'Check new events now', time: '1d ago', read: true, type: 'info' },
    ]);

    const unreadCount = notifications.filter(n => !n.read).length;

    const openNotif = Boolean(notifAnchor);

    return (
        <AppBar position="sticky" sx={{ backgroundColor: '#1a1a2e', boxShadow: 'none' }}>
            <Toolbar sx={{ justifyContent: 'space-between' }}>

                {/* LOGO */}
                <Typography component={Link} to="/" sx={{ color: 'white', fontWeight: 700, textDecoration: 'none' }}>
                    Event<span style={{ color: '#6C63FF' }}>Hub</span>
                </Typography>

                {/* PARTICIPANT */}
                {user?.role === 'PARTICIPANT' && (
                    <Box sx={{ display: 'flex', gap: 2, alignItems: 'center' }}>

                        <Button component={Link} to="/" sx={{ color: 'white' }}>Events</Button>
                        <Button component={Link} to="/favorites" sx={{ color: 'white' }}>Favorites</Button>
                        <Button component={Link} to="/my-tickets" sx={{ color: 'white' }}>My Tickets</Button>

                        {/* 🔔 NOTIFICATIONS ICON */}
                        <IconButton
                            onClick={(e) => setNotifAnchor(e.currentTarget)}
                            sx={{ color: 'white' }}
                        >
                            <Badge badgeContent={unreadCount} color="error">
                                <NotificationsIcon />
                            </Badge>
                        </IconButton>

                        {/* 🔔 NOTIFICATIONS MENU (CARD STYLE) */}
                        <Menu
                            anchorEl={notifAnchor}
                            open={openNotif}
                            onClose={() => setNotifAnchor(null)}
                            PaperProps={{
                                sx: {
                                    width: 320,
                                    borderRadius: 3,
                                    mt: 1,
                                    overflow: 'hidden',
                                    width: 320,
                                    borderRadius: 3,
                                    mt: 1,
                                    overflow: 'hidden',
                                    boxShadow: '0 4px 20px rgba(0,0,0,0.1)'
                                }
                            }}
                        >
                            <Box sx={{ p: 2, borderBottom: '1px solid #eee' }}>
                                <Typography fontWeight={700}>Notifications 🔔</Typography>
                                <Typography fontSize={12} color="gray">
                                    {unreadCount} unread
                                </Typography>
                            </Box>

                            {notifications.length === 0 ? (
                                <Box sx={{ p: 3, textAlign: 'center' }}>
                                    <Typography>All caught up </Typography>
                                </Box>
                            ) : (
                                notifications.map((n) => (
                                    <Box
                                        key={n.id}
                                        onClick={() =>
                                            setNotifications(prev =>
                                                prev.map(x =>
                                                    x.id === n.id ? { ...x, read: true } : x
                                                )
                                            )
                                        }
                                        sx={{
                                            p: 2,
                                            display: 'flex',
                                            gap: 1.5,
                                            cursor: 'pointer',
                                            backgroundColor: n.read ? 'white' : '#f5f5ff',
                                            borderBottom: '1px solid #eee',
                                            '&:hover': { backgroundColor: '#fafafa' }
                                        }}
                                    >
                                        <span>
                                            {n.type === 'success'
                                                ? '✅'
                                                : n.type === 'warning'
                                                    ? '⚠️'
                                                    : 'ℹ️'}
                                        </span>

                                        <Box>
                                            <Typography fontWeight={n.read ? 500 : 700} fontSize={14}>
                                                {n.title}
                                            </Typography>
                                            <Typography fontSize={12} color="gray">
                                                {n.message}
                                            </Typography>
                                            <Typography fontSize={11} color="gray">
                                                🕐 {n.time}
                                            </Typography>
                                        </Box>

                                        {!n.read && (
                                            <Box
                                                sx={{
                                                    width: 8,
                                                    height: 8,
                                                    borderRadius: '50%',
                                                    backgroundColor: '#6C63FF',
                                                    ml: 'auto',
                                                    mt: 1
                                                }}
                                            />
                                        )}
                                    </Box>
                                ))
                            )}
                        </Menu>

                        {/* AVATAR */}
                        <Avatar
                            onClick={(e) => setAnchorEl(e.currentTarget)}
                            sx={{ backgroundColor: '#6C63FF', cursor: 'pointer' }}
                        >
                            {user.name?.charAt(0).toUpperCase()}
                        </Avatar>
                    </Box>
                )}

                {/* GUEST (not logged in) */}
                {!user && (
                    <Box sx={{ display: 'flex', gap: 1 }}>
                        <Button component={Link} to="/login" sx={{ color: 'white' }}>Login</Button>
                        <Button
                            component={Link}
                            to="/register"
                            variant="contained"
                            sx={{ backgroundColor: '#6C63FF', '&:hover': { backgroundColor: '#4B44CC' } }}
                        >
                            Register
                        </Button>
                    </Box>
                )}

                {/* PROFILE MENU */}
                <Menu
                    anchorEl={anchorEl}
                    open={Boolean(anchorEl)}
                    onClose={() => setAnchorEl(null)}
                    PaperProps={{ sx: { borderRadius: 2, mt: 1 } }}
                >
                    <MenuItem disabled>{user?.name}</MenuItem>
                    <MenuItem onClick={handleLogout} sx={{ color: '#FF6B6B' }}>
                        Logout
                    </MenuItem>
                </Menu>

            </Toolbar>
        </AppBar>
    );
};

export default Navbar;