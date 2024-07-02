const express = require('express');
const router = express.Router();
const userController = require('../controllers/UserController');

// rota para pegar usuário e devolver ao frontend
router.get('/users', userController.getUser.bind(userController));
// rota para criar usuário de acordo com as informações vindas do frontend
router.post('/users', userController.createUser.bind(userController));
// rota para mudar a senha do usuário com informações vindas do frontend
router.put('/users', userController.changePassword.bind(userController));
// rota para deletar usuário caso ele queria
router.delete('/users', userController.deleteUser.bind(userController));

module.exports = router;
