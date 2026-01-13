import { createSlice } from '@reduxjs/toolkit';

const initialState = {
    notificationCount: 0,
};

const notificationSlice = createSlice({
    name: 'noti',
    initialState,
    reducers: {
        incrementNotificationCount: (state) => {
            state.notificationCount += 1; // just increment
        },
        resetNotificationCount: (state) => {
            state.notificationCount = 0; // optional reset
        },
    },
});

export const { incrementNotificationCount, resetNotificationCount } = notificationSlice.actions;
export default notificationSlice.reducer;
