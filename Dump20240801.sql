CREATE DATABASE  IF NOT EXISTS `tierklink` /*!40100 DEFAULT CHARACTER SET utf8 */ /*!80016 DEFAULT ENCRYPTION='N' */;
USE `tierklink`;
-- MySQL dump 10.13  Distrib 8.0.21, for Win64 (x86_64)
--
-- Host: localhost    Database: tierklink
-- ------------------------------------------------------
-- Server version	8.0.22

/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!50503 SET NAMES utf8 */;
/*!40103 SET @OLD_TIME_ZONE=@@TIME_ZONE */;
/*!40103 SET TIME_ZONE='+00:00' */;
/*!40014 SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0 */;
/*!40014 SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0 */;
/*!40101 SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='NO_AUTO_VALUE_ON_ZERO' */;
/*!40111 SET @OLD_SQL_NOTES=@@SQL_NOTES, SQL_NOTES=0 */;

--
-- Table structure for table `ano_economico`
--

DROP TABLE IF EXISTS `ano_economico`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `ano_economico` (
  `id_ano_economico` int NOT NULL AUTO_INCREMENT,
  `descricao` varchar(30) DEFAULT NULL,
  `data_inicio` date DEFAULT NULL,
  `data_fim` date DEFAULT NULL,
  PRIMARY KEY (`id_ano_economico`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `ano_economico`
--

LOCK TABLES `ano_economico` WRITE;
/*!40000 ALTER TABLE `ano_economico` DISABLE KEYS */;
/*!40000 ALTER TABLE `ano_economico` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `ano_economico`
--
-- Tabela adicional

DROP TABLE IF EXISTS `genero`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `genero` (
  `id_genero` int NOT NULL AUTO_INCREMENT,
  `genero` varchar(20) DEFAULT NULL,
  PRIMARY KEY (`id_genero`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `genero`
--

LOCK TABLES `genero` WRITE;
/*!40000 ALTER TABLE `cliente` DISABLE KEYS */;
/*!40000 ALTER TABLE `cliente` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `categoria`
--
-- Tabela adicional

DROP TABLE IF EXISTS `categoria`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `categoria` (
  `id_categoria` int NOT NULL AUTO_INCREMENT,
  `categoria` varchar(20) DEFAULT NULL,
  PRIMARY KEY (`id_categoria`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `categoria`
--

LOCK TABLES `categoria` WRITE;
/*!40000 ALTER TABLE `cliente` DISABLE KEYS */;
/*!40000 ALTER TABLE `cliente` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `tipo_pagamento`
--
-- Tabela adicional

DROP TABLE IF EXISTS `tipo_pagamento`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `tipo_pagamento` (
  `id_tipo_pagamento` int NOT NULL AUTO_INCREMENT,
  `tipo` varchar(20) DEFAULT NULL,
  PRIMARY KEY (`id_tipo_pagamento`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `tipo_pagamento`
--

LOCK TABLES `tipo_pagamento` WRITE;
/*!40000 ALTER TABLE `cliente` DISABLE KEYS */;
/*!40000 ALTER TABLE `cliente` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `familia`
--
-- Tabela adicional

DROP TABLE IF EXISTS `familia`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `familia` (
  `id_familia` int NOT NULL AUTO_INCREMENT,
  `familia` varchar(20) DEFAULT NULL,
  `descricao` varchar(30) DEFAULT NULL,
  PRIMARY KEY (`id_familia`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `familia`
--

LOCK TABLES `familia` WRITE;
/*!40000 ALTER TABLE `cliente` DISABLE KEYS */;
/*!40000 ALTER TABLE `cliente` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `tipo`
--
-- Tabela adicional

DROP TABLE IF EXISTS `tipo`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `tipo` (
  `id_tipo` int NOT NULL AUTO_INCREMENT,
  `tipo` varchar(20) DEFAULT NULL,
  `descricao` varchar(30) DEFAULT NULL,
  PRIMARY KEY (`id_tipo`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `tipo`
--

LOCK TABLES `tipo` WRITE;
/*!40000 ALTER TABLE `cliente` DISABLE KEYS */;
/*!40000 ALTER TABLE `cliente` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `armazem`
--

DROP TABLE IF EXISTS `armazem`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `armazem` (
  `id_armazem` int NOT NULL AUTO_INCREMENT,
  `descricao` varchar(15) DEFAULT NULL /* Alterada para 30 caracteres */,
  `quantidade` int DEFAULT NULL,
  PRIMARY KEY (`id_armazem`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `armazem`
--

LOCK TABLES `armazem` WRITE;
/*!40000 ALTER TABLE `armazem` DISABLE KEYS */;
/*!40000 ALTER TABLE `armazem` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `cliente`
--

DROP TABLE IF EXISTS `cliente`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `cliente` (
  `id_cliente` int NOT NULL AUTO_INCREMENT,
  `nome` varchar(50) NOT NULL,
  `email` varchar(20) DEFAULT NULL /* Alterado para 50 caracteres */,
  `id_endereco` int DEFAULT NULL,
  `id_telefone` int DEFAULT NULL,
  `id_genero` int DEFAULT NULL /* Atributo adicional */,
  PRIMARY KEY (`id_cliente`),
  KEY `fk1` (`id_endereco`),
  KEY `fk2` (`id_telefone`),
  KEY `fk3` (`id_genero`) /* Key adicional */,
  CONSTRAINT `fk1` FOREIGN KEY (`id_endereco`) REFERENCES `endereco` (`id_endereco`),
  CONSTRAINT `fk2` FOREIGN KEY (`id_telefone`) REFERENCES `telefone` (`id_telefone`)
  CONSTRAINT `fk3` FOREIGN KEY (`id_genero`) REFERENCES `genero` (`id_genero`) /* Chave estrangeira adicional */
) ENGINE=InnoDB DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `cliente`
--

LOCK TABLES `cliente` WRITE;
/*!40000 ALTER TABLE `cliente` DISABLE KEYS */;
/*!40000 ALTER TABLE `cliente` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `endereco`
--

DROP TABLE IF EXISTS `endereco`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `endereco` (
  `id_endereco` int NOT NULL AUTO_INCREMENT,
  `bairro` varchar(20) DEFAULT NULL /* Alterado para 30 caracteres */,
  `rua` varchar(20) DEFAULT NULL /* Alterado para 30 caracteres */,
  `casa` varchar(10) DEFAULT NULL /* Alterado para 20 caracteres */,
  PRIMARY KEY (`id_endereco`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `endereco`
--

LOCK TABLES `endereco` WRITE;
/*!40000 ALTER TABLE `endereco` DISABLE KEYS */;
/*!40000 ALTER TABLE `endereco` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `fatura`
--
/*TAMANHO = A6 OU A4*/

DROP TABLE IF EXISTS `fatura`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `fatura` (
  `id_fatura` int NOT NULL AUTO_INCREMENT,
  `cod_fatura` varchar(10) NOT NULL /* Alterado para 30 caracteres */,
  `id_venda` int NOT NULL,
  PRIMARY KEY (`id_fatura`),
  UNIQUE KEY `cod_fatura_UNIQUE` (`cod_fatura`),
  KEY `fk11` (`id_venda`),
  CONSTRAINT `fk11` FOREIGN KEY (`id_venda`) REFERENCES `venda` (`id_venda`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

-- FN 2024/01 43
-- FP 2024/01 06
-- ANY Desk
--
-- Dumping data for table `fatura`
--

LOCK TABLES `fatura` WRITE;
/*!40000 ALTER TABLE `fatura` DISABLE KEYS */;
/*!40000 ALTER TABLE `fatura` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `fornecedor`
--

DROP TABLE IF EXISTS `fornecedor`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `fornecedor` (
  `id_fornecedor` int NOT NULL AUTO_INCREMENT,
  `descricao` varchar(50) NOT NULL /* Alterado para atributo nome de 50 caracteres */,
  `email` varchar(50) DEFAULT NULL /* Atributo adicional */,
  `id_telefone` int DEFAULT NULL /* Atributo adicional */,
  KEY `fk_telefone_fornecedor` (`id_telefone`) /* Key adicional */,
  CONSTRAINT `fk_telefone_fornecedor` FOREIGN KEY (`id_telefone`) REFERENCES `telefone` (`id_telefone`) /* Chave estrangeira adicional */,
  PRIMARY KEY (`id_fornecedor`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `fornecedor`
--

LOCK TABLES `fornecedor` WRITE;
/*!40000 ALTER TABLE `fornecedor` DISABLE KEYS */;
/*!40000 ALTER TABLE `fornecedor` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `funcionario`
--

DROP TABLE IF EXISTS `funcionario`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `funcionario` (
  `id_funcionario` int NOT NULL AUTO_INCREMENT,
  `nome` varchar(50) DEFAULT NULL,
  `email` varchar(50) DEFAULT NULL /* Atributo adicional */,
  `senha` varchar(20) DEFAULT NULL,
  `data_nascimento` date DEFAULT NULL,
  `funcao` enum('veterinario', 'recepcionista', 'tecnico', 'operador') DEFAULT NULL,
  `id_genero` int DEFAULT NULL /* Atributo adicional */,
  `id_categoria` int DEFAULT NULL /* Atributo adicional */,
  `id_telefone` int DEFAULT NULL,
  `id_endereco` int DEFAULT NULL,
  PRIMARY KEY (`id_funcionario`),
  KEY `fk_genero_funcionario` (`id_genero`) /* Key adicional */,
  KEY `fk_categoria` (`id_categoria`) /* Key adicional */,
  KEY `fk6` (`id_telefone`),
  KEY `fk7` (`id_endereco`),
  CONSTRAINT `fk5` FOREIGN KEY (`id_categoria`) REFERENCES `categoria` (`id_categoria`) /* Chave estrangeira adicional */,
  CONSTRAINT `fk_genero_funcionario` FOREIGN KEY (`id_genero`) REFERENCES `genero` (`id_genero`) /* Chave estrangeira adicional */,
  CONSTRAINT `fk6` FOREIGN KEY (`id_telefone`) REFERENCES `telefone` (`id_telefone`),
  CONSTRAINT `fk7` FOREIGN KEY (`id_endereco`) REFERENCES `endereco` (`id_endereco`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `funcionario`
--

LOCK TABLES `funcionario` WRITE;
/*!40000 ALTER TABLE `funcionario` DISABLE KEYS */;
/*!40000 ALTER TABLE `funcionario` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `historico`
--

DROP TABLE IF EXISTS `historico`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `historico` (
  `id_historico` int DEFAULT NULL,
  `data_inicio` date DEFAULT NULL,
  `data_fim` date DEFAULT NULL,
  `data_do_relatorio` date DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `historico`
--

LOCK TABLES `historico` WRITE;
/*!40000 ALTER TABLE `historico` DISABLE KEYS */;
/*!40000 ALTER TABLE `historico` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `produto`
--

DROP TABLE IF EXISTS `produto`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `produto` (
  `id_produto` int NOT NULL AUTO_INCREMENT,
  `nome` varchar(30) DEFAULT NULL,
  `preco_compra` decimal(2,0) DEFAULT NULL /* Alterado para 10,2 digitos decimais */,
  `preco_venda` decimal(6,0) NOT NULL /* Alterado para 10,2 digitos decimais */,
  `data_fabrico` date DEFAULT NULL /* Atributo adicional */,
  `data_expiracao` date DEFAULT NULL /* Atributo adicional */,
  `id_fornecedor` int NOT NULL,
  `id_tipo` int NOT NULL /* Atributo adicional */,
  `id_familia` int NOT NULL /* Atributo adicional */,
  `id_sub` int NOT NULL ,
  PRIMARY KEY (`id_produto`),
  KEY `fk_tipo` (`id_tipo`) /* Key adicional */,
  KEY `fk_familia` (`id_familia`) /* Key adicional */,
  KEY `fk8` (`id_fornecedor`),
  KEY `fk10` (`id_sub`),
  CONSTRAINT `fk10` FOREIGN KEY (`id_sub`) REFERENCES `subproduto` (`id_sub`),
  CONSTRAINT `fk8` FOREIGN KEY (`id_fornecedor`) REFERENCES `fornecedor` (`id_fornecedor`)
  CONSTRAINT `fk_tipo` FOREIGN KEY (`id_tipo`) REFERENCES `tipo` (`id_tipo`) /* Chave estrangeira adicional */,
  CONSTRAINT `fk_familia` FOREIGN KEY (`id_familia`) REFERENCES `familia` (`id_familia`) /* Chave estrangeira adicional */
) ENGINE=InnoDB DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `produto`
--

LOCK TABLES `produto` WRITE;
/*!40000 ALTER TABLE `produto` DISABLE KEYS */;
/*!40000 ALTER TABLE `produto` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `stock`
--

DROP TABLE IF EXISTS `stock`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `stock` (
  `id_stock` int NOT NULL AUTO_INCREMENT,
  `id_produto` int DEFAULT NULL,
  `quantidade_stock` int DEFAULT NULL,
  `unidade` int DEFAULT NULL /* Atributo adicional para quantidade de produtos em caixa */,
  `data_entrada` datetime DEFAULT NULL,
  PRIMARY KEY (`id_stock`),
  KEY `fk3` (`id_produto`),
  CONSTRAINT `fk3` FOREIGN KEY (`id_produto`) REFERENCES `produto` (`id_produto`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `stock`
--

LOCK TABLES `stock` WRITE;
/*!40000 ALTER TABLE `stock` DISABLE KEYS */;
/*!40000 ALTER TABLE `stock` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `subproduto`
--

DROP TABLE IF EXISTS `subproduto`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `subproduto` (
  `id_sub` int NOT NULL AUTO_INCREMENT,
  `descricao` varchar(30) DEFAULT NULL,
  PRIMARY KEY (`id_sub`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `subproduto`
--

LOCK TABLES `subproduto` WRITE;
/*!40000 ALTER TABLE `subproduto` DISABLE KEYS */;
/*!40000 ALTER TABLE `subproduto` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `tb_movimento`
--

DROP TABLE IF EXISTS `tb_movimento`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `tb_movimento` (
  `id_movimento` int NOT NULL AUTO_INCREMENT,
  `quant_movimento` int DEFAULT NULL,
  `data_movimento` datetime DEFAULT NULL,
  `id_produto` int DEFAULT NULL,
  `id_armazem` int DEFAULT NULL,
  PRIMARY KEY (`id_movimento`),
  KEY `fk4` (`id_produto`),
  KEY `fk5` (`id_armazem`), 
  CONSTRAINT `fk4` FOREIGN KEY (`id_produto`) REFERENCES `produto` (`id_produto`),
  CONSTRAINT `fk5` FOREIGN KEY (`id_armazem`) REFERENCES `armazem` (`id_armazem`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `tb_movimento`
--

LOCK TABLES `tb_movimento` WRITE;
/*!40000 ALTER TABLE `tb_movimento` DISABLE KEYS */;
/*!40000 ALTER TABLE `tb_movimento` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `telefone`
--

DROP TABLE IF EXISTS `telefone`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `telefone` (
  `id_telefone` int NOT NULL AUTO_INCREMENT,
  `tel` varchar(15) DEFAULT NULL,
  PRIMARY KEY (`id_telefone`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `telefone`
--

LOCK TABLES `telefone` WRITE;
/*!40000 ALTER TABLE `telefone` DISABLE KEYS */;
/*!40000 ALTER TABLE `telefone` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `venda`
--

DROP TABLE IF EXISTS `venda`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `venda` (
  `id_venda` int NOT NULL AUTO_INCREMENT,
  `id_cliente` int NOT NULL,
  `quantidade` int DEFAULT NULL, /* Atributo removido */,
  `valor_pagar` decimal(10,2) NOT NULL /* Alterado para 10,2 digitos decimais */,
  `troco` decimal(10,2) NOT NULL /* Atributo adicional */,
  `data_venda` datetime NOT NULL,
  `id_tipo_pagamento` int NOT NULL /* Atributo adicional */,
  `id_produto` int NOT NULL,
  `id_funcionario` int NOT NULL,
  PRIMARY KEY (`id_venda`),
  KEY `fk_tipo_pagamento` (`id_tipo_pagamento`) /* Key adicional */,
  KEY `fk9` (`id_produto`),
  KEY `fk12` (`id_funcionario`),
  CONSTRAINT `fk_tipo_pagamento` FOREIGN KEY (`id_tipo_pagamento`) REFERENCES `id_tipo_pagamento` (`tipo_pagamento`) /* Chave estrangeira adicional */,
  CONSTRAINT `fk12` FOREIGN KEY (`id_funcionario`) REFERENCES `funcionario` (`id_funcionario`),
  CONSTRAINT `fk9` FOREIGN KEY (`id_produto`) REFERENCES `produto` (`id_produto`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `venda`
--

LOCK TABLES `venda` WRITE;

--
-- Table structure for table `historico_venda`
--

DROP TABLE IF EXISTS `historico_venda`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `historico_venda` (
  `id_historico_venda` int NOT NULL AUTO_INCREMENT,
  `id_venda` int NOT NULL,
  `id_historico` int NOT NULL,
  PRIMARY KEY (`id_historico_venda`),
  KEY `fk_historico` (`id_historico`),
  KEY `fk_venda` (`id_venda`)
  CONSTRAINT `fk_historico` FOREIGN KEY (`id_historico`) REFERENCES `id_historico` (`historico`),
  CONSTRAINT `fk_venda` FOREIGN KEY (`id_venda`) REFERENCES `venda` (`id_venda`),
) ENGINE=InnoDB DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `historico_venda`
--

LOCK TABLES `historico_venda` WRITE;

/*!40000 ALTER TABLE `historico_venda` DISABLE KEYS */;
/*!40000 ALTER TABLE `historico_venda` ENABLE KEYS */;
UNLOCK TABLES;
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2024-08-01 14:13:42
