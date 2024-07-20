const FireBase = require("../config/Firebase");
const usersCollection = FireBase.getConnection().collection("users");

class User {
    constructor(idUser, email, name, password) {
        this.idUser = idUser;
        this.email = email;
        this.name = name;
        this.password = password;
        this.passwordResetToken = null; // não mexer ainda, pois precisa ser planejado
        this.createdAt = new Date().toISOString();
        this.tasksLists = [];
    }

    static async generateId() {
        try {
            const snapshot = await usersCollection.get();
            const userIds = snapshot.docs.map(doc => parseInt(doc.id, 10));

            let newId = 1;
            while (userIds.includes(newId)) {
                newId++;
            }

            return newId;
        } catch (error) {
            throw new Error("Failed to generate ID: " + error.message);
        }
    }

    static toPlainObject(user) {
        return {
            idUser: user.idUser,
            email: user.email,
            name: user.name,
            password: user.password,
            passwordResetToken: user.passwordResetToken,
            createdAt: user.createdAt,
            tasksLists: user.tasksLists
        }
    }

}

module.exports = User;
