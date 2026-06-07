import {
    Box,
    Typography,
    Grid,
    Paper,
    LinearProgress
} from "@mui/material";

function AdminReports({ users = [], events = [] }) {

    const totalTickets = events.reduce((sum, e) => sum + (e.booked || 0), 0);

    const totalRevenue = events.reduce(
        (sum, e) => sum + ((e.booked || 0) * (e.price || 0)),
        0
    );

    const stats = [
        {
            label: "Total Users",
            value: users.length,
            color: "#6C63FF"
        },
        {
            label: "Total Events",
            value: events.length,
            color: "#4ECDC4"
        },
        {
            label: "Tickets Sold",
            value: totalTickets,
            color: "#FF6B6B"
        },
        {
            label: "Revenue",
            value: `${totalRevenue.toLocaleString()} EGP`,
            color: "#F9A826"
        }
    ];

    return (
        <Box sx={{ p: 3, backgroundColor: "#F7F7F7", minHeight: "100vh" }}>

            {/* HEADER */}
            <Box sx={{ mb: 3 }}>
                <Typography variant="h4" fontWeight={700}>
                    Platform Reports
                </Typography>
                <Typography sx={{ color: "#888" }}>
                    Analytics and insights across the platform
                </Typography>
            </Box>

            {/* STATS */}
            <Grid container spacing={3} sx={{ mb: 4 }}>
                {stats.map((s) => (
                    <Grid item xs={12} sm={6} md={3} key={s.label}>
                        <Paper
                            elevation={0}
                            sx={{
                                p: 3,
                                borderRadius: 3,
                                border: "1px solid #eee",
                                textAlign: "center",
                                transition: "0.2s",
                                width: "200px",
                                "&:hover": {
                                    transform: "translateY(-4px)",
                                    boxShadow: `0 8px 25px ${s.color}22`,
                                    borderColor: s.color
                                }
                            }}
                        >
                            <Typography fontSize={28}>{s.icon}</Typography>

                            <Typography
                                variant="h5"
                                fontWeight={700}
                                sx={{ color: s.color }}
                            >
                                {s.value}
                            </Typography>

                            <Typography sx={{ color: "#888", fontSize: 13 }}>
                                {s.label}
                            </Typography>
                        </Paper>
                    </Grid>
                ))}
            </Grid>

            {/* ROW 1 */}
            <Grid container spacing={3} sx={{ mb: 3, gap: 8 }}>

                {/* Monthly Users */}
                <Grid item xs={12} md={6}>
                    <Paper sx={{ p: 3, width: "400px", borderRadius: 3, border: "1px solid #eee" }}>
                        <Typography fontWeight={700} mb={2} >
                            📈 Monthly Active Users
                        </Typography>

                        <LinearProgress
                            variant="determinate"
                            value={70}
                            sx={{
                                height: 10,
                                borderRadius: 5,
                                width: "100%",
                                marginTop: 2,
                                backgroundColor: "#eee",
                                "& .MuiLinearProgress-bar": {
                                    backgroundColor: "#6C63FF"
                                }
                            }}
                        />

                        <Typography sx={{ mt: 2, color: "#888" }}>
                            Growth trend increasing steadily
                        </Typography>
                    </Paper>
                </Grid>

                {/* Revenue */}
                <Grid item xs={12} md={6}>
                    <Paper sx={{ p: 3, width: "400px", borderRadius: 3, border: "1px solid #eee" }}>
                        <Typography fontWeight={700} mb={2}>
                            💰 Revenue Overview
                        </Typography>

                        <LinearProgress
                            variant="determinate"
                            value={85}
                            sx={{
                                height: 10,
                                width: "100%",
                                marginTop: 2,
                                borderRadius: 5,
                                backgroundColor: "#eee",
                                "& .MuiLinearProgress-bar": {
                                    backgroundColor: "#FF6B6B"
                                }
                            }}
                        />

                        <Typography sx={{ mt: 2, color: "#888" }}>
                            Revenue performance is strong
                        </Typography>
                    </Paper>
                </Grid>
            </Grid>

            {/* ROW 2 */}
            <Grid container spacing={3} sx={{ gap: { xs: 3, md: 8 } }}>

                {/* Categories */}
                <Grid item xs={12} md={6}>
                    <Paper sx={{ p: 3, borderRadius: 3, border: "1px solid #eee", width: "400px" }}>
                        <Typography fontWeight={700} mb={2}>
                            🎪 Events by Category
                        </Typography>

                        {[
                            { name: "Music", value: 28, color: "#6C63FF" },
                            { name: "Technology", value: 17, color: "#4ECDC4" },
                            { name: "Sports", value: 22, color: "#FF6B6B" },
                            { name: "Food", value: 14, color: "#F9A826" },
                            { name: "Other", value: 19, color: "#9E9E9E" }
                        ].map((c) => (
                            <Box key={c.name} sx={{ mb: 2 }}>
                                <Box sx={{
                                    display: "flex",
                                    justifyContent: "space-between",
                                    mb: 0.5
                                }}>
                                    <Typography fontSize={13}>
                                        {c.name}
                                    </Typography>
                                    <Typography fontSize={13} fontWeight={600} sx={{ color: c.color }}>
                                        {c.value}%
                                    </Typography>
                                </Box>

                                <LinearProgress
                                    variant="determinate"
                                    value={c.value}
                                    sx={{
                                        height: 8,
                                        borderRadius: 5,
                                        backgroundColor: "#eee",
                                        "& .MuiLinearProgress-bar": {
                                            backgroundColor: c.color
                                        }
                                    }}
                                />
                            </Box>
                        ))}
                    </Paper>
                </Grid>

                {/* Demographics */}
                <Grid item xs={12} md={6} >
                    <Paper sx={{ p: 3, borderRadius: 3, border: "1px solid #eee", width: "400px", height: "100%" }}>
                        <Typography fontWeight={700} mb={2}>
                            User Demographics
                        </Typography>

                        {[
                            { city: "Cairo", value: 42, color: "#6C63FF" },
                            { city: "Alexandria", value: 18, color: "#F9A826" },
                            { city: "Giza", value: 14, color: "#22C55E" },
                            { city: "Luxor", value: 9, color: "#4ECDC4" },
                            { city: "Aswan", value: 6, color: "#F59E0B" },
                            { city: "Other", value: 26, color: "#EC4899" }
                        ].map((d) => (
                            <Box
                                key={d.city}
                                sx={{
                                    display: "flex",
                                    marginTop: 2,
                                    alignItems: "center",
                                    gap: 2,
                                    mb: 1.5
                                }}
                            >
                                <Box
                                    sx={{
                                        width: 10,
                                        height: 10,
                                        borderRadius: "50%",
                                        backgroundColor: d.color
                                    }}
                                />

                                <Typography sx={{ flex: 1, fontSize: 17 }}>
                                    {d.city}
                                </Typography>

                                <Box sx={{ width: 120 }}>
                                    <LinearProgress
                                        variant="determinate"
                                        value={d.value}
                                        sx={{
                                            height: 8,
                                            width: "100%",
                                            display: "block",
                                            borderRadius: 5,
                                            backgroundColor: "#eee",
                                            "& .MuiLinearProgress-bar": {
                                                backgroundColor: d.color
                                            }
                                        }}
                                    />
                                </Box>

                                <Typography fontSize={13} fontWeight={600}>
                                    {d.value}%
                                </Typography>
                            </Box>
                        ))}
                    </Paper>
                </Grid>

            </Grid>
        </Box >
    );
}

export default AdminReports;