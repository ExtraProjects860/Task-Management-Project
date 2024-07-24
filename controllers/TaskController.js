const FireBase = require("../config/Firebase");
const usersCollection = FireBase.getConnection().collection("users");

class TaskController {


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
    

    // Modifica tarefa específica
    static async updateTask() {
        try {
            // precisará do id da lista de tarefas, irá ter de acessar a lista e procurar pelos dados que já existem

            // no caso aqui é a manipulação dos dados das tarefas

            // precisará trocar os dados e dar um update no doc do firebase
        } catch (error) {
            throw new Error();
        }
    }


    static async deleteTaskList() {
        try {
            
        } catch (error) {
            throw new Error();
        }
    }


    // Pega todas as tarefas
    static async getAllTask() {
        try {
            // Terá que acessar o dentro do usuário o seu id, após isso acessar a tasks_lists
    
            // Isso é uma forma de retornar todos os documentos const userDoc = await usersCollection.doc(user.id.toString()).get();
        } catch (error) {
                throw new Error();
        }
    }
    
}


module.exports = TaskController;