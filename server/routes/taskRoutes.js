// routes/tasksRoutes.js
const express = require('express');
const router = express.Router();
const taskController = require('../controllers/taskController');

// Define routes
router.get('/', taskController.getAllTasks);
router.post('/', taskController.addTask);
router.get('/:taskId', taskController.getTaskById);  // New endpoint for getting a task by ID
router.put('/:taskId', taskController.updateTaskAllFields);
router.patch('/:taskId/status', taskController.updateTaskStatus);
router.delete('/:taskId', taskController.deleteTask);

module.exports = router;
