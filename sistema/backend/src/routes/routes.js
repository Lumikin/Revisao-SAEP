import { Router } from "express";
import ClienteController from "../controllers/clienteController.js";

const router = Router();

// router.use(authMiddleware);

router.get("/clientes", (req, res) => ClienteController.listar(req, res));
router.post("/clientes", (req, res) => ClienteController.criar(req, res));
router.put("/clientes/:id", (req, res) =>
  ClienteController.atualizar(req, res),
);

export default router;
