
class Task {
    constructor(id_task, task_name, task_description, task_priorite, task_status, task_initialDate, task_finalDate) {
        this.id_task = id_task;
        this.task_name = task_name;
        this.task_description = task_description;
        this.task_priorite = task_priorite;
        this.task_status = task_status;
        this.task_initialDate = task_initialDate;
        this.task_finalDate = task_finalDate;
    }

    static toPlainObject(task) {
        return {
            id_task: task.id_task,
            task_name: task.task_name,
            task_description: task.task_description,
            task_priorite: task.task_priorite,
            task_status: task.task_status,
            task_initialDate: task.task_initialDate,
            task_finalDate: task.task_finalDate,
        }
    }

}

module.exports = Task