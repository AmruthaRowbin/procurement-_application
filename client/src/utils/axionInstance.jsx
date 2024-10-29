import axios from 'axios';

// Create an axios instance
const axiosInstance = axios.create({
    baseURL: 'http://localhost:5000/api',  // Adjust as per your backend
    timeout: 10000,  // Timeout after 10 seconds
});

// Add request interceptor (e.g., to include token)
axiosInstance.interceptors.request.use(
    (config) => {
        // Example: Attach token to every request
        const token = localStorage.getItem('authToken');  // Replace with actual token retrieval logic
        if (token) {
            config.headers.Authorization = `Bearer ${token}`;
        }
        return config;
    },
    (error) => {
        return Promise.reject(error);
    }
);

// Add response interceptor
axiosInstance.interceptors.response.use(
    (response) => {
        // Any modifications on successful response (optional)
        return response;
    },
    (error) => {
        // Handle common errors (e.g., unauthorized, network errors)
        if (error.response && error.response.status === 401) {
            // Example: Automatically log out user on 401 response
            console.error("Unauthorized, logging out...");
            // Redirect to login or log out
        }
        return Promise.reject(error);
    }
);

export default axiosInstance;
