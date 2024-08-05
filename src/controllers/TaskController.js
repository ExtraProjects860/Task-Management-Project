const Task = require("../models/Task");

class TaskController extends Task {

    constructor(idTask = null, taskName = null, taskDescription = null, taskPriorite = null, taskStatus = null, taskInitialDate = null, taskFinalDate = null, db) {
        super(idTask, taskName, taskDescription, taskPriorite, taskStatus, taskInitialDate, taskFinalDate);
        this.usersCollection = db.getConnection().collection("users");
    }

    // Cria Tarefa
    async createTask(user, taskListId) {
        try {
            const taskListIndex = user.tasksLists.findIndex(taskList => taskList.idTaskList === taskListId);

            if (taskListIndex === -1) {
                throw new Error(`Task list with idTaskList ${taskListId} not found`);
            }

            const taskIds = user.tasksLists[taskListIndex].tasks.map(task => task.idTask);
                
            let newIdTask = 1;
            while (taskIds.includes(newIdTask)) {
                newIdTask ++;
            }
                
            const newTask = this.toPlainObject(new Task(
                newIdTask,
                this.taskName,
                this.taskDescription,
                this.taskPriorite,
                this.taskStatus,
                this.taskInitialDate,
                this.taskFinalDate
            ));
    
            user.tasksLists[taskListIndex].tasks.push(newTask);
        
            await this.usersCollection.doc(user.idUser.toString()).update({
                tasksLists: user.tasksLists
            });

            return { updatedUser: user, updatedTasks: user.tasksLists[taskListIndex].tasks };
        } catch (error) {
            throw new Error("Failed to create task: " + error.message);
        }
    }
    

    // Modifica tarefa específica
    async updateTask(user, taskListId) {
        try {
            const taskListIndex = user.tasksLists.findIndex(taskList => taskList.idTaskList === taskListId);

            if (taskListIndex === -1) {
                throw new Error("Task list not found.");
            }

            const taskIndex = user.tasksLists[taskListIndex].tasks.findIndex(task => task.idTask === this.idTask);

            if (taskIndex === -1) {
                throw new Error("Task not found.");
            }

            const task = user.tasksLists[taskListIndex].tasks[taskIndex];
            task.taskName = this.taskName;
            task.taskDescription = this.taskDescription;
            task.taskPriorite = this.taskPriorite;
            task.taskStatus = this.taskStatus;
            task.taskInitialDate = this.taskInitialDate;
            task.taskFinalDate = this.taskFinalDate;

            await this.usersCollection.doc(user.idUser.toString()).update({
                tasksLists: user.tasksLists
            });

            return { updatedUser: user, updatedTasks: user.tasksLists[taskListIndex].tasks };
        } catch (error) {
            throw new Error("Failed to update: " + error.message);
        }
    }


    async deleteTask(user, taskListId) {
        try {
            const taskListIndex = user.tasksLists.findIndex(taskList => taskList.idTaskList === taskListId);

            if (taskListIndex === -1) {
                throw new Error("Task list not found.");
            }

            const taskIndex = user.tasksLists[taskListIndex].tasks.findIndex(task => task.idTask === this.idTask);

            if (taskIndex === -1) {
                throw new Error("Task not found.");
            }

            user.tasksLists[taskListIndex].tasks.splice(taskIndex, 1);

            await this.usersCollection.doc(user.idUser.toString()).update({
                tasksLists: user.tasksLists
            });

            return { updatedUser: user, updatedTasks: user.tasksLists[taskListIndex].tasks };
        } catch (error) {
            throw new Error("Failed to delete: " + error.message);
        }
    }


    // Pega todas as tarefas
    async getAllTask(user, taskListId) {
        try {
            const userDoc = await this.usersCollection.doc(user.idUser.toString()).get();

            if (!userDoc.exists) {
                throw new Error("User not found.");
            }

            const tasksLists = userDoc.data().tasksLists;

            const taskList = tasksLists.find(list => list.idTaskList === taskListId);

            if (!taskList) {
                throw new Error("Task list not found.");
            }

            return taskList.tasks;
        } catch (error) {
            throw new Error("Failed to get task: " + error.message);
        }
    }
    
}


module.exports = TaskController;