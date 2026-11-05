CREATE DATABASE db_retrogames;

USE db_retrogames;
SELECT DATABASE();

CREATE TABLE jogos (
    id INT AUTO_INCREMENT PRIMARY KEY,
    titulo VARCHAR(100) NOT NULL,
    plataforma VARCHAR(50) NOT NULL,
    desenvolvedora VARCHAR(100) NOT NULL,
    imagem_url VARCHAR(255) NOT NULL,
    preco DECIMAL(10, 2) NOT NULL,
    data_cadastro TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

INSERT INTO jogos (titulo, plataforma, desenvolvedora, imagem_url, preco)
VALUES
('Super Mario World', 'Super Nintendo', 'Nintendo', 'https://example.com/mario.jpg', 99.90),
('Sonic the Hedgehog', 'Mega Drive', 'Sega', 'https://example.com/sonic.jpg', 89.90),
('Papa''s Freezeria', 'PC', 'Flipline Studios', 'https://example.com/papas-freezeria.jpg', 29.90);

SELECT * FROM jogos;