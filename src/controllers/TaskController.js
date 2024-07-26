const FireBase = require("../config/Firebase");
const usersCollection = FireBase.getConnection().collection("users");
const Task = require("../models/Task");

class TaskController {


    // Cria Tarefa
    static async createTask(user, taskListId, taskData) {
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
                
            const newTask = Task.toPlainObject(new Task(
                newIdTask,
                taskData.taskName,
                taskData.taskDescription,
                taskData.taskPriorite,
                taskData.taskStatus,
                taskData.taskInitialDate,
                taskData.taskFinalDate
            ));
    
            user.tasksLists[taskListIndex].tasks.push(newTask);
        
            await usersCollection.doc(user.idUser.toString()).update({
                tasksLists: user.tasksLists
            });

            return user;
        } catch (error) {
            throw new Error("Failed to create task: " + error.message);
        }
    }
    

    // Modifica tarefa específica
    static async updateTask(user, taskListId, taskId, newTaskData) {
        try {
            const taskListIndex = user.tasksLists.findIndex(taskList => taskList.idTaskList === taskListId);

            if (taskListIndex === -1) {
                throw new Error("Task list not found.");
            }

            const taskIndex = user.tasksLists[taskListIndex].tasks.findIndex(task => task.idTask === taskId);

            if (taskIndex === -1) {
                throw new Error("Task not found.");
            }

            const task = user.tasksLists[taskListIndex].tasks[taskIndex];
            task.taskName = newTaskData.taskName;
            task.taskDescription = newTaskData.taskDescription;
            task.taskPriorite = newTaskData.taskPriorite;
            task.taskStatus = newTaskData.taskStatus;
            task.taskInitialDate = newTaskData.taskInitialDate;
            task.taskFinalDate = newTaskData.taskFinalDate;

            await usersCollection.doc(user.idUser.toString()).update({
                tasksLists: user.tasksLists
            });

            return user;
        } catch (error) {
            throw new Error("Failed to update: " + error.message);
        }
    }


    static async deleteTask(user, taskListId, taskId) {
        try {
            const taskListIndex = user.tasksLists.findIndex(taskList => taskList.idTaskList === taskListId);

            if (taskListIndex === -1) {
                throw new Error("Task list not found.");
            }

            const taskIndex = user.tasksLists[taskListIndex].tasks.findIndex(task => task.idTask === taskId);

            if (taskIndex === -1) {
                throw new Error("Task not found.");
            }

            user.tasksLists[taskListIndex].tasks.splice(taskIndex, 1);

            await usersCollection.doc(user.idUser.toString()).update({
                tasksLists: user.tasksLists
            });

            return user;
        } catch (error) {
            throw new Error("Failed to delete: " + error.message);
        }
    }


    // Pega todas as tarefas
    static async getAllTask(user, taskListId) {
        try {
            const userDoc = await usersCollection.doc(user.idUser.toString()).get();

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