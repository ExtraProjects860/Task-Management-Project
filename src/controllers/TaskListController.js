const TaskList = require("../models/TaskList");

class TaskListController extends TaskList {

    constructor(idTaskList = null, taskListName = null, taskListDescription = null, db) {
        super(idTaskList, taskListName, taskListDescription);
        this.usersCollection = db.getConnection().collection("users");
    }

    // Modifica nome e descrição da lista de tarefas
    async updateTaskList(user) {
        try {
            const taskListIndex = user.tasksLists.findIndex(taskList => taskList.idTaskList === this.idTaskList);

            if (taskListIndex === -1) {
                throw new Error("Task list not found.");
            }

            user.tasksLists[taskListIndex].taskListName = this.taskListName;
            user.tasksLists[taskListIndex].taskListDescription = this.taskListDescription;

            await this.usersCollection.doc(user.idUser.toString()).update({
                tasksLists: user.tasksLists
            });

            return user;
        } catch (error) {
            throw new Error("Failed to modify task list: " + error.message);
        }
    }


    // Pega a lista de tarefas com todas as listas de tarefas
    async getAllTaskList(user) {
        try {
            const userDoc = await this.usersCollection.doc(user.idUser.toString()).get();
    
            if (!userDoc.exists) {
                throw new Error("User not found.");
            }
    
            return userDoc.data().tasksLists;
        } catch (error) {
            throw new Error("Failed to get task lists: " + error.message);
        }
    }
    

    // Cria uma nova lista de tarefas
    async createTaskList(user) {
        try {
            const taskListIds = user.tasksLists.map(taskList => taskList.idTaskList);
                
            let newIdTaskList = 1;
            while (taskListIds.includes(newIdTaskList)) {
                newIdTaskList ++;
            }
                
            const newTaskList = this.toPlainObject(new TaskList(
                newIdTaskList,
                this.taskListName,
                this.taskListDescription
            ));
    
            user.tasksLists.push(newTaskList);
    
            await this.usersCollection.doc(user.idUser.toString()).update({
                tasksLists: user.tasksLists
            });
    
            return user;
        } catch (error) {
            throw new Error("Failed to create task list: " + error.message);
        }
    }
    

    // Deleta lista de tarefas específica
    async deleteTaskList(user) {
        try {
            const taskListIndex = user.tasksLists.findIndex(taskList => taskList.idTaskList === this.idTaskList);
    
            if (taskListIndex === -1) {
                throw new Error("Task list not found.");
            }
    
            user.tasksLists.splice(taskListIndex, 1);

            await this.usersCollection.doc(user.idUser.toString()).update({
                tasksLists: user.tasksLists
            });
    
            return user;
        } catch (error) {
            throw new Error("Failed to delete task list: " + error.message);
        }
    }

}


module.exports = TaskListController;