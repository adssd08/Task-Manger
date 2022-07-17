import { createSlice } from "@reduxjs/toolkit";
const initialState = {
	tasks: [],
};

export const tasksSlice = createSlice({
	name: "tasks",
	initialState,
	reducers: {
		deleteTask(state, action) {
			state.tasks = state.tasks.filter(task => {
				return task._id !== action.payload;
			});
		},
		loadTasks(state, action) {
			state.tasks = action.payload;
		},
		insertTask(state, action) {
			state.tasks.push(action.payload);
		},
	},
});

export const { deleteTask, loadTasks, insertTask } = tasksSlice.actions;
export default tasksSlice.reducer;
