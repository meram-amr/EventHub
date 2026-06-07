import { useState } from 'react';
import {
    Box, Typography, Container, Grid,
    TextField, Button, MenuItem,
    Alert, CircularProgress
} from '@mui/material';
import { useNavigate, useParams } from 'react-router-dom';

const categories = [
    { value: 'Technology', label: 'Technology' },
    { value: 'Education', label: 'Education' },
    { value: 'Social', label: 'Social' },
    { value: 'Sports', label: 'Sports' },
    { value: 'GAMING', label: 'Gaming' },
    { value: 'BUSINESS', label: 'Business' },
    { value: 'Art & Culture', label: 'Art & Culture' },
    { value: 'Health & Fitness', label: 'Health & Fitness' },
    { value: 'ENTERTAINMENT', label: 'Entertainment' },
    { value: 'OTHER', label: 'Other' },
];

const fakeEvents = [
    {
        id: 1, title: 'Cairo Concert Night', description: 'An unforgettable night.',
        category: 'CONCERT', date: '2025-01-20', time: '20:00',
        location: 'Cairo Opera House', price: '200', totalTickets: '100'
    },
    {
        id: 2, title: 'Gaming Tournament', description: 'Compete with the best.',
        category: 'GAMING', date: '2025-02-10', time: '14:00',
        location: 'Smart Village', price: '50', totalTickets: '120'
    },
];

const EditEventPage = () => {
    const { id } = useParams();
    const navigate = useNavigate();

    const existingEvent = fakeEvents.find((e) => e.id === parseInt(id))
        || fakeEvents[0];

    const [formData, setFormData] = useState({
        title: existingEvent.title,
        description: existingEvent.description,
        category: existingEvent.category,
        date: existingEvent.date,
        time: existingEvent.time,
        location: existingEvent.location,
        price: existingEvent.price,
        totalTickets: existingEvent.totalTickets,
    });

    const [error, setError] = useState('');
    const [success, setSuccess] = useState(false);
    const [loading, setLoading] = useState(false);

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError('');
        if (!formData.title.trim()) { setError('Title is required.'); return; }
        if (!formData.category) { setError('Category is required.'); return; }
        if (!formData.date) { setError('Date is required.'); return; }
        if (!formData.location.trim()) { setError('Location is required.'); return; }

        setLoading(true);
        setTimeout(() => {
            setLoading(false);
            setSuccess(true);
            setTimeout(() => navigate('/organizer/dashboard'), 2000);
        }, 1500);
    };

    return (
        <Box sx={{ backgroundColor: '#F7F7F7', minHeight: '100vh', py: 4 }}>
            <Container maxWidth="md">

                <Box sx={{ mb: 4 }}>
                    <Typography variant="h4" fontWeight={700} sx={{ color: '#1a1a2e' }}>
                        Edit Event
                    </Typography>
                    <Typography sx={{ color: '#888' }}>
                        Update your event details
                    </Typography>
                </Box>

                {error && (
                    <Alert severity="error" sx={{ mb: 3, borderRadius: 2 }}>{error}</Alert>
                )}
                {success && (
                    <Alert severity="success" sx={{ mb: 3, borderRadius: 2 }}>
                        ✅ Event updated! Redirecting...
                    </Alert>
                )}

                <Box component="form" onSubmit={handleSubmit}>
                    <Grid container spacing={3}>
                        <Grid item xs={12}>
                            <Box sx={{
                                backgroundColor: 'white', borderRadius: 3,
                                p: 3, border: '1px solid #eee'
                            }}>
                                <Typography variant="h6" fontWeight={700}
                                    sx={{ color: '#1a1a2e', mb: 3 }}>
                                    Event Information
                                </Typography>

                                <TextField
                                    fullWidth name="title" label="Event Title"
                                    value={formData.title} onChange={handleChange}
                                    required sx={{ mb: 2, '& .MuiOutlinedInput-root': { borderRadius: 2 } }}
                                />

                                <TextField
                                    fullWidth name="description" label="Description"
                                    value={formData.description} onChange={handleChange}
                                    multiline rows={4}
                                    sx={{ mb: 2, '& .MuiOutlinedInput-root': { borderRadius: 2 } }}
                                />

                                <TextField
                                    fullWidth select name="category" label="Category"
                                    value={formData.category} onChange={handleChange}
                                    sx={{ mb: 2, '& .MuiOutlinedInput-root': { borderRadius: 2 } }}
                                >
                                    {categories.map((cat) => (
                                        <MenuItem key={cat.value} value={cat.value}>
                                            {cat.label}
                                        </MenuItem>
                                    ))}
                                </TextField>

                                <TextField
                                    fullWidth name="location" label="Location"
                                    value={formData.location} onChange={handleChange}
                                    sx={{ mb: 2, '& .MuiOutlinedInput-root': { borderRadius: 2 } }}
                                />

                                <Grid container spacing={2} sx={{ mb: 2 }}>
                                    <Grid item xs={6}>
                                        <TextField
                                            fullWidth name="date" label="Date" type="date"
                                            value={formData.date} onChange={handleChange}
                                            InputLabelProps={{ shrink: true }}
                                            sx={{ '& .MuiOutlinedInput-root': { borderRadius: 2 } }}
                                        />
                                    </Grid>
                                    <Grid item xs={6}>
                                        <TextField
                                            fullWidth name="time" label="Time" type="time"
                                            value={formData.time} onChange={handleChange}
                                            InputLabelProps={{ shrink: true }}
                                            sx={{ '& .MuiOutlinedInput-root': { borderRadius: 2 } }}
                                        />
                                    </Grid>
                                </Grid>

                                <Grid container spacing={2}>
                                    <Grid item xs={6}>
                                        <TextField
                                            fullWidth name="price" label="Price (EGP)"
                                            type="number" value={formData.price}
                                            onChange={handleChange}
                                            inputProps={{ min: 0 }}
                                            sx={{ '& .MuiOutlinedInput-root': { borderRadius: 2 } }}
                                        />
                                    </Grid>
                                    <Grid item xs={6}>
                                        <TextField
                                            fullWidth name="totalTickets" label="Total Tickets"
                                            type="number" value={formData.totalTickets}
                                            onChange={handleChange}
                                            inputProps={{ min: 1 }}
                                            sx={{ '& .MuiOutlinedInput-root': { borderRadius: 2 } }}
                                        />
                                    </Grid>
                                </Grid>
                            </Box>
                        </Grid>
                    </Grid>

                    <Box sx={{ display: 'flex', gap: 2, mt: 3, justifyContent: 'flex-end' }}>
                        <Button variant="outlined"
                            onClick={() => navigate('/organizer/dashboard')}
                            sx={{ borderColor: '#eee', color: '#888', borderRadius: 2, px: 4 }}>
                            Cancel
                        </Button>
                        <Button type="submit" variant="contained" disabled={loading}
                            sx={{
                                backgroundColor: '#6C63FF', borderRadius: 2, px: 4,
                                '&:hover': { backgroundColor: '#4B44CC' }
                            }}>
                            {loading
                                ? <CircularProgress size={24} color="inherit" />
                                : 'Save Changes'
                            }
                        </Button>
                    </Box>
                </Box>
            </Container>
        </Box>
    );
};

export default EditEventPage;