import {
    Box,
    Typography,
    Container,
    Grid
} from '@mui/material';
import { useAuth } from '../../context/AuthContext';

const stats = [
    { label: "Pending", value: '3', color: "#FFE66D" },
    { label: "Approved", value: '12', color: "#4ECDC4" },
    { label: "Rejected", value: '4', color: "#FF6B6B" },
    { label: "Total", value: '20', color: "#6C63FF" },
];

const DashboardPage = () => {
    const { user } = useAuth();

    return (
        <Box sx={{ backgroundColor: '#F7F7F7', minHeight: '100vh', py: 4 }}>
            <Container>

                {/* Header */}
                <Box sx={{
                    mb: 4
                }}>
                    <Typography variant="h4" fontWeight={700} sx={{ color: '#1a1a2e' }}>
                        Welcome, {user?.name}! 👋
                    </Typography>

                    <Typography sx={{ color: '#888', mt: 1 }}>
                        Manage your events and track performance
                    </Typography>
                </Box>

                {/* Stats Cards */}
                <Grid container spacing={3} sx={{ mb: 4 }}>
                    {stats.map((stat) => (
                        <Grid item xs={12} sm={6} md={3} key={stat.label}>
                            <Box
                                sx={{
                                    backgroundColor: 'white',
                                    marginTop: 1,
                                    borderRadius: 3,
                                    width: '400px',
                                    p: 3,
                                    border: '1px solid #eee',
                                    transition: 'all 0.2s',
                                    display: 'flex',
                                    flexDirection: 'row',
                                    alignItems: 'center',
                                    justifyContent: 'space-between',
                                    gap: 2,
                                    '&:hover': {
                                        transform: 'translateY(-4px)',
                                        boxShadow: `0 8px 32px ${stat.color}22`,
                                        borderColor: stat.color,
                                    }
                                }}
                            >
                                {/* number */}
                                <Typography
                                    variant="h4"
                                    fontWeight={700}
                                    sx={{ color: stat.color }}
                                >
                                    {stat.value}
                                </Typography>

                                {/* label */}
                                <Typography variant="body2" sx={{ color: '#888', textAlign: 'right', fontSize: '0.9rem' }}>
                                    {stat.label}
                                </Typography>
                            </Box>
                        </Grid>
                    ))}
                </Grid>
            </Container>
        </Box>
    );
};

export default DashboardPage;