import axios from 'axios';

const API_URL = 'http://localhost:8080/api';

const api = axios.create({
    baseURL: API_URL,
});

export const registerUser = (data) => api.post('/users/register', data);
export const generateOtp = (email) => api.post(`/users/generate-otp?email=${email}`);
export const loginUser = (user) => api.post('/users/login', user); // Need to implement login backend but register is there
export const getUser = (id) => api.get(`/users/${id}`);
export const getAllUsers = () => api.get('/users');

export const addVehicle = (vehicle) => api.post('/vehicles', vehicle);
export const getVehiclesByUser = (userId) => api.get(`/vehicles/user/${userId}`);

export const createBooking = (booking) => api.post('/bookings', booking);
export const getBookingById = (id) => api.get(`/bookings/${id}`);
export const getBookingsByUser = (userId) => api.get(`/bookings/user/${userId}`);

export const getServiceCenters = () => api.get('/service-centers');
export const addServiceCenter = (center) => api.post('/service-centers', center);
export const deleteServiceCenter = (id) => api.delete(`/service-centers/${id}`); // Need to add this to backend too maybe?
export const getMechanicsByCenter = (centerId) => api.get(`/mechanics/center/${centerId}`);
export const getServiceTypes = () => api.get('/service-types');

export const sendSupportMessage = (data) => api.post('/support', data);
export const getAllSupportMessages = () => api.get('/support');
export const getSupportMessagesByUser = (userId) => api.get(`/support/user/${userId}`);
export const replyToSupportMessage = (id, reply) => api.put(`/support/${id}/reply`, { reply: reply });
export const markSupportMessageAsRead = (id) => api.put(`/support/${id}/read`);

export const getNotificationsByUser = (userId) => api.get(`/notifications/user/${userId}`);
export const markNotificationAsRead = (id) => api.put(`/notifications/${id}/read`);

export default api;
