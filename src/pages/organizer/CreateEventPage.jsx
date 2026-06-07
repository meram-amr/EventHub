import { useState } from 'react';
import {
    Box, Typography, Container, Grid,
    TextField, Button, MenuItem,
    Alert, CircularProgress
} from '@mui/material';
import { useNavigate } from 'react-router-dom';

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

const CreateEventPage = () => {
    const navigate = useNavigate();

    const [formData, setFormData] = useState({
        title: '',
        description: '',
        category: '',
        date: '',
        time: '',
        location: '',
        price: '',
        totalTickets: '',
    });

    const [image, setImage] = useState(null);
    const [preview, setPreview] = useState(null);
    const [error, setError] = useState('');
    const [success, setSuccess] = useState(false);
    const [loading, setLoading] = useState(false);

    // handle changes in any field in the form
    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    // change event image and show preview
    const handleImageChange = (e) => {
        const file = e.target.files[0];
        if (file) {
            setImage(file);
            setPreview(URL.createObjectURL(file));
        }
    };

    // create event button
    const handleSubmit = async (e) => {
        e.preventDefault();
        setError('');

        // validation
        if (!formData.title.trim()) {
            setError('Event title is required.'); return;
        }
        if (!formData.category) {
            setError('Please select a category.'); return;
        }
        if (!formData.date) {
            setError('Please select a date.'); return;
        }
        if (!formData.location.trim()) {
            setError('Location is required.'); return;
        }
        if (formData.price === '' || formData.price < 0) {
            setError('Please enter a valid price.'); return;
        }
        if (!formData.totalTickets || formData.totalTickets <= 0) {
            setError('Please enter the number of tickets.'); return;
        }

        setLoading(true);

        // add your API call here to submit the form data and image to the backend. For now, we'll just simulate a successful submission with a timeout.
        setTimeout(() => {
            setLoading(false);
            setSuccess(true);
            setTimeout(() => navigate('/organizer/dashboard'), 2000);
        }, 1500);
    };

    return (
        <Box sx={{ backgroundColor: '#F7F7F7', minHeight: '100vh', py: 4 }}>
            <Container maxWidth="md">

                {/* Header */}
                <Box sx={{ mb: 4 }}>
                    <Typography variant="h4" fontWeight={700} sx={{ color: '#1a1a2e' }}>
                        Create New Event
                    </Typography>
                    <Typography sx={{ color: '#888' }}>
                        Fill in the details to publish your event
                    </Typography>
                </Box>

                {/* Alerts */}
                {error && (
                    <Alert severity="error" sx={{ mb: 3, borderRadius: 2 }}>
                        {error}
                    </Alert>
                )}
                {success && (
                    <Alert severity="success" sx={{ mb: 3, borderRadius: 2 }}>
                        ✅ Event created successfully! Redirecting to dashboard...
                    </Alert>
                )}

                <Box component="form" onSubmit={handleSubmit}>
                    <Grid container spacing={3}>

                        {/* Left Column */}
                        <Grid item xs={12} md={8}>
                            <Box sx={{
                                backgroundColor: 'white', borderRadius: 3,
                                p: 3, border: '1px solid #eee', mb: 3
                            }}>
                                <Typography variant="h6" fontWeight={700}
                                    sx={{ color: '#1a1a2e', mb: 3 }}>
                                    Event Information
                                </Typography>

                                <TextField
                                    fullWidth name="title" label="Event Title"
                                    value={formData.title}
                                    onChange={handleChange} required
                                    sx={{ mb: 2, '& .MuiOutlinedInput-root': { borderRadius: 2 } }}
                                />

                                <TextField
                                    fullWidth name="description" label="Description"
                                    value={formData.description}
                                    onChange={handleChange}
                                    multiline rows={4}
                                    placeholder="Describe your event..."
                                    sx={{ mb: 2, '& .MuiOutlinedInput-root': { borderRadius: 2 } }}
                                />

                                <TextField
                                    fullWidth select name="category" label="Category"
                                    value={formData.category}
                                    onChange={handleChange} required
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
                                    value={formData.location}
                                    onChange={handleChange} required
                                    placeholder="e.g. Cairo Opera House"
                                    sx={{ mb: 2, '& .MuiOutlinedInput-root': { borderRadius: 2 } }}
                                />

                                <Grid container spacing={2}>
                                    <Grid item xs={6}>
                                        <TextField
                                            fullWidth name="date" label="Date"
                                            type="date" value={formData.date}
                                            onChange={handleChange} required
                                            InputLabelProps={{ shrink: true }}
                                            sx={{ '& .MuiOutlinedInput-root': { borderRadius: 2 } }}
                                        />
                                    </Grid>
                                    <Grid item xs={6}>
                                        <TextField
                                            fullWidth name="time" label="Time"
                                            type="time" value={formData.time}
                                            onChange={handleChange}
                                            InputLabelProps={{ shrink: true }}
                                            sx={{ '& .MuiOutlinedInput-root': { borderRadius: 2 } }}
                                        />
                                    </Grid>
                                </Grid>
                            </Box>

                            {/* Tickets & Price */}
                            <Box sx={{
                                backgroundColor: 'white', borderRadius: 3,
                                p: 3, border: '1px solid #eee'
                            }}>
                                <Typography variant="h6" fontWeight={700}
                                    sx={{ color: '#1a1a2e', mb: 3 }}>
                                    Tickets & Pricing
                                </Typography>

                                <Grid container spacing={2}>
                                    <Grid item xs={6}>
                                        <TextField
                                            fullWidth name="price" label="Price (EGP)"
                                            type="number" value={formData.price}
                                            onChange={handleChange} required
                                            placeholder="0 for free"
                                            inputProps={{ min: 0 }}
                                            sx={{ '& .MuiOutlinedInput-root': { borderRadius: 2 } }}
                                        />
                                    </Grid>
                                    <Grid item xs={6}>
                                        <TextField
                                            fullWidth name="totalTickets"
                                            label="Total Tickets"
                                            type="number" value={formData.totalTickets}
                                            onChange={handleChange} required
                                            inputProps={{ min: 1 }}
                                            sx={{ '& .MuiOutlinedInput-root': { borderRadius: 2 } }}
                                        />
                                    </Grid>
                                </Grid>
                            </Box>
                        </Grid>

                        {/* Image Upload */}
                        <Grid item xs={12} md={4}>
                            <Box sx={{
                                backgroundColor: 'white', borderRadius: 3,
                                p: 3, border: '1px solid #eee',
                                position: 'sticky', top: 80,
                            }}>
                                <Typography variant="h6" fontWeight={700}
                                    sx={{ color: '#1a1a2e', mb: 3 }}>
                                    Event Image
                                </Typography>

                                {/* Image Preview */}
                                <Box sx={{
                                    height: 200, borderRadius: 2,
                                    border: '2px dashed #eee',
                                    display: 'flex',
                                    alignItems: 'center',
                                    justifyContent: 'center',
                                    mb: 2, overflow: 'hidden',
                                    backgroundImage: preview ? `url(${preview})` : 'none',
                                    backgroundSize: 'cover',
                                    backgroundPosition: 'center',
                                    cursor: 'pointer',
                                    transition: 'all 0.2s',
                                    '&:hover': { borderColor: '#6C63FF' }
                                }}
                                    onClick={() => document.getElementById('image-upload').click()}
                                >
                                    {!preview && (
                                        <Box sx={{ textAlign: 'center' }}>
                                            <Typography fontSize={40}>📸</Typography>
                                            <Typography variant="body2" sx={{ color: '#888', mt: 1 }}>
                                                Click to upload image
                                            </Typography>
                                            <Typography variant="body2" sx={{ color: '#aaa', fontSize: 11 }}>
                                                PNG, JPG up to 5MB
                                            </Typography>
                                        </Box>
                                    )}
                                </Box>

                                <input
                                    id="image-upload"
                                    type="file"
                                    accept="image/*"
                                    onChange={handleImageChange}
                                    style={{ display: 'none' }}
                                />

                                <Button
                                    fullWidth variant="outlined"
                                    onClick={() => document.getElementById('image-upload').click()}
                                    sx={{
                                        borderColor: '#6C63FF', color: '#6C63FF',
                                        borderRadius: 2, mb: 2,
                                        '&:hover': { backgroundColor: '#f0f0ff' }
                                    }}>
                                    {preview ? 'Change Image' : 'Upload Image'}
                                </Button>

                                {/* Info Preview */}
                                {formData.title && (
                                    <Box sx={{
                                        backgroundColor: '#F7F7F7',
                                        borderRadius: 2, p: 2, mt: 2
                                    }}>
                                        <Typography variant="body2" fontWeight={700}
                                            sx={{ color: '#1a1a2e', mb: 1 }}>
                                            Preview
                                        </Typography>
                                        <Typography variant="body2" sx={{ color: '#555' }}>
                                            📌 {formData.title}
                                        </Typography>
                                        {formData.date && (
                                            <Typography variant="body2" sx={{ color: '#555' }}>
                                                📅 {formData.date}
                                            </Typography>
                                        )}
                                        {formData.location && (
                                            <Typography variant="body2" sx={{ color: '#555' }}>
                                                📍 {formData.location}
                                            </Typography>
                                        )}
                                        {formData.price !== '' && (
                                            <Typography variant="body2" fontWeight={700}
                                                sx={{ color: '#6C63FF' }}>
                                                💰 {formData.price === '0' ? 'Free' : `${formData.price} EGP`}
                                            </Typography>
                                        )}
                                    </Box>
                                )}
                            </Box>
                        </Grid>

                    </Grid>

                    {/* 2 buttons */}
                    <Box sx={{ display: 'flex', gap: 2, mt: 3, justifyContent: 'flex-end' }}>
                        <Button
                            variant="outlined"
                            onClick={() => navigate('/organizer/dashboard')}
                            sx={{
                                borderColor: '#eee', color: '#888',
                                borderRadius: 2, px: 4,
                            }}>
                            Cancel
                        </Button>
                        <Button
                            type="submit" variant="contained"
                            disabled={loading}
                            sx={{
                                backgroundColor: '#6C63FF', borderRadius: 2,
                                px: 4, py: 1.2,
                                '&:hover': { backgroundColor: '#4B44CC' }
                            }}>
                            {loading
                                ? <CircularProgress size={24} color="inherit" />
                                : 'Create Event'
                            }
                        </Button>
                    </Box>

                </Box>
            </Container>
        </Box>
    );
};

export default CreateEventPage;