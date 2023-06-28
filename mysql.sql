-- criar uma tabela de usuarios
create table usuarios (
    id int auto_increment primary key,
    nome varchar(50) not null,
    sobrenome varchar(50) not null,
    email varchar(50) not null,
    senha varchar(50) not null,
    confirmaSenha varchar(50) not null
)

-- inserir dados na tabela
insert into usuarios (nome, sobrenome, email, senha, confirmaSenha) values ('Fernando', 'Andrade', 'pupyg@gmail.com', '123456', '123456')
