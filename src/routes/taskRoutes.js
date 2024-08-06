const express = require("express");
const router = express.Router();
const FireBase = require("../config/Firebase");
const TaskController = require("../controllers/TaskController");
const TaskListController = require("../controllers/TaskListController");

// Rota para pegar todas as tarefas dentro de uma lista de tarefas
router.get("/all/task-list/:taskListId", async (req, res) => {
    const { taskListId } = req.params;
    try {
        const user = req.session.user;

        const taskController = new TaskController(null, null, null, null, null, null, null, FireBase);

        // isso aqui é gambiarra verificar depois, pois não é o ideal
        const taskListController = new TaskListController(null, null, null, FireBase);

        const tasks = await taskController.getAllTask(user.idUser, parseInt(taskListId, 10), taskListController);

        return res.status(200).json({ message: "Tasks retrieved successfully", tasks: tasks });
    } catch (error) {
        console.error(error);
        return res.status(500).json({ error: error.message });
    }
});


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
        const user = req.session.user;

        const taskController = new TaskController(null, taskName, taskDescription, taskPriorite, taskStatus, taskInitialDate, taskFinalDate, FireBase);

        // isso aqui é gambiarra verificar depois, pois não é o ideal
        const taskListController = new TaskListController(null, null, null, FireBase);

        const updatedTasks = await taskController.createTask(user.idUser, parseInt(taskListId, 10), taskListController);

        return res.status(201).json({ message: "Task created successfully", tasks: updatedTasks });
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
        const user = req.session.user;

        const taskController = new TaskController(parseInt(taskId, 10), taskName, taskDescription, taskPriorite, taskStatus, taskInitialDate, taskFinalDate, FireBase);

        // isso aqui é gambiarra verificar depois, pois não é o ideal
        const taskListController = new TaskListController(null, null, null, FireBase);

        const updatedTasks = await taskController.updateTask(user.idUser, parseInt(taskListId, 10), taskListController);

        return res.status(200).json({ message: "Task updated successfully", tasks: updatedTasks });
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

        const taskController = new TaskController(parseInt(taskId, 10), null, null, null, null, null, null, FireBase);

        // isso aqui é gambiarra verificar depois, pois não é o ideal
        const taskListController = new TaskListController(null, null, null, FireBase);

        const updatedTasks = await taskController.deleteTask(user.idUser, parseInt(taskListId, 10), taskListController);

        return res.status(200).json({ message: "Task deleted successfully", tasks: updatedTasks });
    } catch (error) {
        console.error(error);
        return res.status(500).json({ error: error.message });
    }
});


module.exports = router;