const User = require("../models/User");

class UserController {

    // Modifica os dados do usuário
    static async modifyDataUser(user, newData) {}
    
    // Troca a senha caso usuário tenha esquecido
    static async forgotPasswordModify(user, newPassword) {}

    // Deleta usuário do banco de dados
    static async deleteUser(user) {}

    // Logout para desconectar usuário da sessão
    static async logoutUser(user) {}

    // Pega a lista de tarefas com todas as listas de tarefas
    static async getAllTaskList(user) {}

    // Adiciona uma nova lista de tarefas
    static async addTaskList(user, taskList) {}

    // Deleta lista de tarefas específica
    static async deleteTaskList(user, taskListId) {}
}
