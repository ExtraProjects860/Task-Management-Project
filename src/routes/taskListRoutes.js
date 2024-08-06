const express = require("express");
const router = express.Router();
const FireBase = require("../config/Firebase")
const TaskListController = require("../controllers/TaskListController");


// Rota para obter todas as listas de tarefas de um usuário
router.get("/all", async (req, res) => {
    try {
        const user = req.session.user;

        const taskListController = new TaskListController(null, null, null, FireBase);

        const taskLists = await taskListController.getAllTaskList(user.idUser);

        res.status(200).json({ message: "Tasks lists retrieved successfully", tasksLists: taskLists });
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
});


// Rota para criar uma nova lista de tarefas
router.post("/create", async (req, res) => {
    const { taskListName, taskListDescription } = req.body;
    try {
        const user = req.session.user;

        const taskListController = new TaskListController(null, taskListName, taskListDescription, FireBase);

        const updatedTaskLists = await taskListController.createTaskList(user.idUser);

        res.status(201).json({ message: "Task list created successfully", tasksLists: updatedTaskLists });
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
});


// Rota para modificar dados da lista de tarefas
router.put("/update/:taskListId", async (req, res) => {
    const { taskListId } = req.params;
    const { newTaskListName, newTaskListDescription } = req.body;
    try {
        const user = req.session.user;

        const taskListController = new TaskListController(parseInt(taskListId, 10), newTaskListName, newTaskListDescription, FireBase);

        const updatedTaskLists = await taskListController.updateTaskList(user.idUser);

        res.status(200).json({ message: "Task list updated successfully", tasksLists: updatedTaskLists });
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
});


// Rota para deletar uma lista de tarefas específica
router.delete("/delete/:taskListId", async (req, res) => {
    const { taskListId } = req.params;
    try {
        const user = req.session.user;

        const taskListController = new TaskListController(parseInt(taskListId, 10), null, null, FireBase);

        const updatedTaskLists = await taskListController.deleteTaskList(user.idUser);
        
        res.status(204).json({ message: "Task list deleted successfully", tasksLists: updatedTaskLists });
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
});


module.exports = router;