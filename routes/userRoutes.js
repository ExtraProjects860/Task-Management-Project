const express = require("express");
const router = express.Router();
const UserController = require("../controllers/UserController");
const isAuthenticated = require("../middlewares/authMiddleware");


// Rota para verificar os dados da sessão do usuário
router.get("/session", (req, res) => {
    if (req.session.user) {
        res.status(200).json(req.session.user);
    } else {
        res.status(401).json({ error: "No user logged in" });
    }
});


// Rota para criar um usuário
router.post("/create", async (req, res) => {
    const { email, name, password } = req.body;
    try {
        const user = await UserController.createUser(email, name, password);

        res.status(201).json(user);
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
});


// Rota para modificar a senha se esquecida
router.post("/forgot-password", async (req, res) => {
    const { email, newPassword } = req.body;
    try {
        await UserController.forgotPasswordModify(email, newPassword);

        res.status(200).json();
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
});


// Rota para recuperar um usuário
router.post("/login", async (req, res) => {
    const { email, password } = req.body;
    try {
        const user = await UserController.loginUser(email, password);

        req.session.user = user;

        res.status(200).json(req.session.user);
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
});


// Rota para deslogar um usuário
router.post("/logout", isAuthenticated, (req, res) => {
    req.session.destroy((err) => {
        if (err) {
            return res.status(500).json({ error: "Failed to log out" });
        }
        res.status(200).json({ message: "Logged out successfully" });
    });
});


// Rota para atualizar dados do usuário
router.put("/update", isAuthenticated, async (req, res) => {
    const { newName, newPassword } = req.body;
    try {
        const user = req.session.user;

        const updatedUser = await UserController.updateDataUser(user, newName, newPassword);

        req.session.user = updatedUser;

        res.status(200).json(req.session.user);
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
});


// Rota para deletar um usuário
router.delete("/delete", isAuthenticated, async (req, res) => {
    const { password } = req.body;
    try {
      const user = req.session.user;

      await UserController.deleteUser(user, password);

      req.session.destroy();
      
      res.status(204).send();
    } catch (error) {
      res.status(400).json({ error: error.message });
    }
});


module.exports = router;