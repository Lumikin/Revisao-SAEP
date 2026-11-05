import { useState, useEffect } from "react";
import VeiculosForm from "../components/VeiculoForm";
// const clienteMockados = [
//   {
//     id: 1,
//     nome: "Maycon",
//     telefone: "(19)12345-1234",
//     cpf: "123.456.789-10",
//     email: "mycon@gmail.com",
//   },
//   {
//     id: 2,
//     nome: "Lucas",
//     telefone: "(19)54321-1324",
//     cpf: "123.456.778-10",
//     email: "lucas@gmail.com",
//   },
//   {
//     id: 3,
//     nome: "Raissa",
//     telefone: "(19)12345-5689",
//     cpf: "155.456.789-11",
//     email: "raissa@gmail.com",
//   },
// ];
// const veiculosMockados = [
//   {
//     id: 1,
//     placa: "ABC-1234",
//     modelo: "Palio",
//     marca: "Fiat",
//     ano: 2008,
//     clienteId: 1,
//   },
//   {
//     id: 2,
//     placa: "XYZ-1234",
//     modelo: "Civic",
//     marca: "honda",
//     ano: 2011,
//     clienteId: 2,
//   },
// ];

export default function VeiculosPage() {
  const [clientes, setClientes] = useState([]);
  const [veiculos, setVeiculos] = useState([]);
  const [veiculoEditando, setVeiculoEditando] = useState(null);

  const handleCancelarEdicao = () => {
    setVeiculoEditando(null);
  };

  const handleSalvar = async dadosVeiculo => {
    if (veiculoEditando) {
      setVeiculos(veiculo =>
        veiculo.map(veiculo =>
          veiculo.id == veiculoEditando.id
            ? { ...dadosVeiculo, id: veiculoEditando.id }
            : veiculo,
        ),
      );
    } else {
      try {
        const response = await fetch("http://localhost:3001/api/veiculos", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(dadosVeiculo),
        });

        const data = await response.json();

        const novoVeiculo = {
          ...dadosVeiculo,
          id: crypto.randomUUID(),
        };

        console.log(data);
        setVeiculos(veiculos => [...veiculos, novoVeiculo]);
      } catch (error) {
        console.error("Erro ao buscar veiculos:", error);
      }
    }
  };

  useEffect(() => {
    const buscaClientes = async () => {
      try {
        const response = await fetch("http://localhost:3001/api/clientes");
        const data = await response.json();
        setClientes(data);
        console.log(data);
      } catch (error) {
        console.error("Erro ao buscar clientes:", error);
      }
    };

    const buscaVeiculos = async () => {
      try {
        const response = await fetch("http://localhost:3001/api/veiculos");
        const data = await response.json();
        setVeiculos(data);
        console.log(data);
      } catch (error) {
        console.error("Erro ao buscar veiculos", error);
      }
    };

    buscaClientes();
    buscaVeiculos();
  }, []);

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
                {clientes.find(cliente => cliente.id == v.cliente_id)?.nome}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
