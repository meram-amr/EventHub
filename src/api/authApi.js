import axiosInstance from './axiosInstance';

// login existing user
export const loginApi = async (email, password) => {
    const response = await axiosInstance.post('/auth/login', {
        email,
        password,
    });
    return response.data;
};

// register new user (participant or organizer)
export const registerApi = async (name, email, password, role) => {
    const response = await axiosInstance.post('/auth/register', {
        name,
        email,
        password,
        role,
    });
    return response.data;
};