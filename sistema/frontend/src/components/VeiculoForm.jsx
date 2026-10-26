import { useState } from "react";

export default function VeiculosForm({ clientes, onSalvar }) {
  const [formData, setFormData] = useState({
    placa: "",
    modelo: "",
    marca: "",
    ano: "",
    clienteId: "",
  });
  const handleChange = e => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = e => {
    e.preventDefault();
    onSalvar(formData);
    setFormData({
      placa: "",
      modelo: "",
      marca: "",
      ano: "",
      clienteId: "",
    });
  };
  return (
    <div>
      <h5>Cadastrar Novo Veiculo</h5>
      <form>
        <label> Placa do veiculo: </label>
        <input
          type="text"
          name="placa"
          value={formData.placa}
          onChange={handleChange}
          required
        />
        <label> modelo </label>
        <input
          type="text"
          name="modelo"
          value={formData.modelo}
          onChange={handleChange}
          required
        />
        <label> marca </label>
        <input
          type="text"
          name="marca"
          value={formData.marca}
          onChange={handleChange}
          required
        />
        <label> Ano: </label>
        <input
          type="number"
          name="ano"
          value={formData.ano}
          onChange={handleChange}
          required
        />
        <label> Prorpietario do veiculo: </label>
        <select
          name="clienteId"
          value={formData.clienteId}
          onChange={handleChange}
          required
        >
          <option key="placeholder" value="">
            Selecione o cliente
          </option>
          {clientes.map(cliente => (
            <option key={cliente.id} value={cliente.id}>
              {cliente.nome} (CPF: {cliente.cpf})
            </option>
          ))}
        </select>
        <button type="button" onClick={handleSubmit}>
          Salvar veiculo
        </button>
      </form>
    </div>
  );
}
