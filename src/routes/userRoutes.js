const express = require("express");
const router = express.Router();
const UserController = require("../controllers/UserController");

// Rota para criar um usuário
router.post("/users/create", async (req, res) => {
    const { email, name, password } = req.body;
    try {
        const user = await UserController.createUser(email, name, password);
        res.status(201).json(user);
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
});

// Rota para recuperar um usuário
router.post("/users/login", async (req, res) => {
    const { email, password } = req.body;
    try {
        const user = await UserController.getUser(email, password);
        res.status(200).json(user);
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
});

// Rota para atualizar dados do usuário
router.put("/users/:id", async (req, res) => {
    const { id } = req.params;
    const { newName, newPassword } = req.body;
    try {
        // Presume-se que o usuário esteja autenticado e tenha um ID
        const user = await UserController.getUserById(id); // Você pode implementar essa função para obter o usuário pelo ID
        const updatedUser = await UserController.updateDataUser(user, newName, newPassword);
        res.status(200).json(updatedUser);
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
});

// Rota para modificar a senha se esquecida
router.post("/users/forgot-password", async (req, res) => {
    const { email, newPassword } = req.body;
    try {
        const result = await UserController.forgotPasswordModify(email, newPassword);
        res.status(200).json(result);
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
});

// Rota para deletar um usuário
router.delete("/users/:id", async (req, res) => {
    const { id } = req.params;
    const { password } = req.body;
    try {
        // Presume-se que o usuário esteja autenticado e tenha um ID
        const user = await UserController.getUserById(id); // Você pode implementar essa função para obter o usuário pelo ID
        await UserController.deleteUser(user, password);
        res.status(204).send();
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
});

// Rota para obter todas as listas de tarefas de um usuário
router.get("/users/:id/task-lists", async (req, res) => {
    const { id } = req.params;
    try {
        const user = await UserController.getUserById(id); // Você pode implementar essa função para obter o usuário pelo ID
        const taskLists = await UserController.getAllTaskList(user);
        res.status(200).json(taskLists);
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
});

// Rota para criar uma nova lista de tarefas
router.post("/users/:id/task-lists", async (req, res) => {
    const { id } = req.params;
    const { taskListName, taskListDescription } = req.body;
    try {
        const user = await UserController.getUserById(id); // Você pode implementar essa função para obter o usuário pelo ID
        const newTaskListId = await UserController.createTaskList(user, taskListName, taskListDescription);
        res.status(201).json({ id: newTaskListId });
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
});

// Rota para deletar uma lista de tarefas específica
router.delete("/users/:id/task-lists/:taskListId", async (req, res) => {
    const { id, taskListId } = req.params;
    try {
        const user = await UserController.getUserById(id); // Você pode implementar essa função para obter o usuário pelo ID
        const taskListsUpdated = await UserController.deleteTaskList(user, parseInt(taskListId, 10));
        res.status(204).send(taskListsUpdated);
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
});

module.exports = router;
