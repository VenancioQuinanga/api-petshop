CREATE DATABASE  IF NOT EXISTS `db_dev` /*!40100 DEFAULT CHARACTER SET latin1 */;
USE `db_dev`;
-- MySQL dump 10.13  Distrib 8.0.32, for Win64 (x86_64)
--
-- Host: localhost    Database: db_dev
-- ------------------------------------------------------
-- Server version	5.7.14

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
-- Table structure for table `tb_categories`
--

DROP TABLE IF EXISTS `tb_categories`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `tb_categories` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `category` varchar(255) NOT NULL,
  `createdAt` datetime NOT NULL,
  `updatedAt` datetime NOT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `category` (`category`)
) ENGINE=InnoDB AUTO_INCREMENT=3 DEFAULT CHARSET=latin1;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `tb_categories`
--

LOCK TABLES `tb_categories` WRITE;
/*!40000 ALTER TABLE `tb_categories` DISABLE KEYS */;
INSERT INTO `tb_categories` VALUES (1,'Administrador','2024-07-18 16:18:33','2024-07-18 16:18:33'),(2,'Funcionário','2024-07-18 16:19:14','2024-07-18 16:19:14');
/*!40000 ALTER TABLE `tb_categories` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `tb_families`
--

DROP TABLE IF EXISTS `tb_families`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `tb_families` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `family` varchar(255) NOT NULL,
  `description` varchar(255) NOT NULL,
  `createdAt` datetime NOT NULL,
  `updatedAt` datetime NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=4 DEFAULT CHARSET=latin1;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `tb_families`
--

LOCK TABLES `tb_families` WRITE;
/*!40000 ALTER TABLE `tb_families` DISABLE KEYS */;
INSERT INTO `tb_families` VALUES (1,'Alimento','Produtos injestiveis.','2024-07-18 14:07:39','2024-07-18 14:07:39'),(2,'Brinquedos','Produtos para diversão.','2024-07-18 14:08:15','2024-07-18 14:08:15'),(3,'Anti-Pulgas','Produtos para tratamento de pulgas','2024-07-18 14:08:15','2024-07-18 14:08:15');
/*!40000 ALTER TABLE `tb_families` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `tb_genders`
--

DROP TABLE IF EXISTS `tb_genders`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `tb_genders` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `gender` varchar(255) NOT NULL,
  `createdAt` datetime NOT NULL,
  `updatedAt` datetime NOT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `gender` (`gender`)
) ENGINE=InnoDB AUTO_INCREMENT=3 DEFAULT CHARSET=latin1;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `tb_genders`
--

LOCK TABLES `tb_genders` WRITE;
/*!40000 ALTER TABLE `tb_genders` DISABLE KEYS */;
INSERT INTO `tb_genders` VALUES (1,'Homem','2024-07-18 16:36:47','2024-07-18 16:36:47'),(2,'Mulher','2024-07-18 16:36:54','2024-07-18 16:36:54');
/*!40000 ALTER TABLE `tb_genders` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `tb_products`
--

DROP TABLE IF EXISTS `tb_products`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `tb_products` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `name` varchar(255) NOT NULL,
  `description` varchar(255) NOT NULL,
  `fk_family` int(11) DEFAULT NULL,
  `fk_type` int(11) NOT NULL,
  `fk_provisioner` int(11) NOT NULL,
  `price` int(11) NOT NULL,
  `createdAt` datetime NOT NULL,
  `updatedAt` datetime NOT NULL,
  PRIMARY KEY (`id`),
  KEY `fk_family` (`fk_family`),
  KEY `fk_type` (`fk_type`),
  KEY `fk_provisioner` (`fk_provisioner`),
  CONSTRAINT `tb_products_ibfk_1` FOREIGN KEY (`fk_family`) REFERENCES `tb_families` (`id`) ON DELETE NO ACTION ON UPDATE CASCADE,
  CONSTRAINT `tb_products_ibfk_2` FOREIGN KEY (`fk_type`) REFERENCES `tb_types` (`id`) ON DELETE NO ACTION ON UPDATE CASCADE,
  CONSTRAINT `tb_products_ibfk_3` FOREIGN KEY (`fk_provisioner`) REFERENCES `tb_provisioners` (`id`) ON DELETE NO ACTION ON UPDATE CASCADE
) ENGINE=InnoDB AUTO_INCREMENT=2 DEFAULT CHARSET=latin1;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `tb_products`
--

LOCK TABLES `tb_products` WRITE;
/*!40000 ALTER TABLE `tb_products` DISABLE KEYS */;
INSERT INTO `tb_products` VALUES (1,'Sabão','Sabão anti-púlgas',3,8,2,5000,'2024-07-19 14:01:06','2024-07-19 14:01:06');
/*!40000 ALTER TABLE `tb_products` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `tb_provisioners`
--

DROP TABLE IF EXISTS `tb_provisioners`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `tb_provisioners` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `name` varchar(255) NOT NULL,
  `email` varchar(255) DEFAULT NULL,
  `phone_number` int(11) DEFAULT NULL,
  `createdAt` datetime NOT NULL,
  `updatedAt` datetime NOT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `email` (`email`),
  UNIQUE KEY `phone_number` (`phone_number`)
) ENGINE=InnoDB AUTO_INCREMENT=3 DEFAULT CHARSET=latin1;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `tb_provisioners`
--

LOCK TABLES `tb_provisioners` WRITE;
/*!40000 ALTER TABLE `tb_provisioners` DISABLE KEYS */;
INSERT INTO `tb_provisioners` VALUES (1,'josecomercio','josecomercio@gmail.com',921006782,'2024-07-18 14:11:41','2024-07-18 14:11:41'),(2,'Afonso e filhos ','afonsoefilhos@gmail.com',926140298,'2024-07-18 14:12:24','2024-07-18 14:12:24');
/*!40000 ALTER TABLE `tb_provisioners` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `tb_sales`
--

DROP TABLE IF EXISTS `tb_sales`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `tb_sales` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `fk_payment_type` int(11) NOT NULL,
  `payment` int(11) NOT NULL,
  `troco` int(11) DEFAULT NULL,
  `date` datetime NOT NULL,
  `fk_user` int(11) NOT NULL,
  `createdAt` datetime NOT NULL,
  `updatedAt` datetime NOT NULL,
  PRIMARY KEY (`id`),
  KEY `fk_payment_type` (`fk_payment_type`),
  KEY `fk_user` (`fk_user`),
  CONSTRAINT `tb_sales_ibfk_1` FOREIGN KEY (`fk_payment_type`) REFERENCES `tb_type_payments` (`id`) ON DELETE NO ACTION ON UPDATE CASCADE,
  CONSTRAINT `tb_sales_ibfk_2` FOREIGN KEY (`fk_user`) REFERENCES `tb_users` (`id`) ON DELETE NO ACTION ON UPDATE CASCADE
) ENGINE=InnoDB AUTO_INCREMENT=2 DEFAULT CHARSET=latin1;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `tb_sales`
--

LOCK TABLES `tb_sales` WRITE;
/*!40000 ALTER TABLE `tb_sales` DISABLE KEYS */;
INSERT INTO `tb_sales` VALUES (1,1,20000,5000,'2024-07-18 20:53:41',1,'2024-07-18 20:32:08','2024-07-18 20:32:08');
/*!40000 ALTER TABLE `tb_sales` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `tb_sales_products`
--

DROP TABLE IF EXISTS `tb_sales_products`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `tb_sales_products` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `fk_sale` int(11) NOT NULL,
  `fk_product` int(11) NOT NULL,
  `createdAt` datetime NOT NULL,
  `updatedAt` datetime NOT NULL,
  PRIMARY KEY (`id`),
  KEY `fk_sale` (`fk_sale`),
  KEY `fk_product` (`fk_product`),
  CONSTRAINT `tb_sales_products_ibfk_1` FOREIGN KEY (`fk_sale`) REFERENCES `tb_sales` (`id`) ON DELETE NO ACTION ON UPDATE CASCADE,
  CONSTRAINT `tb_sales_products_ibfk_2` FOREIGN KEY (`fk_product`) REFERENCES `tb_products` (`id`) ON DELETE NO ACTION ON UPDATE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=latin1;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `tb_sales_products`
--

LOCK TABLES `tb_sales_products` WRITE;
/*!40000 ALTER TABLE `tb_sales_products` DISABLE KEYS */;
/*!40000 ALTER TABLE `tb_sales_products` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `tb_stocks`
--

DROP TABLE IF EXISTS `tb_stocks`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `tb_stocks` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `fk_product` int(11) NOT NULL,
  `quantity` int(11) NOT NULL,
  `unity` int(11) NOT NULL,
  `date` datetime NOT NULL,
  `createdAt` datetime NOT NULL,
  `updatedAt` datetime NOT NULL,
  PRIMARY KEY (`id`),
  KEY `fk_product` (`fk_product`),
  CONSTRAINT `tb_stocks_ibfk_1` FOREIGN KEY (`fk_product`) REFERENCES `tb_products` (`id`) ON DELETE NO ACTION ON UPDATE CASCADE
) ENGINE=InnoDB AUTO_INCREMENT=2 DEFAULT CHARSET=latin1;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `tb_stocks`
--

LOCK TABLES `tb_stocks` WRITE;
/*!40000 ALTER TABLE `tb_stocks` DISABLE KEYS */;
INSERT INTO `tb_stocks` VALUES (1,1,3,2,'2024-07-19 17:08:15','2024-07-19 14:02:42','2024-07-19 14:59:00');
/*!40000 ALTER TABLE `tb_stocks` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `tb_type_payments`
--

DROP TABLE IF EXISTS `tb_type_payments`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `tb_type_payments` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `type` varchar(255) NOT NULL,
  `createdAt` datetime NOT NULL,
  `updatedAt` datetime NOT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `type` (`type`)
) ENGINE=InnoDB AUTO_INCREMENT=3 DEFAULT CHARSET=latin1;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `tb_type_payments`
--

LOCK TABLES `tb_type_payments` WRITE;
/*!40000 ALTER TABLE `tb_type_payments` DISABLE KEYS */;
INSERT INTO `tb_type_payments` VALUES (1,'A mão','2024-07-18 19:37:45','2024-07-18 19:37:45'),(2,'Cartão','2024-07-18 19:38:51','2024-07-18 19:38:51');
/*!40000 ALTER TABLE `tb_type_payments` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `tb_types`
--

DROP TABLE IF EXISTS `tb_types`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `tb_types` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `type` varchar(255) NOT NULL,
  `description` varchar(255) DEFAULT NULL,
  `createdAt` datetime NOT NULL,
  `updatedAt` datetime NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=9 DEFAULT CHARSET=latin1;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `tb_types`
--

LOCK TABLES `tb_types` WRITE;
/*!40000 ALTER TABLE `tb_types` DISABLE KEYS */;
INSERT INTO `tb_types` VALUES (1,'Vacina','Vacina para maiores de 2 anos','2024-07-18 14:03:27','2024-07-19 15:08:37'),(4,'Ração',NULL,'2024-07-18 14:04:16','2024-07-18 14:04:16'),(5,'Gel',NULL,'2024-07-19 13:15:01','2024-07-19 13:15:01'),(6,'Gel',NULL,'2024-07-19 13:15:54','2024-07-19 13:15:54'),(7,'Gel','Antí pulgas','2024-07-19 13:16:33','2024-07-19 13:16:33'),(8,'Sabão','Sabão','2024-07-18 14:08:15','2024-07-18 14:08:15');
/*!40000 ALTER TABLE `tb_types` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `tb_users`
--

DROP TABLE IF EXISTS `tb_users`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `tb_users` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `name` varchar(255) NOT NULL,
  `email` varchar(255) NOT NULL,
  `password` varchar(255) NOT NULL,
  `number_phone` varchar(255) NOT NULL,
  `fk_gender` int(11) NOT NULL,
  `fk_category` int(11) NOT NULL,
  `createdAt` datetime NOT NULL,
  `updatedAt` datetime NOT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `email` (`email`),
  UNIQUE KEY `number_phone` (`number_phone`),
  KEY `fk_gender` (`fk_gender`),
  KEY `fk_category` (`fk_category`),
  CONSTRAINT `tb_users_ibfk_1` FOREIGN KEY (`fk_gender`) REFERENCES `tb_genders` (`id`) ON DELETE NO ACTION ON UPDATE CASCADE,
  CONSTRAINT `tb_users_ibfk_2` FOREIGN KEY (`fk_category`) REFERENCES `tb_categories` (`id`) ON DELETE NO ACTION ON UPDATE CASCADE
) ENGINE=InnoDB AUTO_INCREMENT=3 DEFAULT CHARSET=latin1;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `tb_users`
--

LOCK TABLES `tb_users` WRITE;
/*!40000 ALTER TABLE `tb_users` DISABLE KEYS */;
INSERT INTO `tb_users` VALUES (1,'Jofinida Domingos','fina@gmail.com','agoravai','921006782',2,2,'2024-07-18 16:48:34','2024-07-18 16:48:34'),(2,'over code','code@gmail.com','agoravai','900006782',1,1,'2024-07-18 16:49:18','2024-07-18 16:49:18');
/*!40000 ALTER TABLE `tb_users` ENABLE KEYS */;
UNLOCK TABLES;
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2024-07-19 12:45:29
