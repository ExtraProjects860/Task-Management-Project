
class Task {
    constructor(idTask, taskName, taskDescription, taskPriorite, taskStatus, taskInitialDate, taskFinalDate) {
        this.idTask = idTask;
        this.taskName = taskName;
        this.taskDescription = taskDescription;
        this.taskPriorite = taskPriorite,
        this.taskStatus = taskStatus;
        this.taskInitialDate = taskInitialDate;
        this.taskFinalDate = taskFinalDate;
    }

    static toPlainObject(task) {
        return {
            idTask: task.idTask,
            taskName: task.taskName,
            taskDescription: task.taskDescription,
            taskPriorite: task.taskPriorite,
            taskStatus: task.taskStatus,
            taskInitialDate: task.taskInitialDate,
            taskFinalDate: task.taskFinalDate,
        }
    }

}

module.exports = Task