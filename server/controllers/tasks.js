const Task = require("../models/Task");
const getAllTasks = (req, res) => {
	Task.find({})
		.then(tasks => {
			res.status(200).json({ tasks });
		})
		.catch(err => {
			res.status(500).json({ msg: err });
		});
};
const createTask = (req, res) => {
	Task.create(req.body)
		.then(task => {
			res.status(201).json({ task });
		})
		.catch(err => {
			res.status(500).json({ msg: err });
		});
};
const getTask = (req, res) => {
	const { id: taskID } = req.params;
	Task.findOne({ _id: taskID })
		.then(task => {
			if (!task) {
				return res.status(404).json({ msg: "Task Not Found" });
			}
			res.status(200).json({ task });
		})
		.catch(err => {
			res.status(500).json({ msg: err });
		});
};
const updateTask = (req, res) => {
	const { id: taskID } = req.params;
	Task.findOneAndUpdate({ _id: taskID }, req.body, {
		new: true,
		runValidators: true,
	})
		.then(task => {
			if (!task) {
				return res.status(404).json({ msg: "Task Not Found" });
			}
			res.status(200).json({ task });
		})
		.catch(err => {
			res.status(500).json({ msg: err });
		});
};
const deleteTask = (req, res) => {
	const { id: taskID } = req.params;
	Task.findOneAndDelete({ _id: taskID })
		.then(task => {
			if (!task) {
				return res.status(404).json({ msg: "Task Not Found" });
			}
			res.status(200).json({ task });
		})
		.catch(err => {
			res.status(500).json({ msg: err });
		});
};

module.exports = { getAllTasks, createTask, getTask, updateTask, deleteTask };
