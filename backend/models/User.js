const FireBase = require("../config/Firebase");
const usersCollection = FireBase.getConnection().collection("users");

class User {
    constructor(email, name, password) {
        this.id = null;
        this.email = email;
        this.name = name;
        this.password = password;
        this.session_token = null;
        this.password_reset_token = null; // não mexer ainda, pois precisa ser planejado
        this.created_at = new Date().toISOString();
        this.tasks_lists = [];
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

    async initialize() {
        this.id = await User.generateId();
    }

    static async create(email, name, password) {
        const user = new User(email, name, password);
        await user.initialize();
        return user;
    }
}

module.exports = User;
