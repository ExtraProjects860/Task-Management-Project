const FireBase = require("../config/Firebase");
const usersCollection = FireBase.getConnection().collection("users");
const User = require("../models/User");
const TaskList = require("../models/Task_List");

class UserController {

    // Cria usuário 
    static async createUser(email, name, password) {
        try {
            const user = await User.create(email, name, password);
            await usersCollection.doc(user.id.toString()).set({
                email: user.email,
                name: user.name,
                password: user.password,
                tasks_lists: user.tasks_lists || []
            });
            return user.id;
        } catch(error) {
            throw new Error("Failed to create user: " + error.message);
        }
    }

    // Modifica os dados do usuário
    static async modifyDataUser(user, newEmail, newName, newPassword) {
        try {
            await usersCollection.doc(user.id.toString()).update({
                email: newEmail,
                name: newName,
                password: newPassword
            });
        } catch (error) {
            throw new Error("Failed to modify user data: " + error.message);
        }
    }
    
    // Troca a senha caso usuário tenha esquecido
    static async forgotPasswordModify(user, newPassword) {
        try {
            // Implementar depois, pois precisará verificar como será feito no frontend
        } catch (error) {
            throw new Error("Failed to modify password: " + error.message);
        }
    }

    // Deleta usuário do banco de dados
    static async deleteUser(user) {
        try {
            await usersCollection.doc(user.id.toString()).delete();
        } catch (error) {
            throw new Error("Failed to delete user: " + error.message);
        }
    }

    // Logout para desconectar usuário da sessão
    static async logoutUser(user) {
        try {
            // Implementar lógica de logout depois
        } catch (error) {
            throw new Error("Failed to logout user: " + error.message);
        }
    }

    // Pega a lista de tarefas com todas as listas de tarefas
    static async getAllTaskList(user) {
        try {
            const userDoc = await usersCollection.doc(user.id.toString()).get();

            if (!userDoc.exists) {
                throw new Error("User not found.");
            }

            return userDoc.data().tasks_lists;
        } catch (error) {
            throw new Error("Failed to get task lists: " + error.message);
        }
    }

    // Cria uma nova lista de tarefas
    static async createTaskList(user, task_list_name, task_list_description) {
        try {
            const taskListIds = user.tasks_lists.map(taskList => taskList.id_task_list);

            let newIdTaskList = 1;
            while (taskListIds.includes(newIdTaskList)) {
                newIdTaskList++;
            }

            const newTaskList = TaskList.toPlainObject(new TaskList(newIdTaskList, task_list_name, task_list_description));

            user.tasks_lists.push(newTaskList);

            await usersCollection.doc(user.id.toString()).update({
                tasks_lists: user.tasks_lists
            });

            return newIdTaskList;
        } catch (error) {
            throw new Error("Failed to create task list: " + error.message);
        }
    }

    // Deleta lista de tarefas específica
    static async deleteTaskList(user, taskListId) {
        try {
            const taskListIndex = user.tasks_lists.findIndex(taskList => taskList.id_task_list === taskListId);

            if (taskListIndex === -1) {
                throw new Error("Task list not found.");
            }

            user.tasks_lists.splice(taskListIndex, 1);
            await usersCollection.doc(user.id.toString()).update({
                tasks_lists: user.tasks_lists
            });
        } catch (error) {
            throw new Error("Failed to delete task list: " + error.message);
        }
    }
}

module.exports = UserController;
