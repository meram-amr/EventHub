import { useState, useEffect } from 'react';
import {
    Box, Typography, Button, Container,
    TextField, ToggleButton, ToggleButtonGroup,
    Grid, InputAdornment
} from '@mui/material';
import { Link } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import { useNavigate } from "react-router-dom";

const heroSlides = [
    { image: 'https://images.unsplash.com/photo-1540039155733-5bb30b53aa14?w=1600&q=80', label: '🎵 Concerts' },
    { image: 'https://images.unsplash.com/photo-1461896836934-ffe607ba8211?w=1600&q=80', label: '⚽ Sports Events' },
    { image: 'https://images.unsplash.com/photo-1523580494863-6f3031224c94?w=1600&q=80', label: '🎓 University Events' },
    { image: 'https://images.unsplash.com/photo-1492684223066-81342ee5ff30?w=1600&q=80', label: '🎭 Theater & Arts' },
];

const fakeEvents = [
    {
        id: 1,
        title: 'Cairo Concert Night',
        price: 200,
        date: 'Jan 20, 2025',
        image: 'https://images.unsplash.com/photo-1540039155733-5bb30b53aa14?w=600&q=80',
    },
    {
        id: 2,
        title: 'Jazz Evening',
        price: 150,
        date: 'Feb 15, 2025',
        image: 'https://images.unsplash.com/photo-1415201364774-f6f0bb35f28f?w=600&q=80',
    },
];

