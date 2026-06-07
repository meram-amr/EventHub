import { useState } from 'react';
import {
    Box, Typography, Container,
    Grid, Button, Chip, Divider
} from '@mui/material';

const fakeEvents = [
    {
        id: 1,
        title: 'Cairo Concert Night',
        organizer: 'Cairo Events Co.',
        category: 'CONCERT',
        date: 'Jan 20, 2025',
        location: 'Cairo Opera House',
        price: 200,
        totalTickets: 100,
        status: 'PENDING',
        image: 'https://images.unsplash.com/photo-1540039155733-5bb30b53aa14?w=600&q=80',
    },
    {
        id: 2,
        title: 'Gaming Tournament',
        organizer: 'GameZone Egypt',
        category: 'GAMING',
        date: 'Feb 10, 2025',
        location: 'Smart Village',
        price: 50,
        totalTickets: 120,
        status: 'PENDING',
        image: 'https://images.unsplash.com/photo-1542751371-adc38448a05e?w=600&q=80',
    },
    {
        id: 3,
        title: 'Jazz Evening',
        organizer: 'Jazz Cairo',
        category: 'CONCERT',
        date: 'Feb 15, 2025',
        location: 'Zamalek Club',
        price: 180,
        totalTickets: 60,
        status: 'APPROVED',
        image: 'https://images.unsplash.com/photo-1415201364774-f6f0bb35f28f?w=600&q=80',
    },
    {
        id: 4,
        title: 'Stand-up Comedy Night',
        organizer: 'Comedy Egypt',
        category: 'THEATER',
        date: 'Feb 5, 2025',
        location: 'Hanager Arts Center',
        price: 100,
        totalTickets: 80,
        status: 'REJECTED',
        image: 'https://images.unsplash.com/photo-1492684223066-81342ee5ff30?w=600&q=80',
    },
];

const statusColors = {
    APPROVED: { bg: '#e6faf9', color: '#2a8f88' },
    PENDING: { bg: '#fff8e6', color: '#8a6d00' },
    REJECTED: { bg: '#fff0f0', color: '#cc4444' },
};

const categoryColors = {
    CONCERT: '#6C63FF',
    SPORTS: '#FF6B6B',
    UNIVERSITY: '#4ECDC4',
    THEATER: '#FFE66D',
    GAMING: '#A8EDEA',
};

