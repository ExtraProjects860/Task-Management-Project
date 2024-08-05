
class Task {
    constructor(idTask, taskName, taskDescription, taskPriorite, taskStatus, taskInitialDate, taskFinalDate) {
        this.__idTask = idTask;
        this.__createdAt = new Date().toISOString();
        this.__taskName = taskName;
        this.__taskDescription = taskDescription;
        this.__taskPriorite = taskPriorite,
        this.__taskStatus = taskStatus;
        this.__taskInitialDate = taskInitialDate;
        this.__taskFinalDate = taskFinalDate;
    }

    get idTask() {
        return this.__idTask;
    }

    get createdAt() {
        return this.__createdAt;
    }

    get taskName() {
        return this.__taskName;
    }

    get taskDescription() {
        return this.__taskDescription;
    }

    get taskPriorite() {
        return this.__taskPriorite;
    }

    get taskStatus() {
        return this.__taskStatus;
    }

    get taskInitialDate() {
        return this.__taskInitialDate;
    } 

    get taskFinalDate() {
        return this.__taskFinalDate;
    }   

    toPlainObject(task) {
        return {
            idTask: task.idTask,
            createdAt: task.createdAt,
            taskName: task.taskName,
            taskDescription: task.taskDescription,
            taskPriorite: task.taskPriorite,
            taskStatus: task.taskStatus,
            taskInitialDate: task.taskInitialDate,
            taskFinalDate: task.taskFinalDate,
        }
    }

}

module.exports = Task;