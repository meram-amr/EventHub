import { Box, Typography, Button, Chip } from '@mui/material';
import { useNavigate } from 'react-router-dom';

const categoryColors = {
    TECH: '#5C7CFA',
    EDUCATION: '#20C997',
    SOCIAL: '#FF922B',
    SPORTS: '#FF6B6B',
    GAMING: '#845EF7',
    BUSINESS: '#228BE6',
    ART: '#F06595',
    HEALTH: '#51CF66',
    ENTERTAINMENT: '#FCC419',
    OTHER: '#868E96',
};

// optional: nicer display names
const categoryLabels = {
    TECH: 'Technology',
    EDUCATION: 'Education',
    SOCIAL: 'Social',
    SPORTS: 'Sports',
    GAMING: 'Gaming',
    BUSINESS: 'Business',
    ART: 'Art & Culture',
    HEALTH: 'Health & Fitness',
    ENTERTAINMENT: 'Entertainment',
    OTHER: 'Other',
};

const EventCard = ({ event }) => {
    const navigate = useNavigate();

    return (
        <Box sx={{
            backgroundColor: 'white',
            width: '250px',
            borderRadius: 3,
            overflow: 'hidden',
            border: '1px solid #eee',
            transition: 'all 0.2s',
            '&:hover': {
                transform: 'translateY(-4px)',
                boxShadow: '0 8px 32px rgba(108,99,255,0.15)',
                borderColor: '#6C63FF',
            }
        }}>
            {/* event image */}
            <Box sx={{
                height: 180,
                backgroundImage: `url(${event.image || 'https://images.unsplash.com/photo-1540039155733-5bb30b53aa14?w=600&q=80'})`,
                backgroundSize: 'cover',
                backgroundPosition: 'center',
                position: 'relative',
            }}>
                <Chip
                    label={categoryLabels[event.category] || event.category}
                    size="small"
                    sx={{
                        position: 'absolute',
                        top: 12,
                        left: 12,
                        backgroundColor: categoryColors[event.category] || '#888',
                        color: 'white',
                        fontWeight: 600,
                        fontSize: 11,
                    }}
                />
            </Box>

            {/* event information */}
            <Box sx={{ p: 2.5 }}>
                <Typography
                    variant="h6"
                    fontWeight={700}
                    sx={{
                        color: '#1a1a2e',
                        mb: 1,
                        fontSize: '1rem',
                        overflow: 'hidden',
                        textOverflow: 'ellipsis',
                        whiteSpace: 'nowrap'
                    }}
                >
                    {event.title}
                </Typography>

                <Box sx={{ display: 'flex', flexDirection: 'column', gap: 0.5, mb: 2 }}>
                    <Typography variant="body2" sx={{ color: '#888' }}>
                        📅 {event.date}
                    </Typography>
                    <Typography variant="body2" sx={{ color: '#888' }}>
                        📍 {event.location}
                    </Typography>
                    <Typography
                        variant="body2"
                        fontWeight={700}
                        sx={{ color: '#6C63FF', mt: 0.5 }}
                    >
                        💰 {event.price} EGP
                    </Typography>
                </Box>

                <Button
                    fullWidth
                    variant="contained"
                    onClick={() => navigate(`/events/${event.id}`)}
                    sx={{
                        backgroundColor: '#6C63FF',
                        borderRadius: 2,
                        '&:hover': { backgroundColor: '#4B44CC' }
                    }}
                >
                    View Details
                </Button>
            </Box>
        </Box>
    );
};

export default EventCard;