const Task = require("../models/Task");

class TaskController extends Task {

    constructor(idTask = null, taskName = null, taskDescription = null, taskPriorite = null, taskStatus = null, taskInitialDate = null, taskFinalDate = null, db =null) {
        super(idTask, taskName, taskDescription, taskPriorite, taskStatus, taskInitialDate, taskFinalDate);
        this.usersCollection = db.getConnection().collection("users");
    }


    // Gera id sequencial e específico para cada tarefa
    async generateIdTask(idUser, taskListId, taskListController) {
        try {
            const allTaskList = await taskListController.getAllTaskList(idUser);

            const taskListIndex = allTaskList.findIndex(taskList => taskList.idTaskList === taskListId);

            if (taskListIndex === -1) {
                throw new Error(`Task list with idTaskList ${taskListId} not found`);
            }

            const taskIds = allTaskList[taskListIndex].tasks.map(task => task.idTask);
                
            let newIdTask = 1;
            while (taskIds.includes(newIdTask)) {
                newIdTask ++;
            }

            return { newIdTask: newIdTask, taskListIndex: taskListIndex, allTaskList: allTaskList };
        } catch (error) {
            throw new Error("Failed to generate ID: " + error.message);
        }
    }

    // Cria Tarefa
    async createTask(idUser, taskListId, taskController) {
        try {
            const data = await this.generateIdTask(idUser, taskListId, taskController);
                
            const newTask = this.toPlainObject(new Task(
                data.newIdTask,
                this.taskName,
                this.taskDescription,
                this.taskPriorite,
                this.taskStatus,
                this.taskInitialDate,
                this.taskFinalDate
            ));

            console.log(newTask);
    
            data.allTaskList[data.taskListIndex].tasks.push(newTask);
        
            await this.usersCollection.doc(idUser.toString()).update({
                tasksLists: data.allTaskList
            });

            return data.allTaskList[data.taskListIndex].tasks;
        } catch (error) {
            throw new Error("Failed to create task: " + error.message);
        }
    }
    

    // Modifica tarefa específica
    async updateTask(idUser, taskListId, taskListController) {
        try {
            const allTaskList = await taskListController.getAllTaskList(idUser);

            const taskListIndex = allTaskList.findIndex(taskList => taskList.idTaskList === taskListId);

            if (taskListIndex === -1) {
                throw new Error("Task list not found.");
            }

            const taskIndex = allTaskList[taskListIndex].tasks.findIndex(task => task.idTask === this.idTask);

            if (taskIndex === -1) {
                throw new Error("Task not found.");
            }

            const task = allTaskList[taskListIndex].tasks[taskIndex];
            task.taskName = this.taskName;
            task.taskDescription = this.taskDescription;
            task.taskPriorite = this.taskPriorite;
            task.taskStatus = this.taskStatus;
            task.taskInitialDate = this.taskInitialDate;
            task.taskFinalDate = this.taskFinalDate;

            await this.usersCollection.doc(idUser.toString()).update({
                tasksLists: allTaskList
            });

            return allTaskList[taskListIndex].tasks ;
        } catch (error) {
            throw new Error("Failed to update: " + error.message);
        }
    }


    async deleteTask(idUser, taskListId, taskListController) {
        try {
            const allTaskList = await taskListController.getAllTaskList(idUser);

            const taskListIndex = allTaskList.findIndex(taskList => taskList.idTaskList === taskListId);

            if (taskListIndex === -1) {
                throw new Error("Task list not found.");
            }

            const taskIndex = allTaskList[taskListIndex].tasks.findIndex(task => task.idTask === this.idTask);

            if (taskIndex === -1) {
                throw new Error("Task not found.");
            }

            allTaskList[taskListIndex].tasks.splice(taskIndex, 1);

            await this.usersCollection.doc(idUser.toString()).update({
                tasksLists: allTaskList
            });

            return allTaskList[taskListIndex].tasks;
        } catch (error) {
            throw new Error("Failed to delete: " + error.message);
        }
    }


    // Pega todas as tarefas
    async getAllTask(idUser, taskListId, taskListController) {
        try {
            const tasksLists = await taskListController.getAllTaskList(idUser);

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