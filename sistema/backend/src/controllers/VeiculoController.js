import pool from "../config/Database.js";

class VeiculoController {
  async listar(req, res) {
    try {
      const [rows] =
        await pool.query(`select v.id, v.modelo, v.marca, v.placa, v.cliente_id, c.nome AS NomeCliente
                            from veiculos v join clientes c
                            on v.cliente_id = c.id
                            order by v.id desc;`);
      return res.json(rows);
    } catch (error) {
      console.error("Erro ao listar o cliente: ", error);
      return res.status(500).json({
        error: "Erro ao buscar clientes",
        errorMessage: error.message,
      });
    }
  }
}

export default new VeiculoController();
