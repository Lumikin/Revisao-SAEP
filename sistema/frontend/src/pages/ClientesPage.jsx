import { useState } from "react";
import ClienteForm from "../components/ClienteFrom";

export default function ClientesPage() {
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

  const [clientes, setClientes] = useState(clienteMockados);
  const [clienteEditando, setClienteEditando] = useState(null);

  const handleCancelarEdicao = () => {
    setClienteEditando(null);
  };

  const handleSalvar = dadosClientes => {
    if (clienteEditando) {
      setClientes(clientes =>
        clientes.map(cliente =>
          cliente.id == clienteEditando.id
            ? { ...dadosClientes, id: clienteEditando.id }
            : cliente,
        ),
      );
      setClienteEditando(null);
    } else {
      const novoCliente = {
        ...dadosClientes,
        id: Date.now(),
      };

      setClientes(clientes => [...clientes, novoCliente]);
    }
  };

  return (
    <div>
      <h3> Gerenciamento de Clientes</h3>
      <ClienteForm
        onSalvar={handleSalvar}
        clienteEditando={clienteEditando}
        onCancelar={handleCancelarEdicao}
      />
      <table>
        <thead>
          <tr>
            <th> Nome do Cliente</th>
            <th> Telefone</th>
            <th> CPF</th>
            <th> Email </th>
            <th> Ações </th>
          </tr>
        </thead>
        <tbody>
          {clientes.map(c => (
            <tr key={c.id}>
              <td>{c.nome}</td>
              <td>{c.telefone}</td>
              <td>{c.cpf}</td>
              <td>{c.email}</td>
              <td>
                <button onClick={() => setClienteEditando(c)}> Editar </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
