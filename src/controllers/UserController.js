const bcrypt = require("bcrypt");
const crypto = require("crypto");
const FireBase = require("../config/Firebase");
const usersCollection = FireBase.getConnection().collection("users");
const User = require("../models/User");
const EmailService = require('../util/EmailService');

class UserController {

    static saltRounds = 10;


    // Cria usuário 
    static async createUser(email, name, password) {
        try {
            const userDoc = await usersCollection.where('email', '==', email).get();

            if (!userDoc.empty) {
                throw new Error("Email already exists. Please try another email.")
            }

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

            if (userDoc.empty) {
                throw new Error("Email not found");
            }

            const user = userDoc.docs[0].data();

            const passwordMatch = await bcrypt.compare(password, user.password);

            if (!passwordMatch) {
                throw new Error("Invalid password");
            }

            return user;
        } catch (error) {
            throw new Error("User not found");
        }
    }


    // Recupera usuário a partir do id (método não sendo utilizado no momento, pois a aplicação está utilizando sessão)
    static async getUserById(id) {
        try {
            const userDoc = await usersCollection.doc(id.toString()).get();

            if (!userDoc.exists) {
                throw new Error("User not found.");
            }

            return userDoc.data();
        } catch (error) {
            throw new Error("Failed to get user: " + error.message);
        }
    }


    // Modifica os dados do usuário
    static async updateDataUser(user, newName, newPassword) {
        try {
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
    
            if (userDoc.empty) {
                throw new Error("Email not found");
            }
    
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

        async function validatePassword(newPassword, currentPassword) {
            const passwordMatch = await bcrypt.compare(newPassword, currentPassword);

            if (passwordMatch) {
                throw new Error("This password is the same as the current one. Try another.");
            }
        }

        async function validateToken(tokenPassword, passwordResetToken, userId) {
            if (!passwordResetToken.token || passwordResetToken.token !== tokenPassword) {
                throw new Error("Token is invalid or missing, try again");
            }
        
            const currentTime = Date.now();
        
            if (passwordResetToken.tokenExpiration < currentTime) {
                usersCollection.doc(userId).update({
                    'passwordResetToken.token': null,
                    'passwordResetToken.tokenExpiration': null
                });
                
                throw new Error("Token has expired, please request a new one");
            }
        }

        // Código principal do método forgotPasswordModify
        try {
            const userDoc = await usersCollection.where('email', '==', email).get();
    
            if (userDoc.empty) {
                throw new Error("Email not found");
            }
    
            const user = userDoc.docs[0].data();

            await validatePassword(newPassword, user.password);

            await validateToken(tokenPassword, user.passwordResetToken, user.idUser.toString());
    
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

            if (userDoc.empty) {
                throw new Error("User not found");
            }

            const userRecord = userDoc.docs[0].data();

            const passwordMatch = await bcrypt.compare(password, user.password);

            if (!passwordMatch) {
                throw new Error("Invalid password");
            }

            await usersCollection.doc(userRecord.idUser.toString()).delete();
        } catch (error) {
            throw new Error("Failed to delete user: " + error.message);
        }
    }

}


module.exports = UserController;