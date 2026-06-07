import { useState } from 'react';
import {
    Box, Typography, Container,
    Grid, Button, Chip, Avatar, Divider
} from '@mui/material';

const fakeOrganizers = [
    {
        id: 1,
        name: 'Ahmed Tarek',
        email: 'ahmed@events.com',
        phone: '+20 100 123 4567',
        company: 'Cairo Events Co.',
        eventsCount: 5,
        status: 'PENDING',
        joinDate: 'Jan 10, 2025',
        avatar: 'A',
    },
    {
        id: 2,
        name: 'Nour Ali',
        email: 'nour@gamezone.com',
        phone: '+20 101 234 5678',
        company: 'GameZone Egypt',
        eventsCount: 3,
        status: 'PENDING',
        joinDate: 'Jan 12, 2025',
        avatar: 'N',
    },
    {
        id: 3,
        name: 'Omar Hassan',
        email: 'omar@comedy.com',
        phone: '+20 102 345 6789',
        company: 'Comedy Egypt',
        eventsCount: 8,
        status: 'APPROVED',
        joinDate: 'Dec 5, 2024',
        avatar: 'O',
    },
    {
        id: 4,
        name: 'Sara Mohamed',
        email: 'sara@jazz.com',
        phone: '+20 103 456 7890',
        company: 'Jazz Cairo',
        eventsCount: 2,
        status: 'REJECTED',
        joinDate: 'Jan 15, 2025',
        avatar: 'S',
    },
];

const statusColors = {
    APPROVED: { bg: '#e6faf9', color: '#2a8f88' },
    PENDING: { bg: '#fff8e6', color: '#8a6d00' },
    REJECTED: { bg: '#fff0f0', color: '#cc4444' },
};

const avatarColors = ['#6C63FF', '#FF6B6B', '#4ECDC4', '#FFE66D'];

