
class TaskList {
    constructor(idTaskList, taskListName, taskListDescription) {
        this.idTaskList = idTaskList
        this.taskListName = taskListName;
        this.taskListDescription = taskListDescription
        this.task = [];
    }

    static toPlainObject(taskList) {
        return {
            idTaskList: taskList.idTaskList,
            taskListName: taskList.taskListName,
            taskListDescription: taskList.taskListDescription,
            tasks: taskList.task
        };
    }

}

module.exports = TaskList;