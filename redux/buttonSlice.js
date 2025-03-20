import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    buttons: {
        sidebarToggle: false, // Fixed typo: 'sidebarToggale' → 'sidebarToggle'
    },
};

const buttonSlice = createSlice({
    name: "button",
    initialState,
    reducers: {
     
        toggleButton: (state, action) => {
            const { buttonType } = action.payload;
            if (state.buttons.hasOwnProperty(buttonType)) {
                state.buttons[buttonType] = !state.buttons[buttonType];
            }
        }
    },
});

export const { toggleButton } = buttonSlice.actions;
export default buttonSlice.reducer;
