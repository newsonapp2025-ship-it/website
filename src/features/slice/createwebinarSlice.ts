import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    webinarData: {
        image: null,
        photostore: null,
        name: '',
        description: '',
        date: '',
        startTime: '',
        endTime: '',
        duration: 0,
        participants: []
    },
    file: null,
    alertCreate: true,
    selectedImage: null,
    ListParticipants: [],
    userImageArray: [],
    webinarId: null
};

export const creatwebinarSlice = createSlice({
    name: "creatwebinarSlice",
    initialState,
    reducers: {
        SetWebinarData: (state, action) => {
            state.webinarData = { ...state.webinarData, ...action.payload };
        },
        SetFile: (state, action) => {
            state.file = action.payload;
        },
        SetSelectedImage: (state, action) => {
            state.selectedImage = action.payload;
        },
        SetListParticipants: (state, action) => {
            state.ListParticipants = action.payload;
        },
        SetuserImageArray: (state, action) => {
            state.userImageArray = action.payload;
        },
        SetwebinarId: (state, action) => {
            state.webinarId = action.payload;
        },
        SetalertCreate: (state, action) => {
            state.alertCreate = action.payload;
        },

        ResetWebinar: (state) => {
            state.webinarData = initialState.webinarData;
            state.file = null;
            state.selectedImage = null;
            state.ListParticipants = [];
            state.userImageArray = [];
        }
    },
});

export const {
    SetWebinarData,
    SetFile,
    SetSelectedImage,
    SetListParticipants,
    SetuserImageArray,
    SetwebinarId,
    SetalertCreate,
    ResetWebinar
} = creatwebinarSlice.actions;

export default creatwebinarSlice.reducer;
