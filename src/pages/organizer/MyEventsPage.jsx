import { useState } from "react";
import {
    Box,
    Typography,
    Button,
    Divider,
    Chip
} from "@mui/material";
import { useNavigate } from "react-router-dom";
import { events as mockEvents } from "../../data/mockData";

// ================= CATEGORY COLORS =================
export const categoryColors = {
    Technology: '#4ECDC4',
    Education: '#6C63FF',
    Social: '#FF6B6B',
    Sports: '#F9A826',
    Gaming: '#A8EDEA',
    BUSINESS: '#3F51B5',
    "Art & Culture": '#EC4899',
    "Health & Fitness": '#22C55E',
    ENTERTAINMENT: '#F97316',
    OTHER: '#9E9E9E'
};

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

// ================= STATUS COLORS =================
const statusColors = {
    APPROVED: { bg: '#e6faf9', color: '#2a8f88' },
    PENDING: { bg: '#fff8e6', color: '#8a6d00' }
};

// ================= NORMALIZE DATA =================
const normalizeEvents = (events) => {
    return events.map(e => ({
        ...e,
        ticketsSold: Math.floor(Math.random() * 50),
        totalTickets: e.availableTickets || 100,
        revenue: e.price ? e.price * Math.floor(Math.random() * 20) : 0,
        status: e.approved ? "APPROVED" : "PENDING"
    }));
};

// ================= COMPONENT =================
function MyEventsPage({ addToast }) {

    const navigate = useNavigate();

    const [events, setEvents] = useState(
        normalizeEvents(mockEvents)
    );

    // ================= DELETE =================
    const del = (id) => {
        setEvents(prev => prev.filter(x => x.id !== id));
        addToast?.("Event deleted", "info");
    };

    // ================= SPLIT EVENTS =================
    const approvedEvents = events.filter(e => e.status === "APPROVED");
    const pendingEvents = events.filter(e => e.status === "PENDING");

    return (
        <Box sx={{ backgroundColor: '#F7F7F7', minHeight: '100vh', p: 3 }}>

            <Box sx={{
                backgroundColor: 'white',
                borderRadius: 3,
                border: '1px solid #eee',
                overflow: 'hidden'
            }}>

                {/* HEADER */}
                <Box sx={{
                    p: 3,
                    display: 'flex',
                    justifyContent: 'space-between',
                    alignItems: 'center'
                }}>
                    <Typography variant="h4" fontWeight={700}>
                        My Events
                    </Typography>

                </Box>

                <Divider />

                {/* if no events */}
                {events.length === 0 ? (
                    <Box sx={{ textAlign: 'center', py: 6 }}>
                        <Typography fontWeight={700} fontSize={18}>
                            No events yet
                        </Typography>
                        <Typography sx={{ color: '#888', mt: 1 }}>
                            Start by creating your first event
                        </Typography>
                    </Box>
                ) : (
                    <>
                        {/* ================= APPROVED ================= */}
                        <Box sx={{ p: 2 }}>
                            <Typography fontWeight={700} sx={{ mb: 2, color: '#2a8f88' }}>
                                ✅ Approved Events
                            </Typography>

                            {approvedEvents.length === 0 && (
                                <Typography sx={{ color: '#888' }}>
                                    No approved events yet
                                </Typography>
                            )}

                            {approvedEvents.map(event => (
                                <EventRow
                                    key={event.id}
                                    event={event}
                                    del={del}
                                    navigate={navigate}
                                />
                            ))}
                        </Box>

                        <Divider />

                        {/* ================= PENDING ================= */}
                        <Box sx={{ p: 2 }}>
                            <Typography fontWeight={700} sx={{ mb: 2, color: '#8a6d00' }}>
                                ⏳ Pending Approval
                            </Typography>

                            {pendingEvents.length === 0 && (
                                <Typography sx={{ color: '#888' }}>
                                    No pending events
                                </Typography>
                            )}

                            {pendingEvents.map(event => (
                                <EventRow
                                    key={event.id}
                                    event={event}
                                    del={del}
                                    navigate={navigate}
                                />
                            ))}
                        </Box>
                    </>
                )}
            </Box>
        </Box>
    );
}

// ================= EVENT ROW COMPONENT =================
function EventRow({ event, del, navigate }) {

    const progress =
        (event.ticketsSold / event.totalTickets) * 100;

    return (
        <Box sx={{
            p: 2,
            display: 'flex',
            alignItems: 'center',
            gap: 3,
            flexWrap: 'wrap',
            borderBottom: '1px solid #eee',
            '&:hover': { backgroundColor: '#fafafa' }
        }}>

            {/* IMAGE */}
            <Box sx={{
                width: 80,
                height: 60,
                borderRadius: 2,
                backgroundImage: `url(${event.image})`,
                backgroundSize: 'cover',
                backgroundPosition: 'center',
                flexShrink: 0
            }} />

            {/* INFO */}
            <Box sx={{ flex: 1, minWidth: 200 }}>
                <Typography fontWeight={700}>
                    {event.title}
                </Typography>
                <Typography variant="body2" sx={{ color: '#888' }}>
                    📅 {event.date}
                </Typography>
            </Box>

            {/* CATEGORY */}
            <Chip
                label={event.category}
                size="small"
                sx={{
                    backgroundColor: categoryColors[event.category] || '#999',
                    color: 'white',
                    fontWeight: 600,
                    marginRight: 5,
                    display: 'inline-flex',
                    justifyItems: 'center',
                    alignItems: 'center',
                    gap: 0.5
                }}
            />

            {/* TICKETS */}
            <Box sx={{ minWidth: 120, textAlign: 'center' }}>
                <Typography fontWeight={600}>
                    {event.ticketsSold} / {event.totalTickets}
                </Typography>

                <Box sx={{
                    height: 4,
                    backgroundColor: '#eee',
                    borderRadius: 2,
                    mt: 0.5
                }}>
                    <Box sx={{
                        height: 4,
                        borderRadius: 2,
                        backgroundColor: '#6C63FF',
                        width: `${progress}%`,
                    }} />
                </Box>
            </Box>

            {/* REVENUE */}
            <Typography fontWeight={700} sx={{
                color: '#4ECDC4',
                minWidth: 100,
                textAlign: 'center'
            }}>
                {(event.revenue || 0).toLocaleString()} EGP
            </Typography>



            {/* ACTIONS */}
            <Box sx={{ display: 'flex', gap: 2 }}>
                <Button
                    size="small"
                    variant="outlined"
                    onClick={() => navigate(`/organizer/edit-event/${event.id}`)}
                    sx={{
                        borderColor: '#6C63FF',
                        color: '#6C63FF',
                        borderRadius: 2
                    }}
                >
                    Edit
                </Button>

                <Button
                    size="small"
                    variant="outlined"
                    onClick={() => del(event.id)}
                    sx={{
                        borderColor: '#FF6B6B',
                        backgroundColor: '#FF6B6B',
                        color: '#fff',
                        borderRadius: 2,
                        "&:hover": {
                            backgroundColor: '#ff4c4c',
                            borderColor: '#ff4c4c',
                        }
                    }}
                >
                    Delete
                </Button>
            </Box>
        </Box>
    );
}

export default MyEventsPage;