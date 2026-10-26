import { useState } from "react";

export default function AgendamentoForm({ veiculos, onSalvar }) {
  const [formData, setFormData] = useState({
    veiculoId: "",
    dataAgendamento: "",
    descricaoServico: "",
    status: "Agendado",
  });
  const handleChange = e => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = e => {
    e.preventDefault();
    onSalvar(formData);
    setFormData({
      veiculoId: "",
      dataAgendamento: "",
      descricaoServico: "",
      status: "Agendado",
    });
  };
  return (
    <div>
      <h5>Cadastrar Novo Veiculo</h5>
      <form>
        <label> Veiculo </label>
        <select
          name="veiculoId"
          value={formData.veiculoId}
          onChange={handleChange}
          required
        >
          <option key="placeholder" value="">
            Selecione o veiculo
          </option>
          {veiculos.map(veiculo => (
            <option key={veiculo.id} value={veiculo.id}>
              {veiculo.nome} - {veiculo.placa}
            </option>
          ))}
        </select>
        <label> Data e horário: </label>
        <input
          type="datetime-local"
          name="dataAgendamento"
          value={formData.dataAgendamento}
          onChange={handleChange}
          required
        />
        <label> Descrição do serviço: </label>
        <textarea
          rows="2"
          name="descricaoServico"
          value={formData.descricaoServico}
          onChange={handleChange}
          required
        ></textarea>
        <button type="button" onClick={handleSubmit}>
          Confimar agendamento
        </button>
      </form>
    </div>
  );
}
