const FireBase = require("../config/Firebase");
const usersCollection = FireBase.getConnection().collection("users");

class TaskListControler {

    // Pega todas as tarefas
    static async getAllTask() {
        try {
            // Terá que acessar o dentro do usuário o seu id, após isso acessar a tasks_lists

            // Isso é uma forma de retornar todos os documentos const userDoc = await usersCollection.doc(user.id.toString()).get();
        } catch (error) {
            throw new Error()
        }
    }

    // Cria Tarefa
    static async createTask(user, taskData) {
        try {
            // terá que verificar o id disponível e criar um único e sequencial

            // depois disso terá que acessar dentro de tasks_lists a task_list correspondente

            // terá de criar a task instanciando o objeto Task e converter para objeto simples

            // terá que dar um update no doc do firebase
        } catch (error) {
            throw new Error("Failed to create task: " + error.message);
        }
    }

    // Modifica nome e descrição da lista de tarefas
    static async modifyTaskList() {
        try {
            // precisará do id da lista de tarefas, irá ter de acessar a lista e procurar pelos dados que já existem

            // precisará trocar os dados e dar um update no doc do firebase
        } catch (error) {
            throw new Error()
        }
    }
    
    // Deleta tarefa específica
    static async deleteTask() {
        try {
            // aqui terá que pegar o index do array da tarefa em específico, retirar o item do array

            // precisará trocar os dados e dar um update no doc do firebase
        } catch (error) {
            throw new Error()
        }
    }

}

module.exports = TaskListControler;