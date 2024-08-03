
class TaskList {
    constructor(idTaskList, taskListName, taskListDescription) {
        this.idTaskList = idTaskList;
        this.taskListName = taskListName;
        this.taskListDescription = taskListDescription;
        this.createdAt = new Date().toISOString();
        this.task = [];
    }

    static toPlainObject(taskList) {
        return {
            idTaskList: taskList.idTaskList,
            taskListName: taskList.taskListName,
            taskListDescription: taskList.taskListDescription,
            createdAt: taskList.createdAt,
            tasks: taskList.task
        };
    }

}

module.exports = TaskList;