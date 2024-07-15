
class TaskList {
    constructor(id_task_list, task_list_name, task_list_description) {
        this.id_task_list = id_task_list;
        this.task_list_name = task_list_name;
        this.task_list_description = task_list_description;
        this.task = [];
    }

    static toPlainObject(taskList) {
        return {
            id_task_list: taskList.id_task_list,
            task_list_name: taskList.task_list_name,
            task_list_description: taskList.task_list_description,
            tasks: taskList.task
        };
    }

}

module.exports = TaskList;