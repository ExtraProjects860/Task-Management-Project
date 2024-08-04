
class TaskList {
    constructor(idTaskList, taskListName, taskListDescription) {
        this.__idTaskList = idTaskList;
        this.__createdAt = new Date().toISOString();
        this.__taskListName = taskListName;
        this.__taskListDescription = taskListDescription;
        this.__task = [];
    }

    get idTaskList() {
        return this.__idTaskList;
    }

    get taskListName() {
        return this.__taskListName;
    }

    get taskListDescription() {
        return this.__taskListDescription;
    }

    get createdAt() {
        return this.__createdAt;
    }

    get task() {
        return this.__task;
    }

    toPlainObject(taskList) {
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