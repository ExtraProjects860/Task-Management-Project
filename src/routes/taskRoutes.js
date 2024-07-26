const express = require("express");
const router = express.Router();
const TaskController = require("../controllers/TaskController");


// Rota para criar tarefa dentro de uma lista de tarefas
router.post("/task-list/:taskListId/create", async (req, res) => {
    const { taskListId } = req.params;
    const { 
        taskName,
        taskDescription,
        taskPriorite,
        taskStatus,
        taskInitialDate,
        taskFinalDate 
    } = req.body;
    try {
        const taskData = {
            taskName: taskName,
            taskDescription: taskDescription,
            taskPriorite: taskPriorite,
            taskStatus: taskStatus,
            taskInitialDate: taskInitialDate,
            taskFinalDate: taskFinalDate
        }

        const user = req.session.user;

        const updatedUser = await TaskController.createTask(user, parseInt(taskListId, 10), taskData);

        req.session.user = updatedUser;

        return res.status(201).json({ message: "Task created successfully", user: updatedUser });
    } catch (error) {
        return res.status(500).json({ error: error.message });
    }
});


// Rota para modificar tarefa dentro de uma lista de tarefas
router.put("/task-list/:taskListId/update/:taskId", async (req, res) => {
    const { taskListId, taskId } = req.params;
    const { 
        taskName, 
        taskDescription, 
        taskPriorite, 
        taskStatus, 
        taskInitialDate, 
        taskFinalDate 
    } = req.body;
    try {
        const taskData = {
            taskName,
            taskDescription,
            taskPriorite,
            taskStatus,
            taskInitialDate,
            taskFinalDate
        };

        const user = req.session.user;

        const updatedUser = await TaskController.updateTask(user, parseInt(taskListId, 10), parseInt(taskId, 10), taskData);

        req.session.user = updatedUser;

        return res.status(200).json({ message: "Task updated successfully", user: updatedUser });
    } catch (error) {
        console.error(error);
        return res.status(500).json({ error: error.message });
    }
});


// Rota para deletar tarefa dentro de uma lista de tarefas
router.delete("/task-list/:taskListId/delete/:taskId", async (req, res) => {
    const { taskListId, taskId } = req.params;
    try {
        const user = req.session.user;

        const updatedUser = await TaskController.deleteTask(user, parseInt(taskListId, 10), parseInt(taskId, 10));

        req.session.user = updatedUser;

        return res.status(200).json({ message: "Task deleted successfully", user: updatedUser });
    } catch (error) {
        console.error(error);
        return res.status(500).json({ error: error.message });
    }
});


// Rota para pegar todas as tarefas dentro de uma lista de tarefas
router.get("/all/task-list/:taskListId", async (req, res) => {
    const { taskListId } = req.params;
    try {
        const user = req.session.user;

        const tasks = await TaskController.getAllTask(user, parseInt(taskListId, 10));

        return res.status(200).json(tasks);
    } catch (error) {
        console.error(error);
        return res.status(500).json({ error: error.message });
    }
});


module.exports = router;