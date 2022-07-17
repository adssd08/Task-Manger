import React from "react";
import axios from "axios";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCheckCircle, faEdit, faTrash } from "@fortawesome/free-solid-svg-icons";
import { useDispatch } from "react-redux";
import { deleteTask } from "../../redux/tasks";
import { Link } from "react-router-dom";
const TaskDisplay = props => {
	const dispatch = useDispatch();
	const handleDeleteClick = id => {
		return () => {
			axios
				.delete(`http://localhost:3001/api/v1/tasks/${id}`)
				.then(data => {
					dispatch(deleteTask(id));
				})
				.catch(err => {
					console.log(err);
				});
		};
	};
	const { completed, _id: taskID, name } = props;
	return (
		<div className={`single-task ${completed && "task-completed"}`}>
			<h5>
				<span>
					<FontAwesomeIcon icon={faCheckCircle} />
				</span>
				{name}
			</h5>
			<div className="task-links">
				<Link to={`/${taskID}`}>
					<FontAwesomeIcon icon={faEdit} />
				</Link>
				<button type="button" className="delete-btn" onClick={handleDeleteClick(taskID)}>
					<FontAwesomeIcon icon={faTrash} />
				</button>
			</div>
		</div>
	);
};

export default TaskDisplay;
