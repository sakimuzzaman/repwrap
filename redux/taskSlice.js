
import { createSlice } from "@reduxjs/toolkit";

const taskSlice = createSlice({
    name: "task",
    initialState: {
        task: null,
    },
    reducers: {
        setTask(state, action) {
            state.task = action.payload;
        },
        clearTask(state) {
            state.user = null;
        },
    },
});

export const { setTask, clearTask } = taskSlice.actions;
export default taskSlice.reducer;