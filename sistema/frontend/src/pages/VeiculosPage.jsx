import { useState } from "react";
import VeiculosForm from "../components/VeiculoForm";
const clienteMockados = [
  {
    id: 1,
    nome: "Maycon",
    telefone: "(19)12345-1234",
    cpf: "123.456.789-10",
    email: "mycon@gmail.com",
  },
  {
    id: 2,
    nome: "Lucas",
    telefone: "(19)54321-1324",
    cpf: "123.456.778-10",
    email: "lucas@gmail.com",
  },
  {
    id: 3,
    nome: "Raissa",
    telefone: "(19)12345-5689",
    cpf: "155.456.789-11",
    email: "raissa@gmail.com",
  },
];
const veiculosMockados = [
  {
    id: 1,
    placa: "ABC-1234",
    modelo: "Palio",
    marca: "Fiat",
    ano: 2008,
    clienteId: 1,
  },
  {
    id: 2,
    placa: "XYZ-1234",
    modelo: "Civic",
    marca: "honda",
    ano: 2011,
    clienteId: 2,
  },
];
export default function VeiculosPage() {
  const [clientes, setClientes] = useState(clienteMockados);
  const [veiculos, setVeiculos] = useState(veiculosMockados);

  const handleSalvar = dadosVeiculo => {
    const novoVeiculo = {
      ...dadosVeiculo,
      id: crypto.randomUUID(),
    };
    setVeiculos(veiculos => [...veiculos, novoVeiculo]);
  };

  return (
    <div>
      <h3> Gerenciamento de Veiculos</h3>
      <VeiculosForm onSalvar={handleSalvar} clientes={clientes} />
      <table>
        <thead>
          <tr>
            <th> Placa</th>
            <th> Modelo</th>
            <th> Marca</th>
            <th> Ano </th>
            <th> Cliente Proprietario </th>
          </tr>
        </thead>
        <tbody>
          {veiculos.map(v => (
            <tr key={v.id}>
              <td>{v.placa}</td>
              <td>{v.modelo}</td>
              <td>{v.marca}</td>
              <td>{v.ano}</td>
              <td>
                {clientes.find(cliente => cliente.id == v.clienteId)?.nome}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
