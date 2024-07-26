const express = require("express");
const router = express.Router();
const TaskListControler = require("../controllers/TaskListController");


// Rota para obter todas as listas de tarefas de um usuário
router.get("/all", async (req, res) => {
    try {
        const user = req.session.user;

        const taskLists = await TaskListControler.getAllTaskList(user);

        res.status(200).json({ message: "Task lists retrieved successfully", tasksLists: taskLists });
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
});


// Rota para criar uma nova lista de tarefas
router.post("/create", async (req, res) => {
    const { taskListName, taskListDescription } = req.body;
    try {
        const user = req.session.user;

        const updatedUser = await TaskListControler.createTaskList(user, taskListName, taskListDescription);

        req.session.user = updatedUser;

        res.status(201).json({ message: "Task list created successfully", id: updatedUser.tasksLists.slice(-1)[0].idTaskList });
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

        const updatedUser = await TaskListControler.updateTaskList(user, parseInt(taskListId, 10), newTaskListName, newTaskListDescription);

        req.session.user = updatedUser;

        res.status(200).json({ message: "Task list updated successfully", tasksLists: updatedUser.tasksLists });
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
});


// Rota para deletar uma lista de tarefas específica
router.delete("/delete/:taskListId", async (req, res) => {
    const { taskListId } = req.params;
    try {
        const user = req.session.user;

        const updatedUser = await TaskListControler.deleteTaskList(user, parseInt(taskListId, 10));

        req.session.user = updatedUser;
        
        res.status(204).send({ message: "Task list deleted successfully" });
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
});


module.exports = router;