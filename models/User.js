const TaskList = require("./Task_List");
const Task = require("./Task");

class User {
    constructor(id, email, name, password) {
        this.id = id;
        this.email = email;
        this.name = name;
        this.password = password;
        this.tasks_lists = [];
    }

}

module.exports = User;
