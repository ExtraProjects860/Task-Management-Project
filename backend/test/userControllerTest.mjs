import * as chai from 'chai';
import chaiAsPromised from 'chai-as-promised';
import FireBase from "../config/Firebase.js";
import UserController from "../controllers/User_Controller.js";
import User from "../models/User.js";

chai.use(chaiAsPromised);
const expect = chai.expect;
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
        const user1 = await User.create(email1, name1, password1);
        const createdUser1 = await UserController.createUser(user1.email, user1.name, user1.password);
        expect(createdUser1).to.have.property('id');

        const taskListId1 = await UserController.createTaskList(createdUser1, 'Task List 1 for User 1', 'Description for Task List 1 for User 1');
        const userDoc = await usersCollection.doc(createdUser1.id.toString()).get();
        const taskLists = userDoc.data().tasks_lists;
        expect(taskLists).to.have.lengthOf(1);
    });

    it('should create a second user and add multiple task lists', async () => {
        const email2 = generateUniqueEmail('user2');
        const name2 = 'User Two';
        const password2 = 'password123';
        const user2 = await User.create(email2, name2, password2);
        const createdUser2 = await UserController.createUser(user2.email, user2.name, user2.password);
        expect(createdUser2).to.have.property('id');

        const taskListId1 = await UserController.createTaskList(createdUser2, 'Task List 1 for User 2', 'Description for Task List 1 for User 2');
        const taskListId2 = await UserController.createTaskList(createdUser2, 'Task List 2 for User 2', 'Description for Task List 2 for User 2');
        const userDoc = await usersCollection.doc(createdUser2.id.toString()).get();
        const taskLists = userDoc.data().tasks_lists;
        expect(taskLists).to.have.lengthOf(2);
    });

    it('should retrieve all task lists for a user', async () => {
        const email2 = generateUniqueEmail('user2');
        const name2 = 'User Two';
        const password2 = 'password123';
        const user2 = await User.create(email2, name2, password2);
        const createdUser2 = await UserController.createUser(user2.email, user2.name, user2.password);
        expect(createdUser2).to.have.property('id');

        await UserController.createTaskList(createdUser2, 'Task List 1 for User 2', 'Description for Task List 1 for User 2');
        await UserController.createTaskList(createdUser2, 'Task List 2 for User 2', 'Description for Task List 2 for User 2');

        const allTaskLists = await UserController.getAllTaskList(createdUser2);
        expect(allTaskLists).to.have.lengthOf(2);
    });

    it('should delete a task list from a user', async () => {
        const email2 = generateUniqueEmail('user2');
        const name2 = 'User Two';
        const password2 = 'password123';
        const user2 = await User.create(email2, name2, password2);
        const createdUser2 = await UserController.createUser(user2.email, user2.name, user2.password);
        expect(createdUser2).to.have.property('id');

        const taskListId1 = await UserController.createTaskList(createdUser2, 'Task List 1 for User 2', 'Description for Task List 1 for User 2');
        await UserController.createTaskList(createdUser2, 'Task List 2 for User 2', 'Description for Task List 2 for User 2');

        await UserController.deleteTaskList(createdUser2, taskListId1);
        const userDoc = await usersCollection.doc(createdUser2.id.toString()).get();
        const taskLists = userDoc.data().tasks_lists;
        expect(taskLists).to.have.lengthOf(1);
    });

    it('should delete a user', async () => {
        const email2 = generateUniqueEmail('user2');
        const name2 = 'User Two';
        const password2 = 'password123';
        const user2 = await User.create(email2, name2, password2);
        const createdUser2 = await UserController.createUser(user2.email, user2.name, user2.password);
        expect(createdUser2).to.have.property('id');

        await UserController.deleteUser(createdUser2, password2);
        const userDoc = await usersCollection.doc(createdUser2.id.toString()).get();
        expect(userDoc.exists).to.be.false;
    });

    it('should create a session for a user', async () => {
        const email = "session-user-1721330968230@example.com";
        const name = 'Session User';
        const password = 'password123';
        const user = await User.create(email, name, password);
        const createdUser = await UserController.createUser(user.email, user.name, user.password);
        expect(createdUser).to.have.property('id');
    
        // Supondo que createSession retorna um token ou algo similar
        const retrievedUser = await UserController.createSessionUser(user.email, password);
        expect(retrievedUser).to.have.property('email', email);
        expect(retrievedUser).to.have.property('name', name);
    });

    it('should retrieve a user by email', async () => {
        const email = "session-user-1721330968230@example.com";
        const name = 'Session User';
    
        // Supondo que getUser retorna o usuário completo
        const retrievedUser = await UserController.getUser(email, name);
        expect(retrievedUser).to.have.property('email', email);
        expect(retrievedUser).to.have.property('name', name);
    });
    
});