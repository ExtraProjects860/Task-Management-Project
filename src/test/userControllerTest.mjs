import * as chai from 'chai';
import chaiAsPromised from 'chai-as-promised';
import FireBase from "../config/Firebase.js";
import UserController from "../controllers/UserController.js";

chai.use(chaiAsPromised);
const { expect } = chai;
const usersCollection = FireBase.getConnection().collection("users");

describe('UserController Tests', function() {
    this.timeout(10000); // Aumente o tempo limite se necessário

    before(async () => {
        // Limpar a coleção de usuários antes de iniciar os testes
        const snapshot = await usersCollection.get();
        const deletePromises = snapshot.docs.map(doc => doc.ref.delete());
        await Promise.all(deletePromises);
    });

    function generateUniqueEmail(base) {
        return `${base}-${Date.now()}@example.com`;
    }

    it('should create a user and add a task list', async () => {
        const email1 = generateUniqueEmail('user1');
        const name1 = 'User One';
        const password1 = 'password123';
        const user1 = await UserController.createUser(email1, name1, password1);
        expect(user1).to.have.property('idUser');

        await UserController.createTaskList(user1, 'Task List 1 for User 1', 'Description for Task List 1 for User 1');
        const userDoc = await usersCollection.doc(user1.idUser.toString()).get();
        const taskLists = userDoc.data().tasksLists;
        expect(taskLists).to.have.lengthOf(1);
    });

    it('should create a second user and add multiple task lists', async () => {
        const email2 = generateUniqueEmail('user2');
        const name2 = 'User Two';
        const password2 = 'password123';
        const user2 = await UserController.createUser(email2, name2, password2);
        expect(user2).to.have.property('idUser');

        await UserController.createTaskList(user2, 'Task List 1 for User 2', 'Description for Task List 1 for User 2');
        await UserController.createTaskList(user2, 'Task List 2 for User 2', 'Description for Task List 2 for User 2');
        const userDoc = await usersCollection.doc(user2.idUser.toString()).get();
        const taskLists = userDoc.data().tasksLists;
        expect(taskLists).to.have.lengthOf(2);
    });

    it('should retrieve all task lists for a user', async () => {
        const email3 = generateUniqueEmail('user3');
        const name3 = 'User Three';
        const password3 = 'password123';
        const user3 = await UserController.createUser(email3, name3, password3);
        expect(user3).to.have.property('idUser');

        await UserController.createTaskList(user3, 'Task List 1 for User 3', 'Description for Task List 1 for User 3');
        await UserController.createTaskList(user3, 'Task List 2 for User 3', 'Description for Task List 2 for User 3');

        const allTaskLists = await UserController.getAllTaskList(user3);
        expect(allTaskLists).to.have.lengthOf(2);
    });

    it('should delete a task list from a user', async () => {
        const email4 = generateUniqueEmail('user4');
        const name4 = 'User Four';
        const password4 = 'password123';
        const user4 = await UserController.createUser(email4, name4, password4);
        expect(user4).to.have.property('idUser');

        const taskListId1 = await UserController.createTaskList(user4, 'Task List 1 for User 4', 'Description for Task List 1 for User 4');
        await UserController.createTaskList(user4, 'Task List 2 for User 4', 'Description for Task List 2 for User 4');

        await UserController.deleteTaskList(user4, taskListId1);
        const userDoc = await usersCollection.doc(user4.idUser.toString()).get();
        const taskLists = userDoc.data().tasksLists;
        expect(taskLists).to.have.lengthOf(1);
    });

    it('should delete a user', async () => {
        const email5 = generateUniqueEmail('user5');
        const name5 = 'User Five';
        const password5 = 'password123';
        const user5 = await UserController.createUser(email5, name5, password5);
        expect(user5).to.have.property('idUser');

        await UserController.deleteUser(user5, password5);
        const userDoc = await usersCollection.doc(user5.idUser.toString()).get();
        expect(userDoc.exists).to.be.false;
    });

    // Adicionando um teste para verificar a atualização de dados de usuário
    it('should update user data', async () => {
        const email6 = generateUniqueEmail('user6');
        const name6 = 'User Six';
        const password6 = 'password123';
        const user6 = await UserController.createUser(email6, name6, password6);
        expect(user6).to.have.property('idUser');

        const newName = 'User Six Updated';
        const newPassword = 'newpassword123';
        const updatedUser = await UserController.updateDataUser(user6, newName, newPassword);
        
        const userDoc = await usersCollection.doc(user6.idUser.toString()).get();
        const updatedData = userDoc.data();
        expect(updatedData.name).to.equal(newName);
        expect(updatedUser.name).to.equal(newName);
    });

    it('should retrieve a user by email', async () => {
        const email7 = generateUniqueEmail('retrieve-user');
        const name7 = 'Retrieve User';
        const password7 = 'password123';
        const user7 = await UserController.createUser(email7, name7, password7);
        expect(user7).to.have.property('idUser');

        const retrievedUser = await UserController.getUser(email7, password7);
        expect(retrievedUser).to.have.property('email', email7);
        expect(retrievedUser).to.have.property('name', name7);
    });
    
});
