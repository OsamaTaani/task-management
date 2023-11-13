// controllers/taskController.js
const Task = require('../models/taskModel');

const taskController = {
  getAllTasks: async (req, res) => {
    try {
      const tasks = await Task.find();
      res.status(200).json(tasks);
    } catch (error) {
      res.status(500).json({ message: 'Error fetching tasks.', error });
    }
  },
  getTaskById: async (req, res) => {
    const taskId = req.params.taskId;

    try {
      // Find the task by ID
      const task = await Task.findById(taskId);

      // Check if the task exists
      if (!task) {
        return res.status(404).json({ message: 'Task not found.' });
      }

      res.status(200).json(task);
    } catch (error) {
      res.status(500).json({ message: 'Error getting task by ID.', error });
    }
  },



  addTask: async (req, res) => {
    const { title, description, dueDate, priority } = req.body;

    try {
      // Basic validation
      if (!title || !description || !dueDate || !priority) {
        return res.status(400).json({ message: 'All fields are required.' });
      }

      // Create and save the new task
      const newTask = new Task({
        title,
        description,
        dueDate,
        priority,
      });

      const savedTask = await newTask.save();
      res.status(201).json(savedTask);
    } catch (error) {
      res.status(500).json({ message: 'Error adding task.', error });
    }
  },

  updateTaskAllFields: async (req, res) => {
    const taskId = req.params.taskId;
    const updatedTaskData = req.body;

    try {
      // Find the task by ID and update all fields
      const task = await Task.findByIdAndUpdate(taskId, updatedTaskData, { new: true, fields: {status: 0} });


      // Check if the task exists
      if (!task) {
        return res.status(404).json({ message: 'Task not found.' });
      }

      res.status(200).json(task);
    } catch (error) {
      res.status(500).json({ message: 'Error updating task.', error });
    }
  },

  // Separate method for updating only the status
  updateTaskStatus: async (req, res) => {
    const taskId = req.params.taskId;
    const { status } = req.body;

    try {
      // Find the task by ID and update only the status
      const task = await Task.findByIdAndUpdate(taskId, { status }, { new: true });

      // Check if the task exists
      if (!task) {
        return res.status(404).json({ message: 'Task not found.' });
      }

      res.status(200).json(task);
    } catch (error) {
      res.status(500).json({ message: 'Error updating task status.', error });
    }
  },



  deleteTask: async (req, res) => {
    const taskId = req.params.taskId;
  
    try {
      console.log('Deleting task with ID:', taskId);
  
      // Find the task by ID and remove it
      const deletedTask = await Task.findByIdAndDelete(taskId);
  
      console.log('Deleted task:', deletedTask);
  
      // Check if the task exists
      if (!deletedTask) {
        return res.status(404).json({ message: 'Task not found.' });
      }
  
      res.status(200).json({ message: 'Task deleted successfully.', deletedTask });
    } catch (error) {
      console.error('Error deleting task:', error);
      res.status(500).json({ message: 'Error deleting task.', error });
    }
  },
  };

module.exports = taskController;
