// ================= USERS =================
export const users = [
    {
        id: "u1",
        name: "Meram Amr",
        email: "meram@gmail.com",
        password: "123456",
        role: "user",
        favorites: ["e1", "e3"],
        tickets: ["t1"],
        notifications: ["n1", "n2"]
    },
    {
        id: "o1",
        name: "Event Organizer 1",
        email: "org1@gmail.com",
        password: "123456",
        role: "organizer",
        approved: true,
        events: ["e1", "e2"]
    },
    {
        id: "o2",
        name: "Pending Organizer",
        email: "org2@gmail.com",
        password: "123456",
        role: "organizer",
        approved: false,
        events: []
    },
    {
        id: "a1",
        name: "Admin",
        email: "admin@gmail.com",
        password: "123456",
        role: "admin"
    }
];

// ================= EVENTS =================
export const events = [
    {
        id: "e1",
        title: "Music Concert",
        description: "Live concert with top artists",
        category: "CONCERT",
        date: "2026-05-20",
        location: "Cairo",
        price: 200,
        availableTickets: 50,
        image: "https://via.placeholder.com/300",
        organizerId: "o1",
        approved: true,
        reviews: ["r1", "r2"]
    },
    {
        id: "e2",
        title: "Football Match",
        description: "Big match event",
        category: "SPORTS",
        date: "2026-06-10",
        location: "Alexandria",
        price: 150,
        availableTickets: 30,
        image: "https://via.placeholder.com/300",
        organizerId: "o1",
        approved: false,
        reviews: []
    },
    {
        id: "e3",
        title: "Tech Conference",
        description: "Latest tech trends",
        category: "TECH",
        date: "2026-07-01",
        location: "Giza",
        price: 300,
        availableTickets: 100,
        image: "https://via.placeholder.com/300",
        organizerId: "o1",
        approved: true,
        reviews: []
    }
];

// ================= TICKETS =================
export const tickets = [
    {
        id: "t1",
        userId: "u1",
        eventId: "e1",
        status: "confirmed", // pending | confirmed | rejected
        paymentStatus: "paid",
        bookingDate: "2026-04-10"
    },
    {
        id: "t2",
        userId: "u1",
        eventId: "e2",
        status: "pending",
        paymentStatus: "paid",
        bookingDate: "2026-04-11"
    }
];

export const mockBookings = [
    {
        id: 1,
        user: "Meram Amr",
        email: "meram@gmail.com",
        event: "Music Concert",
        date: "12 May 2026",
        tickets: 2,
        total: 300,
        status: "pending",
        avatar: "M",
        color: "#6C63FF"
    },
    {
        id: 2,
        user: "Ali Ahmed",
        email: "ali@gmail.com",
        event: "Tech Conference",
        date: "20 May 2026",
        tickets: 1,
        total: 0,
        status: "confirmed",
        avatar: "A",
        color: "#FF6584"
    },
    {
        id: 3,
        user: "Sara Mohamed",
        email: "sara@gmail.com",
        event: "Startup Meetup",
        date: "5 June 2026",
        tickets: 3,
        total: 450,
        status: "pending",
        avatar: "S",
        color: "#00BFA6"
    },
    {
        id: 4,
        user: "Omar Khaled",
        email: "omar@gmail.com",
        event: "Football Match",
        date: "18 June 2026",
        tickets: 4,
        total: 800,
        status: "confirmed",
        avatar: "O",
        color: "#FFA500"
    },
    {
        id: 5,
        user: "Nour Hassan",
        email: "nour@gmail.com",
        event: "Art Exhibition",
        date: "25 June 2026",
        tickets: 1,
        total: 150,
        status: "pending",
        avatar: "N",
        color: "#9C27B0"
    }
];

export const mockUsers = [
    {
        id: "u1",
        name: "Ahmed Ali",
        email: "ahmed@gmail.com",
        joined: "2026-01-10",
        tickets: 5,
        status: "active"
    },
    {
        id: "u2",
        name: "Sara Mohamed",
        email: "sara@gmail.com",
        joined: "2026-02-12",
        tickets: 2,
        status: "active"
    },
    {
        id: "u3",
        name: "Omar Khaled",
        email: "omar@gmail.com",
        joined: "2026-03-01",
        tickets: 0,
        status: "blocked"
    },
    {
        id: "u4",
        name: "Mona Samir",
        email: "mona@gmail.com",
        joined: "2026-03-15",
        tickets: 8,
        status: "active"
    },
    {
        id: "u5",
        name: "Youssef Ahmed",
        email: "youssef@gmail.com",
        joined: "2026-04-01",
        tickets: 1,
        status: "blocked"
    },
    {
        id: "u6",
        name: "Nour Hassan",
        email: "nour@gmail.com",
        joined: "2026-04-05",
        tickets: 3,
        status: "active"
    }
];

// ================= FAVORITES =================
export const favorites = [
    {
        id: "f1",
        userId: "u1",
        eventId: "e1"
    },
    {
        id: "f2",
        userId: "u1",
        eventId: "e3"
    }
];

// ================= REVIEWS =================
export const reviews = [
    {
        id: "r1",
        userId: "u1",
        eventId: "e1",
        rating: 5,
        comment: "Amazing event!",
        date: "2026-04-01"
    },
    {
        id: "r2",
        userId: "u1",
        eventId: "e1",
        rating: 4,
        comment: "Very good experience",
        date: "2026-04-02"
    }
];

// ================= NOTIFICATIONS =================
export const notifications = [
    {
        id: "n1",
        userId: "u1",
        message: "Your ticket has been confirmed 🎉",
        date: "2026-04-10",
        read: false
    },
    {
        id: "n2",
        userId: "u1",
        message: "New event available near you",
        date: "2026-04-11",
        read: true
    }
];

// ================= ANALYTICS =================
export const analytics = {
    organizer: {
        totalEvents: 3,
        ticketsSold: 120,
        revenue: 25000,
        monthlySales: [
            { month: "Jan", value: 2000 },
            { month: "Feb", value: 4000 },
            { month: "Mar", value: 6000 }
        ]
    },
    admin: {
        totalUsers: 50,
        totalOrganizers: 10,
        totalEvents: 20,
        revenue: 100000,
        userGrowth: [
            { month: "Jan", value: 10 },
            { month: "Feb", value: 20 },
            { month: "Mar", value: 30 }
        ]
    }
};




