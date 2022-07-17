import React, { useState } from "react";
import { useEffect } from "react";
import axios from "axios";
import TaskDisplay from "./TaskDisplay";
import { useSelector } from "react-redux";
import { useDispatch } from "react-redux";
import { loadTasks } from "../../redux/tasks";
const Tasks = () => {
	const { tasks } = useSelector(state => state.tasks);
	const dispatch = useDispatch();
	useEffect(() => {
		axios
			.get("http://localhost:3001/api/v1/tasks")
			.then(data => {
				dispatch(loadTasks(data.data.tasks));
				// setTasks([...data.data.tasks]);
			})
			.catch(err => console.log(err));
	}, []);

	const renderingData = tasks.length ? (
		tasks.map(task => {
			return <TaskDisplay {...task} key={task._id} />;
		})
	) : (
		<h5 className="empty-list">No tasks in your list</h5>
	);
	return (
		<section className="tasks-container">
			<p className="loading-text">Loading...</p>
			<div className="tasks">{renderingData}</div>
		</section>
	);
};

export default Tasks;
