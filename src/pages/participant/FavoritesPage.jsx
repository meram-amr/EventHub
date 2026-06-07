import { useState } from 'react';
import {
    Box, Typography, Container,
    Grid, Button, Chip
} from '@mui/material';
import { useNavigate } from 'react-router-dom';

const fakeFavorites = [
    {
        id: 1,
        title: "Cairo Concert Night",
        date: "Jan 20, 2025",
        location: "Cairo Opera House",
        price: 200,
        image: "https://images.unsplash.com/photo-1540039155733-5bb30b53aa14?w=600&q=80",
        category: "CONCERT"
    },
    {
        id: 2,
        title: "Football Match",
        date: "Jan 25, 2025",
        location: "Cairo Stadium",
        price: 150,
        image: "https://images.unsplash.com/photo-1461896836934-ffe607ba8211?w=600&q=80",
        category: "SPORTS"
    }
];


const FavoritesPage = () => {
    const navigate = useNavigate();
    const [favorites, setFavorites] = useState(fakeFavorites);

    const handleRemove = (id) => {
        setFavorites(favorites.filter((f) => f.id !== id));
    };

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

    return (
        <Box sx={{ backgroundColor: '#F7F7F7', minHeight: '100vh', py: 4 }}>
            <Container>

                {/* Header */}
                <Typography variant="h4" fontWeight={700}
                    sx={{ color: '#1a1a2e', mb: 1 }}>
                    My Favorites
                </Typography>
                <Typography sx={{ color: '#888', mb: 4 }}>
                    Events you saved for later
                </Typography>

                {/* if no favorites */}
                {favorites.length === 0 ? (
                    <Box sx={{ textAlign: 'center', py: 10 }}>
                        <Typography fontSize={48}>💔</Typography>
                        <Typography variant="h6" sx={{ color: '#888', mt: 2 }}>
                            No favorites yet
                        </Typography>
                        <Typography variant="body2" sx={{ color: '#aaa', mb: 3 }}>
                            Start exploring events and save your favorites!
                        </Typography>
                        <Button
                            onClick={() => navigate('/')}
                            variant="contained"
                            sx={{ backgroundColor: '#6C63FF', borderRadius: 2 }}>
                            Browse Events
                        </Button>
                    </Box>
                ) : (
                    <Grid container spacing={3} sx={{ width: '100%' }}>
                        {favorites.map((event) => (
                            <Grid item xs={12} sm={6} md={4} key={event.id}>
                                <Box sx={{
                                    backgroundColor: 'white',
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

                                    {/* Image */}
                                    <Box sx={{
                                        height: 180,
                                        backgroundImage: `url(${event.image})`,
                                        backgroundSize: 'cover',
                                        backgroundPosition: 'center',
                                        position: 'relative',
                                    }}>
                                        {/* Overlay */}
                                        <Box sx={{
                                            position: 'absolute', inset: 0,
                                            background: 'linear-gradient(to top, rgba(0,0,0,0.4), transparent)',
                                        }} />

                                        {/* Category Badge */}
                                        <Chip label={event.category} size="small" sx={{
                                            position: 'absolute', top: 12, left: 12,
                                            backgroundColor: categoryColors[event.category],
                                            color: event.category === 'THEATER' ? '#1a1a2e' : 'white',
                                            fontWeight: 600, fontSize: 11,
                                        }} />

                                        {/* Remove Button */}
                                        <Button
                                            size="small"
                                            onClick={() => handleRemove(event.id)}
                                            sx={{
                                                position: 'absolute', top: 8, right: 8,
                                                minWidth: 'auto', p: 0.5,
                                                backgroundColor: 'rgba(255,255,255,0.2)',
                                                backdropFilter: 'blur(4px)',
                                                borderRadius: 2, fontSize: 16,
                                                '&:hover': { backgroundColor: 'rgba(255,107,107,0.8)' }
                                            }}>
                                            ❤️
                                        </Button>
                                    </Box>

                                    {/* Event Information */}
                                    <Box sx={{ p: 2.5 }}>
                                        <Typography variant="h6" fontWeight={700}
                                            sx={{
                                                color: '#1a1a2e', mb: 1, fontSize: '1rem',
                                                overflow: 'hidden', textOverflow: 'ellipsis',
                                                whiteSpace: 'nowrap'
                                            }}>
                                            {event.title}
                                        </Typography>

                                        <Box sx={{ display: 'flex', flexDirection: 'column', gap: 0.5, mb: 2 }}>
                                            <Typography variant="body2" sx={{ color: '#888' }}>
                                                📅 {event.date}
                                            </Typography>
                                            <Typography variant="body2" sx={{ color: '#888' }}>
                                                📍 {event.location}
                                            </Typography>
                                            <Typography variant="body2" fontWeight={700}
                                                sx={{ color: '#6C63FF', mt: 0.5 }}>
                                                💰 {event.price} EGP
                                            </Typography>
                                        </Box>

                                        {/* buttons*/}
                                        <Box sx={{ display: 'flex', gap: 1 }}>
                                            <Button
                                                fullWidth variant="contained"
                                                onClick={() => navigate(`/events/${event.id}`)}
                                                sx={{
                                                    backgroundColor: '#6C63FF', borderRadius: 2,
                                                    '&:hover': { backgroundColor: '#4B44CC' }
                                                }}>
                                                View Details
                                            </Button>
                                            <Button
                                                variant="outlined"
                                                onClick={() => handleRemove(event.id)}
                                                sx={{
                                                    borderColor: '#FF6B6B', color: '#FF6B6B',
                                                    borderRadius: 2, minWidth: 'auto', px: 1.5,
                                                    '&:hover': { backgroundColor: '#fff0f0' }
                                                }}>
                                                🗑️
                                            </Button>
                                        </Box>
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

export default FavoritesPage;