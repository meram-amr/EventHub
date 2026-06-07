import {
    Box, Typography, Container,
    Grid, Divider
} from '@mui/material';
import {
    BarChart, Bar, XAxis, YAxis, CartesianGrid,
    Tooltip, ResponsiveContainer, LineChart,
    Line, PieChart, Pie, Cell, Legend
} from 'recharts';

const ticketsSoldData = [
    { month: 'Sep', tickets: 40 },
    { month: 'Oct', tickets: 80 },
    { month: 'Nov', tickets: 65 },
    { month: 'Dec', tickets: 120 },
    { month: 'Jan', tickets: 200 },
    { month: 'Feb', tickets: 150 },
];

const revenueData = [
    { month: 'Sep', revenue: 4000 },
    { month: 'Oct', revenue: 8000 },
    { month: 'Nov', revenue: 6500 },
    { month: 'Dec', revenue: 12000 },
    { month: 'Jan', revenue: 20000 },
    { month: 'Feb', revenue: 15000 },
];

const categoryData = [
    { name: 'Concerts', value: 45, color: '#6C63FF' },
    { name: 'Sports', value: 25, color: '#FF6B6B' },
    { name: 'University', value: 15, color: '#4ECDC4' },
    { name: 'Theater', value: 10, color: '#FFE66D' },
    { name: 'Gaming', value: 5, color: '#A8EDEA' },
];

const topEvents = [
    { title: 'Cairo Concert Night', tickets: 200, revenue: 40000 },
    { title: 'Jazz Evening', tickets: 150, revenue: 27000 },
    { title: 'Comedy Night', tickets: 80, revenue: 8000 },
];

const statsCards = [
    { label: 'Total Revenue', value: '65,500 EGP', color: '#6C63FF' },
    { label: 'Tickets Sold', value: '655', color: '#FF6B6B' },
    { label: 'Total Events', value: '12', color: '#4ECDC4' },
    { label: 'Avg per Event', value: '5,458 EGP', color: '#FFE66D' },
];

const AnalyticsPage = () => {
    return (
        <Box sx={{ backgroundColor: '#F7F7F7', minHeight: '100vh', py: 4 }}>
            <Container>

                {/* Header */}
                <Typography variant="h4" fontWeight={700}
                    sx={{ color: '#1a1a2e', mb: 1 }}>
                    Analytics Dashboard
                </Typography>
                <Typography sx={{ color: '#888', mb: 4 }}>
                    Track your events performance
                </Typography>

                {/* Stats Cards */}
                <Grid container spacing={3} sx={{ mb: 4 }}>
                    {statsCards.map((stat) => (
                        <Grid item xs={12} sm={6} md={3} key={stat.label}>
                            <Box sx={{
                                backgroundColor: 'white', borderRadius: 3,
                                p: 3, border: '1px solid #eee',
                                transition: 'all 0.2s', width: '200px',
                                '&:hover': {
                                    transform: 'translateY(-4px)',
                                    boxShadow: `0 8px 32px ${stat.color}22`,
                                    borderColor: stat.color,
                                }
                            }}>
                                <Typography fontSize={36} mb={1}>{stat.icon}</Typography>
                                <Typography variant="h5" fontWeight={700}
                                    sx={{ color: stat.color }}>
                                    {stat.value}
                                </Typography>
                                <Typography variant="body2" sx={{ color: '#888' }}>
                                    {stat.label}
                                </Typography>
                            </Box>
                        </Grid>
                    ))}
                </Grid>

                <Grid container spacing={3} justifyContent="center">

                    {/* Tickets Sold Chart */}
                    <Grid item xs={12} md={6}>
                        <Box sx={{
                            backgroundColor: 'white', borderRadius: 3,
                            p: 3, border: '1px solid #eee',
                            width: '300px', height: '350px',
                        }}>
                            <Typography variant="h6" fontWeight={700}
                                sx={{ color: '#1a1a2e', mb: 4, ml: 2 }}>
                                Tickets Sold per Month
                            </Typography>
                            <ResponsiveContainer width="100%" height={250} display="flex" justifyContent="center">
                                <BarChart data={ticketsSoldData} margin={{ top: 0, right: 20, left: -20, bottom: 0 }}>
                                    <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
                                    <XAxis dataKey="month" tick={{ fill: '#888', fontSize: 12 }} />
                                    <YAxis tick={{ fill: '#888', fontSize: 12 }} />
                                    <Tooltip
                                        contentStyle={{ borderRadius: 8, border: '1px solid #eee', }}
                                    />
                                    <Bar dataKey="tickets" fill="#6C63FF" radius={[4, 4, 0, 0]} />
                                </BarChart>
                            </ResponsiveContainer>
                        </Box>
                    </Grid>

                    {/* Revenue Chart */}
                    <Grid item xs={12} md={6}>
                        <Box sx={{
                            backgroundColor: 'white', borderRadius: 3,
                            width: '300px', height: '350px',
                            p: 3, border: '1px solid #eee'
                        }}>
                            <Typography variant="h6" fontWeight={700}
                                sx={{ color: '#1a1a2e', mb: 3 }}>
                                Revenue per Month (EGP)
                            </Typography>
                            <ResponsiveContainer width="100%" height={250}>
                                <LineChart data={revenueData} margin={{ top: 0, right: 20, left: -20, bottom: 0 }}>
                                    <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
                                    <XAxis dataKey="month" tick={{ fill: '#888', fontSize: 12 }} />
                                    <YAxis tick={{ fill: '#888', fontSize: 12 }} />
                                    <Tooltip
                                        contentStyle={{ borderRadius: 8, border: '1px solid #eee' }}
                                        formatter={(value) => [`${value.toLocaleString()} EGP`, 'Revenue']}
                                    />
                                    <Line
                                        type="monotone" dataKey="revenue"
                                        stroke="#FF6B6B" strokeWidth={3}
                                        dot={{ fill: '#FF6B6B', r: 5 }}
                                    />
                                </LineChart>
                            </ResponsiveContainer>
                        </Box>
                    </Grid>

                    {/* Pie Chart */}
                    <Grid item xs={12} md={6}>
                        <Box sx={{
                            backgroundColor: 'white', borderRadius: 3,
                            width: '300px', height: '360px',
                            p: 3, border: '1px solid #eee'
                        }}>
                            <Typography variant="h6" fontWeight={700}
                                sx={{ color: '#1a1a2e', mb: 3 }}>
                                Events by Category
                            </Typography>
                            <ResponsiveContainer width="100%" height={250}>
                                <PieChart >
                                    <Pie
                                        data={categoryData}
                                        cx="50%" cy="50%"
                                        innerRadius={60} outerRadius={100}
                                        paddingAngle={3}
                                        dataKey="value"
                                    >
                                        {categoryData.map((entry, index) => (
                                            <Cell key={index} fill={entry.color} />
                                        ))}
                                    </Pie>
                                    <Legend
                                        formatter={(value) => (
                                            <span style={{ color: '#555', fontSize: 12 }}>{value}</span>
                                        )}
                                    />
                                    <Tooltip
                                        formatter={(value) => [`${value}%`, 'Share']}
                                        contentStyle={{ borderRadius: 8, border: '1px solid #eee' }}
                                    />
                                </PieChart>
                            </ResponsiveContainer>
                        </Box>
                    </Grid>

                </Grid>
            </Container>
        </Box >
    );
};

export default AnalyticsPage;