const HomePage = () => {
    const { user } = useAuth();
    const navigate = useNavigate();
    const [current, setCurrent] = useState(0);
    const [search, setSearch] = useState('');
    const [category, setCategory] = useState('ALL');
    const [favorites, setFavorites] = useState([]);

    useEffect(() => {
        const timer = setInterval(() => {
            setCurrent((prev) => (prev + 1) % heroSlides.length);
        }, 4000);
        return () => clearInterval(timer);
    }, []);

    const filteredEvents = fakeEvents.filter((event) => {
        const matchSearch = event.title.toLowerCase().includes(search.toLowerCase());
        const matchCategory = category === 'ALL' || event.category === category;
        return matchSearch && matchCategory;
    });

    const toggleFav = (id, e) => {
        e.stopPropagation();

        setFavorites(prev =>
            prev.includes(id)
                ? prev.filter(x => x !== id)
                : [...prev, id]
        );
    };

    // if user is logged in — show events feed
    if (user) {
        return (
            <Box sx={{ backgroundColor: '#F7F7F7', minHeight: '100vh', py: 4 }}>
                <Container>

                    <Typography variant="h4" fontWeight={700}
                        sx={{ color: '#1a1a2e', mb: 1 }}>
                        Welcome back, {user.name}! 👋
                    </Typography>
                    <Typography sx={{ color: '#888', mb: 4 }}>
                        Discover the latest events
                    </Typography>

                    {/* Search */}
                    <TextField
                        fullWidth
                        placeholder="Search events..."
                        value={search}
                        onChange={(e) => setSearch(e.target.value)}
                        InputProps={{
                            startAdornment: (
                                <InputAdornment position="start">🔍</InputAdornment>
                            ),
                        }}
                        sx={{
                            mb: 3, backgroundColor: 'white',
                            borderRadius: 2,
                            '& .MuiOutlinedInput-root': { borderRadius: 2 }
                        }}
                    />

                    {/* Filter */}
                    <ToggleButtonGroup
                        value={category}
                        exclusive
                        onChange={(_, val) => { if (val) setCategory(val); }}
                        sx={{ mb: 4, flexWrap: 'wrap', gap: 1 }}
                    >
                        {[
                            { val: 'ALL', label: 'All' },
                            { val: 'TECH', label: 'Tech' },
                            { val: 'EDUCATION', label: 'Education' },
                            { val: 'SOCIAL', label: 'Social' },
                            { val: 'SPORTS', label: 'Sports' },
                            { val: 'GAMING', label: 'Gaming' },
                            { val: 'BUSINESS', label: 'Business' },
                            { val: 'HEALTH', label: 'Health' },
                        ].map((cat) => (
                            <ToggleButton
                                key={cat.val}
                                value={cat.val}
                                sx={{
                                    borderRadius: '20px !important',
                                    px: 2,
                                    border: '1px solid #eee !important',
                                    '&.Mui-selected': {
                                        backgroundColor: '#6C63FF !important',
                                        color: 'white !important',
                                    }
                                }}
                            >
                                {cat.label}
                            </ToggleButton>
                        ))}
                    </ToggleButtonGroup>

                    {/* Events Grid */}
                    {filteredEvents.length === 0 ? (
                        <Box sx={{ textAlign: 'center', py: 8 }}>
                            <Typography fontSize={48}>🔍</Typography>
                            <Typography variant="h6" sx={{ color: '#888', mt: 2 }}>
                                No events found
                            </Typography>
                        </Box>
                    ) : (
                        <Box
                            sx={{
                                display: 'grid',
                                gridTemplateColumns: {
                                    xs: '1fr',
                                    sm: '1fr 1fr',
                                    md: '1fr 1fr 1fr'
                                },
                                gap: 3,
                            }}
                        >
                            {filteredEvents.map((ev) => (
                                <Box
                                    key={ev.id}
                                    sx={{
                                        backgroundColor: 'white',
                                        borderRadius: 3,
                                        overflow: 'hidden',
                                        border: '1px solid #eee',
                                        cursor: 'pointer',
                                        position: 'relative',
                                        transition: '0.3s',
                                        '&:hover': {
                                            transform: 'translateY(-5px)',
                                            boxShadow: '0 10px 30px rgba(0,0,0,0.08)'
                                        }
                                    }}
                                    onClick={() => navigate(`/event/${ev.id}`)}
                                >


                                    {/* IMAGE */}
                                    <Box sx={{ position: 'relative', height: 180 }}>
                                        <img
                                            src={ev.image}
                                            alt={ev.title}
                                            style={{
                                                width: '100%',
                                                height: '100%',
                                                objectFit: 'cover'
                                            }}
                                        />

                                        {/* overlay */}
                                        <Box sx={{
                                            position: 'absolute',
                                            inset: 0,
                                            background: 'linear-gradient(to top, rgba(0,0,0,0.6), transparent)'
                                        }} />

                                        {/* CATEGORY */}
                                        <Box sx={{
                                            position: 'absolute',
                                            top: 10,
                                            left: 10,
                                            backgroundColor: '#6C63FF',
                                            color: 'white',
                                            px: 1.5,
                                            py: 0.3,
                                            borderRadius: 2,
                                            fontSize: 12
                                        }}>
                                            {ev.category || 'EVENT'}
                                        </Box>

                                        {/* ❤️ HEART */}
                                        <Box
                                            onClick={(e) => toggleFav(ev.id, e)}
                                            sx={{
                                                position: 'absolute',
                                                top: 10,
                                                right: 10,
                                                width: 34,
                                                height: 34,
                                                borderRadius: '50%',
                                                backgroundColor: 'transparent',
                                                display: 'flex',
                                                alignItems: 'center',
                                                justifyContent: 'center',
                                                border: '1px solid gray',
                                                cursor: 'pointer',
                                                fontSize: 18,
                                                transition: '0.2s',
                                                '&:hover': { transform: 'scale(1.1)' }
                                            }}
                                        >
                                            {favorites.includes(ev.id) ? '❤️' : '🤍'}
                                        </Box>
                                    </Box>

                                    {/* INFO */}
                                    <Box sx={{ p: 2 }}>
                                        <Typography fontWeight={700} sx={{ mb: 1 }}>
                                            {ev.title}
                                        </Typography>

                                        <Typography sx={{ fontSize: 13, color: '#666' }}>
                                            📅 {ev.date}
                                        </Typography>

                                        <Typography sx={{ fontSize: 13, color: '#666' }}>
                                            📍 {ev.location || 'Cairo'}
                                        </Typography>
                                    </Box>

                                    {/* FOOTER */}
                                    <Box
                                        sx={{
                                            display: 'flex',
                                            justifyContent: 'space-between',
                                            alignItems: 'center',
                                            px: 2,
                                            pb: 2
                                        }}
                                    >
                                        <Typography sx={{
                                            fontWeight: 700,
                                            color: ev.price === 0 ? '#4CAF50' : '#6C63FF'
                                        }}>
                                            {ev.price === 0 ? 'FREE' : ` ${ev.price} EGP`}
                                        </Typography>
                                    </Box>
                                </Box>
                            ))}
                        </Box>
                    )}

                </Container>
            </Box>
        );
    }

    // if user is not logged in — show hero page
    return (
        <Box>
            {/* Hero */}
            <Box sx={{
                minHeight: '90vh', position: 'relative',
                display: 'flex', alignItems: 'center',
                justifyContent: 'center', flexDirection: 'column',
                textAlign: 'center', px: 2, overflow: 'hidden',
            }}>
                {heroSlides.map((slide, index) => (
                    <Box key={index} sx={{
                        position: 'absolute', inset: 0,
                        backgroundImage: `url(${slide.image})`,
                        backgroundSize: 'cover', backgroundPosition: 'center',
                        opacity: current === index ? 1 : 0,
                        transition: 'opacity 1s ease-in-out', zIndex: 0,
                    }} />
                ))}
                <Box sx={{
                    position: 'absolute', inset: 0,
                    backgroundColor: 'rgba(0,0,0,0.6)', zIndex: 1,
                }} />
                <Typography variant="h2" fontWeight={700}
                    sx={{ color: 'white', position: 'relative', zIndex: 2, maxWidth: 700 }}>
                    Discover the Best
                    <span style={{ color: '#6C63FF' }}> Events </span>
                    Near You
                </Typography>
                <Typography variant="h6"
                    sx={{ color: '#ccc', maxWidth: 500, mt: 2, position: 'relative', zIndex: 2 }}>
                    Concerts, matches, university events — all in one place
                </Typography>
                <Box sx={{ display: 'flex', gap: 2, mt: 4, position: 'relative', zIndex: 2 }}>
                    <Button component={Link} to="/register"
                        variant="contained" size="large"
                        sx={{
                            backgroundColor: '#6C63FF', borderRadius: 3,
                            px: 4, py: 1.5, fontSize: '1rem',
                            '&:hover': { backgroundColor: '#4B44CC' }
                        }}>
                        Get Started
                    </Button>
                    <Button variant="outlined" size="large"
                        sx={{
                            borderColor: 'white', color: 'white',
                            borderRadius: 3, px: 4, py: 1.5, fontSize: '1rem',
                            '&:hover': { borderColor: '#6C63FF', color: '#6C63FF' }
                        }}>
                        Learn More
                    </Button>
                </Box>
                <Box sx={{ display: 'flex', gap: 1, mt: 4, position: 'relative', zIndex: 2 }}>
                    {heroSlides.map((_, index) => (
                        <Box key={index} onClick={() => setCurrent(index)} sx={{
                            width: current === index ? 24 : 8, height: 8,
                            borderRadius: 4,
                            backgroundColor: current === index ? '#6C63FF' : 'rgba(255,255,255,0.5)',
                            cursor: 'pointer', transition: 'all 0.3s',
                        }} />
                    ))}
                </Box>
            </Box>

            {/* Stats */}
            <Box sx={{ backgroundColor: 'white', py: 8 }}>
                <Container>
                    <Typography variant="h4" fontWeight={700}
                        sx={{ color: '#1a1a2e', textAlign: 'center', mb: 6 }}>
                        Trusted by Thousands
                    </Typography>
                    <Box sx={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: 4 }}>
                        {[
                            { number: '500+', label: 'Events', desc: 'Events hosted every month' },
                            { number: '10K+', label: 'Users', desc: 'Happy users on the platform' },
                            { number: '50+', label: 'Organizers', desc: 'Verified event organizers' },
                        ].map((stat) => (
                            <Box key={stat.label} sx={{
                                textAlign: 'center', p: 4, borderRadius: 3,
                                border: '1px solid #eee', transition: 'all 0.2s',
                                '&:hover': {
                                    borderColor: '#6C63FF',
                                    boxShadow: '0 8px 32px #6C63FF22',
                                    transform: 'translateY(-4px)',
                                }
                            }}>
                                <Typography fontSize={40} mb={1}>{stat.icon}</Typography>
                                <Typography variant="h3" fontWeight={700} sx={{ color: '#6C63FF' }}>
                                    {stat.number}
                                </Typography>
                                <Typography variant="h6" fontWeight={600}
                                    sx={{ color: '#1a1a2e', mb: 1 }}>
                                    {stat.label}
                                </Typography>
                                <Typography variant="body2" sx={{ color: '#888' }}>
                                    {stat.desc}
                                </Typography>
                            </Box>
                        ))}
                    </Box>
                </Container>
            </Box>

            {/* How it Works */}
            <Box sx={{ backgroundColor: '#F7F7F7', py: 8 }}>
                <Container>
                    <Typography variant="h4" fontWeight={700}
                        sx={{ color: '#1a1a2e', textAlign: 'center', mb: 2 }}>
                        How It Works
                    </Typography>
                    <Typography variant="body1"
                        sx={{ color: '#888', textAlign: 'center', mb: 8 }}>
                        Get started in 3 simple steps
                    </Typography>
                    <Box sx={{
                        display: 'grid',
                        gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))',
                        gap: 4,
                    }}>
                        {[
                            {
                                step: '01', title: 'Browse Events',
                                desc: 'Explore hundreds of events near you.', color: '#6C63FF'
                            },
                            {
                                step: '02', title: 'Book a Ticket',
                                desc: 'Pay securely and get your ticket instantly.', color: '#FF6B6B'
                            },
                            {
                                step: '03', title: 'Enjoy the Event',
                                desc: 'Show your QR code and enjoy!', color: '#4ECDC4'
                            },
                        ].map((item) => (
                            <Box key={item.step} sx={{
                                backgroundColor: 'white', borderRadius: 3,
                                p: 4, textAlign: 'center',
                                border: '1px solid #eee', position: 'relative',
                                transition: 'all 0.2s',
                                '&:hover': {
                                    borderColor: item.color,
                                    transform: 'translateY(-4px)',
                                    boxShadow: `0 8px 32px ${item.color}33`,
                                }
                            }}>
                                <Box sx={{
                                    position: 'absolute', top: -16,
                                    left: '50%', transform: 'translateX(-50%)',
                                    backgroundColor: item.color, color: 'white',
                                    width: 32, height: 32, borderRadius: '50%',
                                    display: 'flex', alignItems: 'center',
                                    justifyContent: 'center', fontSize: 12, fontWeight: 700,
                                }}>
                                    {item.step}
                                </Box>
                                <Typography fontSize={48} mb={2} mt={1}>{item.icon}</Typography>
                                <Typography variant="h6" fontWeight={700}
                                    sx={{ color: '#1a1a2e', mb: 1 }}>
                                    {item.title}
                                </Typography>
                                <Typography variant="body2" sx={{ color: '#888', lineHeight: 1.7 }}>
                                    {item.desc}
                                </Typography>
                            </Box>
                        ))}
                    </Box>
                </Container>
            </Box>

            {/* Footer */}
            <Box sx={{ backgroundColor: '#1a1a2e', py: 4, textAlign: 'center' }}>
                <Typography sx={{ color: '#aaa', fontSize: 14 }}>
                    © 2026 Event<span style={{ color: '#6C63FF' }}>Hub</span> — All rights reserved
                </Typography>
            </Box>
        </Box>
    );
};

export default HomePage;