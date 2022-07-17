import { configureStore } from "@reduxjs/toolkit";
import tasksReducer from "./tasks";
export default configureStore({
	reducer: {
		tasks: tasksReducer,
	},
});
