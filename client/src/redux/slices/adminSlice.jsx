import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { loginUser, registerUser } from '../../api/adminApi';

const initialState = {
    user: localStorage.getItem('user') && localStorage.getItem('user') !== 'undefined' 
        ? JSON.parse(localStorage.getItem('user')) 
        : null,
    token: localStorage.getItem('token') || null,
    loading: false,
    error: null,
    isLoggedIn: false,
};

// Async thunk for logging in
export const login = createAsyncThunk(
    'user/login',
    async (userData, { rejectWithValue }) => {
        try {
            const response = await loginUser(userData);
            console.log(response, "useeeeeeeeeeeeeeeeeeeeeeee"); // Log the entire response

            if (response.token && response.user) {
                return response; // Return the entire response object with user and token
            } else {
                console.error('No token or user in response:', response);
                return rejectWithValue(response.message || 'Invalid response format');
            }
        } catch (error) {
            console.error('Error during login:', error);
            return rejectWithValue(error.message);
        }
    }
);

// Async thunk for registering
export const register = createAsyncThunk(
    'user/register',
    async (userData, { rejectWithValue }) => {
        try {
            const response = await registerUser(userData);
            return response; // Assuming response contains token and user details
        } catch (error) {
            return rejectWithValue(error.message);
        }
    }
);

const adminSlice = createSlice({
    name: 'user',
    initialState,
    reducers: {
        logout(state) {
            state.user = null;
            state.token = null;
            state.isLoggedIn = false; // Ensure this reflects the correct state
            localStorage.removeItem('user');
            localStorage.removeItem('token');
        },
    },
    extraReducers: (builder) => {
        builder
            .addCase(login.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(login.fulfilled, (state, action) => {
                state.loading = false;
                state.user = action.payload.user;
                state.token = action.payload.token;
                localStorage.setItem('user', JSON.stringify(action.payload.user));
                localStorage.setItem('token', action.payload.token);
                state.isLoggedIn = true; // Set logged-in status
            })
            .addCase(login.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload;
            })
            .addCase(register.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(register.fulfilled, (state, action) => {
                state.loading = false;
                state.user = action.payload.user;
                state.token = action.payload.token;
                localStorage.setItem('user', JSON.stringify(action.payload.user));
                localStorage.setItem('token', action.payload.token);
            })
            .addCase(register.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload;
            });
    },
});

// Selector to get user data
export const selectUser = (state) => state.user.user;
export const selectIsLoggedIn = (state) => state.user.isLoggedIn;
export const selectLoading = (state) => state.user.loading;
export const selectError = (state) => state.user.error;

export const { logout } = adminSlice.actions;

export default adminSlice.reducer;
