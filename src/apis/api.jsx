// src/api/api.js
import axios from 'axios';
import { useContext } from 'react';
import AuthContext from '../context/authcontent';




// Set up a base instance for axios
const apiClient = axios.create({
    baseURL: 'http://localhost:8001/employee',
    headers: {
        'Content-Type': 'application/json',
    },
});

// Add an interceptor to set the Authorization header
apiClient.interceptors.request.use((config) => {
    const authTokens = localStorage.getItem('authTokens'); 
    if (authTokens) {
        config.headers.Authorization = `Bearer ${authTokens}`;
    }
    return config;
}, (error) => {
    return Promise.reject(error);
});

// login
export const login = (email, password) => {
    return apiClient.post('/employee-login/', { email, password });
  };

// Function to add a new employee
export const addEmployee = async (employeeData, authTokens) => {
    try {
        const response = await apiClient.post('/employee-creation/', employeeData, {
            headers: {
                Authorization: `Bearer ${authTokens.accessToken}`, 
            },
        });
        return response.data;
    } catch (error) {
        console.error("Error adding employee:", error);
        throw error;
    }
};




export default apiClient;
