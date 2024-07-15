const assert = require('assert');
const FireBase = require("../config/Firebase");
const usersCollection = FireBase.getConnection().collection("users");
const UserController = require("../controllers/User_Controller");
const User = require("../models/User");

(async () => {
    try {
        // Criar o primeiro usuário
        const user1 = await User.create('user1@example.com', 'User One', 'password123');
        const user1Id = await UserController.createUser(user1.email, user1.name, user1.password);
        console.log('Created User 1 ID:', user1Id);
        
        // Adicionar uma lista de tarefas para o primeiro usuário
        const user1TaskListId = await UserController.createTaskList(user1, 'Task List 1 for User 1', 'Description for Task List 1 for User 1');
        console.log('Task list created for User 1 successfully');
        
        // Modificar dados do primeiro usuário
        // await UserController.modifyDataUser(user1, 'newuser1@example.com', 'User One Modified', 'newpassword123');
        // const modifiedUser1Doc = await usersCollection.doc(user1Id.toString()).get();
        // assert.equal(modifiedUser1Doc.data().email, 'newuser1@example.com');
        // assert.equal(modifiedUser1Doc.data().name, 'User One Modified');
        // assert.equal(modifiedUser1Doc.data().password, 'newpassword123');
        // console.log('User 1 data modified successfully');

        // Criar o segundo usuário
        const user2 = await User.create('user2@example.com', 'User Two', 'password123');
        const user2Id = await UserController.createUser(user2.email, user2.name, user2.password);
        console.log('Created User 2 ID:', user2Id);
        
        // Adicionar duas listas de tarefas ao segundo usuário
        const taskListId1 = await UserController.createTaskList(user2, 'Task List 1 for User 2', 'Description for Task List 1 for User 2');
        const taskListId2 = await UserController.createTaskList(user2, 'Task List 2 for User 2', 'Description for Task List 2 for User 2');
        const user2DocWithTaskLists = await usersCollection.doc(user2Id.toString()).get();
        const taskListsUser2 = user2DocWithTaskLists.data().tasks_lists;
        console.log('Task lists for User 2:');
        taskListsUser2.forEach(taskList => {
            console.log(`ID: ${taskList.id_task_list}, Name: ${taskList.task_list_name}, Description: ${taskList.task_list_description}`);
        });
        
        // Recuperar todas as listas de tarefas do segundo usuário
        const allTaskListsUser2 = await UserController.getAllTaskList(user2);
        assert.equal(allTaskListsUser2.length, user2.tasks_lists.length);
        console.log('Retrieved all task lists for User 2 successfully');
        
        // Excluir uma das listas de tarefas do segundo usuário
        await UserController.deleteTaskList(user2, taskListId1);
        const user2DocAfterDeletion = await usersCollection.doc(user2Id.toString()).get();
        const taskListsAfterDeletion = user2DocAfterDeletion.data().tasks_lists;
        assert(!taskListsAfterDeletion.some(taskList => taskList.id_task_list === taskListId1));
        console.log('Task list deleted for User 2 successfully');
        
        // Excluir o segundo usuário
        // await UserController.deleteUser(user2);
        // const deletedUser2Doc = await usersCollection.doc(user2Id.toString()).get();
        // assert(!deletedUser2Doc.exists);
        // console.log('User 2 deleted successfully');
        
    } catch (error) {
        console.error("Error during testing:", error.message);
    } finally {
        // Opcionalmente, feche a conexão com o Firebase, se necessário
        FireBase.getConnection().terminate();
    }
})();
