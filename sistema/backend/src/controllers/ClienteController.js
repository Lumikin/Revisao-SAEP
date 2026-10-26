import pool from "../config/Database.js";

class ClienteController {
  async listar(req, res) {
    const { termo } = req.query;
    try {
      let clientes;
      if (termo && termo.trim() != "") {
        const busca = `%${termo.trim()}%`;
        clientes = await pool.query(
          `SELECT * FROM clientes WHERE nome LIKE ? OR email LIKE ? ORDER BY id DESC;`,
          [busca, busca],
        );
      } else {
        clientes = await pool.query(`SELECT * FROM clientes ORDER BY id`);
      }
      return res.json(clientes);
    } catch (error) {
      console.error("Erro ao listar o cliente: ", error);
      return res.status(500).json({
        error: "Erro ao buscar clientes",
        errorMessage: error.message,
      });
    }
  }
}

export default new ClienteController();
