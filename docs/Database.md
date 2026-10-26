## Banco de dados

![Diagrama de dados](docs/backend/oficina_db.png)

_[Banco de dados](./docs/backend/database.sql)_

### Clientes

| Campo     | Tipo         | Nulo | Chave | Default           | Extra          |
| --------- | ------------ | ---- | ----- | ----------------- | -------------- |
| id        | int          | NO   | PRI   | —                 | auto_increment |
| nome      | varchar(100) | NO   | —     | —                 | —              |
| cpf       | varchar(255) | NO   | —     | —                 | —              |
| telefone  | varchar(20)  | NO   | —     | —                 | —              |
| email     | varchar(100) | NO   | UNI   | —                 | —              |
| criado_em | timestamp    | YES  | —     | CURRENT_TIMESTAMP | —              |

### Veiculos

| Campo      | Tipo         | Nulo | Chave                  | Default | Extra          |
| ---------- | ------------ | ---- | ---------------------- | ------- | -------------- |
| id         | int          | NO   | PRI                    | —       | auto_increment |
| placa      | varchar(10)  | NO   | UNI                    | —       | —              |
| modelo     | varchar(100) | NO   | —                      | —       | —              |
| marca      | varchar(50)  | NO   | —                      | —       | —              |
| ano        | int          | NO   | —                      | —       | —              |
| cliente_id | int          | NO   | MUL (FK → clientes.id) | —       | —              |

### Agendamentos

| Campo             | Tipo         | Nulo | Chave                  | Default    | Extra          |
| ----------------- | ------------ | ---- | ---------------------- | ---------- | -------------- |
| id                | int          | YES  | PRI                    | —          | auto_increment |
| data_agendamento  | datetime     | NO   | —                      | —          | —              |
| descricao_servico | varchar(255) | NO   | —                      | —          | —              |
| status            | varchar(50)  | YES  | —                      | 'Agendado' | —              |
| veiculo_id        | int          | NO   | MUL (FK → veiculos.id) | —          | —              |

### Usuarios

| Campo     | Tipo         | Nulo | Chave | Default           | Extra          |
| --------- | ------------ | ---- | ----- | ----------------- | -------------- |
| id        | int          | NO   | PRI   | —                 | auto_increment |
| nome      | varchar(100) | NO   | —     | —                 | —              |
| email     | varchar(100) | NO   | UNI   | —                 | —              |
| senha     | varchar(255) | NO   | —     | —                 | —              |
| criado_em | timestamp    | YES  | —     | CURRENT_TIMESTAMP | —              |

## Dados

### Clientes

| id  | nome            | cpf                                                              | telefone        | email                      | criado_em         |
| --- | --------------- | ---------------------------------------------------------------- | --------------- | -------------------------- | ----------------- |
| 1   | João Silva      | TdoclxtBYMNlJtkn255oAWO9d8SxECuL6S+CoxzQycxtGRn5bFpzS5ItO2f9pMO+ | (11) 98765-4321 | <joao.silva@email.com>     | (timestamp atual) |
| 2   | Maria Oliverira | qeq3Zi0QJSDQnh1pAfpSgGrqhf914trcha4r1QZ9YFOs1xY7eYjFEE9iK+HvtaMc | (11) 91234-4987 | <maria.oliveria@email.com> | (timestamp atual) |
| 3   | Lucas Pereira   | lFIpoZJZokji/ZIFY8p+TxhS6EUoa48V2J504/mOXeBrVi8gqkAwQshKWokrQxd4 | (11) 97777-8888 | <lucas.pereira@email.com>  | (timestamp atual) |

### Veiculos

| id  | placa    | modelo       | marca     | ano  | cliente_id |
| --- | -------- | ------------ | --------- | ---- | ---------- |
| 1   | ABC-1D34 | Civic ELX    | Honda     | 2021 | 1          |
| 2   | XYZ-9E87 | Corolla XEI  | Toyota    | 2025 | 2          |
| 3   | HJK-4A36 | Onix Premier | Chevrolet | 2021 | 3          |

### Agendamentos

| id  | data_agendamento    | descricao_servico            | status       | veiculo_id |
| --- | ------------------- | ---------------------------- | ------------ | ---------- |
| 1   | 2026-03-15 09:00:00 | Troca de óleo e filtro de ar | Em andamento | 1          |
| 2   | 2026-04-10 14:30:00 | Revisão do sistema de freios | Confirmado   | 2          |
| 3   | 2026-05-20 10:00:00 | Alinhamento e balanciamento  | Agendado     | 3          |

### Usuarios

| id  | nome            | email                 | senha  | criado_em         |
| --- | --------------- | --------------------- | ------ | ----------------- |
| 1   | Carlos Mecanico | <carlos@oficina.com>  | 123456 | (timestamp atual) |
| 2   | Ana Atendente   | <ana@oficina.com>     | 123456 | (timestamp atual) |
| 3   | Roberto Gerente | <roberto@oficina.com> | 123456 | (timestamp atual) |
