import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    modals: {
        projectEdit: false,
        leave: false,
        projectDetails: false,
        userCreate: false,
    },
};

const modalSlice = createSlice({
    name: "modal",
    initialState,
    reducers: {
        openModal: (state, action) => {
            const { modalType, id } = action.payload;
            state.modals[modalType] = id || true; // Set ID or true if no ID is provided
        },
        closeModal: (state, action) => {
            state.modals[action.payload] = false;
        },
        processOn: (state, action) => {
            state.modals[action.payload] = 'processOn';
        },
    },
});

export const { openModal, closeModal, processOn } = modalSlice.actions;
export default modalSlice.reducer;
