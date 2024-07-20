const FireBase = require("../config/Firebase");
const usersCollection = FireBase.getConnection().collection("users");

class TaskController {
    
    // Modifica tarefa específica
    static async modifyTask() {
        try {
            // precisará do id da lista de tarefas, irá ter de acessar a lista e procurar pelos dados que já existem

            // no caso aqui é a manipulação dos dados das tarefas

            // precisará trocar os dados e dar um update no doc do firebase
        } catch (error) {
            throw new Error()
        }
    }
}

module.exports = TaskController;