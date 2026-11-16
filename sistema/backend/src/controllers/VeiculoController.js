import pool from "../config/Database.js";

class VeiculoController {
  async listar(req, res) {
    try {
      const [rows] =
        await pool.query(`select v.id, v.modelo, v.marca, v.placa, v.ano, v.cliente_id, c.nome AS NomeCliente
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
  async criar(req, res) {
    const { placa, modelo, marca, ano, cliente_id } = req.body;
    if (!placa || !modelo || !marca || !ano || !cliente_id) {
      return res.status(400).json({
        message: "Todos os campos são obrigatorios",
      });
    }

    try {
      const [result] = await pool.query(
        `INSERT INTO veiculos (placa, modelo, marca, ano, cliente_id) VALUES (?,?,?,?,?)`,
        [placa, modelo, marca, ano, cliente_id],
      );

      return res.status(201).json({
        message: "Veículo cadastrado com sucesso",
        id: result.insertId,
      });
    } catch (error) {
      console.error("Erro ao cadastrar veículo", error);
      return res.status(500).json({
        message: "Erro ao cadastrar veículo",
        error: error.message,
      });
    }
  }
}

export default new VeiculoController();
