-- MySQL dump 10.13  Distrib 8.0.40, for Win64 (x86_64)
--
-- Host: localhost    Database: board
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
-- Table structure for table `files`
--

DROP TABLE IF EXISTS `files`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `files` (
  `id` int NOT NULL AUTO_INCREMENT,
  `file_name` varchar(250) NOT NULL,
  `file_path` varchar(250) NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=22 DEFAULT CHARSET=utf8mb3;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `files`
--

LOCK TABLES `files` WRITE;
/*!40000 ALTER TABLE `files` DISABLE KEYS */;
INSERT INTO `files` VALUES (1,'포뇨.jpg','7282a0b3-b498-405e-88c1-4b5b680f2c9c.jpg'),(2,'토르.jpg','13386298-5649-4651-9f86-0c85f1d05fd9.jpg'),(3,'커비.jpg','ca39dc4a-f808-49ae-8c9c-21d4f25c5e04.jpg'),(4,'4k.jpg','5a329356-8c0a-40c5-a892-90ae75af5316.jpg'),(5,'10MB.jpg','0351f05d-1000-48cf-a2dd-b41dcb1375bc.jpg'),(6,'test.jpg','6d088528-e550-43d0-9334-6ef7c3245732.jpg'),(7,'가오나시.jpg','1a42e23c-fa55-4123-8753-2b3f1d61d6e5.jpg'),(8,'스파이더맨.jpg','9beacf65-55ce-4241-8de2-a4eb40e34435.jpg'),(9,'4k.jpg','74d7a90e-6f10-48cd-93df-7368f6a85ec8.jpg'),(10,'4k.jpg','eb06de30-1445-415a-abde-f91416715729.jpg'),(11,'포뇨.jpg','e7945137-8f5e-4a46-8060-084274ff516a.jpg'),(12,'포뇨.jpg','8df76f77-4f82-430c-9d74-91e64adfc0ca.jpg'),(13,'커비.jpg','bed73515-13e1-43cd-b9d0-55433e5af60c.jpg'),(14,'test.jpg','0832a828-a12b-43c6-809d-4e861a05f924.jpg'),(15,'커비.jpg','50b89524-415a-40cb-9f27-f701902c918b.jpg'),(16,'커비.jpg','b2b2f550-4154-4e37-a7a4-cf93e0447e70.jpg'),(17,'4k.jpg','b4b2f4b4-e7e9-4b24-92cc-b8ffeb8f5a29.jpg'),(18,'토르.jpg','0666a2f7-fe9a-4a54-a267-9505878a5b21.jpg'),(19,'포뇨.jpg','00bdd126-185d-48e1-b233-cd895c64a369.jpg'),(20,'10MB.jpg','c7bdc901-458c-41f8-8bff-9600f295c063.jpg'),(21,'포뇨.jpg','87c1bf82-0e82-4bb6-b1ff-722418081121.jpg');
/*!40000 ALTER TABLE `files` ENABLE KEYS */;
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
