import React, { useState } from "react";
import { Link, useParams } from "react-router-dom";
import { useEffect } from "react";
import axios from "axios";
const TaskEditing = () => {
	const params = useParams();
	const [task, setTask] = useState({ name: "", completed: false });
	const [content, setContent] = useState({ show: null, success: false });
	useEffect(() => {
		axios
			.get(`http://localhost:3001/api/v1/tasks/${params.id}`)
			.then(data => {
				const { name, completed } = data.data.task;
				setTask({ name, completed });
			})
			.catch(err => {
				console.log(err);
			});
	}, []);
	const handleCheckboxChange = event => {
		setTask({ name: task.name, completed: event.target.checked });
	};
	const handleNameChange = event => {
		setTask({ name: event.target.value, completed: task.completed });
	};
	const handleFormSubmit = event => {
		axios
			.patch(`http://localhost:3001/api/v1/tasks/${params.id}`, {
				name: task.name,
				completed: task.completed,
			})
			.then(() => {
				setContent({ show: "success, edited task", success: true });
			})
			.catch(err => {
				setContent({ show: "error, please try again", success: false });
			});
		event.preventDefault();
	};
	if (content.show) {
		setTimeout(() => {
			setContent({ show: null, success: false });
		}, 3000);
	}
	return (
		<div className="container">
			<form className="single-task-form" onSubmit={handleFormSubmit}>
				<h4>Edit Task</h4>
				<div className="form-control">
					<label>Task ID</label>
					<p className="task-edit-id">{params.id}</p>
				</div>
				<div className="form-control">
					<label htmlFor="name">Name</label>
					<input type="text" name="name" value={task.name} className="task-edit-name" onChange={handleNameChange} />
				</div>
				<div className="form-control">
					<label htmlFor="completed">completed</label>
					<input type="checkbox" name="completed" checked={task.completed} className="task-edit-completed" onChange={handleCheckboxChange} />
				</div>
				<button type="submit" className="block btn task-edit-btn">
					edit
				</button>
				<div className={content.success ? "form-alert text-success" : "form-alert"}>{content.show}</div>
			</form>
			<Link to="/" className={"btn back-link"}>
				back to tasks
			</Link>
		</div>
	);
};

export default TaskEditing;
