import { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import {
    Box, Button, TextField, Typography,
    Alert, CircularProgress, Paper,
    ToggleButton, ToggleButtonGroup
} from '@mui/material';

const RegisterPage = () => {
    const { register } = useAuth();
    const navigate = useNavigate();

    const [fullName, setFullName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [role, setRole] = useState('PARTICIPANT');
    const [error, setError] = useState('');
    const [loading, setLoading] = useState(false);

    const handleRegister = async (e) => {
        e.preventDefault();
        setError('');

        if (password !== confirmPassword) {
            setError('Passwords do not match.');
            return;
        }

        if (password.length < 6) {
            setError('Password must be at least 6 characters.');
            return;
        }

        setLoading(true);
        try {
            await register(fullName, email, password, role);

            if (role === 'ORGANIZER') {
                navigate('/organizer/dashboard');
            } else {
                navigate('/');
            }
        } catch (err) {
            const message =
                err instanceof Error
                    ? err.message
                    : 'Registration failed. Please try again.';

            if (message.includes('already registered')) {
                setError('An account with this email already exists.');
            } else {
                setError(message);
            }
        } finally {
            setLoading(false);
        }
    };

    return (
        <Box sx={{
            minHeight: '100vh',
            backgroundColor: 'background.default',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            py: 4,
        }}>
            <Paper elevation={0} sx={{
                width: '100%',
                maxWidth: 460,
                p: 4,
                borderRadius: 3,
                border: '1px solid #e0e0e0',
            }}>

                <Typography variant="h4" fontWeight={700}
                    sx={{ color: '#1a1a2e', textAlign: 'center', mb: 1 }}>
                    Event<span style={{ color: '#6C63FF' }}>Hub</span>
                </Typography>

                <Typography variant="body2"
                    sx={{ color: 'text.secondary', textAlign: 'center', mb: 4 }}>
                    Create your account and start exploring events
                </Typography>

                {error && (
                    <Alert severity="error" sx={{ mb: 2, borderRadius: 2 }}>
                        {error}
                    </Alert>
                )}

                <Box component="form" onSubmit={handleRegister}>

                    <TextField
                        fullWidth
                        label="Full Name"
                        value={fullName}
                        onChange={(e) => setFullName(e.target.value)}
                        required
                        sx={{ mb: 2 }}
                    />

                    <TextField
                        fullWidth
                        label="Email"
                        type="email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        required
                        sx={{ mb: 2 }}
                    />

                    <TextField
                        fullWidth
                        label="Password"
                        type="password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        required
                        sx={{ mb: 2 }}
                    />

                    <TextField
                        fullWidth
                        label="Confirm Password"
                        type="password"
                        value={confirmPassword}
                        onChange={(e) => setConfirmPassword(e.target.value)}
                        required
                        sx={{ mb: 3 }}
                    />

                    <Typography variant="body2" fontWeight={600} sx={{ mb: 1 }}>
                        I want to join as:
                    </Typography>

                    <ToggleButtonGroup
                        value={role}
                        exclusive
                        onChange={(_, val) => {
                            if (val) setRole(val);
                        }}
                        fullWidth
                        sx={{ mb: 3 }}
                    >
                        <ToggleButton value="PARTICIPANT">
                            Participant
                        </ToggleButton>

                        <ToggleButton value="ORGANIZER">
                            Organizer
                        </ToggleButton>
                    </ToggleButtonGroup>

                    <Button
                        fullWidth
                        type="submit"
                        variant="contained"
                        disabled={loading}
                        sx={{
                            py: 1.5,
                            borderRadius: 2,
                            backgroundColor: '#6C63FF',
                            '&:hover': { backgroundColor: '#4B44CC' },
                        }}
                    >
                        {loading ? (
                            <CircularProgress size={24} color="inherit" />
                        ) : (
                            'Create Account'
                        )}
                    </Button>

                </Box>

                <Typography variant="body2"
                    sx={{ textAlign: 'center', mt: 3 }}>
                    Already have an account?{' '}
                    <Link to="/login" style={{ color: '#6C63FF', fontWeight: 600 }}>
                        Sign in
                    </Link>
                </Typography>

            </Paper>
        </Box>
    );
};

export default RegisterPage;