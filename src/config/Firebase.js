
const admin = require('firebase-admin');
const serviceAccount = require('./notedflow-lista-tarefas-firebase-adminsdk-bwha5-b3da5ab005.json');
require('dotenv').config();

class FireBase {

    constructor() {
        if (!FireBase.instance) {
            try {
                admin.initializeApp({
                    credential: admin.credential.cert(serviceAccount),
                    databaseURL: process.env.DATABASE_URL
                });

                this.database = admin.firestore();

                console.log("Firebase connection established successfully");
            } catch (error) {
                console.error("Error initializing Firebase: ", error);

                throw new Error("Failed to initialize Firebase.");
            }
            FireBase.instance = this;
        }

        return FireBase.instance;
    }

    getConnection() {
        if (!this.database) {
            throw new Error("No Firestore connection available.");
        }

        return this.database;
    }

}

const instance = new FireBase();
Object.freeze(instance);

module.exports = instance;