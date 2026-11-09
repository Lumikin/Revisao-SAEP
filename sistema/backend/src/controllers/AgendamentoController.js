import pool from "../config/Database.js";
import cryptoService from "../utils/crypto.js";

class AgendamentoController {
  async listar(req, res) {
    const { ordernarPor } = req.query; // dia, mes, ano
    try {
      let orderByClause = `ORDER BY DATE (a.data_agendamento) ASC, a.data_agendamento ASC;`;
      if (ordernarPor === "mes") {
        orderByClause = `ORDER BY MONTH (a.data_agendamento) ASC, a.data_agendamento ASC;`;
      } else if (ordernarPor === "ano") {
        orderByClause = `ORDER BY YEAR (a.data_agendamento) ASC, a.data_agendamento ASC;`;
      }

      const sql = `select 
	                  a.id, a.data_agendamento, a.descricao_servico, a.status, c.id AS id_cliente, c.nome as nome_cliente, c.cpf as cpf_cliente, c.telefone as telefone_cliente, c.email as email_cliente, v.id as id_veiculo, v.placa as placa_veiculo, v.modelo as modelo_veiculo, v.marca as marca_veiculo, v.ano as ano_veiculo
                    from agendamentos a 
                      join veiculos v 
	                      on a.veiculo_id = v.id
                      join clientes c 
	                      on v.cliente_id = c.id
                    ${orderByClause}`;

      const [rows] = await pool.query(sql);

      rows.forEach(row => {
        row.cpf_cliente = cryptoService.decrypt(row.cpf_cliente);
      });
      // const agendamentos = rows.map(row => ({
      //   id: row.id,
      //   data_agendamento: row.data_agendamento,
      //   descricao_servico: row.descricao_servico,
      //   status: row.status,
      //   veiculo_id: row.veiculo_id,
      //   cliente_id: row.cliente_id,
      //   cliente_nome: row.cliente_nome,
      // }));

      return res.json(rows);
    } catch (error) {
      console.error("Erro ao listar os agendamentos: ", error);
      return res.status(500).json({
        error: "Erro ao buscar clientes",
        errorMessage: error.message,
      });
    }
  }
  async criar(req, res) {
    const { data_agendamento, descricao_servico, veiculo_id, status } =
      req.body;

    if (!data_agendamento || !descricao_servico || !veiculo_id) {
      return res.status(400).json({
        message: "Todos os dados são obrigatorios",
      });
    }

    try {
      const [result] = await pool.query(
        `INSERT INTO agendamentos (data_agendamento, descricao_servico, veiculo_id, status) VALUES (?,?,?,?);`,
        [
          data_agendamento,
          descricao_servico,
          parseInt(veiculo_id, 10),
          status || "Agendado",
        ],
      );

      return res.status(201).json({
        message: "Agendamento cadastrado com sucesso",
        id: result.insertId,
      });
    } catch (error) {
      console.error(error);
      return res.status(500).json({
        message: "Erro ao cadastrar agendamento",
        errorMessage: error.message,
      });
    }
  }
}

export default new AgendamentoController();
