import { useState } from "react";
import {
    Box,
    Typography,
    TextField,
    Table,
    TableBody,
    TableCell,
    TableContainer,
    TableHead,
    TableRow,
    Paper,
    Button,
    Chip
} from "@mui/material";

// 👇 Fake Data
const initialUsers = [
    {
        id: 1,
        name: "Ahmed Ali",
        email: "ahmed@gmail.com",
        joined: "2025-01-10",
        tickets: 3,
        status: "active",
        avatar: "A",
        color: "#6C63FF"
    },
    {
        id: 2,
        name: "Sara Mohamed",
        email: "sara@gmail.com",
        joined: "2025-02-12",
        tickets: 1,
        status: "blocked",
        avatar: "S",
        color: "#FF6B6B"
    },
    {
        id: 3,
        name: "Omar Khaled",
        email: "omar@gmail.com",
        joined: "2025-03-05",
        tickets: 5,
        status: "active",
        avatar: "O",
        color: "#4ECDC4"
    }
];

function AdminUsersPage() {

    const [users, setUsers] = useState(initialUsers);
    const [search, setSearch] = useState("");

    // 🔴 Block / Unblock
    const toggleBlock = (id) => {
        setUsers(prev =>
            prev.map(user =>
                user.id === id
                    ? {
                        ...user,
                        status: user.status === "active" ? "blocked" : "active"
                    }
                    : user
            )
        );
    };

    // 🔍 FILTER (FIXED)
    const filteredUsers = users.filter(
        u =>
            u.name.toLowerCase().includes(search.toLowerCase()) ||
            u.email.toLowerCase().includes(search.toLowerCase())
    );

    return (
        <Box sx={{ p: 3, backgroundColor: "#F7F7F7", minHeight: "100vh" }}>

            {/* HEADER */}
            <Box sx={{ display: "flex", justifyContent: "space-between", mb: 3 }}>
                <Box>
                    <Typography variant="h5" fontWeight={700}>
                        Manage Users
                    </Typography>
                    <Typography sx={{ color: "#888" }}>
                        {users.length} registered users
                    </Typography>
                </Box>

                <TextField
                    size="small"
                    placeholder="Search users..."
                    value={search}
                    onChange={(e) => setSearch(e.target.value)}
                />
            </Box>

            {/* EMPTY STATE (NO USERS AT ALL) */}
            {users.length === 0 ? (
                <Box sx={{ textAlign: "center", py: 6 }}>
                    <Typography fontWeight={700}>
                        No users yet 👥
                    </Typography>
                    <Typography sx={{ color: "#888" }}>
                        Users will appear here once they register
                    </Typography>
                </Box>
            ) : (
                <TableContainer component={Paper} sx={{ borderRadius: 3 }}>

                    <Table>

                        <TableHead>
                            <TableRow>
                                <TableCell>User</TableCell>
                                <TableCell>Email</TableCell>
                                <TableCell>Joined</TableCell>
                                <TableCell>Tickets</TableCell>
                                <TableCell>Status</TableCell>
                                <TableCell>Action</TableCell>
                            </TableRow>
                        </TableHead>

                        <TableBody>

                            {/* NO RESULTS STATE */}
                            {filteredUsers.length === 0 ? (
                                <TableRow>
                                    <TableCell colSpan={6}>
                                        <Box sx={{ textAlign: "center", py: 4 }}>
                                            <Typography fontWeight={600}>
                                                No users found
                                            </Typography>
                                            <Typography sx={{ color: "#888", fontSize: 13 }}>
                                                Try a different search keyword
                                            </Typography>
                                        </Box>
                                    </TableCell>
                                </TableRow>
                            ) : (

                                filteredUsers.map(user => (
                                    <TableRow key={user.id}>

                                        {/* USER */}
                                        <TableCell>
                                            <Box sx={{ display: "flex", gap: 2, alignItems: "center" }}>
                                                <Box
                                                    sx={{
                                                        width: 35,
                                                        height: 35,
                                                        borderRadius: "50%",
                                                        backgroundColor: user.color,
                                                        display: "flex",
                                                        alignItems: "center",
                                                        justifyContent: "center",
                                                        color: "white",
                                                        fontWeight: 700
                                                    }}
                                                >
                                                    {user.avatar}
                                                </Box>
                                                <Typography fontWeight={600}>
                                                    {user.name}
                                                </Typography>
                                            </Box>
                                        </TableCell>

                                        {/* EMAIL */}
                                        <TableCell>{user.email}</TableCell>

                                        {/* JOINED */}
                                        <TableCell>{user.joined}</TableCell>

                                        {/* TICKETS */}
                                        <TableCell>{user.tickets}</TableCell>

                                        {/* STATUS */}
                                        <TableCell>
                                            <Chip
                                                label={user.status === "active" ? "Active" : "Blocked"}
                                                size="small"
                                                sx={{
                                                    backgroundColor:
                                                        user.status === "active"
                                                            ? "#e6faf9"
                                                            : "#fff0f0",
                                                    color:
                                                        user.status === "active"
                                                            ? "#2a8f88"
                                                            : "#cc4444",
                                                    fontWeight: 600,
                                                    borderRadius: 2
                                                }}
                                            />
                                        </TableCell>

                                        {/* ACTION */}
                                        <TableCell>
                                            <Button
                                                size="small"
                                                variant="contained"
                                                onClick={() => toggleBlock(user.id)}
                                                sx={{
                                                    backgroundColor:
                                                        user.status === "active"
                                                            ? "#FF6B6B"
                                                            : "#4ECDC4",
                                                    borderRadius: 2,
                                                    '&:hover': {
                                                        backgroundColor:
                                                            user.status === "active"
                                                                ? "#cc4444"
                                                                : "#2a8f88"
                                                    }
                                                }}
                                            >
                                                {user.status === "active" ? "Block" : "Unblock"}
                                            </Button>
                                        </TableCell>

                                    </TableRow>
                                ))

                            )}

                        </TableBody>

                    </Table>

                </TableContainer>
            )}

        </Box>
    );
}

export default AdminUsersPage;