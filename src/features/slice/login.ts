import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    authdata: null,
};

export const login = createSlice({
    name: "auth",
    initialState,
    reducers: {
        setauthdata: (state, action) => {
            state.authdata = action.payload;
        },
    },
});

export const { setauthdata } = login.actions;
export default login.reducer;
