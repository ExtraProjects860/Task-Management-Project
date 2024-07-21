const bcrypt = require("bcrypt");
const crypto = require("crypto");
const FireBase = require("../config/Firebase");
const usersCollection = FireBase.getConnection().collection("users");
const User = require("../models/User");
const TaskList = require("../models/TaskList");
const EmailService = require('../util/EmailService');

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
            const userId = await User.generateId();
            const user = new User(userId, email, name, hashedPassword);

            await usersCollection.doc(user.idUser.toString()).set(User.toPlainObject(user));

            return user; // verificar de retornar o usuário dps
        } catch(error) {
            throw new Error("Failed to create user: " + error.message);
        }
    }

    // Recupera usuário para logar
    static async getUser(email, password) {
        try {
            const userDoc = await usersCollection.where('email', '==', email).get();

            if (userDoc.empty) {
                throw new Error("Email not found");
            }

            const user = userDoc.docs[0].data();

            const passwordMatch = await bcrypt.compare(password, user.password);

            if (!passwordMatch) {
                throw new Error("Invalid password");
            }

            return user;
        } catch (error) {
            throw new Error("User not found");
        }
    }

    // Recupera usuário a partir do id
    static async getUserById(id) {
        try {
            const userDoc = await usersCollection.doc(id.toString()).get();
            if (!userDoc.exists) {
                throw new Error("User not found.");
            }
            return userDoc.data();
        } catch (error) {
            throw new Error("Failed to get user: " + error.message);
        }
    }

    // Modifica os dados do usuário
    static async updateDataUser(user, newName, newPassword) {
        try {
            const hashedPassword = await bcrypt.hash(newPassword, this.saltRounds);

            await usersCollection.doc(user.idUser.toString()).update({
                name: newName,
                password: hashedPassword
            })

            user.name = newName;
            user.password = hashedPassword;
            
            return user;
        } catch (error) {
            throw new Error("Failed to modify user data: " + error.message);
        }
    }

    // Envia um email para o usuário com token
    static async requestPasswordReset(email) {
        try {
            const userDoc = await usersCollection.where('email', '==', email).get();
    
            if (userDoc.empty) {
                throw new Error("Email not found");
            }
    
            const user = userDoc.docs[0].data();
            const token = crypto.randomBytes(4).toString('hex');
            const tokenExpiration = Date.now() + 30 * 60 * 1000;
    
            await usersCollection.doc(user.idUser.toString()).update({
                'passwordResetToken.token': token,
                'passwordResetToken.tokenExpiration': tokenExpiration
            });

            await EmailService.sendEmail(user.email, "Redefinição de senha", token);
        } catch (error) {
            throw new Error("Failed to request password reset: " + error.message);
        }
    }
    
    // Troca a senha caso usuário tenha esquecido
    static async forgotPasswordModify(email, newPassword, tokenPassword) {
        try {
            const userDoc = await usersCollection.where('email', '==', email).get();
    
            if (userDoc.empty) {
                throw new Error("Email not found");
            }
    
            const user = userDoc.docs[0].data();

            if (user.passwordResetToken.token !== tokenPassword || !user.passwordResetToken.token) {
                throw new Error("Token is invalid or missing, try again");
            }

            const currenTime = Date.now();

            if (user.passwordResetToken.tokenExpiration < currenTime) {
                await usersCollection.doc(user.idUser.toString()).update({
                    'passwordResetToken.token': null,
                    'passwordResetToken.tokenExpiration': null
                });
                throw new Error("Token has expired, please request a new one");
            }
    
            const hashedPassword = await bcrypt.hash(newPassword, this.saltRounds);
    
            await usersCollection.doc(user.idUser.toString()).update({
                password: hashedPassword,
                'passwordResetToken.token': null,
                'passwordResetToken.tokenExpiration': null
            });
    
        } catch (error) {
            throw new Error("Failed to modify password: " + error.message);
        }
    }

    // Deleta usuário do banco de dados
    static async deleteUser(user, password) {
        try {
            const userDoc = await usersCollection.where('email', '==', user.email).get();

            if (userDoc.empty) {
                throw new Error("User not found");
            }

            const userRecord = userDoc.docs[0].data();

            const passwordMatch = await bcrypt.compare(password, user.password);

            if (!passwordMatch) {
                throw new Error("Invalid password");
            }

            await usersCollection.doc(userRecord.idUser.toString()).delete();
   
        } catch (error) {
            throw new Error("Failed to delete user: " + error.message);
        }
    }

    // Pega a lista de tarefas com todas as listas de tarefas
    static async getAllTaskList(user) {
        try {
            const userDoc = await usersCollection.doc(user.idUser.toString()).get();

            if (!userDoc.exists) {
                throw new Error("User not found.");
            }

            return userDoc.data().tasksLists;
        } catch (error) {
            throw new Error("Failed to get task lists: " + error.message);
        }
    }

    // Cria uma nova lista de tarefas
    static async createTaskList(user, taskListName, taskListDescription) {
        try {
            const taskListIds = user.tasksLists.map(taskList => taskList.idTaskList);
            
            let newIdTaskList = 1;
            while (taskListIds.includes(newIdTaskList)) {
                newIdTaskList ++;
            }
            
            const newTaskList = TaskList.toPlainObject(new TaskList(
                newIdTaskList,
                taskListName,
                taskListDescription
            ));

            user.tasksLists.push(newTaskList);

            await usersCollection.doc(user.idUser.toString()).update({
                tasksLists: user.tasksLists
            });

            return newIdTaskList;
        } catch (error) {
            throw new Error("Failed to create task list: " + error.message);
        }
    }

    // Deleta lista de tarefas específica
    static async deleteTaskList(user, taskListId) {
        try {
            const taskListIndex = user.tasksLists.findIndex(taskList => taskList.idTaskList === taskListId);

            if (taskListIndex === -1) {
                throw new Error("Task list not found.");
            }

            user.tasksLists.splice(taskListIndex, 1);
            await usersCollection.doc(user.idUser.toString()).update({
                tasksLists: user.tasksLists
            });

            return user.taskList;
        } catch (error) {
            throw new Error("Failed to delete task list: " + error.message);
        }
    }
}

module.exports = UserController;