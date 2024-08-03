const bcrypt = require("bcrypt");
const FireBase = require("../../config/Firebase");
const usersCollection = FireBase.getConnection().collection("users");

class Validators {

    async validatePasswordUpdate(newPassword, currentPassword) {
        const passwordMatch = await bcrypt.compare(newPassword, currentPassword);

        if (passwordMatch) {
            throw new Error("This password is the same as the current one. Try another.");
        }
    }

    async validatePasswordData(password, currentPassword) {
        const passwordMatch = await bcrypt.compare(password, currentPassword);

        if (!passwordMatch) {
            throw new Error("Invalid password");
        }
    }

    async validateToken(tokenPassword, passwordResetToken, userId) {
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

    validateUserDocExists(userDoc, message) {
        if (!userDoc.exists) {
            throw new Error(message);
        }
    }

    validateUserDocEmail(userDoc, message) {
        if (userDoc.empty) {
            throw new Error(message);
        }
    }

    validateUserEmailExists(userDoc, message) {
        if (!userDoc.empty) {
            throw new Error(message);
        }
    }

}

module.exports = new Validators();