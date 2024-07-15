
const admin = require('firebase-admin');
const serviceAccount = require('./notedflow-lista-tarefas-firebase-adminsdk-bwha5-b3da5ab005.json');

class FireBase {
    constructor() {
        if (!FireBase.instance) {
            try {
                admin.initializeApp({
                    credential: admin.credential.cert(serviceAccount),
                    databaseURL: "https://NotedFlow-Lista-Tarefas.firebaseio.com"
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

// // Import the functions you need from the SDKs you need
// import { initializeApp } from "firebase/app";
// import { getAnalytics } from "firebase/analytics";
// // TODO: Add SDKs for Firebase products that you want to use
// // https://firebase.google.com/docs/web/setup#available-libraries

// // Your web app's Firebase configuration
// // For Firebase JS SDK v7.20.0 and later, measurementId is optional
// const firebaseConfig = {
//   apiKey: "AIzaSyCszk03vI37XtEy_xBTF7hrTR_OrslIf5k",
//   authDomain: "notedflow-lista-tarefas.firebaseapp.com",
//   projectId: "notedflow-lista-tarefas",
//   storageBucket: "notedflow-lista-tarefas.appspot.com",
//   messagingSenderId: "82278915925",
//   appId: "1:82278915925:web:ba4cb056f1411ac3ac99dc",
//   measurementId: "G-ZNE4BSZM56"
// };

// // Initialize Firebase
// const app = initializeApp(firebaseConfig);
// const analytics = getAnalytics(app);