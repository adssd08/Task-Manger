import axios from "axios";
import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { insertTask } from "../../redux/tasks";
const TaskForm = () => {
	const [name, setName] = useState("");
	const [content, setContent] = useState({ show: null, success: false });
	const dispatch = useDispatch();
	const handleChange = event => {
		setName(event.target.value);
	};
	if (content.show) {
		setTimeout(() => {
			setContent({ show: null, success: false });
		}, 3000);
	}
	const handleSubmit = event => {
		axios
			.post("http://localhost:3001/api/v1/tasks", {
				name: name,
			})
			.then(data => {
				dispatch(insertTask(data.data.task));
				setName("");
				setContent({ show: "sucess, task added", success: true });
			})
			.catch(err => {
				console.log(err);
				setContent({ show: "error,please try again", success: false });
			});
		event.preventDefault();
	};
	return (
		<form className="task-form" onSubmit={handleSubmit}>
			<h4>task manager</h4>
			<div className="form-control">
				<input type="text" name="name" className="task-input" placeholder="e.g. wash dishes" value={name} onChange={handleChange} />
				<button type="submit" className="btn submit-btn">
					submit
				</button>
			</div>
			<div className={content.success ? "form-alert text-success" : "form-alert"}>{content.show}</div>
		</form>
	);
};

export default TaskForm;
