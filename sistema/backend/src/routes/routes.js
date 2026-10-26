import { Router } from "express";
import ClienteController from "../controllers/clienteController.js";
import VeiculoController from "../controllers/VeiculoController.js";
import AgendamentoController from "../controllers/AgendamentoController.js";

const router = Router();

// router.use(authMiddleware);

router.get("/clientes", (req, res) => ClienteController.listar(req, res));
router.post("/clientes", (req, res) => ClienteController.criar(req, res));
router.put("/clientes/:id", (req, res) =>
  ClienteController.atualizar(req, res),
);

router.get("/veiculos", (req, res) => VeiculoController.listar(req, res));

router.get("/agendametos", (req, res) =>
  AgendamentoController.listar(req, res),
);
export default router;
