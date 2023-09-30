









































import { createSlice } from '@reduxjs/toolkit';

const getUser = () => {
    const user = window.localStorage.getItem("user");
    if (user) {
        return JSON.parse(user);
    }
    return null;
}

const authSlice = createSlice({
    name: 'auth',
    initialState: {
        isAuthenticated: getUser() !== null,
        currentUser: getUser(),
        error: null,
    },
    reducers: {
        setUser: (state, action) => {
            state.isAuthenticated = true;
            state.currentUser = action.payload;
            state.error = null;

        },
        clearUser: (state) => {
            state.isAuthenticated = false;
            state.currentUser = null;
            state.error = null;
        },
        setError: (state, action) => {
            state.error = action.payload;
        },
    },
});

export const { setUser, clearUser, setError } = authSlice.actions;
export default authSlice.reducer;
