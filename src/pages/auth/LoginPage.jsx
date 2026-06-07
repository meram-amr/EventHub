import { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import {
    Box, Button, TextField, Typography,
    Alert, CircularProgress, Paper
} from '@mui/material';

const LoginPage = () => {
    const { login } = useAuth();
    const navigate = useNavigate();

    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');
    const [loading, setLoading] = useState(false);

    const handleLogin = async (e) => {
        e.preventDefault();
        setError('');
        setLoading(true);

        try {
            const user = await login(email, password);

            if (user.role === 'PARTICIPANT') navigate('/');
            else if (user.role === 'ORGANIZER') navigate('/organizer/dashboard');
            else if (user.role === 'ADMIN') navigate('/admin/organizers');
            else navigate('/');

        } catch (err) {
            setError(err.message || 'Invalid email or password. Please try again.');
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
        }}>
            <Paper elevation={0} sx={{
                width: '100%',
                maxWidth: 420,
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
                    Welcome back! Please login to your account.
                </Typography>

                {error && (
                    <Alert severity="error" sx={{ mb: 2, borderRadius: 2 }}>
                        {error}
                    </Alert>
                )}

                <Box component="form" onSubmit={handleLogin}>

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
                        sx={{ mb: 3 }}
                    />

                    <Button
                        fullWidth
                        type="submit"
                        variant="contained"
                        disabled={loading}
                        sx={{
                            py: 1.5,
                            borderRadius: 2,
                            fontSize: '1rem',
                            backgroundColor: '#6C63FF',
                            '&:hover': { backgroundColor: '#4B44CC' },
                        }}
                    >
                        {loading
                            ? <CircularProgress size={24} color="inherit" />
                            : 'Login'
                        }
                    </Button>

                </Box>

                <Typography variant="body2"
                    sx={{ textAlign: 'center', mt: 3, color: 'text.secondary' }}>
                    {"Don't have an account? "}
                    <Link to="/register"
                        style={{ color: '#6C63FF', fontWeight: 600, textDecoration: 'none' }}>
                        Sign up
                    </Link>
                </Typography>

            </Paper>
        </Box>
    );
};

export default LoginPage;
