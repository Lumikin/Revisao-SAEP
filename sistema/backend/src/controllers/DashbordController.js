import poll from "../config/Database.js";

async function resumo(req, res) {
  try {
    const [[{ total_clientes }]] = await poll.query(
      `SELECT COUNT(*) as total_clientes from clientes`,
    );
    const [[{ total_veiculos }]] = await poll.query(
      `SELECT COUNT(*) as total_veiculos from veiculos`,
    );
    const [[{ total_agendamentos }]] = await poll.query(
      `SELECT COUNT(*) as total_agendamentos from agendamentos`,
    );
    const estatisticas = {
      total_clientes,
      total_veiculos,
      total_agendamentos,
    };
    return res.json({
      usuarioLogado: req.usuario,
      estatisticas,
    });
  } catch (error) {
    console.error("Erro no resumo do Dashbord", error);
    return res.status(500).json({
      message: "Erro ao obter dados do dashbord",
      error: error.message,
    });
  }
}
export default { resumo };
