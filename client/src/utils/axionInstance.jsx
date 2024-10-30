import axios from 'axios';


const axiosInstance = axios.create({
    baseURL: 'http://localhost:5000/api',  
    timeout: 10000,  
});


axiosInstance.interceptors.request.use(
    (config) => {
       
        const token = localStorage.getItem('authToken');  
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
      
        return response;
    },
    (error) => {
        
        if (error.response && error.response.status === 401) {
            
            console.error("Unauthorized, logging out...");
       
        }
        return Promise.reject(error);
    }
);

export default axiosInstance;
