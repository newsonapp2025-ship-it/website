import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    closemodelstate: 0,
    changeModel: "",
    logoutTrigger: false,
    logoutPopup: false,
};

export const closemodel = createSlice({
    name: "closemodel",
    initialState,
    reducers: {
        closemodelstate: (state, action) => {
            state.closemodelstate += 1;
        },

        setChangeModel: (state, action) => {
            state.changeModel = action.payload;
        },

        setLogoutTrigger: (state, action) => {
            state.logoutTrigger = action.payload;
        },
        setLogoutPopup: (state, action) => {
            state.logoutPopup = action.payload;
        },

    },
});

export const { closemodelstate, setChangeModel, setLogoutTrigger, setLogoutPopup } = closemodel.actions;
export default closemodel.reducer;