const ApproveEventsPage = () => {
    const [events, setEvents] = useState(fakeEvents);
    const [filter, setFilter] = useState('ALL');

    const handleApprove = (id) => {
        setEvents(events.map((e) =>
            e.id === id ? { ...e, status: 'APPROVED' } : e
        ));
    };

    const handleReject = (id) => {
        setEvents(events.map((e) =>
            e.id === id ? { ...e, status: 'REJECTED' } : e
        ));
    };

    const filtered = events.filter((e) =>
        filter === 'ALL' ? true : e.status === filter
    );

    const pending = events.filter((e) => e.status === 'PENDING').length;
    const approved = events.filter((e) => e.status === 'APPROVED').length;
    const rejected = events.filter((e) => e.status === 'REJECTED').length;

    return (
        <Box sx={{ backgroundColor: '#F7F7F7', minHeight: '100vh', py: 4 }}>
            <Container>

                {/* Header */}
                <Typography variant="h4" fontWeight={700}
                    sx={{ color: '#1a1a2e', mb: 1 }}>
                    Approve Events
                </Typography>
                <Typography sx={{ color: '#888', mb: 4 }}>
                    Review and manage event submissions
                </Typography>

                {/* Filter */}
                <Box sx={{ display: 'flex', gap: 1, mb: 3, flexWrap: 'wrap' }}>
                    {['ALL', 'PENDING', 'APPROVED', 'REJECTED'].map((f) => (
                        <Button
                            key={f} size="small"
                            variant={filter === f ? 'contained' : 'outlined'}
                            onClick={() => setFilter(f)}
                            sx={{
                                borderRadius: 20, borderColor: '#6C63FF',
                                color: filter === f ? 'white' : '#6C63FF',
                                backgroundColor: filter === f ? '#6C63FF' : 'transparent',
                                '&:hover': { backgroundColor: filter === f ? '#4B44CC' : '#f0f0ff' }
                            }}>
                            {f}
                        </Button>
                    ))}
                </Box>

                {/* Events List */}
                <Box sx={{
                    backgroundColor: 'white', borderRadius: 3,
                    border: '1px solid #eee', overflow: 'hidden'
                }}>
                    {filtered.length === 0 ? (
                        <Box sx={{ textAlign: 'center', py: 8 }}>
                            <Typography fontSize={48}>🎉</Typography>
                            <Typography variant="h6" sx={{ color: '#888', mt: 2 }}>
                                No events found
                            </Typography>
                        </Box>
                    ) : (
                        filtered.map((event, index) => (
                            <Box key={event.id}>
                                <Box sx={{
                                    p: 3, display: 'flex',
                                    alignItems: 'center', gap: 3,
                                    flexWrap: 'wrap',
                                    '&:hover': { backgroundColor: '#fafafa' }
                                }}>

                                    {/* Event Image */}
                                    <Box sx={{
                                        width: 90, height: 65, borderRadius: 2,
                                        flexShrink: 0,
                                        backgroundImage: `url(${event.image})`,
                                        backgroundSize: 'cover',
                                        backgroundPosition: 'center',
                                    }} />

                                    {/* Event Information */}
                                    <Box sx={{ flex: 1, minWidth: 180 }}>
                                        <Typography fontWeight={700} sx={{ color: '#1a1a2e' }}>
                                            {event.title}
                                        </Typography>
                                        <Typography variant="body2" sx={{ color: '#888' }}>
                                            🎯 {event.organizer}
                                        </Typography>
                                        <Typography variant="body2" sx={{ color: '#888' }}>
                                            📅 {event.date} — 📍 {event.location}
                                        </Typography>
                                    </Box>

                                    {/* Category */}
                                    <Chip label={event.category} size="small" sx={{
                                        backgroundColor: categoryColors[event.category],
                                        color: event.category === 'THEATER' ? '#1a1a2e' : 'white',
                                        fontWeight: 600,
                                    }} />

                                    {/* Price & Tickets */}
                                    <Box sx={{ textAlign: 'center', minWidth: 100 }}>
                                        <Typography fontWeight={700} sx={{ color: '#6C63FF' }}>
                                            {event.price === 0 ? 'Free' : `${event.price} EGP`}
                                        </Typography>
                                        <Typography variant="body2" sx={{ color: '#888' }}>
                                            {event.totalTickets} tickets
                                        </Typography>
                                    </Box>

                                    {/* Status */}
                                    <Chip
                                        label={event.status} size="small"
                                        sx={{
                                            backgroundColor: statusColors[event.status].bg,
                                            color: statusColors[event.status].color,
                                            fontWeight: 700, minWidth: 80,
                                        }}
                                    />

                                    {/* Actions */}
                                    <Box sx={{ display: 'flex', gap: 1 }}>
                                        {event.status === 'PENDING' && (
                                            <>
                                                <Button size="small" variant="contained"
                                                    onClick={() => handleApprove(event.id)}
                                                    sx={{
                                                        backgroundColor: '#4ECDC4', borderRadius: 2,
                                                        '&:hover': { backgroundColor: '#2a8f88' }
                                                    }}>
                                                    Approve
                                                </Button>
                                                <Button size="small" variant="outlined"
                                                    onClick={() => handleReject(event.id)}
                                                    sx={{
                                                        borderColor: '#FF6B6B', color: '#FF6B6B',
                                                        borderRadius: 2,
                                                        '&:hover': { backgroundColor: '#fff0f0' }
                                                    }}>
                                                    Reject
                                                </Button>
                                            </>
                                        )}
                                        {event.status === 'APPROVED' && (
                                            <Button size="small" variant="outlined"
                                                onClick={() => handleReject(event.id)}
                                                sx={{
                                                    borderColor: '#FF6B6B', color: '#FF6B6B',
                                                    borderRadius: 2,
                                                    '&:hover': { backgroundColor: '#fff0f0' }
                                                }}>
                                                Revoke
                                            </Button>
                                        )}
                                        {event.status === 'REJECTED' && (
                                            <Button size="small" variant="contained"
                                                onClick={() => handleApprove(event.id)}
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

export default ApproveEventsPage;