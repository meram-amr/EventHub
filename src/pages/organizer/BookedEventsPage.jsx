import {
    Box,
    Typography,
    Chip,
    Avatar,
    Button,
    Table,
    TableBody,
    TableCell,
    TableContainer,
    TableHead,
    TableRow,
    Paper
} from "@mui/material";

import { mockBookings } from "../../data/mockData";

const BookedEventsPage = () => {

    const handleConfirm = (id) => {
        console.log("Confirmed booking:", id);
    };

    return (
        <Box sx={{ p: 3 }}>

            {/* HEADER */}
            <Typography variant="h4" fontWeight={700} mb={1}>
                Booked Tickets
            </Typography>

            <Typography variant="body2" sx={{ color: '#777', mb: 3 }}>
                {mockBookings.length} total bookings ·{" "}
                {mockBookings.filter(b => b.status === 'pending').length} pending
            </Typography>

            {/* TABLE */}
            <TableContainer component={Paper} sx={{ borderRadius: 3 }}>
                <Table>

                    <TableHead>
                        <TableRow  >
                            <TableCell>User</TableCell>
                            <TableCell>Event</TableCell>
                            <TableCell>Date</TableCell>
                            <TableCell>Qty</TableCell>
                            <TableCell>Total</TableCell>
                            <TableCell>Status</TableCell>
                            <TableCell>Action</TableCell>
                        </TableRow>
                    </TableHead>

                    <TableBody >
                        {mockBookings.length > 0 ? (
                            mockBookings.map((b) => (
                                <TableRow key={b.id} sx={{ '&:hover': { backgroundColor: '#f5f5f5' } }}>

                                    {/* USER */}
                                    <TableCell>
                                        <Box sx={{ display: 'flex', gap: 2, alignItems: 'center' }}>
                                            <Avatar sx={{ bgcolor: b.color }}>
                                                {b.avatar}
                                            </Avatar>

                                            <Box>
                                                <Typography fontWeight={600} fontSize={14}>
                                                    {b.user}
                                                </Typography>
                                                <Typography fontSize={12} sx={{ color: '#888' }}>
                                                    {b.email}
                                                </Typography>
                                            </Box>
                                        </Box>
                                    </TableCell>

                                    {/* EVENT */}
                                    <TableCell>{b.event}</TableCell>

                                    {/* DATE */}
                                    <TableCell>{b.date}</TableCell>

                                    {/* QTY */}
                                    <TableCell>×{b.tickets}</TableCell>

                                    {/* TOTAL */}
                                    <TableCell sx={{ fontWeight: 700 }}>
                                        {b.total === 0 ? "Free" : `${b.total} EGP`}
                                    </TableCell>

                                    {/* STATUS */}
                                    <TableCell>
                                        <Chip
                                            label={b.status === "confirmed" ? "Confirmed" : "Pending"}
                                            color={b.status === "confirmed" ? "success" : "warning"}
                                            size="small"
                                        />
                                    </TableCell>

                                    {/* ACTION */}
                                    <TableCell>
                                        {b.status === "pending" && (
                                            <Button
                                                size="small"
                                                variant="contained"
                                                color="success"
                                                onClick={() => handleConfirm(b.id)}
                                            >
                                                Confirm
                                            </Button>
                                        )}
                                    </TableCell>

                                </TableRow>
                            ))
                        ) : (
                            <TableRow>
                                <TableCell colSpan={7}>
                                    <Typography align="center">
                                        No bookings found ❌
                                    </Typography>
                                </TableCell>
                            </TableRow>
                        )}
                    </TableBody>

                </Table>
            </TableContainer>

        </Box>
    );
};

export default BookedEventsPage;