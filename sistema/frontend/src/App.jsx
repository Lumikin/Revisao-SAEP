import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";

import ClientesPage from "./pages/ClientesPage";
import LoginPage from "./pages/loginPage";
import VeiculosPage from "./pages/VeiculosPage";
import AgendamentosPage from "./pages/AgendamentoPage";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/login" element={<LoginPage />} />
        <Route path="/clientes" element={<ClientesPage />} />
        <Route path="/veiculos" element={<VeiculosPage />} />
        <Route path="/agendamentos" element={<AgendamentosPage />} />
        <Route path="*" element={<Navigate to="/login" replace />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
