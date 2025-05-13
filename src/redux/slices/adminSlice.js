import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "../../axios";

export const fetchAdmin = createAsyncThunk(
    "adminSlice/fetchAdmin",
    async (_, { getState }) => {
        const jwtToken = localStorage.getItem("jwtToken");
        if (jwtToken) {
            const response = await axios.get("/auth/my-account", {
                headers: {
                    authorization: `Bearer ${jwtToken}`,
                },
            });
            return response.data;
        } else {
            throw Error("");
        }
    }
);

const initialState = {
    isSiteLoading: true,
    admin: {},
    isLoggedIn: false,
    roles: [],
};

export const adminSlice = createSlice({
    name: "admin",
    initialState,
    reducers: {
        setAdmin: (state, action) => {
            state.admin = action.payload?.admin;
            state.isLoggedIn = true;
            state.roles = action.payload?.admin?.role?.roles;
            localStorage.setItem("jwtToken", action.payload?.jwtToken);
        },
        logoutAdmin: (state, action) => {
            state.isLoggedIn = false;
            state.jwtToken = "";
            state.admin = {};
            localStorage.removeItem("jwtToken");
        },
        updateAdmin: (state, action) => {
            state.admin = action.payload;
        },
    },
    extraReducers: (builder) => {
        builder
            .addCase(fetchAdmin.fulfilled, (state, action) => {
                state.admin = action.payload;
                state.isLoggedIn = true;
                state.isSiteLoading = false;
                state.roles = action.payload?.role?.roles;
            })
            .addCase(fetchAdmin.rejected, (state) => {
                state.isSiteLoading = false;
                // localStorage.removeItem("jwtToken");
            });
    },
});

export const { setAdmin, logoutAdmin, updateAdmin } = adminSlice.actions;

export default adminSlice.reducer;
