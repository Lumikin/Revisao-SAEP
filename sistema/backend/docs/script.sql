create database oficina_db;
use oficina_db;

create table clientes(
	id int auto_increment not null primary key,
    nome varchar(100) not null,
    cpf varchar(255) not null,
    telefone varchar(20) not null,
    email varchar(100) not null unique,
    criado_em timestamp default current_timestamp  
);

create table veiculos(
	id int auto_increment not null primary key,
    placa varchar(10) not null unique, 
    modelo varchar(100) not null,
    marca varchar(50) not null,
    ano int not null,
    cliente_id int not null, 
    foreign key (cliente_id) 
		references clientes(id)
);

create table agendamentos(
	id int auto_increment primary key,
	data_agendamento datetime not null,
	descricao_servico varchar(255) not null,
    status varchar(50) default 'Agendado',
	veiculo_id int not null,
	foreign key (veiculo_id)
		references veiculos(id)
);

create table usuarios(
	id int not null auto_increment primary key,
	nome varchar(100) not null,
	email varchar(100) not null unique,
	senha varchar(255) not null,
	criado_em timestamp default current_timestamp
);


insert into usuarios(nome, email, senha) values
('Carlos Mecanico','carlos@oficina.com','123456'),
('Ana Atendente','ana@oficina.com','123456'),
('Roberto Gerente','roberto@oficina.com','123456');

insert into clientes(nome, cpf, telefone, email) values
('João Silva','TdoclxtBYMNlJtkn255oAWO9d8SxECuL6S+CoxzQycxtGRn5bFpzS5ItO2f9pMO+','(11) 98765-4321','joao.silva@email.com'),
('Maria Oliverira','qeq3Zi0QJSDQnh1pAfpSgGrqhf914trcha4r1QZ9YFOs1xY7eYjFEE9iK+HvtaMc','(11) 91234-4987','maria.oliveria@email.com'),
('Lucas Pereira','lFIpoZJZokji/ZIFY8p+TxhS6EUoa48V2J504/mOXeBrVi8gqkAwQshKWokrQxd4','(11) 97777-8888','lucas.pereira@email.com');

insert into veiculos(placa, modelo, marca, ano, cliente_id) values 
('ABC-1D34','Civic ELX','Honda',2021,1),
('XYZ-9E87','Corolla XEI','Toyota',2025,2),
('HJK-4A36','Onix Premier','Chevrolet',2021,3);

insert into agendamentos(data_agendamento, descricao_servico, veiculo_id, status) values
('2026-03-15 09:00:00','Troca de óleo e filtro de ar',1,'Em andamento'), 
('2026-04-10 14:30:00','Revisão do sistema de freios',2,'Confirmado'),
('2026-05-20 10:00:00','Alinhamento e balanciamento',3,'Agendado');