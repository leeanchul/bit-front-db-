-- MySQL dump 10.13  Distrib 8.0.40, for Win64 (x86_64)
--
-- Host: localhost    Database: movie
-- ------------------------------------------------------
-- Server version	8.0.40

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
-- Table structure for table `movie`
--

DROP TABLE IF EXISTS `movie`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `movie` (
  `id` int NOT NULL AUTO_INCREMENT,
  `title` varchar(45) NOT NULL,
  `director` varchar(45) NOT NULL,
  `content` varchar(45) NOT NULL,
  `entry_date` datetime DEFAULT CURRENT_TIMESTAMP,
  `modify_date` datetime DEFAULT CURRENT_TIMESTAMP,
  `author` varchar(45) NOT NULL,
  `file_name` varchar(255) DEFAULT NULL,
  `file_path` varchar(255) DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=29 DEFAULT CHARSET=utf8mb3;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `movie`
--

LOCK TABLES `movie` WRITE;
/*!40000 ALTER TABLE `movie` DISABLE KEYS */;
INSERT INTO `movie` VALUES (1,'영화1','안철','재밌는영화','2025-01-10 18:24:24','2025-01-10 18:24:24','a',NULL,NULL),(2,'영화2','안촐랑','무서운영화','2025-01-10 18:24:36','2025-01-10 18:24:36','a',NULL,NULL),(3,'영화3','철이','슬픈영화','2025-01-10 18:24:46','2025-01-10 18:24:46','a',NULL,NULL),(7,'ㅅㄷ','ㅅㄷ','ㅅㄷ','2025-02-01 18:12:50','2025-02-01 18:12:50','a',NULL,NULL),(8,'test0','test0','test0','2025-02-01 18:14:05','2025-02-01 18:14:05','a',NULL,NULL),(9,'test1','test1','test','2025-02-01 18:14:47','2025-02-01 18:14:47','a',NULL,NULL),(10,'test2','test2','test2','2025-02-01 18:17:27','2025-02-01 18:17:27','a',NULL,NULL),(11,'test3','test3','test3','2025-02-01 18:17:52','2025-02-01 18:17:52','a',NULL,NULL),(12,'test999','test123','test999','2025-02-01 18:19:00','2025-02-01 18:19:00','a',NULL,NULL),(16,'test','test','tes','2025-02-02 20:17:17','2025-02-02 20:17:17','a',NULL,NULL),(17,'test123','test213','test1123','2025-02-02 20:23:30','2025-02-02 20:23:30','a',NULL,NULL),(18,'ㅂㅈㄷ','ㅂㅈㄷ','ㅂㅈㄷ','2025-02-03 19:55:22','2025-02-03 19:55:22','t',NULL,NULL),(19,'ㅅㄷ','ㅅㄷ','ㅅㄷ','2025-02-03 19:56:28','2025-02-03 19:56:28','t',NULL,NULL),(22,'ㅅ','ㅅ','ㅅ','2025-02-03 20:24:17','2025-02-03 20:24:17','t',NULL,NULL),(23,'ㅅ','ㅂ','ㅅ','2025-02-03 20:24:50','2025-02-03 20:24:50','t',NULL,NULL),(24,'이미지','test','제발','2025-02-03 20:43:08','2025-02-03 20:43:08','t','커비.jpg','6bbf8653-05db-4a95-b07b-646f0565be7f.jpg'),(25,'ㅂㅈㄷ','ㅂㅈㄷ','ㅂㅈㄷ','2025-02-03 20:56:36','2025-02-03 20:56:36','t','4k.jpg','f20fa8ff-da2b-4355-a611-b962eb36f79c.jpg'),(26,'ㅅㄷㄴㅅ','ㅅㄷㄴㅅ','ㅅㄷㄴ','2025-02-03 20:56:47','2025-02-03 20:56:47','t','10MB.jpg','42d9d4c3-0e4d-4e96-80ad-fa81115ce2a0.jpg'),(27,'test','test','test','2025-02-03 20:58:01','2025-02-03 20:58:01','t','가오나시.jpg','6ec18fb8-3cb7-491c-8c14-861a96aa7f4a.jpg'),(28,'별의 커비(원작)','닌텐도','커비가 변신한다고?','2025-02-04 09:12:20','2025-02-04 09:12:20','a','커비.jpg','b440e2bc-36e3-491e-bb23-f43ca6a91a0b.jpg');
/*!40000 ALTER TABLE `movie` ENABLE KEYS */;
UNLOCK TABLES;
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2025-02-04 20:21:22
