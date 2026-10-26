import "dotenv/config";
import express from "express";
import cors from "cors";
import cookieParser from "cookie-parser";
import router from "./routes/routes.js";

const app = express();

const PORT = process.env.PORT || 3001;

app.use(
  cors({
    origin: [
      "http://localhost:5173",
      "http://127.0.0.1:5173",
      "http://localhost:3000",
    ],
    credentials: true,
  }),
);

// Middlewares para parsing e corpo de cookies
app.use(express.json());
app.use(cookieParser());

// Rotas e API
app.use("/api", router);

// Middleware para rotas não encontradas
app.use((req, res) => {
  res.status(404).json({
    error: "Rota não encontrada",
  });
});

// Inicialização do servidor;

app.listen(PORT, () => {
  console.log(`Servidor respondendo em http://localhost:${PORT}`);
});
