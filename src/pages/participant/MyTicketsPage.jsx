import { useState } from 'react';
import {
    Box, Typography, Container,
    Grid, Chip, Button, Divider
} from '@mui/material';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import { QRCodeSVG } from 'qrcode.react';

const fakeTickets = [
    {
        id: "EVT-101",
        eventTitle: "Cairo Concert Night",
        date: "Jan 20, 2025",
        time: "8:00 PM",
        location: "Cairo Opera House",
        price: 200,
        status: "CONFIRMED",
        category: "Technology",
        image: "https://images.unsplash.com/photo-1540039155733-5bb30b53aa14?w=600&q=80"
    },
    {
        id: "EVT-102",
        eventTitle: "Football Match",
        date: "Jan 25, 2025",
        time: "6:00 PM",
        location: "Cairo Stadium",
        price: 150,
        status: "PENDING",
        category: "Sports",
        image: "https://images.unsplash.com/photo-1461896836934-ffe607ba8211?w=600&q=80"
    }
];

const categoryColors = {
    Technology: '#4ECDC4',
    Education: '#6C63FF',
    Social: '#FF6B6B',
    Sports: '#F9A826',
    Gaming: '#A8EDEA',
    BUSINESS: '#3F51B5',
    "Art & Culture": '#EC4899',
    "Health & Fitness": '#22C55E',
    ENTERTAINMENT: '#F97316',
    OTHER: '#9E9E9E'
};

const statusColors = {
    CONFIRMED: { bg: '#e6faf9', color: '#2a8f88' },
    PENDING: { bg: '#fff8e6', color: '#8a6d00' },
    CANCELLED: { bg: '#fff0f0', color: '#cc4444' },
};

const MyTicketsPage = () => {
    const { user } = useAuth();
    const navigate = useNavigate();
    const [selectedTicket, setSelectedTicket] = useState(null);

    const toggleQR = (ticket) => {
        setSelectedTicket(prev =>
            prev?.id === ticket.id ? null : ticket
        );
    };

    return (
        <Box sx={{ backgroundColor: '#F7F7F7', minHeight: '100vh', py: 4 }}>
            <Container>

                {/* Header */}
                <Typography variant="h4" fontWeight={700}
                    sx={{ color: '#1a1a2e', mb: 1 }}>
                    My Tickets
                </Typography>

                <Typography sx={{ color: '#888', mb: 4 }}>
                    All your booked events in one place
                </Typography>

                {fakeTickets.length === 0 ? (
                    <Box sx={{ textAlign: 'center', py: 10 }}>
                        <Typography fontSize={48}>🎟️</Typography>
                        <Typography variant="h6" sx={{ color: '#888', mt: 2 }}>
                            No tickets yet
                        </Typography>
                        <Button
                            onClick={() => navigate('/')}
                            variant="contained"
                            sx={{ mt: 3, backgroundColor: '#6C63FF', borderRadius: 2 }}>
                            Browse Events
                        </Button>
                    </Box>
                ) : (
                    <Grid container spacing={3}>
                        {fakeTickets.map((ticket) => (
                            <Grid item xs={12} md={6} key={ticket.id}>
                                <Box sx={{
                                    backgroundColor: 'white',
                                    borderRadius: 3,
                                    overflow: 'hidden',
                                    border: '1px solid #eee',
                                    transition: 'all 0.2s',
                                    '&:hover': {
                                        boxShadow: '0 8px 32px rgba(108,99,255,0.1)',
                                        borderColor: '#6C63FF',
                                    }
                                }}>

                                    {/* Image */}
                                    <Box sx={{
                                        height: 140,
                                        backgroundImage: `url(${ticket.image})`,
                                        backgroundSize: 'cover',
                                        backgroundPosition: 'center',
                                        position: 'relative',
                                    }}>
                                        <Box sx={{
                                            position: 'absolute',
                                            inset: 0,
                                            background: 'linear-gradient(to top, rgba(0,0,0,0.6), transparent)',
                                        }} />

                                        {/* Status */}
                                        <Chip
                                            label={ticket.status}
                                            size="small"
                                            sx={{
                                                position: 'absolute',
                                                top: 12,
                                                right: 12,
                                                backgroundColor: statusColors[ticket.status]?.bg || '#eee',
                                                color: statusColors[ticket.status]?.color || '#000',
                                                fontWeight: 700,
                                                fontSize: 11,
                                            }}
                                        />

                                        {/* Category */}
                                        <Chip
                                            label={ticket.category}
                                            size="small"
                                            sx={{
                                                position: 'absolute',
                                                top: 12,
                                                left: 12,
                                                backgroundColor: categoryColors[ticket.category] || '#999',
                                                color: 'white',
                                                fontWeight: 600,
                                                fontSize: 11,
                                            }}
                                        />
                                    </Box>

                                    {/* Content */}
                                    <Box sx={{ p: 2.5 }}>

                                        <Typography variant="h6" fontWeight={700}
                                            sx={{ color: '#1a1a2e', mb: 1 }}>
                                            {ticket.eventTitle}
                                        </Typography>

                                        <Box sx={{ display: 'flex', flexDirection: 'column', gap: 0.5, mb: 2 }}>
                                            <Typography variant="body2" sx={{ color: '#888' }}>
                                                📅 {ticket.date} at {ticket.time}
                                            </Typography>
                                            <Typography variant="body2" sx={{ color: '#888' }}>
                                                📍 {ticket.location}
                                            </Typography>
                                            <Typography variant="body2" fontWeight={700}
                                                sx={{ color: '#6C63FF' }}>
                                                💰 {ticket.price} EGP
                                            </Typography>
                                        </Box>

                                        <Divider sx={{ mb: 2 }} />

                                        <Box sx={{
                                            display: 'flex',
                                            justifyContent: 'space-between',
                                            alignItems: 'center'
                                        }}>
                                            <Typography variant="body2"
                                                sx={{ color: '#888', fontFamily: 'monospace' }}>
                                                {ticket.id}
                                            </Typography>

                                            {ticket.status === 'CONFIRMED' && (
                                                <Button
                                                    size="small"
                                                    variant="contained"
                                                    onClick={() => toggleQR(ticket)}
                                                    sx={{
                                                        backgroundColor: '#6C63FF',
                                                        borderRadius: 2,
                                                        fontSize: 12,
                                                        '&:hover': { backgroundColor: '#4B44CC' }
                                                    }}>
                                                    {selectedTicket?.id === ticket.id ? 'Hide QR' : 'Show QR'}
                                                </Button>
                                            )}
                                        </Box>

                                        {/* QR */}
                                        {selectedTicket?.id === ticket.id && (
                                            <Box sx={{
                                                mt: 2,
                                                p: 2,
                                                backgroundColor: '#F7F7F7',
                                                borderRadius: 2,
                                                display: 'flex',
                                                flexDirection: 'column',
                                                alignItems: 'center',
                                                gap: 1,
                                            }}>
                                                <QRCodeSVG
                                                    value={`EVENTHUB-${ticket.id}`}
                                                    size={150}
                                                    fgColor="#1a1a2e"
                                                />

                                                <Typography variant="body2"
                                                    sx={{ color: '#888', fontSize: 11, textAlign: 'center' }}>
                                                    Show this QR code at the entrance
                                                </Typography>
                                            </Box>
                                        )}

                                    </Box>
                                </Box>
                            </Grid>
                        ))}
                    </Grid>
                )}
            </Container>
        </Box>
    );
};

export default MyTicketsPage;