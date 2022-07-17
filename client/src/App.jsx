import React from "react";
import "./App.css";
import TasksDisplay from "./components/Tasks/TasksDisplay";
import { Routes, Route } from "react-router-dom";
import TaskEditing from "./components/TasksID/TaskEditing";
import "./normalize.css";
const App = () => {
	return (
		<>
			<Routes>
				<Route path="/" element={<TasksDisplay />} />
				<Route path="/:id" element={<TaskEditing />} />
			</Routes>
		</>
	);
};

export default App;
