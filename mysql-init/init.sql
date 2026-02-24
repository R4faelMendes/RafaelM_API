create database vio_rafaelM;
-- vio (venda de ingressos online)

use vio_rafaelM;

create table usuario (
		cpf char(11) not null unique,
    nome varchar(100) not null,
    email varchar(100) not null unique,
    senha varchar(255) not null,
    telefone char(11) not null,    
    data_nascimento date not null
);

insert into usuario (nome, email, senha, cpf, data_nascimento, telefone) values
('João Silva', 'joao.silva@example.com', 'senha123', '16123456789', '1990-01-15', '16123456789'),
('Maria Oliveira', 'maria.oliveira@example.com', 'senha123', '16987654321', '1985-06-23', '16123456789'),
('Carlos Pereira', 'carlos.pereira@example.com', 'senha123', '16123987456', '1992-11-30', '16123456789'),
('Ana Souza', 'ana.souza@example.com', 'senha123', '16456123789', '1987-04-18', '16123456789'),
('Pedro Costa', 'pedro.costa@example.com', 'senha123', '16789123456', '1995-08-22', '16123456789'),
('Laura Lima', 'laura.lima@example.com', 'senha123', '16321654987', '1998-09-09', '16123456789'),
('Lucas Alves', 'lucas.alves@example.com', 'senha123', '16654321987', '1993-12-01', '16123456789'),
('Fernanda Rocha', 'fernanda.rocha@example.com', 'senha123', '16741852963', '1991-07-07', '16123456789'),
('Rafael Martins', 'rafael.martins@example.com', 'senha123', '16369258147', '1994-03-27', '16123456789'),
('Juliana Nunes', 'juliana.nunes@example.com', 'senha123', '16258147369', '1986-05-15', '16123456789'),
('Paulo Araujo', 'paulo.araujo@example.com', 'senha123', '16159753486', '1997-10-12', '16123456789'),
('Beatriz Melo', 'beatriz.melo@example.com', 'senha123', '16486159753', '1990-02-28', '16123456789'),
('Renato Dias', 'renato.dias@example.com', 'senha123', '16753486159', '1996-11-11', '16123456789'),
('Camila Ribeiro', 'camila.ribeiro@example.com', 'senha123', '16963852741', '1989-08-03', '16123456789'),
('Thiago Teixeira', 'thiago.teixeira@example.com', 'senha123', '16852741963', '1992-12-24', '16123456789'),
('Patrícia Fernandes', 'patricia.fernandes@example.com', 'senha123', '16741963852', '1991-01-10', '16123456789'),
('Rodrigo Gomes', 'rodrigo.gomes@example.com', 'senha123', '16963741852', '1987-06-30', '16123456789'),
('Mariana Batista', 'mariana.batista@example.com', 'senha123', '16147258369', '1998-09-22', '16123456789'),
('Fábio Freitas', 'fabio.freitas@example.com', 'senha123', '16369147258', '1994-04-16', '16123456789'),
('Isabela Cardoso', 'isabela.cardoso@example.com', 'senha123', '16258369147', '1985-11-08' ,'16123456789');
	
create table organizador (
	id_organizador int auto_increment primary key,
	nome varchar(100) not null,
	email varchar(100) not null unique,
	senha varchar(50) not null,
	telefone char(11) not null
);

insert into organizador (nome, email, senha, telefone) values
('Organização ABC', 'contato@abc.com', 'senha123', '11111222333'),
('Eventos XYZ', 'info@xyz.com', 'senha123', '11222333444'),
('Festivais BR', 'contato@festbr.com', 'senha123', '11333444555'),
('Eventos GL', 'support@gl.com', 'senha123', '11444555666'),
('Eventos JQ', 'contact@jq.com', 'senha123', '11555666777');

create table evento (
    id_evento int auto_increment primary key,
    nome varchar(100) not null,
    descricao varchar(255) not null,
    data_hora datetime not null,
    local varchar(255) not null,
    fk_id_organizador int not null,
    foreign key (fk_id_organizador) references organizador(id_organizador)
);

insert into evento (nome, data_hora, local, descricao, fk_id_organizador) values
    ('Festival de Verão', '2024-12-15', 'Praia Central', 'evento de verao', '1'),
    ('Congresso de Tecnologia', '2024-11-20', 'Centro de convencoes', 'Evento de tecnologia', '2'),
    ('Show Internacional', '2024-10-30', 'Arena Principal', 'Evento internacional', '3');

-- criação da tabela com 'tipo' como ENUM
create table ingresso (
    id_ingresso int auto_increment primary key,
    preco decimal(5,2) not null,
    tipo enum('VIP', 'Pista') not null,
    fk_id_evento int not null,
    foreign key (fk_id_evento) references evento(id_evento)
);

insert into ingresso (preco, tipo, fk_id_evento) values
    (500, 'VIP', 1),
    (150, 'Pista', 1),
    (200, 'Pista', 2),
    (600, 'VIP', 3),
    (250, 'Pista', 3);

create table compra (
    id_compra int auto_increment primary key,
    data_compra datetime default current_timestamp,
    valor_compra decimal(5,2) not null,
    fk_cpf char(11) not null,
    foreign key (fk_cpf) references usuario(cpf)
);

insert into compra (data_compra, fk_cpf, valor_compra) values
    ("2024-11-14 19:04", "16123456789", 250.50),
    ("2024-11-13 17:00", "16123456789", 300),
    ("2024-11-12 15:30", "16987654321", 450.50),
    ("2024-11-11 14:20", "16987654321", 500.0);

create table ingresso_compra(
    id_ingresso_compra int auto_increment primary key,
    quantidade int not null,
    valor decimal(5,2) not null,
    fk_id_ingresso int not null,
    foreign key (fk_id_ingresso) references ingresso(id_ingresso),
    fk_id_compra int not null,
    foreign key (fk_id_compra) references compra(id_compra)
);

insert into ingresso_compra(fk_id_compra, fk_id_ingresso, quantidade, valor) values
    (1, 4, 5, 230),
    (1, 5, 2, 600),
    (2, 1, 1, 400),
    (2, 2, 2, 250);
     
create table presenca(
    id_presenca int auto_increment primary key,
    data_hora_checkin datetime,
    fk_id_evento int not null,
    foreign key (fk_id_evento) references evento(id_evento),
    fk_id_compra int not null,
    foreign key (fk_id_compra) references compra(id_compra)
);

create table log_cancelamento (
    id_log int auto_increment primary key,
    id_compra int not null,
    data_tentativa datetime default current_timestamp,
    status varchar(50) not null
);

delimiter // 
create trigger trg_impede_cancelamento_chekin
before delete on compra
for each row
begin
    declare v_qtde_presenca int;
    select count(*) into v_qtde_presenca
        from presenca where id_compra = old.id_compra;
    where fk_id_compra = old.id_compra;

    if v_qtde_presenca > 0 then 
        signal sqlstate '45000'
        set message_text = 'Operação Negada: o usuario já realizou check-in com esse ingresso ';
    end if;
end; // 

delimiter ;