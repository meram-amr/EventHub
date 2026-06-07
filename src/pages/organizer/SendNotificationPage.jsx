import { useState } from 'react';
import {
    Box, Typography, Grid, TextField,
    Button, MenuItem, Paper, Avatar, Divider
} from '@mui/material';

const MOCK_BOOKINGS = [
    { user: 'Ahmed Ali', status: 'confirmed' },
    { user: 'Sara Mohamed', status: 'pending' },
    { user: 'Omar Khaled', status: 'confirmed' },
    { user: 'Mona Hassan', status: 'pending' },
    { user: 'Youssef Adel', status: 'confirmed' },
    { user: 'Nour Ibrahim', status: 'confirmed' },
    { user: 'Hassan Tarek', status: 'pending' },
    { user: 'Salma Mostafa', status: 'confirmed' },
];

function SendNotificationPage({ addToast }) {

    const [form, setForm] = useState({
        subject: '',
        message: '',
        recipients: 'all',
        attachment: null
    });

    const sent = () => {
        addToast('Notification sent to all recipients! 📢', 'success');
        setForm({ subject: '', message: '', recipients: 'all', attachment: null });
    };

    const recipients =
        form.recipients === 'all'
            ? MOCK_BOOKINGS.map(b => b.user)
            : MOCK_BOOKINGS
                .filter(b => b.status === form.recipients)
                .map(b => b.user);

    return (
        <Box sx={{ maxWidth: 1000, mx: 'auto', marginTop: 4, mb: 6, px: 2 }}>

            {/* Header */}
            <Typography variant="h4" fontWeight={700} mb={1}>
                Send Notifications
            </Typography>
            <Typography sx={{ color: '#777', mb: 4 }}>
                Notify your event attendees
            </Typography>

            <Grid container spacing={3}>

                {/* LEFT FORM */}
                <Grid item xs={12} md={7} sx={{ display: 'flex', flexDirection: 'column', gap: 3 }}>
                    <Paper sx={{ p: 3, borderRadius: 3 }}>

                        {/* Subject */}
                        <TextField
                            label="Subject"
                            fullWidth
                            value={form.subject}
                            onChange={(e) =>
                                setForm(f => ({ ...f, subject: e.target.value }))
                            }
                            sx={{ mb: 2 }}
                        />

                        {/* Message */}
                        <TextField
                            label="Message"
                            fullWidth
                            multiline
                            rows={4}
                            value={form.message}
                            onChange={(e) =>
                                setForm(f => ({ ...f, message: e.target.value }))
                            }
                            sx={{ mb: 2 }}
                        />

                        {/* Recipients */}
                        <TextField
                            select
                            label="Send To"
                            fullWidth
                            value={form.recipients}
                            onChange={(e) =>
                                setForm(f => ({ ...f, recipients: e.target.value }))
                            }
                            sx={{ mb: 2 }}
                        >
                            <MenuItem value="all">
                                All Attendees ({MOCK_BOOKINGS.length})
                            </MenuItem>
                            <MenuItem value="confirmed">
                                Confirmed Bookings Only
                            </MenuItem>
                            <MenuItem value="pending">
                                Pending Bookings Only
                            </MenuItem>
                        </TextField>

                        {/* Attachment */}
                        <Box sx={{
                            border: '2px dashed #ddd',
                            borderRadius: 3,
                            p: 3,
                            textAlign: 'center',
                            mb: 3
                        }}>
                            <Typography fontSize={28}>📎</Typography>
                            <Typography variant="body2" sx={{ color: '#777', mb: 1 }}>
                                PDF, Image, or Document (max 10MB)
                            </Typography>
                            <Button variant="outlined" size="small">
                                Browse File
                            </Button>
                        </Box>

                        {/* Send Button */}
                        <Button
                            fullWidth
                            variant="contained"
                            onClick={sent}
                            disabled={!form.subject || !form.message}
                            sx={{
                                py: 1.2,
                                fontWeight: 600,
                                backgroundColor: '#6C63FF'
                            }}
                        >
                            📢 Send Notification
                        </Button>

                    </Paper>
                </Grid>

                {/* RIGHT SIDE */}
                <Grid item xs={12} md={5}>

                    {/* Preview */}
                    <Paper sx={{ p: 3, borderRadius: 3, mb: 3 }}>
                        <Typography fontWeight={700} mb={2}>
                            Preview
                        </Typography>

                        <Box sx={{
                            background: '#f7f7f7',
                            p: 2,
                            borderRadius: 2,
                            border: '1px solid #eee'
                        }}>
                            <Typography fontWeight={700} mb={1}>
                                {form.subject || '(no subject)'}
                            </Typography>

                            <Typography
                                variant="body2"
                                sx={{ whiteSpace: 'pre-wrap', color: '#555' }}
                            >
                                {form.message || '(no message)'}
                            </Typography>
                        </Box>
                    </Paper>

                    {/* Recipients */}
                    <Paper sx={{ p: 3, borderRadius: 3 }}>
                        <Typography fontWeight={700} mb={2}>
                            Recipients ({recipients.length})
                        </Typography>

                        {recipients.slice(0, 6).map((name, i) => (
                            <Box
                                key={i}
                                sx={{
                                    display: 'flex',
                                    alignItems: 'center',
                                    gap: 1.5,
                                    mb: 1.5
                                }}
                            >
                                <Avatar sx={{ bgcolor: '#6C63FF' }}>
                                    {name.split(' ').map(n => n[0]).join('')}
                                </Avatar>

                                <Typography fontSize={14}>
                                    {name}
                                </Typography>
                            </Box>
                        ))}

                        {recipients.length > 6 && (
                            <>
                                <Divider sx={{ my: 1 }} />
                                <Typography fontSize={12} color="gray">
                                    +{recipients.length - 6} more recipients
                                </Typography>
                            </>
                        )}
                    </Paper>

                </Grid>

            </Grid>
        </Box>
    );
}

export default SendNotificationPage;