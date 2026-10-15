import { useState } from "react";

export default function ClienteForm({ clienteEditando, onSalvar, onCancelar }) {
  const [formData, setFormData] = useState({
    nome: "",
    cpf: "",
    telefone: "",
    email: "",
  });
  const handleChange = e => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  return (
    <div>
      <h5>
        {clienteEditando
          ? `Editando cliente: ${clienteEditando.nome}`
          : "Cadastrando novo cliente"}
      </h5>
      <form>
        <label> Nome completo: </label>
        <input
          type="text"
          name="nome"
          value={formData.nome}
          onChange={handleChange}
          required
        />
        <label> CPF: </label>
        <input
          type="text"
          name="cpf"
          value={formData.cpf}
          onChange={handleChange}
          required
        />
        <label> telefone: </label>
        <input
          type="text"
          name="telefone"
          value={formData.telefone}
          onChange={handleChange}
          required
        />
        <label> E-mail: </label>
        <input
          type="email"
          name="email"
          value={formData.email}
          onChange={handleChange}
          required
        />
        {clienteEditando && (
          <button type="button" onClick={onCancelar}>
            Cancelar
          </button>
        )}
        <button type="button" onClick={() => onSalvar(formData)}>
          Salvar cliente
        </button>
      </form>
    </div>
  );
}
