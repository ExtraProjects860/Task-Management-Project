
import mysql, { Connection, MysqlError } from 'mysql';

class DatabaseConnection{

    private connection: Connection;

    constructor() {
        this.connection = mysql.createConnection({
            host: "127.0.0.1",
            user: "root",
            password: "",
            database: "",
        });
    }

    public connect(): void {
        this.connection.connect((err: MysqlError | null) => {
            if (err) {
                throw err;
            }
            console.log("Conectado ao banco de dados MySQL");
        });
    }
    
    public getConnection(): Connection {
        return this.connection;
    }
    
    public query<T = any>(sql: string, params: any[]): Promise<T> {
        return new Promise((resolve, reject) => {
            this.connection.query(sql, params, (error, results, fields) => {
                if (error) {
                    reject(error);
                } else {
                    resolve(results);
                }
            });
        });
    }
    
    public close(): void {
        this.connection.end((err: MysqlError | null) => {
            if (err) {
                throw err;
            }
            console.log("Conexão com o banco de dados encerrada");
        });
    }
}

export default DatabaseConnection;