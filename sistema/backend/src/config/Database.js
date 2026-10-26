import mysql from "mysql2/promise";
import "dotenv/config";

class Database {
  constructor() {
    this.pool = mysql.createPool({
      host: process.env.DB_HOST || "localhost",
      user: process.env.DB_USER || "root",
      password: process.env.DB_PASSWORD || "1234",
      port: process.env.DB_PORT || "3306",
      database: process.env.DB_NAME || "oficina_db",
      waitForConnections: true,
      connectionLimit: 10,
      queueLimit: 0,
    });
  }
  getPoll() {
    return this.pool;
  }

  async testConnection() {
    try {
      const conn = await this.pool.getConnection();
      console.log("Conexão com o MySQL estabelecida com sucesso");
      conn.release();
    } catch (error) {
      console.error("Falha ao conectar com o MYSQL", error);
    }
  }
}

const databseInstance = new Database();
databseInstance.testConnection();

export default databseInstance.getPoll();