const ApproveOrganizersPage = () => {
    const [organizers, setOrganizers] = useState(fakeOrganizers);
    const [filter, setFilter] = useState('ALL');

    const handleApprove = (id) => {
        setOrganizers(organizers.map((org) =>
            org.id === id ? { ...org, status: 'APPROVED' } : org
        ));
    };

    const handleReject = (id) => {
        setOrganizers(organizers.map((org) =>
            org.id === id ? { ...org, status: 'REJECTED' } : org
        ));
    };

    const filtered = organizers.filter((org) =>
        filter === 'ALL' ? true : org.status === filter
    );

    // Stats
    const pending = organizers.filter((o) => o.status === 'PENDING').length;
    const approved = organizers.filter((o) => o.status === 'APPROVED').length;
    const rejected = organizers.filter((o) => o.status === 'REJECTED').length;

    return (
        <Box sx={{ backgroundColor: '#F7F7F7', minHeight: '100vh', py: 4 }}>
            <Container>

                {/* Header */}
                <Typography variant="h4" fontWeight={700}
                    sx={{ color: '#1a1a2e', mb: 1 }}>
                    Approve Organizers
                </Typography>
                <Typography sx={{ color: '#888', mb: 4 }}>
                    Review and manage organizer applications
                </Typography>

                {/* Filter Buttons */}
                <Box sx={{ display: 'flex', gap: 1, mb: 3, flexWrap: 'wrap' }}>
                    {['ALL', 'PENDING', 'APPROVED', 'REJECTED'].map((f) => (
                        <Button
                            key={f} size="small"
                            variant={filter === f ? 'contained' : 'outlined'}
                            onClick={() => setFilter(f)}
                            sx={{
                                borderRadius: 20,
                                borderColor: '#6C63FF',
                                color: filter === f ? 'white' : '#6C63FF',
                                backgroundColor: filter === f ? '#6C63FF' : 'transparent',
                                '&:hover': { backgroundColor: filter === f ? '#4B44CC' : '#f0f0ff' }
                            }}>
                            {f}
                        </Button>
                    ))}
                </Box>

                {/* Organizers List */}
                <Box sx={{
                    backgroundColor: 'white', borderRadius: 3,
                    border: '1px solid #eee', overflow: 'hidden'
                }}>
                    {filtered.length === 0 ? (
                        <Box sx={{ textAlign: 'center', py: 8 }}>
                            <Typography fontSize={48}>👥</Typography>
                            <Typography variant="h6" sx={{ color: '#888', mt: 2 }}>
                                No organizers found
                            </Typography>
                        </Box>
                    ) : (
                        filtered.map((org, index) => (
                            <Box key={org.id}>
                                <Box sx={{
                                    p: 3, display: 'flex',
                                    alignItems: 'center',
                                    gap: 3, flexWrap: 'wrap',
                                    '&:hover': { backgroundColor: '#fafafa' }
                                }}>

                                    {/* Avatar */}
                                    <Avatar sx={{
                                        width: 52, height: 52, flexShrink: 0,
                                        backgroundColor: avatarColors[index % avatarColors.length],
                                        fontWeight: 700, fontSize: 20,
                                    }}>
                                        {org.avatar}
                                    </Avatar>

                                    {/* Organizer Info */}
                                    <Box sx={{ flex: 1, minWidth: 180 }}>
                                        <Typography fontWeight={700} sx={{ color: '#1a1a2e' }}>
                                            {org.name}
                                        </Typography>
                                        <Typography variant="body2" sx={{ color: '#888' }}>
                                            {org.email}
                                        </Typography>
                                        <Typography variant="body2" sx={{ color: '#888' }}>
                                            🏢 {org.company}
                                        </Typography>
                                    </Box>

                                    {/* Additional Info */}
                                    <Box sx={{ minWidth: 120 }}>
                                        <Typography variant="body2" sx={{ color: '#555' }}>
                                            📅 {org.joinDate}
                                        </Typography>
                                        <Typography variant="body2" sx={{ color: '#555' }}>
                                            🎉 {org.eventsCount} events
                                        </Typography>
                                        <Typography variant="body2" sx={{ color: '#555' }}>
                                            📞 {org.phone}
                                        </Typography>
                                    </Box>

                                    {/* Status */}
                                    <Chip
                                        label={org.status} size="small"
                                        sx={{
                                            backgroundColor: statusColors[org.status].bg,
                                            color: statusColors[org.status].color,
                                            fontWeight: 700, minWidth: 80,
                                        }}
                                    />

                                    {/* Action Buttons */}
                                    <Box sx={{ display: 'flex', gap: 1 }}>
                                        {org.status === 'PENDING' && (
                                            <>
                                                <Button
                                                    size="small" variant="contained"
                                                    onClick={() => handleApprove(org.id)}
                                                    sx={{
                                                        backgroundColor: '#4ECDC4', borderRadius: 2,
                                                        '&:hover': { backgroundColor: '#2a8f88' }
                                                    }}>
                                                    Approve
                                                </Button>
                                                <Button
                                                    size="small" variant="outlined"
                                                    onClick={() => handleReject(org.id)}
                                                    sx={{
                                                        borderColor: '#FF6B6B', color: '#FF6B6B',
                                                        borderRadius: 2,
                                                        '&:hover': { backgroundColor: '#fff0f0' }
                                                    }}>
                                                    Reject
                                                </Button>
                                            </>
                                        )}
                                        {org.status === 'APPROVED' && (
                                            <Button
                                                size="small" variant="outlined"
                                                onClick={() => handleReject(org.id)}
                                                sx={{
                                                    borderColor: '#FF6B6B', color: '#FF6B6B',
                                                    borderRadius: 2,
                                                    '&:hover': { backgroundColor: '#fff0f0' }
                                                }}>
                                                Revoke
                                            </Button>
                                        )}
                                        {org.status === 'REJECTED' && (
                                            <Button
                                                size="small" variant="contained"
                                                onClick={() => handleApprove(org.id)}
                                                sx={{
                                                    backgroundColor: '#4ECDC4', borderRadius: 2,
                                                    '&:hover': { backgroundColor: '#2a8f88' }
                                                }}>
                                                Re-approve
                                            </Button>
                                        )}
                                    </Box>
                                </Box>

                                {index < filtered.length - 1 && <Divider />}
                            </Box>
                        ))
                    )}
                </Box>

            </Container>
        </Box>
    );
};

export default ApproveOrganizersPage;