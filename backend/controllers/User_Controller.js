const bcrypt = require("bcrypt");
const crypto = require("crypto");
const FireBase = require("../config/Firebase");
const usersCollection = FireBase.getConnection().collection("users");
const User = require("../models/User");
const TaskList = require("../models/Task_List");

class UserController {

    static saltRounds = 10;

    // Cria usuário 
    static async createUser(email, name, password) {
        try {
            const userDoc = await usersCollection.where('email', '==', email).get();

            if (!userDoc.empty) {
                throw new Error("Email already exists. Please try another email.")
            }

            const hashedPassword = await bcrypt.hash(password, this.saltRounds);
            const user = await User.create(email, name, hashedPassword);

            await usersCollection.doc(user.id.toString()).set({
                email: user.email,
                name: user.name,
                password: user.password,
                password_reset_token: null,
                create_at: user.created_at,
                tasks_lists: user.tasks_lists || []
            });

            return user;
        } catch(error) {
            throw new Error("Failed to create user: " + error.message);
        }
    }

    // Recupera usuário
    static async getUser(email, name) {
        try {
           const userQuerySnapshot = await usersCollection
                                           .where('email', '==', email)
                                           .where('name', '==', name)
                                           .get();

            if (userQuerySnapshot.empty) {
                throw new Error("User not found. Try again.");
            }

            const userData = userQuerySnapshot.docs[0].data();

            return new User(userData.email, userData.name, userData.password);
        } catch (error) {
            throw new Error("User not found");
        }
    }

    static async createSessionUser(email, password) {
        // lembrar de implementar depois lógica para iniciar sessão
        try {
            const userQuerySnapshot = await usersCollection
                                      .where('email', '==', email)
                                      .get();

            if (userQuerySnapshot.empty) {
                throw new Error("User not found. Please check your email and password.");
            }

            const userDoc = userQuerySnapshot.docs[0];
            const userData = userDoc.data();

            const isPasswordMatch = await bcrypt.compare(password, userData.password);

            if (!isPasswordMatch) {
                throw new Error("Invalid password. Please try again.");
            }

            const user = new User(userData.email, userData.name, userData.password);

            return user;
            
        } catch (error) {
            throw new Error();
        }
    }

    static async logoutSessionUser() {
        // lembrar de colocar lógica depois para terminar a sessão do usuário
        try {
            
        } catch (error) {
            throw new Error();
        }
    }

    // Modifica os dados do usuário
    static async modifyDataUser(user, newEmail, newName, newPassword) {
        try {
            const updates = {
                email: newEmail,
                name: newName,
                password: newPassword ? await bcrypt.hash(newPassword, this.saltRounds) : null,  
            };
            const updateData = {};

            for (const [key, value] of Object.entries(updates)) {
                if (value) {
                    updateData[key] = value;
                    user[key] = value;
                }
            }

            if (Object.keys(updateData).length === 0) {
                throw new Error("No data update.");
            }

            await usersCollection.doc(user.id.toString()).update(updateData);

            return user;
        } catch (error) {
            throw new Error("Failed to modify user data: " + error.message);
        }
    }
    
    // Troca a senha caso usuário tenha esquecido
    static async forgotPasswordModify(email, name, newPassword) {
        try {
            const token = crypto.randomBytes(this.saltRounds).toString('hex');
            // Implementar depois, pois precisará verificar como será feito no frontend

            // const user = await this.getUser(email, name);
            // if (!user) {
            //     throw new Error("User not found.");
            // }
    
            // const hashedPassword = await bcrypt.hash(newPassword, this.saltRounds);
    
            // await usersCollection.doc(user.id.toString()).update({
            //     password: hashedPassword
            // });
    
            // return { message: "Password updated successfully." };

        } catch (error) {
            throw new Error("Failed to modify password: " + error.message);
        }
    }

    // Deleta usuário do banco de dados
    static async deleteUser(user, password) {
        try {
            const isMatch = await bcrypt.compare(password, user.password);

            if (!isMatch) {
                throw new Error("Password is no equal. Try again!")
            }

            await usersCollection.doc(user.id.toString()).delete();
        } catch (error) {
            throw new Error("Failed to delete user: " + error.message);
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
