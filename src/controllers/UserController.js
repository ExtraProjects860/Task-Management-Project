const bcrypt = require("bcrypt");
const crypto = require("crypto");
const User = require("../models/User");
const Validators = require("./Validators/Validators");
const EmailService = require('../util/EmailService');

class UserController extends User {

    static saltRounds = 10;

    constructor(idUser = null, email = null, name = null, password = null, db) {
        super(idUser, email, name, password);
        this.usersCollection = db.getConnection().collection("users");
    }

    async generateIdUser() {
        try {
            const snapshot = await this.usersCollection.get();

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

    // Cria usuário 
    async createUser() {
        try {
            const userDoc = await this.usersCollection.where('email', '==', this.email).get();

            Validators.validateUserEmailExists(userDoc, "Email already exists. Please try another email.");

            this.password = await bcrypt.hash(this.password, UserController.saltRounds);

            const idUser = await this.generateIdUser();

            const user = this.toPlainObject(
                idUser,
                this.email,
                this.name,
                this.password
            )

            await this.usersCollection.doc(idUser.toString()).set(user);

            return user;
        } catch(error) {
            throw new Error("Failed to create user: " + error.message);
        }
    }


    // Recupera usuário para logar
    async loginUser() {
        try {
            const userDoc = await this.usersCollection.where('email', '==', this.email).get();

            Validators.validateUserDocEmail(userDoc, "Invalid Email");

            const user = userDoc.docs[0].data();

            await Validators.validatePasswordData(this.password, user.password);

            return user;
        } catch (error) {
            throw new Error("Failed to login: " + error.message);
        }
    }

    // Modifica os dados do usuário
    async updateDataUser(user) {
        try {
            await Validators.validatePasswordUpdate(this.password, user.password);

            const hashedPassword = await bcrypt.hash(this.password, UserController.saltRounds);

            await this.usersCollection.doc(user.idUser.toString()).update({
                name: this.name,
                password: hashedPassword
            })

            user.name = this.name;
            user.password = hashedPassword;
            
            return user;
        } catch (error) {
            throw new Error("Failed to modify user data: " + error.message);
        }
    }


    // Envia um email para o usuário com token
    async requestPasswordReset() {
        try {
            const userDoc = await this.usersCollection.where('email', '==', this.email).get();
    
            Validators.validateUserDocEmail(userDoc, "Email not found");

            const user = userDoc.docs[0].data();
            const token = crypto.randomBytes(4).toString('hex');
            const tokenExpiration = Date.now() + 30 * 60 * 1000;
    
            await this.usersCollection.doc(user.idUser.toString()).update({
                'passwordResetToken.token': token,
                'passwordResetToken.tokenExpiration': tokenExpiration
            });

            await EmailService.sendEmail(this.email, "Redefinição de senha", token);
        } catch (error) {
            throw new Error("Failed to request password reset: " + error.message);
        }
    }
    

    // Troca a senha caso usuário tenha esquecido
    async forgotPasswordModify(tokenPassword) {
        // Código principal do método forgotPasswordModify
        try {
            const userDoc = await this.usersCollection.where('email', '==', this.email).get();
    
            Validators.validateUserDocEmail(userDoc, "Email not found");
    
            const user = userDoc.docs[0].data();

            await Validators.validatePasswordUpdate(this.password, user.password);

            await Validators.validateToken(tokenPassword, user.passwordResetToken, user.idUser.toString());
    
            const hashedPassword = await bcrypt.hash(this.password, UserController.saltRounds);
    
            await this.usersCollection.doc(user.idUser.toString()).update({
                password: hashedPassword,
                'passwordResetToken.token': null,
                'passwordResetToken.tokenExpiration': null
            });
        } catch (error) {
            throw new Error("Failed to modify password: " + error.message);
        }
    }


    // Deleta usuário do banco de dados
    async deleteUser(user) {
        try {
            const userDoc = await this.usersCollection.where('email', '==', user.email).get();

            Validators.validateUserDocEmail(userDoc, "User not found");

            const userRecord = userDoc.docs[0].data();

            await Validators.validatePasswordData(this.password, userRecord.password);

            await this.usersCollection.doc(userRecord.idUser.toString()).delete();
        } catch (error) {
            throw new Error("Failed to delete user: " + error.message);
        }
    }

}


module.exports = UserController;