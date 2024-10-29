import axiosInstance from '../utils/axionInstance';

// Login User API
export const loginUser = async (userData) => {
    try {
        const response = await axiosInstance.post('/admin/login', userData);
        console.log(response, "apiiiiiiiiiiiiiiiiiiiiiiii");

        const { token, user } = response.data; // Assuming your API response has user and token properties

        if (token) {
            // Store token in localStorage for authenticated routes
            localStorage.setItem('authToken', token);
            console.log('Token stored successfully');
        }

        return { user, token }; // Return user and token to the caller
    } catch (error) {
        console.error('Error logging in:', error);

        if (error.response) {
            return { 
                message: error.response.data.message || 'Login failed. Please check your credentials.',
                status: error.response.status // To handle different status codes in UI
            };
        } else {
            return { message: 'Network error. Please try again later.' };
        }
    }
}

// Register User API
export const registerUser = async (userData) => {
    console.log(userData, "Register API request");
    try {
        const response = await axiosInstance.post('/register', userData);
        return response.data;
    } catch (error) {
        console.error('Error registering:', error);
        
        if (error.response) {
            console.error('Response data:', error.response.data);
            return { 
                message: error.response.data.message || 'Registration failed.',
                status: error.response.status // Useful for UI error handling
            };
        } else {
            return { message: 'Server error. Please try again later.' };
        }
    }
}
