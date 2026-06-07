import { createContext, useContext, useState } from 'react';
import { users as mockUsers } from '../data/mockData';

const AuthContext = createContext();

// Map mockData roles to app roles
const normalizeRole = (role) => {
    if (!role) return 'PARTICIPANT';
    const r = role.toLowerCase();
    if (r === 'admin') return 'ADMIN';
    if (r === 'organizer') return 'ORGANIZER';
    return 'PARTICIPANT';
};

// Get all registered users from localStorage (merges mock + registered)
const getAllUsers = () => {
    const stored = JSON.parse(localStorage.getItem('registeredUsers') || '[]');
    return stored;
};

export const AuthProvider = ({ children }) => {
    const [user, setUser] = useState(
        JSON.parse(localStorage.getItem('user')) || null
    );
    const [token, setToken] = useState(
        localStorage.getItem('token') || null
    );

    const login = async (email, password) => {
        // Check mock users first
        const mockMatch = mockUsers.find(
            (u) => u.email === email && u.password === password
        );

        // Then check localStorage registered users
        const registeredUsers = getAllUsers();
        const registeredMatch = registeredUsers.find(
            (u) => u.email === email && u.password === password
        );

        const matched = mockMatch || registeredMatch;

        if (!matched) {
            throw new Error('Invalid email or password.');
        }

        const loggedInUser = {
            id: matched.id || `u_${email}`,
            name: matched.name,
            email: matched.email,
            role: normalizeRole(matched.role),
        };

        const fakeToken = `token_${matched.id || email}_${Date.now()}`;

        localStorage.setItem('token', fakeToken);
        localStorage.setItem('user', JSON.stringify(loggedInUser));
        setToken(fakeToken);
        setUser(loggedInUser);

        return loggedInUser;
    };

    const register = async (name, email, password, role) => {
        // Check if email already exists
        const existing = getAllUsers().find((u) => u.email === email);
        const mockExisting = mockUsers.find((u) => u.email === email);

        if (existing || mockExisting) {
            throw new Error('Email already registered.');
        }

        const newUser = {
            id: `u_${Date.now()}`,
            name,
            email,
            password,
            role: role || 'PARTICIPANT',
        };

        const registeredUsers = getAllUsers();
        registeredUsers.push(newUser);
        localStorage.setItem('registeredUsers', JSON.stringify(registeredUsers));

        const loggedInUser = {
            id: newUser.id,
            name: newUser.name,
            email: newUser.email,
            role: normalizeRole(newUser.role),
        };

        const fakeToken = `token_${newUser.id}_${Date.now()}`;
        localStorage.setItem('token', fakeToken);
        localStorage.setItem('user', JSON.stringify(loggedInUser));
        setToken(fakeToken);
        setUser(loggedInUser);

        return loggedInUser;
    };

    const logout = () => {
        localStorage.removeItem('token');
        localStorage.removeItem('user');
        setToken(null);
        setUser(null);
    };

    return (
        <AuthContext.Provider value={{ user, token, login, register, logout }}>
            {children}
        </AuthContext.Provider>
    );
};

export const useAuth = () => useContext(AuthContext);
