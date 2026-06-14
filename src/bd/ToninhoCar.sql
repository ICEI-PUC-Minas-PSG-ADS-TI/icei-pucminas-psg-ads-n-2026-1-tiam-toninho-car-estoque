-- Tabela: USUARIO
CREATE TABLE IF NOT EXISTS USUARIO (
    id_usuario INT NOT NULL AUTO_INCREMENT,
    nome VARCHAR(120) NOT NULL,
    
    email VARCHAR(150) NOT NULL UNIQUE,
    senha_hash VARCHAR(255) NOT NULL,
    perfil ENUM('admin', 'funcionario') NOT NULL,
    ativo BOOLEAN NOT NULL DEFAULT TRUE,
    data_cadastro DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    PRIMARY KEY (id_usuario)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

-- Tabela: PRODUTO
CREATE TABLE IF NOT EXISTS PRODUTO (
    id_produto INT NOT NULL AUTO_INCREMENT,
    codigo VARCHAR(50) NOT NULL UNIQUE,
    nome VARCHAR(120) NOT NULL,
    descricao TEXT,
    quantidade_atual INT NOT NULL DEFAULT 0,
    preco_atual DECIMAL(10,2) NOT NULL,
    estoque_minimo INT NOT NULL DEFAULT 0,
    data_cadastro DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    ultima_atualizacao DATETIME DEFAULT NULL ON UPDATE CURRENT_TIMESTAMP,
    PRIMARY KEY (id_produto)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

-- Tabela: FICHA_CARRO
CREATE TABLE IF NOT EXISTS FICHA_CARRO (
    id_ficha INT NOT NULL AUTO_INCREMENT,
    placa VARCHAR(10) NOT NULL,
    modelo VARCHAR(100) NOT NULL,
    ano INT,
    nome_cliente VARCHAR(120) NOT NULL,
    data_atendimento DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    observacoes TEXT,
    PRIMARY KEY (id_ficha)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

-- Tabela: MOVIMENTACAO
CREATE TABLE IF NOT EXISTS MOVIMENTACAO (
    id_movimentacao INT NOT NULL AUTO_INCREMENT,
    id_produto INT NOT NULL,
    id_usuario INT NOT NULL,
    id_ficha_carro INT NULL,
    tipo ENUM('entrada', 'saida', 'baixa') NOT NULL,
    quantidade INT NOT NULL,
    data_hora DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    motivo TEXT,
    PRIMARY KEY (id_movimentacao),
    FOREIGN KEY (id_produto) REFERENCES PRODUTO(id_produto) ON DELETE RESTRICT,
    FOREIGN KEY (id_usuario) REFERENCES USUARIO(id_usuario) ON DELETE RESTRICT,
    FOREIGN KEY (id_ficha_carro) REFERENCES FICHA_CARRO(id_ficha) ON DELETE SET NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

-- Tabela: HISTORICO_PRECO
CREATE TABLE IF NOT EXISTS HISTORICO_PRECO (
    id_historico_preco INT NOT NULL AUTO_INCREMENT,
    id_produto INT NOT NULL,
    id_usuario INT NOT NULL,
    preco_anterior DECIMAL(10,2) NOT NULL,
    preco_novo DECIMAL(10,2) NOT NULL,
    data_alteracao DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    motivo TEXT,
    PRIMARY KEY (id_historico_preco),
    FOREIGN KEY (id_produto) REFERENCES PRODUTO(id_produto) ON DELETE RESTRICT,
    FOREIGN KEY (id_usuario) REFERENCES USUARIO(id_usuario) ON DELETE RESTRICT
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

-- Índices para melhor performance em consultas frequentes
CREATE INDEX idx_movimentacao_produto ON MOVIMENTACAO (id_produto);
CREATE INDEX idx_movimentacao_usuario ON MOVIMENTACAO (id_usuario);
CREATE INDEX idx_movimentacao_ficha ON MOVIMENTACAO (id_ficha_carro);
CREATE INDEX idx_historico_produto ON HISTORICO_PRECO (id_produto);
CREATE INDEX idx_historico_usuario ON HISTORICO_PRECO (id_usuario);
CREATE INDEX idx_produto_codigo ON PRODUTO (codigo);
CREATE INDEX idx_usuario_email ON USUARIO (email);
