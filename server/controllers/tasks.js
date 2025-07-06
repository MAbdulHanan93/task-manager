const express = require("express");
const router = express.Router();
const Task = require("../models/Task");
const isAuth = require("../middlewares/auth");

//GET ALL TASK THAT BELONGS TO YOU
router.get("/", isAuth, async (req, res) => {
	try {
		const tasks = await Task.find({ owner: req.user._id });
		return res.json(tasks);
	} catch (e) {
		return res
			.status(400)
			.json({ msg: "Cannot get all tasks", error: e.message });
	}
});
//GET A SINGLE TASK THAT BELONGS TO YOU
router.get("/:id", isAuth, async (req, res) => {
	try {
		// let task = await Task.findById(req.params.id);
		let task = await Task.findOne({
			_id: req.params.id,
			owner: req.user._id,
		});
		return res.json(task);
	} catch (e) {
		return res.status(400).json({ msg: "Something went wrong" });
	}
});

//ADD TASK
router.post("/", isAuth, (req, res) => {
	try {
		const task = new Task(req.body);
		task.owner = req.user._id;
		task.save();
		return res.json({ msg: "task added successfully", task });
	} catch (e) {
		return res
			.status(400)
			.json({ msg: "Failed to add a task", error: e.message });
	}
});

//UPDATE TASK DESCRIPTION
router.put("/:id", isAuth, async (req, res) => {
	try {
		let task = await Task.findById(req.params.id);
		if (!task || task.owner != req.user._id) {
			return res.status(403).json({ msg: "You cannot update this task" });
		} else {
			let updatedTask = await Task.findByIdAndUpdate(
				req.params.id,
				{ ...req.body, updated_at: Date.now() },
				{ new: true }
			);
			return res.json({
				task: updatedTask,
				msg: "Task updated successfully",
			});
		}
	} catch (e) {
		return res
			.status(400)
			.json({ error: e.message, msg: "Cannot udpate task" });
	}
});

//UPDATE TASK COMPLETED
router.patch("/:id", isAuth, async (req, res) => {
	try {
		let task = await Task.findById(req.params.id);
		if (!task || task.owner != req.user._id) {
			return res.status(403).json({ msg: "You cannot update this task" });
		} else {
			let updatedTask = await Task.findByIdAndUpdate(
				req.params.id,
				{ ...req.body, completed: !task.completed },
				{ new: true }
			);
			return res.json({
				task: updatedTask,
				msg: "Task updated successfully",
			});
		}
	} catch (e) {
		return res
			.status(400)
			.json({ error: e.message, msg: "Cannot udpate task" });
	}
});

//DELETE TASK
router.delete("/:id", isAuth, async (req, res) => {
	try {
		let task = await Task.findById(req.params.id);

		if (!task || task.owner != req.user._id) {
			return res.status(403).json({
				msg: "You cannot delete this task or task doesnt exist",
			});
		} else {
			await Task.findByIdAndDelete(req.params.id);
			return res.json({ msg: "task deleted successfully" });
		}
	} catch (e) {
		return res
			.status(400)
			.json({ msg: "Cannot delete task", error: e.message });
	}
});

module.exports = router;
