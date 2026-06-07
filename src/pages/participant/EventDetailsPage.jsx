import { useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import {
    Box, Typography, Button, Container,
    Grid, Chip, Divider, TextField,
    Avatar, Rating
} from '@mui/material';
import { useAuth } from '../../context/AuthContext';

/* Fake Data (replace later with API) */
const fakeEvents = [
    {
        id: 1,
        title: "Cairo Concert Night",
        date: "2025-01-20",
        time: "8:00 PM",
        location: "Cairo Opera House",
        organizer: "EventHub",
        availableTickets: 50,
        price: 200,
        category: "CONCERT",
        image: "https://images.unsplash.com/photo-1540039155733-5bb30b53aa14?w=1200",
        description: "Amazing live concert with top artists in Cairo."
    }
];

const fakeReviews = [
    {
        id: 1,
        name: "Ahmed",
        rating: 5,
        comment: "Amazing event!",
        avatar: "A"
    },
    {
        id: 2,
        name: "Sara",
        rating: 4,
        comment: "Really enjoyed it!",
        avatar: "S"
    }
];

const categoryColors = {
    CONCERT: '#6C63FF',
    SPORTS: '#FF6B6B',
    UNIVERSITY: '#4ECDC4',
    THEATER: '#FFE66D',
    GAMING: '#A8EDEA',
};

const EventDetailsPage = () => {
    const { id } = useParams();
    const { user } = useAuth();
    const navigate = useNavigate();

    /* find event */
    const event = fakeEvents.find(e => e.id === Number(id));

    const [isFavorite, setIsFavorite] = useState(false);
    const [booked, setBooked] = useState(false);
    const [reviewText, setReviewText] = useState('');
    const [reviewRating, setReviewRating] = useState(5);
    const [reviews, setReviews] = useState(fakeReviews);

    /* NOT FOUND */
    if (!event) {
        return (
            <Box sx={{ textAlign: 'center', py: 10 }}>

                <Typography variant="h5" sx={{ color: '#888', mt: 2 }}>
                    Event not found
                </Typography>
                <Button
                    onClick={() => navigate('/')}
                    variant="contained"
                    sx={{ mt: 3, backgroundColor: '#6C63FF' }}
                >
                    Back to Events
                </Button>
            </Box>
        );
    }

    const handleBook = () => {
        if (!user) {
            navigate('/login');
            return;
        }
        setBooked(true);
        navigate(`/payment/${event.id}`);
    };

    const handleAddReview = () => {
        if (!reviewText.trim()) return;

        const newReview = {
            id: Date.now(),
            name: user?.name || 'Anonymous',
            rating: reviewRating,
            comment: reviewText,
            avatar: user?.name?.charAt(0).toUpperCase() || 'U',
        };

        setReviews([newReview, ...reviews]);
        setReviewText('');
        setReviewRating(5);
    };

    return (
        <Box sx={{ backgroundColor: '#F7F7F7', minHeight: '100vh' }}>

            {/* HERO */}
            <Box sx={{
                height: { xs: 250, md: 420 },
                backgroundImage: `url(${event.image})`,
                backgroundSize: 'cover',
                backgroundPosition: 'center',
                position: 'relative',
            }}>
                <Box sx={{
                    position: 'absolute', inset: 0,
                    background: 'linear-gradient(to top, rgba(0,0,0,0.7), transparent)',
                }} />

                <Button
                    onClick={() => navigate('/')}
                    sx={{
                        position: 'absolute', top: 20, left: 20,
                        backgroundColor: 'rgba(255,255,255,0.2)',
                        color: 'white',
                    }}
                >
                    ← Back
                </Button>

                <Chip
                    label={event.category}
                    sx={{
                        position: 'absolute', top: 20, right: 20,
                        backgroundColor: categoryColors[event.category],
                        color: 'white',
                        fontWeight: 700,
                    }}
                />
            </Box>

            <Container sx={{ py: 4 }}>
                <Grid container spacing={4}>

                    {/* LEFT */}
                    <Grid item xs={12} md={8}>
                        <Box sx={{ backgroundColor: 'white', p: 3, borderRadius: 3 }}>

                            <Typography variant="h4" fontWeight={700}>
                                {event.title}
                            </Typography>

                            <Typography sx={{ mt: 2, color: '#666' }}>
                                📅 {event.date} • 🕒 {event.time}
                            </Typography>

                            <Typography sx={{ color: '#666' }}>
                                📍 {event.location}
                            </Typography>

                            <Divider sx={{ my: 3 }} />

                            <Typography>
                                {event.description}
                            </Typography>
                        </Box>

                        {/* REVIEWS */}
                        <Box sx={{ backgroundColor: 'white', p: 3, borderRadius: 3, mt: 3, float: 'right', width: '100%' }}>
                            <Typography variant="h5">Reviews</Typography>

                            {user && (
                                <Box sx={{ my: 2 }}>
                                    <Rating
                                        value={reviewRating}
                                        onChange={(_, v) => setReviewRating(v)}
                                    />

                                    <TextField
                                        fullWidth
                                        multiline
                                        rows={3}
                                        value={reviewText}
                                        onChange={(e) => setReviewText(e.target.value)}
                                        sx={{ mt: 1 }}
                                    />

                                    <Button
                                        onClick={handleAddReview}
                                        variant="contained"
                                        sx={{ mt: 1, backgroundColor: '#6C63FF' }}
                                    >
                                        Add Review
                                    </Button>
                                </Box>
                            )}

                            {reviews.map(r => (
                                <Box key={r.id} sx={{ display: 'flex', gap: 2, mt: 2 }}>
                                    <Avatar>{r.avatar}</Avatar>
                                    <Box>
                                        <Typography fontWeight={600}>{r.name}</Typography>
                                        <Rating value={r.rating} readOnly size="small" />
                                        <Typography variant="body2">{r.comment}</Typography>
                                    </Box>
                                </Box>
                            ))}
                        </Box>
                    </Grid>

                    {/* RIGHT */}
                    <Grid item xs={12} md={4} sx={{ position: 'relative', width: '640px', float: 'right' }}>
                        <Box sx={{ display: 'flex', flexDirection: 'column', gap: 3, position: 'sticky', top: 80 }}>

                            {/* BOOKING CARD */}
                            <Box sx={{
                                backgroundColor: 'white',
                                p: 4,
                                borderRadius: 3,
                                width: '100%',
                                minHeight: 220,
                                display: 'flex',
                                flexDirection: 'column',
                                justifyContent: 'center',
                                boxShadow: '0 8px 30px rgba(0,0,0,0.05)'
                            }}>

                                <Typography variant="h3" fontWeight={800} color="#6C63FF" align="center">
                                    {event.price === 0 ? "Free" : `${event.price} EGP`}
                                </Typography>

                                <Button
                                    fullWidth
                                    onClick={handleBook}
                                    sx={{
                                        mt: 3,
                                        py: 1.5,
                                        borderRadius: 2,
                                        color: 'white',
                                        backgroundColor: '#6C63FF',
                                        fontSize: '1rem',
                                        fontWeight: 700,
                                        '&:hover': {
                                            backgroundColor: '#4B44CC'
                                        }
                                    }}
                                >
                                    Book Now
                                </Button>

                                <Button
                                    fullWidth
                                    onClick={() => setIsFavorite(!isFavorite)}
                                    sx={{
                                        mt: 1,
                                        py: 1.5,
                                        fontSize: '1rem',
                                        fontWeight: 700,
                                        borderRadius: 2,
                                        fontWeight: 700,
                                        color: isFavorite ? 'white' : '#FF6B6B',
                                        backgroundColor: isFavorite ? '#f38383' : 'rgba(255,255,255,0.2)',
                                    }}

                                >
                                    {isFavorite ? "❤️ Saved" : "🤍 Save"}
                                </Button>
                            </Box>

                        </Box>
                    </Grid>
                </Grid>
            </Container>
        </Box>
    );
};

export default EventDetailsPage;