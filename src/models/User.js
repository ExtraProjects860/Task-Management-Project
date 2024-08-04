
// Classe abstrata que é apenas herdada pela UserController
class User {
    constructor(idUser, email, name, password) {
        /**
         * Creates a new User instance with the given parameters.
         *
         * @param {number} idUser - The unique identifier for the user.
         * @param {string} email - The email address of the user.
         * @param {string} name - The name of the user.
         * @param {string} password - The password of the user.
         */
        this.__idUser = idUser;
        this.__email = email;
        this.__name = name;
        this.__password = password;
        this.__passwordResetToken = {
            token: null,
            tokenExpiration: null
        };
        this.__createdAt = new Date().toISOString();
        this.__tasksLists = [];
    }

    get idUser() {
        return this.__idUser;
    }

    get email() {
        return this.__email;
    }

    get name() {
        return this.__name;
    }

    set name(name) {
        this.__name = name;
    }

    get password() {
        return this.__password;
    }

    set password(password) {
        this.__password = password;
    }

    get passwordResetToken() {
        return this.__passwordResetToken;
    }

    get createdAt() {
        return this.__createdAt;
    }

    get tasksLists() {
        return this.__tasksLists;
    }

    // Método utilizado apenas para converter objeto em objeto simples (Firebase não aceita objetos complexos)
    toPlainObject(idUser, email, name, password) {
        /**
         * Converts the User object to a plain object with the specified properties.
         *
         * @param {number} idUser - The unique identifier for the user.
         * @param {string} email - The email address of the user.
         * @param {string} name - The name of the user.
         * @param {string} password - The password of the user.
         * @return {Object} A plain object with the specified properties.
         */
        return {
            idUser: idUser,
            email: email,
            name: name,
            password: password,
            passwordResetToken: this.passwordResetToken,
            createdAt: this.createdAt,
            tasksLists: this.tasksLists
        }
    }

}

module.exports = User;
