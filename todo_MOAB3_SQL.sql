CREATE DATABASE  IF NOT EXISTS `todo` /*!40100 DEFAULT CHARACTER SET utf8 */;
USE `todo`;
-- MySQL dump 10.13  Distrib 5.7.12, for Win64 (x86_64)
--
-- Host: localhost    Database: todo
-- ------------------------------------------------------
-- Server version	5.7.16-log

/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8 */;
/*!40103 SET @OLD_TIME_ZONE=@@TIME_ZONE */;
/*!40103 SET TIME_ZONE='+00:00' */;
/*!40014 SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0 */;
/*!40014 SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0 */;
/*!40101 SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='NO_AUTO_VALUE_ON_ZERO' */;
/*!40111 SET @OLD_SQL_NOTES=@@SQL_NOTES, SQL_NOTES=0 */;

--
-- Table structure for table `session_keys`
--

DROP TABLE IF EXISTS `session_keys`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `session_keys` (
  `user_id` int(11) NOT NULL,
  `session_key` int(11) NOT NULL,
  PRIMARY KEY (`session_key`),
  UNIQUE KEY `session_key_UNIQUE` (`session_key`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `session_keys`
--

LOCK TABLES `session_keys` WRITE;
/*!40000 ALTER TABLE `session_keys` DISABLE KEYS */;
/*!40000 ALTER TABLE `session_keys` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `todo_tasks`
--

DROP TABLE IF EXISTS `todo_tasks`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `todo_tasks` (
  `idtodo_tasks` int(11) NOT NULL AUTO_INCREMENT,
  `todo` int(11) DEFAULT NULL,
  `task` varchar(45) DEFAULT NULL,
  `isDone` tinyint(4) DEFAULT NULL,
  PRIMARY KEY (`idtodo_tasks`),
  KEY `todo_idx` (`todo`),
  CONSTRAINT `todo` FOREIGN KEY (`todo`) REFERENCES `todos` (`idtodos`) ON DELETE NO ACTION ON UPDATE NO ACTION
) ENGINE=InnoDB AUTO_INCREMENT=26 DEFAULT CHARSET=utf8 COMMENT='tasks referenced to a single todo';
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `todo_tasks`
--

LOCK TABLES `todo_tasks` WRITE;
/*!40000 ALTER TABLE `todo_tasks` DISABLE KEYS */;
INSERT INTO `todo_tasks` VALUES (7,4,'DB Abfrage für Todos besser machen',1),(8,4,'Längere Texte besser anzeigen',1),(10,4,'UserID durch die App reichen',1),(11,4,'UserID in der API berücksichtigen',1),(13,4,'Zurückbuttons implementieren',1),(14,4,'SignIn',1),(15,4,'Text in updateTask und Todo übergeben',1);
/*!40000 ALTER TABLE `todo_tasks` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `todos`
--

DROP TABLE IF EXISTS `todos`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `todos` (
  `idtodos` int(11) NOT NULL AUTO_INCREMENT,
  `user` int(11) DEFAULT NULL,
  `topic` varchar(45) DEFAULT NULL,
  `description` varchar(500) DEFAULT NULL,
  `isDone` tinyint(4) DEFAULT NULL,
  PRIMARY KEY (`idtodos`),
  KEY `user_idx` (`user`),
  CONSTRAINT `user` FOREIGN KEY (`user`) REFERENCES `user` (`iduser`) ON DELETE NO ACTION ON UPDATE NO ACTION
) ENGINE=InnoDB AUTO_INCREMENT=22 DEFAULT CHARSET=utf8 COMMENT='Table for all todos referenced to useres';
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `todos`
--

LOCK TABLES `todos` WRITE;
/*!40000 ALTER TABLE `todos` DISABLE KEYS */;
INSERT INTO `todos` VALUES (4,1,'Todo App verbessern','Anpassungen machen damit die usability und funktionalität besser werden',1);
/*!40000 ALTER TABLE `todos` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `user`
--

DROP TABLE IF EXISTS `user`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `user` (
  `iduser` int(11) NOT NULL AUTO_INCREMENT,
  `username` varchar(45) DEFAULT NULL,
  `password` varchar(32) NOT NULL,
  PRIMARY KEY (`iduser`),
  UNIQUE KEY `iduser_UNIQUE` (`iduser`),
  UNIQUE KEY `username_UNIQUE` (`username`)
) ENGINE=InnoDB AUTO_INCREMENT=9 DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `user`
--

LOCK TABLES `user` WRITE;
/*!40000 ALTER TABLE `user` DISABLE KEYS */;
INSERT INTO `user` VALUES (1,'Slohrsh','passwort');
/*!40000 ALTER TABLE `user` ENABLE KEYS */;
UNLOCK TABLES;
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2017-01-31 13:47:41
