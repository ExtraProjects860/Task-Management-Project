const FireBase = require("../config/Firebase");
const usersCollection = FireBase.getConnection().collection("users");
const TaskList = require("../models/TaskList");

class TaskListControler {


    // Modifica nome e descrição da lista de tarefas
    static async updateTaskList(user, taskListId, newTaskListName, newTaskListDescription) {
        try {
            const taskListIndex = user.tasksLists.findIndex(taskList => taskList.idTaskList === taskListId);

            if (taskListIndex === -1) {
                throw new Error("Task list not found.");
            }

            user.tasksLists[taskListIndex].taskListName = newTaskListName;
            user.tasksLists[taskListIndex].taskListDescription = newTaskListDescription;

            await usersCollection.doc(user.idUser.toString()).update({
                tasksLists: user.tasksLists
            });

            return user;
        } catch (error) {
            throw new Error("Failed to modify task list: " + error.message);
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
    
            return user;
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
    
            return user;
        } catch (error) {
            throw new Error("Failed to delete task list: " + error.message);
        }
    }

}


module.exports = TaskListControler;