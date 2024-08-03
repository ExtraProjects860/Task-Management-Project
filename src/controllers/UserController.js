const bcrypt = require("bcrypt");
const crypto = require("crypto");
const FireBase = require("../config/Firebase");
const User = require("../models/User");
const Validators = require("./Validators/Validators");
const EmailService = require('../util/EmailService');
const usersCollection = FireBase.getConnection().collection("users");

class UserController {

    static saltRounds = 10;

    // Cria usuário 
    static async createUser(email, name, password) {
        try {
            const userDoc = await usersCollection.where('email', '==', email).get();

            Validators.validateUserEmailExists(userDoc, "Email already exists. Please try another email.");

            const hashedPassword = await bcrypt.hash(password, this.saltRounds);
            const userId = await User.generateId();
            const user = new User(userId, email, name, hashedPassword);

            await usersCollection.doc(user.idUser.toString()).set(User.toPlainObject(user));

            return user;
        } catch(error) {
            throw new Error("Failed to create user: " + error.message);
        }
    }


    // Recupera usuário para logar
    static async loginUser(email, password) {
        try {
            const userDoc = await usersCollection.where('email', '==', email).get();

            Validators.validateUserDocEmail(userDoc, "Invalid Email");

            const user = userDoc.docs[0].data();

            await Validators.validatePasswordData(password, user.password);

            return user;
        } catch (error) {
            throw new Error("Failed to login: " + error.message);
        }
    }


    // Recupera usuário a partir do id (método não sendo utilizado no momento, pois a aplicação está utilizando sessão)
    static async getUserById(id) {
        try {
            const userDoc = await usersCollection.doc(id.toString()).get();

            Validators.validateUserDocExists(userDoc, "User not found");

            return userDoc.data();
        } catch (error) {
            throw new Error("Failed to get user: " + error.message);
        }
    }


    // Modifica os dados do usuário
    static async updateDataUser(user, newName, newPassword) {
        try {
            await Validators.validatePasswordUpdate(newPassword, user.password);

            const hashedPassword = await bcrypt.hash(newPassword, this.saltRounds);

            await usersCollection.doc(user.idUser.toString()).update({
                name: newName,
                password: hashedPassword
            })

            user.name = newName;
            user.password = hashedPassword;
            
            return user;
        } catch (error) {
            throw new Error("Failed to modify user data: " + error.message);
        }
    }


    // Envia um email para o usuário com token
    static async requestPasswordReset(email) {
        try {
            const userDoc = await usersCollection.where('email', '==', email).get();
    
            Validators.validateUserDocEmail(userDoc, "Email not found");

            const user = userDoc.docs[0].data();
            const token = crypto.randomBytes(4).toString('hex');
            const tokenExpiration = Date.now() + 30 * 60 * 1000;
    
            await usersCollection.doc(user.idUser.toString()).update({
                'passwordResetToken.token': token,
                'passwordResetToken.tokenExpiration': tokenExpiration
            });

            await EmailService.sendEmail(user.email, "Redefinição de senha", token);
        } catch (error) {
            throw new Error("Failed to request password reset: " + error.message);
        }
    }
    

    // Troca a senha caso usuário tenha esquecido
    static async forgotPasswordModify(email, newPassword, tokenPassword) {
        // Código principal do método forgotPasswordModify
        try {
            const userDoc = await usersCollection.where('email', '==', email).get();
    
            Validators.validateUserDocEmail(userDoc, "Email not found");
    
            const user = userDoc.docs[0].data();

            await Validators.validatePasswordUpdate(newPassword, user.password);

            await Validators.validateToken(tokenPassword, user.passwordResetToken, user.idUser.toString());
    
            const hashedPassword = await bcrypt.hash(newPassword, this.saltRounds);
    
            await usersCollection.doc(user.idUser.toString()).update({
                password: hashedPassword,
                'passwordResetToken.token': null,
                'passwordResetToken.tokenExpiration': null
            });
        } catch (error) {
            throw new Error("Failed to modify password: " + error.message);
        }
    }


    // Deleta usuário do banco de dados
    static async deleteUser(user, password) {
        try {
            const userDoc = await usersCollection.where('email', '==', user.email).get();

            Validators.validateUserDocEmail(userDoc, "User not found");

            const userRecord = userDoc.docs[0].data();

            await Validators.validatePasswordData(password, userRecord.password);

            await usersCollection.doc(userRecord.idUser.toString()).delete();
        } catch (error) {
            throw new Error("Failed to delete user: " + error.message);
        }
    }

}


module.exports = UserController;