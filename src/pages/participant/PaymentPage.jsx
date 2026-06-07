import { useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import {
    Box, Typography, Container, Grid,
    TextField, Button, Divider,
    Alert, CircularProgress
} from '@mui/material';

const fakeEvents = [
    {
        id: 1, title: 'Cairo Concert Night', date: 'Jan 20, 2025',
        location: 'Cairo Opera House', price: 200,
        image: 'https://images.unsplash.com/photo-1540039155733-5bb30b53aa14?w=600&q=80'
    },
    {
        id: 2, title: 'Al Ahly vs Zamalek', date: 'Jan 25, 2025',
        location: 'Cairo Stadium', price: 150,
        image: 'https://images.unsplash.com/photo-1461896836934-ffe607ba8211?w=600&q=80'
    },
    {
        id: 3, title: 'Graduation Ceremony', date: 'Feb 1, 2025',
        location: 'Helwan University', price: 0,
        image: 'https://images.unsplash.com/photo-1523580494863-6f3031224c94?w=600&q=80'
    },
    {
        id: 4, title: 'Stand-up Comedy Night', date: 'Feb 5, 2025',
        location: 'Hanager Arts Center', price: 100,
        image: 'https://images.unsplash.com/photo-1492684223066-81342ee5ff30?w=600&q=80'
    },
    {
        id: 5, title: 'Gaming Tournament', date: 'Feb 10, 2025',
        location: 'Smart Village', price: 50,
        image: 'https://images.unsplash.com/photo-1542751371-adc38448a05e?w=600&q=80'
    },
    {
        id: 6, title: 'Jazz Evening', date: 'Feb 15, 2025',
        location: 'Zamalek Club', price: 180,
        image: 'https://images.unsplash.com/photo-1415201364774-f6f0bb35f28f?w=600&q=80'
    },
];

const PaymentPage = () => {
    const { id } = useParams();
    const navigate = useNavigate();

    const event = fakeEvents.find((e) => e.id === parseInt(id)) || fakeEvents[0];

    const [formData, setFormData] = useState({
        cardName: '',
        cardNumber: '',
        expiry: '',
        cvv: '',
        email: '',
        address: '',
    });
    const [loading, setLoading] = useState(false);
    const [success, setSuccess] = useState(false);
    const [cardType, setCardType] = useState('');
    const [error, setError] = useState('');
    const [qty, setQty] = useState(1);
    const total = event.price * qty;

    const handleChange = (e) => {
        let value = e.target.value;

        // add space after every 4 digits in card number and allow only numbers
        if (e.target.name === 'cardNumber') {
            value = value.replace(/\D/g, '').slice(0, 16)
                .replace(/(.{4})/g, '$1 ').trim();
        }

        // format expiry date and add slash after month
        if (e.target.name === 'expiry') {
            value = value.replace(/\D/g, '').slice(0, 4);
            if (value.length >= 2) value = value.slice(0, 2) + '/' + value.slice(2);
        }

        // cvv numbers only and max 3 digits
        if (e.target.name === 'cvv') {
            value = value.replace(/\D/g, '').slice(0, 3);
        }

        setFormData({ ...formData, [e.target.name]: value });
    };

    const handlePay = (e) => {
        e.preventDefault();
        setError('');

        if (!formData.cardName.trim()) {
            setError('Please enter the cardholder name.'); return;
        }
        if (formData.cardNumber.replace(/\s/g, '').length < 16) {
            setError('Please enter a valid card number.'); return;
        }
        if (formData.expiry.length < 5) {
            setError('Please enter a valid expiry date.'); return;
        }
        if (formData.cvv.length < 3) {
            setError('Please enter a valid CVV.'); return;
        }
        if (!formData.address.trim()) {
            setError('Please enter address.'); return;
        }
        if (!formData.email.trim()) {
            setError('Please enter email.'); return;
        }

        setLoading(true);

        // payment processing simulation
        setTimeout(() => {
            setLoading(false);
            setSuccess(true);
            // after showing success message, redirect to My Tickets
            setTimeout(() => navigate('/my-tickets'), 3000);
        }, 2000);
    };

    // Success Screen
    if (success) {
        return (
            <Box sx={{
                minHeight: '100vh', backgroundColor: '#F7F7F7',
                display: 'flex', alignItems: 'center',
                justifyContent: 'center', flexDirection: 'column',
                gap: 2, textAlign: 'center', p: 3,
            }}>
                <Box sx={{
                    width: 80, height: 80, borderRadius: '50%',
                    backgroundColor: '#e6faf9',
                    display: 'flex', alignItems: 'center',
                    justifyContent: 'center', fontSize: 40, mb: 2,
                }}>
                    ✅
                </Box>
                <Typography variant="h4" fontWeight={700} sx={{ color: '#1a1a2e' }}>
                    Payment Successful!
                </Typography>
                <Typography sx={{ color: '#888', maxWidth: 400 }}>
                    Your ticket has been booked. The organizer will send you a QR code soon.
                    Check your notifications!
                </Typography>
                <Box sx={{
                    backgroundColor: 'white', borderRadius: 3,
                    p: 3, border: '1px solid #eee', mt: 2, minWidth: 300,
                }}>
                    <Typography fontWeight={700} sx={{ color: '#1a1a2e', mb: 1 }}>
                        {event.title}
                    </Typography>
                    <Typography variant="body2" sx={{ color: '#888' }}>
                        📅 {event.date}
                    </Typography>
                    <Typography variant="body2" sx={{ color: '#888' }}>
                        📍 {event.location}
                    </Typography>
                    <Divider sx={{ my: 2 }} />
                    <Typography fontWeight={700} sx={{ color: '#6C63FF' }}>
                        Amount Paid: {total} EGP
                    </Typography>
                </Box>
                <Typography variant="body2" sx={{ color: '#aaa', mt: 2 }}>
                    Redirecting to My Tickets...
                </Typography>
            </Box>
        );
    }

    return (
        <Box sx={{ backgroundColor: '#F7F7F7', minHeight: '100vh', py: 4 }}>
            <Container maxWidth="lg">

                <Typography variant="h4" fontWeight={700}
                    sx={{ color: '#1a1a2e', mb: 1 }}>
                    Complete Payment
                </Typography>
                <Typography sx={{ color: '#888', mb: 4 }}>
                    Secure payment — your information is encrypted
                </Typography>

                {error && (
                    <Alert severity="error" sx={{ mb: 3, borderRadius: 2 }}>
                        {error}
                    </Alert>
                )}

                <Grid container spacing={3} wrap="nowrap" alignItems="stretch">

                    {/* Payment Form */}
                    <Grid item sx={{ flex: 2 }}>
                        <Box sx={{
                            backgroundColor: 'white',
                            borderRadius: 3,
                            p: 3,
                            border: '1px solid #eee',
                            height: '100%',
                            marginBottom: 4,
                        }}>
                            <Typography variant="h6" fontWeight={700}
                                sx={{ color: '#1a1a2e', mb: 3 }}>
                                💳 Card Details
                            </Typography>

                            <Box component="form" onSubmit={handlePay} sx={{ display: 'flex', flexDirection: 'column', gap: 2.5 }}>
                                <Box sx={{ display: 'flex', gap: 2, mb: 2 }}>
                                    <Box
                                        onClick={() => setCardType('visa')}
                                        sx={{
                                            flex: 1,
                                            p: 2,
                                            borderRadius: 2,
                                            border: cardType === 'visa' ? '2px solid #6C63FF' : '1px solid #ddd',
                                            cursor: 'pointer',
                                            textAlign: 'center',
                                            backgroundColor: cardType === 'visa' ? '#f3f1ff' : 'white',
                                            transition: '0.2s',
                                        }}
                                    >
                                        Visa
                                    </Box>

                                    <Box
                                        onClick={() => setCardType('mastercard')}
                                        sx={{
                                            flex: 1,
                                            p: 2,
                                            borderRadius: 2,
                                            border: cardType === 'mastercard' ? '2px solid #6C63FF' : '1px solid #ddd',
                                            cursor: 'pointer',
                                            textAlign: 'center',
                                            backgroundColor: cardType === 'mastercard' ? '#f3f1ff' : 'white',
                                            transition: '0.2s',
                                        }}
                                    >
                                        MasterCard
                                    </Box>
                                </Box>

                                <TextField
                                    fullWidth name="email"
                                    label="Email"
                                    value={formData.email}
                                    onChange={handleChange}
                                />

                                <TextField
                                    fullWidth name="address"
                                    label="Billing Address"
                                    value={formData.address}
                                    onChange={handleChange}
                                />

                                <TextField
                                    fullWidth name="cardName"
                                    label="Cardholder Name"
                                    value={formData.cardName}
                                    onChange={handleChange}
                                    placeholder="Sara Ahmed"
                                    sx={{ mb: 2, '& .MuiOutlinedInput-root': { borderRadius: 2 } }}
                                />

                                <TextField
                                    fullWidth name="cardNumber"
                                    label="Card Number"
                                    value={formData.cardNumber}
                                    onChange={handleChange}
                                    placeholder="1234 5678 9012 3456"
                                    inputProps={{ maxLength: 19 }}
                                    sx={{ mb: 2, '& .MuiOutlinedInput-root': { borderRadius: 2 } }}
                                />

                                <Grid container spacing={2} sx={{ mb: 3 }}>
                                    <Grid item xs={6}>
                                        <TextField
                                            fullWidth name="expiry"
                                            label="Expiry Date"
                                            value={formData.expiry}
                                            onChange={handleChange}
                                            placeholder="MM/YY"
                                            inputProps={{ maxLength: 5 }}
                                            sx={{ '& .MuiOutlinedInput-root': { borderRadius: 2 } }}
                                        />
                                    </Grid>
                                    <Grid item xs={6}>
                                        <TextField
                                            fullWidth name="cvv" label="CVV"
                                            value={formData.cvv}
                                            onChange={handleChange}
                                            placeholder="123"
                                            type="password"
                                            inputProps={{ maxLength: 3 }}
                                            sx={{ '& .MuiOutlinedInput-root': { borderRadius: 2 } }}
                                        />
                                    </Grid>
                                </Grid>

                                <Box sx={{ mt: 'auto' }}>
                                    <Button
                                        type="submit"
                                        fullWidth
                                        variant="contained"
                                        sx={{
                                            display: 'flex',
                                            justifyContent: 'space-between',
                                            px: 3,
                                            fontWeight: 700,
                                            fontSize: '1rem',
                                            backgroundColor: '#6C63FF',
                                            borderRadius: 2,
                                        }}
                                    >
                                        <span>Pay Now</span>
                                        <span>{total} EGP</span>
                                    </Button>
                                </Box>

                            </Box>

                            {/* Security Note */}
                            <Box sx={{
                                display: 'flex', alignItems: 'center',
                                gap: 1, mt: 2, justifyContent: 'center'
                            }}>
                                <Typography variant="body2" sx={{ color: '#aaa', fontSize: 12 }}>
                                    🔒 Secured by 256-bit SSL encryption
                                </Typography>
                            </Box>
                        </Box>
                    </Grid>

                    {/* Order Summary */}
                    <Grid item sx={{ flex: 1 }}>
                        <Box sx={{
                            backgroundColor: 'white',
                            borderRadius: 3,
                            p: 3,
                            border: '1px solid #eee',
                            position: 'sticky',
                            top: 80,
                            height: 'fit-content'
                        }}>
                            <Typography variant="h6" fontWeight={700}
                                sx={{ color: '#1a1a2e', mb: 3 }}>
                                Order Summary
                            </Typography>

                            {/* Event Image */}
                            <Box sx={{
                                height: 140, borderRadius: 2, mb: 2,
                                backgroundImage: `url(${event.image})`,
                                backgroundSize: 'cover', backgroundPosition: 'center',
                            }} />

                            <Typography fontWeight={700} sx={{ color: '#1a1a2e', mb: 1 }}>
                                {event.title}
                            </Typography>
                            <Typography variant="body2" sx={{ color: '#888', mb: 0.5 }}>
                                📅 {event.date}
                            </Typography>
                            <Typography variant="body2" sx={{ color: '#888', mb: 2 }}>
                                📍 {event.location}
                            </Typography>

                            <Divider sx={{ mb: 2 }} />

                            <Box sx={{ mb: 2 }}>
                                <Typography variant="body2" sx={{ mb: 1, color: '#555' }}>
                                    Number of Tickets
                                </Typography>

                                <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
                                    <Button
                                        variant="outlined"
                                        onClick={() => setQty(q => Math.max(1, q - 1))}
                                    >
                                        -
                                    </Button>

                                    <Typography fontWeight={700}>
                                        {qty}
                                    </Typography>

                                    <Button
                                        variant="outlined"
                                        onClick={() => setQty(q => Math.min(10, q + 1))}
                                    >
                                        +
                                    </Button>
                                </Box>
                            </Box>

                            <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 1 }}>
                                <Typography variant="body2" sx={{ color: '#888' }}>
                                    Ticket Price
                                </Typography>
                                <Typography variant="body2">{event.price} EGP</Typography>
                            </Box>
                            <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 1 }}>
                                <Typography variant="body2" sx={{ color: '#888' }}>
                                    Quantity
                                </Typography>
                                <Typography variant="body2">{qty}</Typography>
                            </Box>
                            <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 1 }}>
                                <Typography variant="body2" sx={{ color: '#888' }}>
                                    Service Fee
                                </Typography>
                                <Typography variant="body2">0 EGP</Typography>
                            </Box>

                            <Divider sx={{ my: 2 }} />


                            <Box sx={{ display: 'flex', justifyContent: 'space-between' }}>
                                <Typography fontWeight={700} sx={{ color: '#1a1a2e' }}>
                                    Total
                                </Typography>
                                <Typography fontWeight={700} sx={{ color: '#6C63FF' }}>
                                    {total} EGP
                                </Typography>
                            </Box>
                        </Box>
                    </Grid>
                </Grid>
            </Container>
        </Box>
    );
};

export default PaymentPage;