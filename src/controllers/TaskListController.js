const TaskList = require("../models/TaskList");

class TaskListController extends TaskList {

    constructor(idTaskList = null, taskListName = null, taskListDescription = null, db = null) {
        super(idTaskList, taskListName, taskListDescription);
        this.usersCollection = db.getConnection().collection("users");
    }

    // Gera id sequencial e único para cada tarefa 
    generateIdTaskList(allTaskList) {
        try {
            const taskListIds = allTaskList.map(taskList => taskList.idTaskList);
                
            let newIdTaskList = 1;
            while (taskListIds.includes(newIdTaskList)) {
                newIdTaskList ++;
            }

            return newIdTaskList;
        } catch (error) {
            throw new Error("Failed to generate ID: " + error.message);
        }
    }


    // Cria uma nova lista de tarefas
    async createTaskList(idUser) {
        try {
            const allTaskList = await this.getAllTaskList(idUser);

            const newIdTaskList = this.generateIdTaskList(allTaskList);
                
            const newTaskList = this.toPlainObject(new TaskList(
                newIdTaskList,
                this.taskListName,
                this.taskListDescription
            ));
    
            allTaskList.push(newTaskList);
    
            await this.usersCollection.doc(idUser.toString()).update({
                tasksLists: allTaskList
            });
    
            return allTaskList;
        } catch (error) {
            throw new Error("Failed to create task list: " + error.message);
        }
    }


    // Modifica nome e descrição da lista de tarefas
    async updateTaskList(idUser) {
        try {
            const allTaskList = await this.getAllTaskList(idUser);

            const taskListIndex = allTaskList.findIndex(taskList => taskList.idTaskList === this.idTaskList);

            if (taskListIndex === -1) {
                throw new Error("Task list not found.");
            }

            allTaskList[taskListIndex].taskListName = this.taskListName;
            allTaskList[taskListIndex].taskListDescription = this.taskListDescription;

            await this.usersCollection.doc(idUser.toString()).update({
                tasksLists: allTaskList
            });

            return allTaskList;
        } catch (error) {
            throw new Error("Failed to modify task list: " + error.message);
        }
    }


    // Deleta lista de tarefas específica
    async deleteTaskList(idUser) {
        try {
            const allTaskList = await this.getAllTaskList(idUser);

            const taskListIndex = allTaskList.findIndex(taskList => taskList.idTaskList === this.idTaskList);
    
            if (taskListIndex === -1) {
                throw new Error("Task list not found.");
            }
    
            allTaskList.splice(taskListIndex, 1);

            await this.usersCollection.doc(idUser.toString()).update({
                tasksLists: allTaskList
            });
    
            return allTaskList;
        } catch (error) {
            throw new Error("Failed to delete task list: " + error.message);
        }
    }


    // Pega a lista de tarefas com todas as listas de tarefas
    async getAllTaskList(idUser) {
        try {
            const userDoc = await this.usersCollection.doc(idUser.toString()).get();
    
            if (!userDoc.exists) {
                throw new Error("User not found.");
            }
    
            return userDoc.data().tasksLists;
        } catch (error) {
            throw new Error("Failed to get task lists: " + error.message);
        }
    }


}


module.exports = TaskListController;