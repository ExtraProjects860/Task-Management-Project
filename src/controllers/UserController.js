const bcrypt = require("bcrypt");
const crypto = require("crypto");
const axios = require('axios');
const User = require("../models/User");
const Validators = require("./Validators/Validators");

class UserController extends User {

    static saltRounds = 10;

    constructor(idUser = null, email = null, name = null, password = null, db = null) {
        super(idUser, email, name, password);
        this.usersCollection = db.getConnection().collection("users");
    }

    // Gera id sequencial e específico para cada usuário
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

            return { idUser: user.idUser, email: user.email, name: user.name, password: user.password, createdAt: user.createdAt };
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

            return { idUser: user.idUser, email: user.email, name: user.name, password: user.password, createdAt: user.createdAt };
        } catch (error) {
            throw new Error("Failed to login: " + error.message);
        }
    }

    // Modifica os dados do usuário
    async updateDataUser(idUser) {
        try {
            const userDoc = await this.usersCollection.where('idUser', '==', idUser).get();

            const userRecord = userDoc.docs[0].data();

            await Validators.validatePasswordUpdate(this.password, userRecord.password);

            const hashedPassword = await bcrypt.hash(this.password, UserController.saltRounds);

            await this.usersCollection.doc(idUser.toString()).update({
                name: this.name,
                password: hashedPassword
            })

            const updatedDoc = await this.usersCollection.doc(idUser.toString()).get();

            const user = updatedDoc.data();
            
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

            const response = await axios.post("http://localhost:5000/send-email", {
                recipient: this.email,
                subject: "Alerta de redefinição de senha",
                message: "Você solicitou uma redefinição de senha. Por favor, use o seguinte token para redefinir sua senha:",
                token: token
            });

            return response.data;
        } catch (error) {
            throw new Error("Failed to request password reset: " + error.message);
        }
    }
    

    // Troca a senha caso usuário tenha esquecido
    async forgotPasswordModify(tokenPassword) {
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
    async deleteUser(idUser) {
        try {
            const userDoc = await this.usersCollection.where('idUser', '==', idUser).get();

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