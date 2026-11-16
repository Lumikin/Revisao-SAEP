import { Router } from "express";
import ClienteController from "../controllers/clienteController.js";
import VeiculoController from "../controllers/VeiculoController.js";
import AgendamentoController from "../controllers/AgendamentoController.js";
import DashbordController from "../controllers/DashbordController.js";
import AuthController from "../controllers/AuthController.js";
import authMiddleware from "../middlewares/authMiddlewares.js";

const router = Router();

// router.use(authMiddleware);

router.get("/clientes", (req, res) => ClienteController.listar(req, res));
router.post("/clientes", (req, res) => ClienteController.criar(req, res));
router.put("/clientes/:id", (req, res) =>
  ClienteController.atualizar(req, res),
);

router.post("/login", (req, res) => AuthController.login(req, res));

router.use(authMiddleware);

router.post("/logout", (req, res) => AuthController.logout(req, res));
router.get("/me", (req, res) => AuthController.me(req, res));

router.get("/veiculos", (req, res) => VeiculoController.listar(req, res));
router.post("/veiculos", (req, res) => VeiculoController.criar(req, res));

router.get("/agendamentos", (req, res) =>
  AgendamentoController.listar(req, res),
);
router.patch("/agendamentos/:id", (req, res) =>
  AgendamentoController.atualizar(req, res),
);
router.post("/agendamentos", (req, res) =>
  AgendamentoController.criar(req, res),
);

router.get("/dashbord/resumo", (req, res) =>
  DashbordController.resumo(req, res),
);

export default router;
