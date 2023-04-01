INSERT INTO usuarios(nome, email, idade) VALUES(
    "Tânia Cristina Vieira da Silva",
    "taniamodafitness@gmail.com",
    43
);

INSERT INTO usuarios(nome, email, idade) VALUES(
    "Roberto Carlos Almeida Godoy",
    "robalmeidagodoy@yahoo.com",
    38
);

INSERT INTO usuarios(nome, email, idade) VALUES(
    "Lucas Gilberto Silva",
    "luquinha@gilberto.silva",
    15
);

INSERT INTO usuarios(nome, email, idade) VALUES(
    "Uellington Fábio Martins",
    "wellifabio@gmail.com",
    45
);

INSERT INTO usuarios(nome, email, idade) VALUES(
    "Elon Musk",
    "IHaveASupraAndYouNot@I'mRich.com",
    51
);

INSERT INTO usuarios(nome, email, idade) VALUES(
    "Vinicius Vieira de Souza",
    "viniciussouza130705@gmail.com",
    17
);

INSERT INTO usuarios(nome, email, idade) VALUES(
    "Felipe Vieira de Souza",
    "felipevieira040712@gmail.com",
    10
);

INSERT INTO usuarios(nome, email, idade) VALUES(
    "Kaique Alves de Lima",
    "kaiquealves@gmail.com",
    16
);


-- Deletar alguma linha
DELETE FROM usuarios WHERE nome = "Uellington Fábio Martins" -- Nesse caso, ele irá deletar os usuários com o nome colocado
DELETE FROM usuarios WHERE idade <= 18; -- todos os usuarios menores de 18 anos serão apagados

-- atualizar os dados
UPDATE usuarios SET nome = "Vinii" WHERE nome = "Vinicius Vieira de Souza"; -- the user named Vinicius Vieira de Souza irá ser chamado de Viniii
UPDATE usuarios SET idade = 10 WHERE nome LIKE 'Felipe%';
UPDATE usuarios SET email = 'viniciusvieira130705@gmail.com' WHERE nome LIKE 'Vinii%';

-- nota: é muito importante usar o DELETE e o UPDATE junto com o WHILE,
-- dessa forma, sempre teremos uma condição e evitar de alterar ou
-- deletar a tabela inteira