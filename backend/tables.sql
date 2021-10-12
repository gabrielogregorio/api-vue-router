create database apitestusers;

create TABLE users (
    id INT PRIMARY KEY AUTO_INCREMENT,
    name varchar(50),
    email varchar(150) not null unique,
    password varchar(200) not null,
    role int not null /* 0 - usuario comun, 1 - admin.... */
)

/* Tabela de recuperação de senhas por uuid */
create table password_tokens (
    id int not null PRIMARY KEY AUTO_INCREMENT,
    token varchar(200) not null,
    user_id int not null,
    used int not null, /* 0 - token não usado! */
    FOREIGN key(user_id) REFERENCES users(id)
)
