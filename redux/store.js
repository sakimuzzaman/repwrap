// redux/store.js
import { configureStore } from "@reduxjs/toolkit";
import userReducer from "./userSlice";
import taskReducer from "./taskSlice";
import buttonReducer from "./buttonSlice";
import modalReducer from "./modalSlice"; // Import your modal slice

const store = configureStore({
    reducer: {
        user: userReducer,
        task: taskReducer,
        modal: modalReducer,
        button: buttonReducer,
    },
});

export default store;
