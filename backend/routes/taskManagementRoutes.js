const express = require('express');
const router = express.Router();
const taskManagementController = require('../controllers/TaskManagementController')

// rota para criar tarefa com informações vindas do frontend
router.post('/task-management', taskManagementController.createTask.bind(taskManagementController));
// rota para modificar a tarefa com informações vindas do frontend
router.put('/task-management', taskManagementController.editTask.bind(taskManagementController));
// rota para deletar tarefa
router.delete('/task-managament', taskManagementController.deleteTask.bind(taskManagementController));

module.exports = router;
