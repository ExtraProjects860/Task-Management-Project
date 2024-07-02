const { Sequelize } = require('sequelize');
require('dotenv').config();

class DataBase {
    // contrutor que pegar as informações das variáveis e coloca dentro do atributo para utilizar nos métodos
    constructor() {
        this.sequelize = new Sequelize(process.env.DB_NAME, process.env.DB_USER, process.env.DB_PASSWORD, {
            host: process.env.DB_HOST,
            dialect: 'mysql',
            logging: false,
        });
    }

    // método que realiza a conexão com o banco
    async connect() {
        try {
            await this.sequelize.authenticate()
            console.log('Connection has been established successfully.');
        } catch (error) {
            console.error('Unable to connect to the database:', error);
        }
    }

    // método que fecha a conexão com o banco
    async close() {
        try {
            await this.sequelize.close();
            console.log('Connection has been closed successfully.');
        } catch (error) {
            console.error('Unable to close the database connection:', error);
        }
    }

    // método que realiza consulta no banco
    async query(sql, options) {
        try {
            const [results, metadata] = await this.sequelize.query(sql, options);
            return results;
        } catch (error) {
            console.error('Error executing query:', error);
            throw error;
        }
    }

    // método para sincronizar com o banco
    async syncModels(options) {
        try {
            await this.sequelize.sync(options);
            console.log('All models were synchronized successfully.');
        } catch (error) {
            console.error('Error synchronizing models:', error);
        }
    }

    // método que pega as informações do banco
    getSequelize() {
        return this.sequelize;
    }
}

module.exports = new DataBase();