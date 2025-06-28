/*M!999999\- enable the sandbox mode */ 
-- MariaDB dump 10.19  Distrib 10.11.11-MariaDB, for osx10.19 (arm64)
--
-- Host: localhost    Database: stargate_v33
-- ------------------------------------------------------
-- Server version	11.7.2-MariaDB

/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;
/*!40103 SET @OLD_TIME_ZONE=@@TIME_ZONE */;
/*!40103 SET TIME_ZONE='+00:00' */;
/*!40014 SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0 */;
/*!40014 SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0 */;
/*!40101 SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='NO_AUTO_VALUE_ON_ZERO' */;
/*!40111 SET @OLD_SQL_NOTES=@@SQL_NOTES, SQL_NOTES=0 */;

--
-- Table structure for table `customers`
--

DROP TABLE IF EXISTS `customers`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8mb4 */;
CREATE TABLE `customers` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `customer_name` varchar(255) NOT NULL,
  `customer_code` varchar(50) NOT NULL,
  `created_at` timestamp NULL DEFAULT current_timestamp(),
  `updated_at` timestamp NULL DEFAULT current_timestamp() ON UPDATE current_timestamp(),
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=61 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `customers`
--

LOCK TABLES `customers` WRITE;
/*!40000 ALTER TABLE `customers` DISABLE KEYS */;
INSERT INTO `customers` VALUES
(2,'rgerg','gerer','2025-05-04 04:42:30','2025-05-04 04:42:30'),
(3,'Arma','1234','2025-05-04 04:48:56','2025-05-04 04:48:56'),
(5,'Fine','66666666','2025-05-04 05:23:54','2025-05-04 05:23:54'),
(6,'AY ESHEYYYYYYYY','777','2025-05-04 05:29:16','2025-05-04 05:29:16'),
(7,'rgerg','2222','2025-05-04 06:35:56','2025-05-04 06:35:56'),
(8,'Sanita','gerer','2025-05-04 12:44:39','2025-05-04 12:44:39'),
(9,'Sanita','www','2025-05-04 13:16:34','2025-05-04 13:16:34'),
(10,'Nestlee','821','2025-05-04 13:24:27','2025-05-04 13:24:27'),
(11,'Arma','821','2025-05-04 13:25:35','2025-05-04 13:25:35'),
(12,'Nestlee','234','2025-05-05 06:17:50','2025-05-05 06:17:50'),
(13,'Arma','rrr','2025-05-05 06:19:38','2025-05-05 06:19:38'),
(14,'Seniora','44444','2025-05-05 06:26:24','2025-05-05 06:26:24'),
(15,'Manaseer','55','2025-05-05 06:32:36','2025-05-05 06:32:36'),
(16,'Kessab','55','2025-05-05 06:36:07','2025-05-05 06:36:07'),
(17,'Coffee Maker','55','2025-05-05 06:38:12','2025-05-05 06:38:12'),
(18,'Sanita','44','2025-05-05 07:53:42','2025-05-05 07:53:42'),
(19,'Fine','44','2025-05-05 07:55:55','2025-05-05 07:55:55'),
(20,'Silva','33','2025-05-05 09:57:15','2025-05-05 09:57:15'),
(21,'Abo Tafesh','22','2025-05-05 10:02:59','2025-05-05 10:02:59'),
(22,'Arma','55','2025-05-05 10:59:58','2025-05-05 10:59:58'),
(23,'Nestlee','44','2025-05-05 11:02:47','2025-05-05 11:02:47'),
(24,'Arma','22','2025-05-05 13:40:28','2025-05-05 13:40:28'),
(25,'Cold Alex','88','2025-05-06 04:37:13','2025-05-06 04:37:13'),
(26,'Arma','33','2025-05-06 05:19:12','2025-05-06 05:19:12'),
(27,'Al Wazir','77','2025-05-06 05:21:16','2025-05-06 05:21:16'),
(28,'Nestlee','55','2025-05-06 05:24:47','2025-05-06 05:24:47'),
(29,'Arma','234','2025-05-06 06:37:52','2025-05-06 06:37:52'),
(30,'Arma','44','2025-05-06 06:47:14','2025-05-06 06:47:14'),
(31,'Seniora','44','2025-05-06 06:58:35','2025-05-06 06:58:35'),
(32,'Manaseer','88','2025-05-06 09:01:56','2025-05-06 09:01:56'),
(33,'fwefwef','wefefw','2025-05-06 10:13:03','2025-05-06 10:13:03'),
(34,'Fine','23','2025-05-07 05:02:49','2025-05-07 05:02:49'),
(35,'Cold Alex','23','2025-05-07 05:07:23','2025-05-07 05:07:23'),
(36,'Fine','444','2025-05-07 05:19:49','2025-05-07 05:19:49'),
(37,'Zaar','88','2025-05-07 13:40:15','2025-05-07 13:40:15'),
(38,'Tazweed','99','2025-05-07 13:42:06','2025-05-07 13:42:06'),
(39,'http://localhost:7004/','111','2025-05-07 13:44:09','2025-05-07 13:44:09'),
(40,'Nestlee','23','2025-05-09 11:40:55','2025-05-09 11:40:55'),
(41,'Cold Alex','55','2025-05-09 13:15:58','2025-05-09 13:15:58'),
(42,'Arma','23','2025-05-09 17:15:59','2025-05-09 17:15:59'),
(43,'Cold Alex','44','2025-05-11 06:52:02','2025-05-11 06:52:02'),
(44,'Seniora','55','2025-05-11 08:00:37','2025-05-11 08:00:37'),
(45,'test','23','2025-05-11 09:43:24','2025-05-11 09:43:24'),
(46,'dddd','ddd','2025-05-12 04:53:15','2025-05-12 04:53:15'),
(47,'Unilever Jordan','333333','2025-05-12 06:59:02','2025-05-12 06:59:02'),
(48,'Unilever Cypres','333333','2025-05-12 16:12:46','2025-05-12 16:12:46'),
(49,'Unilever eeeeeee','333333','2025-05-12 16:13:40','2025-05-12 16:13:40'),
(50,'Unilever qqqq','333333','2025-05-12 16:14:29','2025-05-12 16:14:29'),
(51,'Nestlee','88','2025-05-13 11:45:54','2025-05-13 11:45:54'),
(52,'Sanita','88','2025-05-13 11:59:33','2025-05-13 11:59:33'),
(53,'Sanita','3333','2025-05-13 13:13:00','2025-05-13 13:13:00'),
(54,'Unilever Egypt','333333','2025-05-13 13:27:34','2025-05-13 13:27:34'),
(55,'Molfix','23','2025-05-14 05:32:45','2025-05-14 05:32:45'),
(56,'Hendrix','23','2025-05-31 05:29:02','2025-05-31 05:29:02'),
(57,'B & G','23','2025-05-31 07:29:53','2025-05-31 07:29:53'),
(58,'Al Ameed','23','2025-05-31 07:31:46','2025-05-31 07:31:46'),
(59,'Star','11111','2025-06-02 09:24:35','2025-06-02 09:24:35'),
(60,'Molfix','55','2025-06-04 05:22:48','2025-06-04 05:22:48');
/*!40000 ALTER TABLE `customers` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `job_plies`
--

DROP TABLE IF EXISTS `job_plies`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8mb4 */;
CREATE TABLE `job_plies` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `job_number` varchar(20) NOT NULL,
  `position` int(11) NOT NULL,
  `material` varchar(50) DEFAULT NULL,
  `finish` varchar(50) DEFAULT NULL,
  `thickness` decimal(5,2) DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `job_number` (`job_number`),
  CONSTRAINT `job_plies_ibfk_1` FOREIGN KEY (`job_number`) REFERENCES `jobs` (`job_number`)
) ENGINE=InnoDB AUTO_INCREMENT=7 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `job_plies`
--

LOCK TABLES `job_plies` WRITE;
/*!40000 ALTER TABLE `job_plies` DISABLE KEYS */;
INSERT INTO `job_plies` VALUES
(3,'B60705',1,'PE','Transparent',60.00),
(4,'B60705',2,'HDPE','Colored',30.00),
(5,'B60404',1,'PET',NULL,NULL),
(6,'B60404',2,'LDPE','Matt',25.00);
/*!40000 ALTER TABLE `job_plies` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `job_status_history`
--

DROP TABLE IF EXISTS `job_status_history`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8mb4 */;
CREATE TABLE `job_status_history` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `job_number` varchar(20) NOT NULL,
  `status_type_id` int(11) NOT NULL,
  `status_date` datetime NOT NULL DEFAULT current_timestamp(),
  `user_id` int(11) DEFAULT NULL,
  `notes` text DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `job_number` (`job_number`),
  KEY `status_type_id` (`status_type_id`),
  CONSTRAINT `job_status_history_ibfk_1` FOREIGN KEY (`job_number`) REFERENCES `jobs` (`job_number`),
  CONSTRAINT `job_status_history_ibfk_2` FOREIGN KEY (`status_type_id`) REFERENCES `status_types` (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=264 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `job_status_history`
--

LOCK TABLES `job_status_history` WRITE;
/*!40000 ALTER TABLE `job_status_history` DISABLE KEYS */;
INSERT INTO `job_status_history` VALUES
(1,'B61101',16,'2025-06-12 15:44:15',23,'Planning data saved'),
(12,'B61202',1,'2025-06-12 17:13:54',23,'Auto status update'),
(13,'B61202',16,'2025-06-12 17:14:54',23,'Planning data saved'),
(14,'B61203',5,'2025-06-12 17:34:23',23,'Auto status update'),
(15,'B61203',5,'2025-06-12 17:40:34',23,'Auto status update'),
(16,'B61203',16,'2025-06-12 17:41:44',23,'Planning data saved'),
(17,'B61203',5,'2025-06-12 17:41:53',23,'Auto status update'),
(18,'B61203',16,'2025-06-12 18:00:58',23,'Status changed via softcopy approval checkbox'),
(19,'B61203',5,'2025-06-12 18:01:02',23,'Status changed via softcopy approval checkbox'),
(20,'B61203',16,'2025-06-12 18:23:39',23,'Status changed via softcopy approval checkbox'),
(21,'B61203',5,'2025-06-12 18:23:41',23,'Status changed via softcopy approval checkbox'),
(22,'B61203',16,'2025-06-12 18:54:44',23,'Status changed via softcopy approval checkbox'),
(23,'B61203',5,'2025-06-12 18:54:46',23,'Status changed via softcopy approval checkbox'),
(24,'B61301',16,'2025-06-13 13:30:14',23,'Planning data saved'),
(25,'B61301',5,'2025-06-13 13:31:06',23,'Status changed via softcopy approval checkbox'),
(26,'B61301',16,'2025-06-13 13:45:13',23,'Status changed via softcopy approval checkbox'),
(27,'B61301',5,'2025-06-13 13:45:16',23,'Status changed via softcopy approval checkbox'),
(28,'B61301',16,'2025-06-13 13:54:10',23,'Status changed via softcopy approval checkbox'),
(29,'B61301',5,'2025-06-13 13:54:12',23,'Status changed via softcopy approval checkbox'),
(30,'B61301',16,'2025-06-13 13:55:43',23,'Status changed via softcopy approval checkbox'),
(31,'B61301',5,'2025-06-13 13:55:45',23,'Status changed via softcopy approval checkbox'),
(32,'B61301',16,'2025-06-13 14:19:25',23,'Status changed via softcopy approval checkbox'),
(33,'B61301',5,'2025-06-13 14:19:29',23,'Status changed via softcopy approval checkbox'),
(42,'B61302',4,'2025-06-13 16:05:27',23,'Auto status update'),
(43,'B61302',4,'2025-06-13 16:21:05',23,'Auto status update'),
(44,'B61302',4,'2025-06-13 16:26:19',23,'Status updated after prepress save'),
(45,'B61302',4,'2025-06-13 16:38:42',23,'Status updated after prepress save'),
(46,'B61302',16,'2025-06-13 16:49:49',23,'Status changed via SC approval checkbox'),
(47,'B61302',4,'2025-06-13 16:49:52',23,'Status updated after prepress save'),
(48,'B61302',4,'2025-06-13 17:06:15',23,'Status updated to Need SC Approval'),
(49,'B61302',4,'2025-06-13 17:20:04',23,'Status updated to Need SC Approval'),
(50,'B61302',4,'2025-06-13 17:35:44',23,'Status updated to Need SC Approval'),
(51,'B61302',4,'2025-06-13 17:41:49',23,'Status updated to Need SC Approval'),
(52,'B61302',4,'2025-06-13 17:41:49',23,'Auto status update'),
(53,'B61302',16,'2025-06-13 17:52:44',23,'Planning data saved'),
(54,'B61302',16,'2025-06-13 17:52:44',23,'Auto status update'),
(55,'B61302',4,'2025-06-13 17:52:54',23,'Status updated to Need SC Approval'),
(56,'B61302',4,'2025-06-13 18:00:30',23,'Status updated to Need SC Approval'),
(57,'B61302',4,'2025-06-13 18:04:51',23,'Status updated to Need SC Approval'),
(58,'B61302',4,'2025-06-13 18:04:51',23,'Auto status update'),
(59,'B61303',16,'2025-06-13 18:05:52',23,'Planning data saved'),
(60,'B61303',16,'2025-06-13 18:05:52',23,'Auto status update'),
(61,'B61303',4,'2025-06-13 18:06:02',23,'Status updated to Need SC Approval'),
(62,'B61303',4,'2025-06-13 18:06:02',23,'Auto status update'),
(63,'B61303',4,'2025-06-13 18:29:11',23,'Status updated to Need SC Approval'),
(64,'B61303',4,'2025-06-13 18:43:16',23,'Status updated to Need SC Approval'),
(65,'B61304',16,'2025-06-13 18:43:37',23,'Planning data saved'),
(66,'B61304',16,'2025-06-13 18:43:37',23,'Auto status update'),
(67,'B61304',4,'2025-06-13 18:43:45',23,'Status updated to Need SC Approval'),
(68,'B61304',5,'2025-06-13 18:45:11',23,'Status changed via softcopy approval checkbox'),
(69,'B61304',4,'2025-06-13 18:45:13',NULL,'Status updated to Need SC Approval'),
(70,'B61304',16,'2025-06-13 18:49:23',23,'Clearing working_on_softcopy flag'),
(71,'B61304',16,'2025-06-13 18:50:38',23,'Status changed via softcopy approval checkbox'),
(72,'B61304',4,'2025-06-13 18:50:39',NULL,'Status updated to Need SC Approval'),
(73,'B61304',5,'2025-06-13 18:50:41',23,'Status changed via softcopy approval checkbox'),
(74,'B61304',4,'2025-06-13 18:50:42',NULL,'Status updated to Need SC Approval'),
(75,'B61304',4,'2025-06-13 18:50:56',23,'Status updated to Need SC Approval'),
(76,'B61304',4,'2025-06-13 18:51:22',23,'Status updated to Need SC Approval'),
(77,'B61304',4,'2025-06-13 18:51:38',23,'Status updated to Need SC Approval'),
(78,'B61304',4,'2025-06-13 18:57:19',23,'Status updated to Need SC Approval'),
(79,'B61304',5,'2025-06-13 18:57:28',23,'Status changed via softcopy approval checkbox'),
(80,'B61304',4,'2025-06-13 18:57:30',NULL,'Status updated to Need SC Approval'),
(81,'B61304',4,'2025-06-13 18:57:45',23,'Status updated to Need SC Approval'),
(82,'B61304',1,'2025-06-13 18:58:03',23,'Auto status update'),
(83,'B61304',4,'2025-06-13 18:58:53',23,'Status updated to Need SC Approval'),
(84,'B61304',5,'2025-06-13 18:59:14',23,'Status changed via softcopy approval checkbox'),
(85,'B61304',4,'2025-06-13 18:59:17',NULL,'Status updated to Need SC Approval'),
(86,'B61304',16,'2025-06-13 19:01:51',23,'Status changed via softcopy approval checkbox'),
(87,'B61304',4,'2025-06-13 19:01:53',NULL,'Status updated to Need SC Approval'),
(88,'B61304',5,'2025-06-13 19:03:02',23,'Status changed via softcopy approval checkbox'),
(89,'B61304',4,'2025-06-13 19:03:05',NULL,'Status updated to Need SC Approval'),
(90,'B61304',4,'2025-06-13 19:03:29',23,'Status updated to Need SC Approval'),
(91,'B61304',11,'2025-06-13 19:11:37',23,'Status updated via QC form'),
(92,'B61304',11,'2025-06-13 19:14:35',23,'SC approved by QC department'),
(93,'B61304',11,'2025-06-13 19:20:39',23,'SC approved by QC department'),
(94,'B61304',11,'2025-06-13 19:21:05',23,'SC approved by QC department'),
(95,'B61304',11,'2025-06-13 19:34:32',NULL,'SC Checked by QC'),
(96,'B61304',11,'2025-06-13 19:34:32',23,'SC approved by QC'),
(97,'B61305',16,'2025-06-13 19:35:37',23,'Planning data saved'),
(98,'B61305',16,'2025-06-13 19:35:37',23,'Auto status update'),
(99,'B61305',4,'2025-06-13 19:35:58',23,'Status updated to Need SC Approval'),
(100,'B61305',5,'2025-06-13 19:36:37',23,'Status changed via softcopy approval checkbox'),
(101,'B61305',4,'2025-06-13 19:36:40',NULL,'Status updated to Need SC Approval'),
(102,'B61305',11,'2025-06-13 19:37:28',NULL,'SC Checked by QC'),
(103,'B61305',11,'2025-06-13 19:37:28',23,'SC approved by QC'),
(104,'B61305',11,'2025-06-13 19:39:09',NULL,'SC Checked by QC'),
(105,'B61305',11,'2025-06-13 19:39:09',23,'SC approved by QC'),
(127,'B61306',16,'2025-06-13 20:38:32',23,'Planning data saved'),
(128,'B61306',16,'2025-06-13 20:38:32',23,'Auto status update'),
(129,'B61306',4,'2025-06-13 20:38:42',23,'Status updated to Need SC Approval'),
(130,'B61306',4,'2025-06-13 20:38:42',23,'Auto status update'),
(131,'B61306',5,'2025-06-13 20:38:56',23,'Status changed via softcopy approval checkbox'),
(132,'B61306',4,'2025-06-13 20:38:59',NULL,'Status updated to Need SC Approval'),
(133,'B61306',11,'2025-06-13 20:40:11',NULL,'SC Checked by QC'),
(134,'B61306',11,'2025-06-13 20:40:11',23,'SC approved by QC'),
(135,'B61306',11,'2025-06-13 20:50:27',NULL,'SC Checked by QC'),
(136,'B61306',11,'2025-06-13 20:50:27',23,'SC approved by QC'),
(137,'B61306',11,'2025-06-13 20:54:34',NULL,'SC Checked by QC'),
(138,'B61306',11,'2025-06-13 20:54:34',23,'SC approved by QC'),
(139,'B61306',11,'2025-06-13 20:58:55',NULL,'SC Checked by QC'),
(140,'B61306',11,'2025-06-13 20:58:55',23,'SC approved by QC'),
(141,'B61306',4,'2025-06-13 21:02:33',23,'Status updated to Need SC Approval'),
(142,'B61306',4,'2025-06-13 21:02:33',23,'Auto status update'),
(143,'B61306',11,'2025-06-13 21:04:37',NULL,'SC Checked by QC'),
(144,'B61306',11,'2025-06-13 21:04:37',23,'SC approved by QC'),
(145,'B61306',11,'2025-06-13 21:09:28',NULL,'SC Checked by QC'),
(146,'B61306',11,'2025-06-13 21:09:28',23,'SC approved by QC'),
(147,'B61306',5,'2025-06-13 21:10:06',23,'Status changed via softcopy approval checkbox'),
(148,'B61306',4,'2025-06-13 21:10:07',NULL,'Status updated to Need SC Approval'),
(149,'B61306',4,'2025-06-13 21:10:20',23,'Status updated to Need SC Approval'),
(150,'B61306',11,'2025-06-13 21:10:29',NULL,'SC Checked by QC'),
(151,'B61306',11,'2025-06-13 21:10:29',23,'SC approved by QC'),
(152,'B61306',11,'2025-06-13 21:20:38',NULL,'SC Checked by QC'),
(153,'B61306',11,'2025-06-13 21:20:38',23,'SC approved by QC'),
(154,'B61307',16,'2025-06-13 21:22:52',23,'Planning data saved'),
(155,'B61307',16,'2025-06-13 21:22:52',23,'Auto status update'),
(156,'B61307',4,'2025-06-13 21:23:00',23,'Status updated to Need SC Approval'),
(157,'B61307',4,'2025-06-13 21:23:00',23,'Auto status update'),
(158,'B61307',5,'2025-06-13 21:23:16',23,'Status changed via softcopy approval checkbox'),
(159,'B61307',4,'2025-06-13 21:23:18',NULL,'Status updated to Need SC Approval'),
(160,'B61307',11,'2025-06-13 21:23:39',NULL,'SC Checked by QC'),
(161,'B61307',11,'2025-06-13 21:23:39',23,'SC approved by QC'),
(162,'B61307',11,'2025-06-13 21:32:23',NULL,'SC Checked by QC'),
(163,'B61307',11,'2025-06-13 21:32:23',23,'SC approved by QC'),
(164,'B61307',11,'2025-06-13 21:34:16',NULL,'SC Checked by QC'),
(165,'B61307',11,'2025-06-13 21:34:16',23,'SC approved by QC'),
(166,'B61307',11,'2025-06-13 21:35:12',NULL,'SC Checked by QC'),
(167,'B61307',11,'2025-06-13 21:35:12',23,'SC approved by QC'),
(168,'B61307',11,'2025-06-13 21:42:13',NULL,'SC Checked by QC'),
(169,'B61307',11,'2025-06-13 21:42:13',23,'SC approved by QC'),
(170,'B61307',11,'2025-06-13 21:48:32',NULL,'SC Checked by QC'),
(171,'B61307',11,'2025-06-13 21:48:32',23,'SC approved by QC'),
(172,'B61306',4,'2025-06-14 07:59:50',23,'Status updated to Need SC Approval'),
(173,'B61306',4,'2025-06-14 07:59:50',23,'Auto status update'),
(174,'B61307',4,'2025-06-14 08:00:10',23,'Status updated to Need SC Approval'),
(175,'B61307',4,'2025-06-14 08:00:10',23,'Auto status update'),
(176,'B61307',11,'2025-06-14 08:07:02',23,'Status changed via Working on Cromalin checkbox'),
(177,'B61307',4,'2025-06-14 08:07:03',23,'Status updated to Need SC Approval'),
(178,'B61307',6,'2025-06-14 08:07:05',23,'Status changed via Working on Cromalin checkbox'),
(179,'B61307',4,'2025-06-14 08:07:06',23,'Status updated to Need SC Approval'),
(180,'B61307',4,'2025-06-14 08:07:07',23,'Status updated to Need SC Approval'),
(181,'B61307',4,'2025-06-14 08:07:07',23,'Auto status update'),
(182,'B61307',6,'2025-06-14 08:09:03',23,'Status changed via Working on Cromalin checkbox'),
(183,'B61307',4,'2025-06-14 08:09:04',23,'Status updated to Need SC Approval'),
(184,'B61307',4,'2025-06-14 08:09:05',23,'Status updated to Need SC Approval'),
(185,'B61307',4,'2025-06-14 08:09:05',23,'Auto status update'),
(186,'B61307',11,'2025-06-14 08:12:25',23,'Status changed via Working on Cromalin checkbox'),
(187,'B61307',4,'2025-06-14 08:12:25',23,'Status updated to Need SC Approval'),
(188,'B61307',6,'2025-06-14 08:12:28',23,'Status changed via Working on Cromalin checkbox'),
(189,'B61307',4,'2025-06-14 08:12:28',23,'Status updated to Need SC Approval'),
(190,'B61307',4,'2025-06-14 08:12:31',23,'Status updated to Need SC Approval'),
(191,'B61307',4,'2025-06-14 08:12:31',23,'Auto status update'),
(192,'B61307',11,'2025-06-14 08:13:46',23,'Status changed via Working on Cromalin checkbox'),
(193,'B61307',4,'2025-06-14 08:13:46',23,'Status updated to Need SC Approval'),
(194,'B61307',6,'2025-06-14 08:13:48',23,'Status changed via Working on Cromalin checkbox'),
(195,'B61307',4,'2025-06-14 08:13:48',23,'Status updated to Need SC Approval'),
(196,'B61307',4,'2025-06-14 08:13:51',23,'Status updated to Need SC Approval'),
(197,'B61307',4,'2025-06-14 08:13:51',23,'Auto status update'),
(198,'B61307',11,'2025-06-14 08:23:51',NULL,'SC Checked by QC'),
(199,'B61307',11,'2025-06-14 08:23:51',23,'SC approved by QC'),
(200,'B61307',8,'2025-06-14 08:26:39',23,'Status changed via Cromalin QC checkbox'),
(201,'B61307',11,'2025-06-14 08:26:41',NULL,'SC Checked by QC'),
(202,'B61307',11,'2025-06-14 08:26:41',23,'SC approved by QC'),
(203,'B61307',8,'2025-06-14 08:27:59',23,'Status changed via Cromalin QC checkbox'),
(204,'B61307',11,'2025-06-14 08:28:02',NULL,'SC Checked by QC'),
(205,'B61307',11,'2025-06-14 08:28:02',23,'SC approved by QC'),
(206,'B61307',9,'2025-06-14 08:36:51',23,'Status changed via Cromalin Approval checkbox'),
(207,'B61307',4,'2025-06-14 08:36:51',23,'Status updated to Need SC Approval'),
(208,'B61307',9,'2025-06-14 08:42:20',23,'Status changed via Cromalin Approval checkbox'),
(209,'B61307',4,'2025-06-14 08:42:20',23,'Status updated to Need SC Approval'),
(210,'B61307',4,'2025-06-14 08:42:26',23,'Status updated to Need SC Approval'),
(211,'B61307',4,'2025-06-14 08:42:26',23,'Auto status update'),
(212,'B61307',4,'2025-06-14 08:43:02',23,'Status updated to Need SC Approval'),
(213,'B61307',4,'2025-06-14 08:43:02',23,'Auto status update'),
(214,'B61307',16,'2025-06-14 08:45:27',23,'Clearing working_on_softcopy flag'),
(215,'B61307',4,'2025-06-14 08:45:27',23,'Auto status update'),
(216,'B61307',6,'2025-06-14 08:45:31',23,'Status changed via Working on Cromalin checkbox'),
(217,'B61307',4,'2025-06-14 08:45:31',23,'Status updated to Need SC Approval'),
(218,'B61307',9,'2025-06-14 08:46:35',23,'Status changed via Cromalin Approval checkbox'),
(219,'B61307',4,'2025-06-14 08:46:35',23,'Status updated to Need SC Approval'),
(220,'B61307',4,'2025-06-14 08:46:40',23,'Status updated to Need SC Approval'),
(221,'B61307',4,'2025-06-14 09:06:51',23,'Status updated to Need SC Approval'),
(222,'B61307',4,'2025-06-14 09:06:54',23,'Status updated to Need SC Approval'),
(223,'B61307',4,'2025-06-14 09:13:18',23,'Status updated to Need SC Approval'),
(224,'B61307',4,'2025-06-14 09:13:22',23,'Status updated to Need SC Approval'),
(225,'B61307',4,'2025-06-14 09:17:35',23,'Status updated to Need SC Approval'),
(226,'B61307',4,'2025-06-14 09:17:57',23,'Status updated to Need SC Approval'),
(227,'B61307',4,'2025-06-14 09:18:01',23,'Status updated to Need SC Approval'),
(228,'B61307',4,'2025-06-14 09:19:02',23,'Status updated to Need SC Approval'),
(229,'B61307',4,'2025-06-14 09:23:34',23,'Status updated to Need SC Approval'),
(230,'B61307',4,'2025-06-14 09:23:37',23,'Status updated to Need SC Approval'),
(231,'B61307',4,'2025-06-14 09:24:16',23,'Status updated to Need SC Approval'),
(232,'B61307',4,'2025-06-14 09:24:19',23,'Status updated to Need SC Approval'),
(233,'B61307',4,'2025-06-14 09:30:47',23,'Status updated to Need SC Approval'),
(234,'B61307',4,'2025-06-14 09:31:06',23,'Status updated to Need SC Approval'),
(235,'B61307',4,'2025-06-14 09:31:09',23,'Status updated to Need SC Approval'),
(236,'B61307',4,'2025-06-14 09:31:34',23,'Status updated to Need SC Approval'),
(237,'B61307',4,'2025-06-14 09:31:37',23,'Status updated to Need SC Approval'),
(238,'B61307',4,'2025-06-14 09:35:17',23,'Status updated to Need SC Approval'),
(239,'B61307',4,'2025-06-14 09:35:20',23,'Status updated to Need SC Approval'),
(240,'B61307',6,'2025-06-14 09:35:30',23,'Status changed via Working on Cromalin checkbox'),
(241,'B61307',4,'2025-06-14 09:35:30',23,'Status updated to Need SC Approval'),
(242,'B61307',9,'2025-06-14 09:35:33',23,'Status changed via Cromalin Approval checkbox'),
(243,'B61307',4,'2025-06-14 09:35:33',23,'Status updated to Need SC Approval'),
(244,'B61307',4,'2025-06-14 09:35:38',23,'Status updated to Need SC Approval'),
(245,'B61307',4,'2025-06-14 09:35:47',23,'Status updated to Need SC Approval'),
(246,'B61307',4,'2025-06-14 09:35:51',23,'Status updated to Need SC Approval'),
(247,'B61307',4,'2025-06-14 09:37:53',23,'Status updated to Need SC Approval'),
(248,'B61307',4,'2025-06-14 09:38:00',23,'Status updated to Need SC Approval'),
(249,'B61307',4,'2025-06-14 09:41:58',23,'Status updated to Need SC Approval'),
(250,'B61307',4,'2025-06-14 09:42:09',23,'Status updated to Need SC Approval'),
(251,'B61307',4,'2025-06-14 09:44:16',23,'Status updated to Need SC Approval'),
(252,'B61307',4,'2025-06-14 09:45:00',23,'Status updated to Need SC Approval'),
(253,'B61307',4,'2025-06-14 09:45:04',23,'Status updated to Need SC Approval'),
(254,'B61307',4,'2025-06-14 09:45:49',23,'Status updated to Need SC Approval'),
(255,'B61307',4,'2025-06-14 09:45:52',23,'Status updated to Need SC Approval'),
(256,'B61307',4,'2025-06-14 09:47:47',23,'Status updated to Need SC Approval'),
(257,'B61307',4,'2025-06-14 09:47:50',23,'Status updated to Need SC Approval'),
(258,'B61307',4,'2025-06-14 09:51:37',23,'Status updated to Need SC Approval'),
(259,'B61307',4,'2025-06-14 09:51:40',23,'Status updated to Need SC Approval'),
(260,'B61307',4,'2025-06-14 09:53:45',23,'Status updated to Need SC Approval'),
(261,'B61307',4,'2025-06-14 09:53:50',23,'Status updated to Need SC Approval'),
(262,'B61307',4,'2025-06-14 09:57:21',23,'Status updated to Need SC Approval'),
(263,'B61307',4,'2025-06-14 09:57:24',23,'Status updated to Need SC Approval');
/*!40000 ALTER TABLE `job_status_history` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `job_suppliers`
--

DROP TABLE IF EXISTS `job_suppliers`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8mb4 */;
CREATE TABLE `job_suppliers` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `job_number` varchar(20) NOT NULL,
  `supplier` varchar(32) NOT NULL,
  PRIMARY KEY (`id`),
  KEY `job_number` (`job_number`),
  CONSTRAINT `job_suppliers_ibfk_1` FOREIGN KEY (`job_number`) REFERENCES `jobs` (`job_number`)
) ENGINE=InnoDB AUTO_INCREMENT=2 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `job_suppliers`
--

LOCK TABLES `job_suppliers` WRITE;
/*!40000 ALTER TABLE `job_suppliers` DISABLE KEYS */;
INSERT INTO `job_suppliers` VALUES
(1,'B52201','elite');
/*!40000 ALTER TABLE `job_suppliers` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `jobs`
--

DROP TABLE IF EXISTS `jobs`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8mb4 */;
CREATE TABLE `jobs` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `customer_id` int(11) DEFAULT NULL,
  `salesman` varchar(255) DEFAULT NULL,
  `entry_date` date DEFAULT NULL,
  `job_number` varchar(50) DEFAULT NULL,
  `job_name` varchar(255) DEFAULT NULL,
  `quantity` decimal(10,2) DEFAULT NULL,
  `quantity_unit` varchar(20) DEFAULT NULL,
  `product_type` varchar(100) DEFAULT NULL,
  `width` decimal(10,2) DEFAULT NULL,
  `height` decimal(10,2) DEFAULT NULL,
  `gusset` decimal(10,2) DEFAULT NULL,
  `flap` decimal(10,2) DEFAULT NULL,
  `press_type` varchar(100) DEFAULT NULL,
  `print_orientation` varchar(100) DEFAULT NULL,
  `unwinding_direction` varchar(10) DEFAULT NULL,
  `comments` text DEFAULT NULL,
  `created_at` timestamp NULL DEFAULT current_timestamp(),
  `updated_at` timestamp NULL DEFAULT current_timestamp() ON UPDATE current_timestamp(),
  `created_by` int(11) DEFAULT NULL,
  `financial_approval` tinyint(1) DEFAULT 0,
  `technical_approval` tinyint(1) DEFAULT 0,
  `on_hold` tinyint(1) DEFAULT 0,
  `sc_sent_to_sales` tinyint(1) DEFAULT 0,
  `sc_sent_to_qc` tinyint(1) DEFAULT 0,
  `working_on_cromalin` tinyint(1) DEFAULT 0,
  `cromalin_qc_check` tinyint(1) DEFAULT 0,
  `cromalin_ready` tinyint(1) DEFAULT 0,
  `working_on_repro` tinyint(1) DEFAULT 0,
  `plates_ready` tinyint(1) DEFAULT 0,
  `sc_checked` tinyint(1) DEFAULT 0,
  `cromalin_checked` tinyint(1) DEFAULT 0,
  `plates_received` tinyint(1) DEFAULT 0,
  `plates_checked` tinyint(1) DEFAULT 0,
  `two_faces` tinyint(1) DEFAULT NULL,
  `side_gusset` tinyint(1) DEFAULT NULL,
  `bottom_gusset` tinyint(1) DEFAULT NULL,
  `hole_handle` tinyint(1) DEFAULT NULL,
  `strip_handle` tinyint(1) DEFAULT NULL,
  `printed_ply_material` varchar(50) DEFAULT NULL,
  `printed_ply_finish` varchar(50) DEFAULT NULL,
  `printed_ply_thickness` decimal(5,2) DEFAULT NULL,
  `second_ply_material` varchar(50) DEFAULT NULL,
  `second_ply_finish` varchar(50) DEFAULT NULL,
  `second_ply_thickness` decimal(5,2) DEFAULT NULL,
  `third_ply_material` varchar(50) DEFAULT NULL,
  `third_ply_finish` varchar(50) DEFAULT NULL,
  `third_ply_thickness` decimal(5,2) DEFAULT NULL,
  `fourth_ply_material` varchar(50) DEFAULT NULL,
  `fourth_ply_finish` varchar(50) DEFAULT NULL,
  `fourth_ply_thickness` decimal(5,2) DEFAULT NULL,
  `bag_options` longtext CHARACTER SET utf8mb4 COLLATE utf8mb4_bin DEFAULT NULL CHECK (json_valid(`bag_options`)),
  `flip_direction` tinyint(1) DEFAULT NULL,
  `working_on_job_study` tinyint(1) DEFAULT 0,
  `working_on_softcopy` tinyint(1) DEFAULT 0,
  PRIMARY KEY (`id`),
  KEY `customer_id` (`customer_id`),
  KEY `idx_job_number` (`job_number`),
  KEY `fk_job_creator` (`created_by`),
  CONSTRAINT `fk_job_creator` FOREIGN KEY (`created_by`) REFERENCES `users` (`id`),
  CONSTRAINT `jobs_ibfk_1` FOREIGN KEY (`customer_id`) REFERENCES `customers` (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=251 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `jobs`
--

LOCK TABLES `jobs` WRITE;
/*!40000 ALTER TABLE `jobs` DISABLE KEYS */;
INSERT INTO `jobs` VALUES
(14,10,'Administrator','2025-05-04','B50403','First Job Ever',99.00,'1000bags','4 Side',NULL,NULL,NULL,NULL,'Central Drum','Surface','B',NULL,'2025-05-04 13:24:27','2025-05-26 06:58:32',1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,0,0),
(15,11,'Ramy','2025-05-04','b50404','EEEEEEE',99.00,'1000bags','4 Side',NULL,NULL,NULL,NULL,'Stack Type','Surface','B',NULL,'2025-05-04 13:25:35','2025-05-26 06:58:32',1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,0,0),
(16,12,'Administrator','2025-05-05','B50501','Nescafe',555.00,'kg','4 Side',NULL,NULL,NULL,NULL,'Central Drum','Reverse','C',NULL,'2025-05-05 06:17:50','2025-05-26 06:58:32',1,0,0,1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,0,0),
(17,13,'Administrator','2025-05-05','B50502','Oxi Jordan 250 gm',555.00,'kg','Center Seal',NULL,NULL,NULL,NULL,'Central Drum','Reverse','C',NULL,'2025-05-05 06:19:38','2025-05-26 06:58:32',1,0,1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,0,0),
(18,14,'Administrator','2025-05-05','B50503','Rice 1kg',11.00,'1000bags','Center Seal',NULL,NULL,NULL,NULL,'Central Drum','Reverse','C',NULL,'2025-05-05 06:26:24','2025-05-26 06:58:32',1,1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,0,0),
(19,15,'Mahmoud','2025-05-05','B50504','Kitty Sand 2kg',11.00,'1000bags','Flat Bottom',NULL,NULL,NULL,NULL,'Central Drum','Reverse','C',NULL,'2025-05-05 06:32:36','2025-05-26 06:58:32',1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,0,0),
(20,16,'Administrator','2025-05-05','B50505','Petrabet 2KG',11.00,'1000bags','Flat Bottom',NULL,NULL,NULL,NULL,'Central Drum','Reverse','C',NULL,'2025-05-05 06:36:07','2025-05-26 06:58:32',1,0,1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,0,0),
(21,17,'Alaa','2025-05-05','b50506','Coffee Bag',11.00,'1000bags','Shopping Bag',NULL,NULL,NULL,NULL,'Stack Type','Reverse','C',NULL,'2025-05-05 06:38:12','2025-05-26 06:58:32',1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,0,0),
(22,18,'Mahmoud','2025-05-05','B50507','Mask Bag',11.00,'bags','Center Seal',NULL,NULL,NULL,NULL,'Central Drum','Surface','C',NULL,'2025-05-05 07:53:42','2025-05-26 06:58:32',1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,0,0),
(23,19,'Hatem','2025-05-05','B50508','Fine Fluffy',11.00,'bags','Normal Bag',NULL,NULL,NULL,NULL,'Central Drum','Surface','C',NULL,'2025-05-05 07:55:55','2025-05-26 06:58:32',1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,0,0),
(24,20,'Administrator','2025-05-05','B50509','Silva Hammas',11.00,'bags','Normal Bag',13.00,22.00,7.00,4.00,'Central Drum','Reverse','C',NULL,'2025-05-05 09:57:15','2025-05-31 12:48:46',1,0,0,1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,0,0,0),
(25,21,'Alaa','2025-05-05','B50510','Abou Tafesh Nuts 180 gm',55.00,'kg','Center Seal',NULL,NULL,NULL,NULL,'Central Drum','Reverse','B',NULL,'2025-05-05 10:02:59','2025-05-26 06:58:32',1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,0,0),
(29,25,'Mahmoud','2025-05-06','B50601','Cold Alex Okra Zero',44.00,'bags','3 Side',NULL,NULL,NULL,NULL,'Central Drum','Reverse','B',NULL,'2025-05-06 04:37:13','2025-05-26 06:58:32',1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,0,0),
(30,26,'Hatem','2025-05-06','B50602','Oxi Gel Black',555.00,'bags','3 Side Stand Up',NULL,NULL,NULL,NULL,'Central Drum','Surface','D',NULL,'2025-05-06 05:19:12','2025-05-26 06:58:32',1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,0,0),
(31,27,'Ramy','2025-05-06','B50603','Al Wazir  250gm',555.00,'bags','3 Side Stand Up',NULL,NULL,NULL,NULL,'Central Drum','Surface','D',NULL,'2025-05-06 05:21:16','2025-05-26 06:58:32',1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,0,0),
(55,28,'Hatem','2025-05-06','B50605','Nescafe Gold 250gm',11.00,'kg','3 Side',NULL,NULL,NULL,NULL,'Central Drum','Reverse','B',NULL,'2025-05-06 08:57:05','2025-05-26 06:58:32',1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,0,0),
(56,32,'Duha','2025-05-06','B50606','Kitty Sand 2kg',11.00,'1000bags','3 Side',NULL,NULL,NULL,NULL,'Central Drum','Reverse','B',NULL,'2025-05-06 09:01:56','2025-05-26 06:58:32',1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,0,0),
(97,28,'Hatem','2025-05-06','B50607','Nescafe Gold 1kg',555.00,'bags','3 Side',NULL,NULL,NULL,NULL,'Central Drum','Reverse','A',NULL,'2025-05-06 10:53:35','2025-05-26 06:58:32',1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,0,0),
(111,28,'Hatem','2025-05-06','B50608','Nescafe Gold 1kg',555.00,'bags','3 Side',NULL,NULL,NULL,NULL,'Central Drum','Reverse','A',NULL,'2025-05-06 11:27:05','2025-05-26 06:58:32',1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,0,0),
(113,28,'Hatem','2025-05-06','B50610','Nescafe Gold 2kg',555.00,'bags','3 Side',NULL,NULL,NULL,NULL,'Central Drum','Reverse','A',NULL,'2025-05-06 11:29:03','2025-05-26 06:58:32',1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,0,0),
(114,34,'Duha','2025-05-07','B50701','Fine Fluffy 550 Green',11.00,'bags','Normal Bag',NULL,NULL,NULL,NULL,'Central Drum','Reverse','A',NULL,'2025-05-07 05:02:49','2025-05-26 06:58:32',1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,0,0),
(116,35,'Amjad','2025-05-07','B50703','Cold Alex Corn 800gm',11.00,'bags','Normal Bag',NULL,NULL,NULL,NULL,'Central Drum','Reverse','A',NULL,'2025-05-07 05:07:46','2025-05-26 06:58:32',1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,0,0),
(117,36,'Amjad','2025-05-07','B50704','Fine Adult Diaper',11.00,'bags','Normal Bag',22.00,33.00,11.00,7.00,'Central Drum','Reverse','A',NULL,'2025-05-07 05:19:49','2025-05-26 06:58:32',1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,0,0),
(120,37,'Ramy','2025-05-07','B50705','Dax Green 5kg',555.00,'1000bags','3 Side',22.00,33.00,NULL,NULL,'Central Drum','Reverse','C',NULL,'2025-05-07 13:40:15','2025-05-26 06:58:32',1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,0,0),
(121,38,'Alaa','2025-05-07','b50706','Tazweed Bag',555.00,'1000bags','3 Side',22.00,33.00,NULL,NULL,'Stack Type','Reverse','C',NULL,'2025-05-07 13:42:06','2025-05-26 06:58:32',1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,0,0),
(122,39,'Amjad','2025-05-07','b50707','Letwal Orange',555.00,'1000bags','4 Side',22.00,33.00,12.00,NULL,'Stack Type','Reverse','C',NULL,'2025-05-07 13:44:09','2025-05-26 06:58:32',1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,0,0),
(124,41,'Hatem','2025-05-09','B50902','Coffee Bag',555.00,'bags','2 Side',22.00,11.00,NULL,NULL,'Central Drum','Reverse','B',NULL,'2025-05-09 13:15:58','2025-05-26 06:58:32',1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,0,0),
(131,42,'Hatem','2025-05-09','B50903','Oxi Jordan 250 gm',555.00,'bags','3 Side K',NULL,NULL,NULL,NULL,'Central Drum','Surface','B',NULL,'2025-05-09 17:15:59','2025-05-26 06:58:32',NULL,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,0,0),
(135,41,'Hatem','2025-05-09','B50904','Coffee Bag',555.00,'bags','2 Side',22.00,11.00,NULL,NULL,'Central Drum','Reverse','B',NULL,'2025-05-09 17:46:02','2025-05-26 06:58:32',NULL,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,0,0),
(139,43,'Amjad','2025-05-11','B51102','Rice 1kg',11.00,'bags','3 Side',22.00,33.00,NULL,NULL,'Central Drum','Reverse','B',NULL,'2025-05-11 07:01:58','2025-05-26 06:58:32',NULL,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,0,0),
(140,35,'Hatem','2025-05-11','B51103','Coffee Bag',11.00,'bags','2 Side',NULL,NULL,NULL,NULL,'Central Drum','Reverse','B',NULL,'2025-05-11 07:06:09','2025-05-26 06:58:32',NULL,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,0,0),
(143,44,'Hatem','2025-05-11','B51104','Brown Rice 2kg',11.00,'bags','3 Side',NULL,NULL,NULL,NULL,'Central Drum','Surface','C',NULL,'2025-05-11 08:00:37','2025-05-26 06:58:32',NULL,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,0,0),
(144,35,'Amjad','2025-05-11','B51105','Coffee Bag',11.00,'1000bags','3 Side',NULL,NULL,NULL,NULL,'Central Drum','Reverse','B',NULL,'2025-05-11 09:42:50','2025-05-26 06:58:32',NULL,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,0,0),
(160,35,NULL,'2025-05-12','b51202','Coffee Bag',11.00,'bags','2 Side',NULL,NULL,NULL,NULL,'Stack Type','Reverse','B',NULL,'2025-05-12 05:02:32','2025-05-26 06:58:32',NULL,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,0,0),
(161,35,'Raed Tanbouz','2025-05-12','B51203','Cold Alex Corn 800gm',11.00,'select-unit','Center Seal',NULL,NULL,NULL,NULL,'Central Drum','Surface','B',NULL,'2025-05-12 06:49:22','2025-05-26 06:58:32',NULL,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,0,0),
(162,28,'Hatem Al-Taweel','2025-05-12','B51204','Nescafe Arabica 320gm',555.00,'meters','Center Seal',NULL,NULL,NULL,NULL,'Central Drum','Reverse','C',NULL,'2025-05-12 06:55:05','2025-05-26 06:58:32',NULL,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,0,0),
(163,47,'Administrator','2025-05-12','B51205','Dove Jasmin 180gm',11.00,'1000bags','3 Side K',NULL,NULL,NULL,NULL,'Central Drum','Surface','B',NULL,'2025-05-12 06:59:02','2025-05-30 14:43:11',NULL,1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,0,0,0),
(164,47,'Kais Al-Taweel','2025-05-12','B51206','Dove Red Rose 180gm',11.00,'1000bags','3 Side K',NULL,NULL,NULL,NULL,'Central Drum','Surface','B',NULL,'2025-05-12 07:00:09','2025-05-26 06:58:32',NULL,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,0,0),
(172,47,'Administrator','2025-05-12','B51209','Dove Lavender 180gm',11.00,'1000bags','3 Side K',NULL,NULL,NULL,NULL,'Central Drum','Surface','B',NULL,'2025-05-12 15:48:53','2025-05-26 06:58:32',NULL,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,0,0),
(177,54,'Administrator','2025-05-12','B51210','Dove Oriental 180gm',11.00,'1000bags','3 Side K',NULL,NULL,NULL,NULL,'Central Drum','Surface','B',NULL,'2025-05-12 16:33:58','2025-05-26 06:58:32',NULL,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,0,0),
(183,51,'Administrator','2025-05-13','B51301','Coffee Bag',44.00,'1000bags','3 Side',22.00,33.00,NULL,NULL,'Central Drum','Surface','B',NULL,'2025-05-13 11:41:35','2025-05-26 06:58:32',NULL,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,0,0),
(184,52,'Administrator','2025-05-13','B51302','Gypsy Green 550',44.00,'1000bags','3 Side',22.00,33.00,NULL,NULL,'Central Drum','Surface','B',NULL,'2025-05-13 11:48:09','2025-05-26 06:58:32',NULL,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,0,0),
(188,55,'Administrator','2025-05-14','B51401','Molfix Diaber Size 4',11.00,'bags','Normal Bag',NULL,NULL,NULL,NULL,'Central Drum','Reverse','A',NULL,'2025-05-14 05:32:45','2025-05-26 06:58:32',NULL,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,0,0),
(190,55,'Administrator','2025-05-20','B52001','Molfix Diaber Size 4',11.00,'bags','Normal Bag',NULL,NULL,NULL,NULL,'Central Drum','Reverse','A',NULL,'2025-05-20 10:07:40','2025-05-26 06:58:32',NULL,0,1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,0,0),
(191,55,'Administrator','2025-05-21','B52101','Molfix Diaber Size 4',11.00,'bags','Normal Bag',NULL,NULL,NULL,NULL,'Central Drum','Reverse','A',NULL,'2025-05-21 10:45:10','2025-05-26 06:58:32',NULL,0,1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,0,0),
(192,55,'Administrator','2025-05-22','B52201','Molfix Diaber Size 4',11.00,'bags','Shopping Bag',22.00,33.00,NULL,NULL,'Central Drum','Reverse','A',NULL,'2025-05-22 05:48:28','2025-05-26 06:56:14',NULL,0,0,1,0,0,0,0,0,0,0,0,0,0,0,1,1,0,0,0,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,0,0),
(193,55,'Administrator','2025-05-23','B52301','Molfix Diaber Size 4',11.00,'bags','3 Side',22.00,33.00,11.00,NULL,'Central Drum','Reverse','A',NULL,'2025-05-23 16:59:09','2025-05-26 12:48:04',NULL,1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,1,0,0),
(195,32,'Administrator','2025-05-24','B52401','Kitty Sand 2kg',11.00,'1000bags','3 Side',22.00,33.00,11.00,NULL,'Central Drum','Reverse','B',NULL,'2025-05-24 11:17:36','2025-05-26 06:58:32',NULL,0,0,1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,0,0),
(196,58,'Administrator','2025-05-25','B52501','Coffee Bag',11.00,'1000bags','3 Side',33.00,22.00,NULL,NULL,'Central Drum','Reverse','B',NULL,'2025-05-25 07:26:07','2025-05-31 07:31:46',NULL,1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,1,0,0),
(197,55,'Administrator','2025-05-25','B52502','Test DDDDDDD',11.00,'1000bags','3 Side',33.00,22.00,11.00,NULL,'Central Drum','Reverse','B',NULL,'2025-05-25 08:18:59','2025-05-26 12:49:18',NULL,1,0,0,0,0,0,0,0,0,0,0,0,0,0,1,0,1,0,1,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,0,0,0),
(198,55,'Administrator','2025-05-26','B52601','Test DDDDDDD',11.00,'1000bags','3 Side',33.00,22.00,11.00,NULL,'Central Drum','Reverse','B',NULL,'2025-05-26 06:51:55','2025-05-27 10:19:11',NULL,0,1,0,0,0,0,0,0,0,0,0,0,0,0,1,0,1,1,0,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,1,0,0),
(202,57,'Administrator','2025-05-27','B52701','Adult Diaper Size 7',11.00,'1000bags','Normal Bag',33.00,22.00,11.00,5.00,'Central Drum','Reverse','B',NULL,'2025-05-27 11:20:51','2025-05-31 07:31:11',NULL,0,0,1,0,0,0,0,0,0,0,0,0,0,0,1,0,1,1,0,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,1,0,0),
(203,55,'Administrator','2025-05-27','B52702','Test Planning Checkboxs 2',11.00,'1000bags','3 Side',33.00,22.00,11.00,NULL,'Central Drum','Reverse','B',NULL,'2025-05-27 11:21:14','2025-05-31 05:19:29',NULL,1,0,0,0,0,0,0,0,0,0,0,0,0,0,1,0,0,0,0,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,1,0,0),
(204,57,'Administrator','2025-05-30','B53001','Fixing Planning Layout',11.00,'1000bags','3 Side',15.00,33.00,11.00,NULL,'Central Drum','Reverse','B',NULL,'2025-05-30 11:48:21','2025-05-31 07:30:43',NULL,0,0,1,0,0,0,0,0,0,0,0,0,0,0,1,0,0,0,0,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,1,0,0),
(206,57,'Administrator','2025-05-31','B53101','Fixing Downloading Btns',11.00,'1000bags','3 Side',15.00,33.00,11.00,NULL,'Central Drum','Reverse','B',NULL,'2025-05-31 05:18:09','2025-05-31 07:30:25',NULL,0,1,0,0,0,0,0,0,0,0,0,0,0,0,1,0,0,0,0,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,1,0,0),
(207,57,'Administrator','2025-05-31','B53102','Fixing Downloading Btns',11.00,'1000bags','3 Side',25.00,29.00,11.00,NULL,'Central Drum','Reverse','B',NULL,'2025-05-31 05:18:14','2025-05-31 07:53:21',NULL,1,0,0,0,0,0,0,0,0,0,0,0,0,0,1,0,0,0,0,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,0,0,0),
(208,56,'Administrator','2025-05-31','B53103','Fixing Server Error',11.00,'1000bags','3 Side',15.00,33.00,11.00,NULL,'Central Drum','Reverse','B',NULL,'2025-05-31 05:29:02','2025-05-31 05:29:02',NULL,0,0,0,0,0,0,0,0,0,0,0,0,0,0,1,0,0,0,0,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,1,0,0),
(209,56,'Administrator','2025-05-31','B53104','Fixing Server Error 3',11.00,'1000bags','3 Side',15.00,33.00,11.00,NULL,'Central Drum','Reverse','B',NULL,'2025-05-31 05:40:56','2025-05-31 12:59:10',NULL,0,1,0,0,0,0,0,0,0,0,0,0,0,0,1,0,0,0,0,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,1,0,0),
(213,56,'Administrator','2025-06-01','B60101','Fixing Server Error 3',11.00,'1000bags','3 Side',15.00,33.00,11.00,NULL,'Central Drum','Reverse','B',NULL,'2025-06-01 05:49:36','2025-06-01 05:49:36',NULL,0,1,0,0,0,0,0,0,0,0,0,0,0,0,1,0,0,0,0,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,1,0,0),
(214,56,'Administrator','2025-06-01','B60102','Save then Populate Colors',11.00,'1000bags','3 Side',15.00,33.00,11.00,NULL,'Central Drum','Reverse','B',NULL,'2025-06-01 05:50:15','2025-06-01 05:50:15',NULL,0,1,0,0,0,0,0,0,0,0,0,0,0,0,1,0,0,0,0,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,1,0,0),
(216,56,'Administrator','2025-06-02','B60201','Fixing Server Error',11.00,'1000bags','3 Side',15.00,33.00,11.00,NULL,'Central Drum','Reverse','B',NULL,'2025-06-02 09:21:16','2025-06-02 09:22:38',NULL,0,0,0,0,0,0,0,0,0,0,0,0,0,0,1,0,0,0,0,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,0,0,0),
(217,59,'Administrator','2025-06-02','B60202','DW Jel Lemon',5555.00,'meters','3 Side',23.00,56.00,NULL,NULL,'Central Drum','Surface','B',NULL,'2025-06-02 09:24:35','2025-06-02 09:24:35',NULL,1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,0,0,0),
(218,56,'Administrator','2025-06-02','B60203','Fixing Server Error',11.00,'1000bags','3 Side',15.00,33.00,11.00,NULL,'Central Drum','Reverse','B',NULL,'2025-06-02 13:07:18','2025-06-02 13:07:18',NULL,0,0,0,0,0,0,0,0,0,0,0,0,0,0,1,0,0,0,0,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,0,0,0),
(219,60,'Administrator','2025-06-04','B60401','Test Colors Loding... Breaking Sales Dom',23.00,'1000bags','3 Side',NULL,NULL,NULL,NULL,'Central Drum','Reverse','C',NULL,'2025-06-04 05:22:48','2025-06-04 05:22:48',NULL,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,0,0,0),
(220,60,'Administrator','2025-06-04','B60402','Test Colors Loding... Breaking Sales Dom',23.00,'1000bags','3 Side',NULL,NULL,NULL,NULL,'Central Drum','Reverse','C',NULL,'2025-06-04 05:50:43','2025-06-04 05:50:43',NULL,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,0,0,0),
(221,60,'Administrator','2025-06-04','B60403','Test Colors Loding... Breaking Sales Dom',23.00,'1000bags','3 Side',NULL,NULL,NULL,NULL,'Central Drum','Reverse','C',NULL,'2025-06-04 06:53:08','2025-06-04 06:53:08',NULL,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,0,0,0),
(222,60,'Administrator','2025-06-04','B60404','Test Colors Loding... Breaking Sales Dom',23.00,'1000bags','3 Side',25.00,34.00,NULL,NULL,'Central Drum','Reverse','C',NULL,'2025-06-04 06:55:44','2025-06-07 11:45:36',NULL,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,1,0,0),
(223,56,'Administrator','2025-05-31','B53105','Fixing Planning Layout',11.00,'select-unit','2 Side',NULL,NULL,NULL,NULL,'Central Drum','Reverse','B',NULL,'2025-06-04 18:36:08','2025-06-04 18:36:08',NULL,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,0,0,0),
(224,56,'Administrator','2025-06-07','B60701','Fixing Planning Layout',11.00,'select-unit','2 Side',NULL,NULL,NULL,NULL,'Central Drum','Reverse','B',NULL,'2025-06-07 05:43:03','2025-06-07 05:43:03',NULL,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,0,0,0),
(225,56,'Administrator','2025-06-07','B60702','Fixing Planning Layout',11.00,'select-unit','2 Side',NULL,NULL,NULL,NULL,'Central Drum','Reverse','B',NULL,'2025-06-07 05:48:54','2025-06-07 05:48:54',NULL,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,0,0,0),
(226,56,'Mahmoud Khadary','2025-06-07','B60703','Fixing Planning Layout',11.00,'select-unit','2 Side',NULL,NULL,NULL,NULL,'Central Drum','Reverse','B',NULL,'2025-06-07 05:49:21','2025-06-09 11:37:16',NULL,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,0,0,0),
(227,56,'Administrator','2025-06-07','B60704','Fixing Planning Layout',11.00,'select-unit','4 Side',12.00,23.00,8.00,NULL,'Central Drum','Reverse','B',NULL,'2025-06-07 07:25:18','2025-06-07 11:58:40',NULL,0,0,1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,0,0,0),
(228,56,'Administrator','2025-06-07','B60705','Fixing Planning Layout',11.00,'select-unit','2 Side',NULL,NULL,NULL,NULL,'Central Drum','Reverse','B',NULL,'2025-06-07 07:25:55','2025-06-07 09:09:40',NULL,1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,0,0,0),
(229,60,'Administrator','2025-06-08','b60801','Test PLANNING CHECKBOXS 2',11.00,'bags','3 Side K',NULL,NULL,NULL,NULL,'Stack Type','Reverse','A',NULL,'2025-06-08 04:28:39','2025-06-08 04:28:39',NULL,0,0,1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,0,0,0),
(230,60,'Administrator','2025-06-08','b60802','Test PLANNING CHECKBOXS 2',11.00,'bags','3 Side K',NULL,NULL,NULL,NULL,'Central Drum','Reverse','A',NULL,'2025-06-08 04:47:25','2025-06-09 05:40:43',NULL,1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,0,0,0),
(231,60,'Alaa','2025-06-08','b60803','Test PLANNING CHECKBOXS 2',11.00,'bags','3 Side K',22.00,34.00,11.00,NULL,'Central Drum','Reverse','A',NULL,'2025-06-08 10:23:29','2025-06-09 11:36:54',NULL,1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,0,0,0),
(232,60,'Maintenance User','2025-06-09','B60901','Test PLANNING CHECKBOXS 2',11.00,'bags','3 Side',22.00,34.00,11.00,NULL,'Central Drum','Reverse','A','Sales','2025-06-09 08:28:13','2025-06-10 10:44:12',NULL,0,1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,1,0,0),
(233,60,'Alaa Al-Allary','2025-06-10','B61001','Test PLANNING CHECKBOXS 2',11.00,'bags','3 Side',22.00,34.00,11.00,NULL,'Central Drum','Reverse','A','Sales','2025-06-10 10:46:06','2025-06-10 10:46:06',NULL,0,1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,1,0,0),
(234,60,'Alaa Al-Allary','2025-06-10','B61002','Test PLANNING CHECKBOXS 2',11.00,'bags','3 Side K',22.00,34.00,11.00,NULL,'Central Drum','Reverse','A','Cloned from the job b60803 & Test PLANNING CHECKBOXS 2','2025-06-10 10:58:20','2025-06-10 10:58:20',NULL,1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,0,0,0),
(236,60,'Maintenance User','2025-06-11','B61101','Test PLANNING CHECKBOXS 2',11.00,'bags','3 Side K',22.00,34.00,11.00,NULL,'Central Drum','Reverse','A',NULL,'2025-06-11 07:12:28','2025-06-12 12:44:15',NULL,1,1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,0,1,1),
(237,60,'Maintenance User','2025-06-12','B61201','Test PLANNING CHECKBOXS 2',11.00,'bags','3 Side K',22.00,34.00,11.00,NULL,'Central Drum','Surface','A',NULL,'2025-06-12 08:05:33','2025-06-12 11:40:59',NULL,1,1,0,1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,0,1,0),
(239,60,'Maintenance User','2025-06-12','B61202','Test PLANNING CHECKBOXS 2',11.00,'bags','3 Side K',22.00,34.00,11.00,NULL,'Central Drum','Reverse','A','Cloned from the job B61002 Test PLANNING CHECKBOXS 2','2025-06-12 14:13:54','2025-06-12 14:16:45',NULL,1,1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,0,1,1),
(240,60,'Maintenance User','2025-06-12','B61203','Test PLANNING CHECKBOXS 2',11.00,'bags','3 Side K',22.00,34.00,11.00,NULL,'Central Drum','Reverse','A',NULL,'2025-06-12 14:15:50','2025-06-12 15:54:49',NULL,1,1,0,0,1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,0,1,1),
(241,60,'Maintenance User','2025-06-13','B61301','Status & workflow Adjustment',11.00,'bags','3 Side K',22.00,34.00,11.00,NULL,'Central Drum','Surface','A',NULL,'2025-06-13 10:28:57','2025-06-13 11:19:33',NULL,1,1,0,0,1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,0,1,1),
(244,60,'Maintenance User','2025-06-13','B61302','Test PLANNING CHECKBOXS 2',11.00,'bags','3 Side K',22.00,34.00,11.00,NULL,'Central Drum','Reverse','A','Cloned from the job B61101 Test PLANNING CHECKBOXS 2','2025-06-13 13:05:11','2025-06-13 15:34:48',NULL,1,1,0,1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,0,1,0),
(245,60,'Maintenance User','2025-06-13','B61303','Test PLANNING CHECKBOXS 2',11.00,'bags','3 Side',22.00,34.00,11.00,NULL,'Central Drum','Reverse','A','Cloned from the job B61001 Test PLANNING CHECKBOXS 2','2025-06-13 15:05:34','2025-06-13 15:43:16',NULL,1,1,0,1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,1,1,0),
(246,60,'Maintenance User','2025-06-13','B61304','Test PLANNING CHECKBOXS 2',11.00,'bags','3 Side K',22.00,34.00,11.00,NULL,'Central Drum','Reverse','A',NULL,'2025-06-13 15:43:29','2025-06-13 16:34:32',NULL,1,1,0,1,1,0,0,0,0,0,1,0,0,0,0,0,0,0,0,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,1,1,0),
(247,60,'Maintenance User','2025-06-13','B61305','Test PLANNING CHECKBOXS 2',11.00,'bags','3 Side K',NULL,NULL,NULL,NULL,'Stack Type','Reverse','A',NULL,'2025-06-13 16:35:17','2025-06-13 16:50:46',NULL,1,1,0,1,0,0,0,0,0,0,1,0,0,0,0,0,0,0,0,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,0,1,0),
(249,60,'Maintenance User','2025-06-13','B61306','Test PLANNING CHECKBOXS 2',11.00,'bags','3 Side',22.00,34.00,11.00,NULL,'Central Drum','Reverse','A',NULL,'2025-06-13 17:38:17','2025-06-14 04:59:50',NULL,1,1,0,1,0,0,0,0,0,0,1,0,0,0,0,0,0,0,0,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,1,1,0),
(250,60,'Maintenance User','2025-06-13','B61307','Test PLANNING CHECKBOXS 2',11.00,'bags','3 Side',22.00,34.00,11.00,NULL,'Central Drum','Reverse','A',NULL,'2025-06-13 18:22:27','2025-06-14 06:57:24',NULL,0,0,0,1,0,1,0,1,1,0,1,1,1,0,0,0,0,0,0,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,1,1,0);
/*!40000 ALTER TABLE `jobs` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `planning_data`
--

DROP TABLE IF EXISTS `planning_data`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8mb4 */;
CREATE TABLE `planning_data` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `job_number` varchar(20) NOT NULL,
  `machine` varchar(50) DEFAULT NULL,
  `horizontal_count` int(11) DEFAULT 1,
  `vertical_count` int(11) DEFAULT 1,
  `flip_direction` tinyint(1) DEFAULT 0,
  `add_lines` tinyint(1) DEFAULT 0,
  `new_machine` tinyint(1) DEFAULT 0,
  `add_stagger` tinyint(1) DEFAULT 0,
  `comments` text DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT current_timestamp() ON UPDATE current_timestamp(),
  `layout_width` decimal(10,2) DEFAULT NULL,
  `sleeve` decimal(10,2) DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `job_number` (`job_number`),
  CONSTRAINT `planning_data_ibfk_1` FOREIGN KEY (`job_number`) REFERENCES `jobs` (`job_number`)
) ENGINE=InnoDB AUTO_INCREMENT=77 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `planning_data`
--

LOCK TABLES `planning_data` WRITE;
/*!40000 ALTER TABLE `planning_data` DISABLE KEYS */;
INSERT INTO `planning_data` VALUES
(1,'B52201','',1,1,0,0,0,0,'','2025-05-26 06:56:23',NULL,NULL),
(2,'B52301','',2,2,1,1,0,0,'','2025-05-27 12:54:38',NULL,NULL),
(3,'B52401','',1,1,0,0,0,0,'','2025-05-25 08:19:56',NULL,NULL),
(4,'B52501','',1,1,1,1,1,1,'','2025-05-29 14:27:59',NULL,NULL),
(5,'B52502','',1,1,1,1,0,1,'','2025-05-26 13:06:00',NULL,NULL),
(6,'B52601','',1,1,1,1,0,0,'','2025-05-29 14:28:19',NULL,NULL),
(15,'TEST01','Machine A',1,1,1,1,1,1,'All fields set to 1 (true)','2025-05-27 10:38:22',NULL,NULL),
(16,'TEST02','Machine B',1,1,0,0,0,0,'All fields set to 0 (false)','2025-05-27 10:38:22',NULL,NULL),
(17,'TEST03','Machine C',2,2,1,0,1,0,'Mixed true and false values','2025-05-27 10:38:22',NULL,NULL),
(18,'TEST04','Machine D',3,3,NULL,1,0,1,'NULL for flip_direction, other fields mixed','2025-05-27 10:38:22',NULL,NULL),
(19,'TEST05','Machine E',4,4,5,10,0,-3,'Out-of-range values (5, 10, -3)','2025-05-27 10:38:22',NULL,NULL),
(20,'TEST06','Machine F',5,5,1,0,1,0,'String values for boolean fields','2025-05-27 10:38:22',NULL,NULL),
(21,'TEST07','Machine G',6,6,1,0,1,0,'Boolean constants (TRUE/FALSE)','2025-05-27 10:38:22',NULL,NULL),
(22,'TEST08','Machine H',7,7,2,1,0,0,'Decimal values for boolean fields (1.5, 0.5)','2025-05-27 10:38:22',NULL,NULL),
(24,'TEST01','Machine A',1,1,1,1,1,1,'All fields set to 1 (true)','2025-05-27 10:51:41',NULL,NULL),
(25,'TEST02','Machine B',1,1,0,0,0,0,'All fields set to 0 (false)','2025-05-27 10:51:41',NULL,NULL),
(26,'TEST03','Machine C',2,2,1,0,1,0,'Mixed true and false values','2025-05-27 10:51:41',NULL,NULL),
(27,'TEST04','Machine D',3,3,NULL,1,0,1,'NULL for flip_direction, other fields mixed','2025-05-27 10:51:41',NULL,NULL),
(28,'TEST05','Machine E',4,4,5,10,0,-3,'Out-of-range values (5, 10, -3)','2025-05-27 10:51:41',NULL,NULL),
(29,'TEST06','Machine F',5,5,1,0,1,0,'String values for boolean fields','2025-05-27 10:51:41',NULL,NULL),
(30,'TEST07','Machine G',6,6,1,0,1,0,'Boolean constants (TRUE/FALSE)','2025-05-27 10:51:41',NULL,NULL),
(31,'TEST08','Machine H',7,7,2,1,0,0,'Decimal values for boolean fields (1.5, 0.5)','2025-05-27 10:51:41',NULL,NULL),
(32,'TEST01','Machine A',1,1,1,1,1,1,'All fields set to 1 (true)','2025-05-27 10:52:26',NULL,NULL),
(33,'TEST02','Machine B',1,1,0,0,0,0,'All fields set to 0 (false)','2025-05-27 10:52:26',NULL,NULL),
(34,'TEST03','Machine C',2,2,1,0,1,0,'Mixed true and false values','2025-05-27 10:52:26',NULL,NULL),
(35,'TEST04','Machine D',3,3,NULL,1,0,1,'NULL for flip_direction, other fields mixed','2025-05-27 10:52:26',NULL,NULL),
(36,'TEST05','Machine E',4,4,5,10,0,-3,'Out-of-range values (5, 10, -3)','2025-05-27 10:52:26',NULL,NULL),
(37,'TEST06','Machine F',5,5,1,0,1,0,'String values for boolean fields','2025-05-27 10:52:26',NULL,NULL),
(38,'TEST07','Machine G',6,6,1,0,1,0,'Boolean constants (TRUE/FALSE)','2025-05-27 10:52:26',NULL,NULL),
(39,'TEST08','Machine H',7,7,2,1,0,0,'Decimal values for boolean fields (1.5, 0.5)','2025-05-27 10:52:26',NULL,NULL),
(44,'B52701','',2,2,0,1,0,1,'','2025-05-30 13:53:31',NULL,NULL),
(45,'B52702','',2,3,1,1,1,0,'','2025-05-30 11:47:05',NULL,NULL),
(46,'B53001','',4,2,1,1,0,1,'','2025-05-30 11:49:16',NULL,NULL),
(47,'B53104','Centarl 208',4,2,1,1,0,0,'','2025-05-31 12:59:21',NULL,NULL),
(48,'B53103','',3,2,1,1,0,0,'','2025-05-31 07:52:26',NULL,NULL),
(49,'B53102','',1,3,0,1,0,0,'','2025-05-31 07:53:48',NULL,NULL),
(50,'B50509','',1,2,0,1,0,0,'','2025-05-31 12:48:58',NULL,NULL),
(51,'B60102','',3,2,1,1,0,0,'','2025-06-02 13:01:01',NULL,NULL),
(52,'B60202','Central 208',2,1,1,1,0,0,'','2025-06-02 09:26:28',NULL,NULL),
(53,'B60203','',1,1,0,0,0,0,'','2025-06-03 12:30:12',NULL,NULL),
(54,'B60101','',1,2,0,1,0,0,'','2025-06-03 11:28:34',NULL,NULL),
(55,'B60402','',1,1,0,1,0,1,'','2025-06-04 05:52:25',NULL,NULL),
(56,'B60403','',1,1,0,0,0,0,'','2025-06-04 06:53:45',NULL,NULL),
(57,'B60404','Centarl 207',2,2,1,1,0,0,'','2025-06-04 11:20:45',NULL,NULL),
(58,'B60704','Central 208',2,2,0,1,0,0,'','2025-06-07 11:58:52',NULL,NULL),
(59,'b60803','',1,3,0,1,0,0,'','2025-06-08 11:53:11',NULL,NULL),
(60,'b60802','Central 208',1,1,0,0,0,0,'','2025-06-09 05:41:03',NULL,NULL),
(61,'B60901','',3,2,1,1,0,0,'','2025-06-10 10:11:52',NULL,NULL),
(62,'B61201','',1,2,0,1,0,0,'','2025-06-12 10:49:50',NULL,NULL),
(63,'B61101','',1,1,0,0,0,0,'','2025-06-12 12:44:15',NULL,NULL),
(65,'B61202','',1,1,0,0,0,0,'','2025-06-12 14:14:54',NULL,NULL),
(66,'B61203','',1,1,0,0,0,0,'','2025-06-12 14:41:44',NULL,NULL),
(67,'B61301','',1,1,0,0,0,0,'','2025-06-13 10:30:14',NULL,NULL),
(70,'B61302','',1,1,0,0,0,0,'','2025-06-13 14:52:44',NULL,NULL),
(71,'B61303','',1,1,0,0,0,0,'','2025-06-13 15:05:52',NULL,NULL),
(72,'B61304','',1,1,1,0,0,0,'','2025-06-13 15:43:37',NULL,NULL),
(73,'B61305','',1,1,0,0,0,0,'','2025-06-13 16:35:37',NULL,NULL),
(75,'B61306','',1,1,1,0,0,0,'','2025-06-13 17:38:32',NULL,NULL),
(76,'B61307','',1,1,0,0,0,0,'','2025-06-13 18:22:52',NULL,NULL);
/*!40000 ALTER TABLE `planning_data` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `prepress_colors`
--

DROP TABLE IF EXISTS `prepress_colors`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8mb4 */;
CREATE TABLE `prepress_colors` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `job_number` varchar(20) NOT NULL,
  `color_name` varchar(50) NOT NULL,
  `color_code` varchar(20) DEFAULT NULL,
  `position` int(11) NOT NULL DEFAULT 0,
  PRIMARY KEY (`id`),
  KEY `prepress_colors_ibfk_1` (`job_number`),
  CONSTRAINT `prepress_colors_ibfk_1` FOREIGN KEY (`job_number`) REFERENCES `jobs` (`job_number`) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE=InnoDB AUTO_INCREMENT=774 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `prepress_colors`
--

LOCK TABLES `prepress_colors` WRITE;
/*!40000 ALTER TABLE `prepress_colors` DISABLE KEYS */;
INSERT INTO `prepress_colors` VALUES
(103,'B52401','Cyan',NULL,0),
(104,'B52401','Gold',NULL,1),
(109,'B53104','Cyan',NULL,0),
(110,'B53104','Yellow',NULL,1),
(111,'B53104','Black',NULL,2),
(112,'B53104','Magenta',NULL,3),
(119,'B60202','Cyan',NULL,0),
(120,'B60202','Magenta',NULL,1),
(121,'B60202','Yellow',NULL,2),
(122,'B60202','Black',NULL,3),
(123,'B60202','Custom',NULL,4),
(132,'B60102','Cyan',NULL,0),
(133,'B60102','Magenta',NULL,1),
(142,'B60201','Cyan',NULL,0),
(143,'B60201','Magenta',NULL,1),
(144,'B53101','Cyan',NULL,0),
(145,'B53101','Magenta',NULL,1),
(146,'B53101','Yellow',NULL,2),
(147,'B60101','Cyan',NULL,0),
(148,'B60101','Magenta',NULL,1),
(149,'B60101','Yellow',NULL,2),
(150,'B52502','Cyan',NULL,0),
(151,'B52502','Magenta',NULL,1),
(152,'B52502','Yellow',NULL,2),
(153,'B52502','Black',NULL,3),
(154,'B52502','376',NULL,4),
(169,'B60403','Cyan','#00FFFF',0),
(170,'B60403','Magenta','#FF00FF',1),
(184,'B60402','Yellow',NULL,0),
(560,'B60404','Cyan',NULL,0),
(561,'B60404','Magenta',NULL,1),
(562,'B60404','Yellow',NULL,2),
(563,'B60404','Black',NULL,3),
(564,'B60404','Silver',NULL,4),
(565,'B60404','Magenta',NULL,5),
(566,'B60404','Cyan',NULL,6),
(568,'B60705','Cyan',NULL,0),
(572,'B60704','Cyan',NULL,0),
(573,'B60704','Magenta',NULL,1),
(574,'B60704','Yellow',NULL,2),
(583,'b60802','Cyan',NULL,0),
(584,'b60802','Magenta',NULL,1),
(585,'b60802','Yellow',NULL,2),
(644,'b60803','Cyan',NULL,0),
(650,'B60901','Cyan',NULL,0),
(652,'B61001','Cyan',NULL,0),
(658,'B61101','Cyan',NULL,0),
(688,'B61002','Cyan',NULL,0),
(689,'B61002','Magenta',NULL,1),
(690,'B61002','Yellow',NULL,2),
(691,'B61002','Black',NULL,3),
(692,'B61002','Silver',NULL,4),
(693,'B61201','Cyan',NULL,0),
(694,'B61201','Magenta',NULL,1),
(695,'B61201','Yellow',NULL,2),
(696,'B61201','Black',NULL,3),
(698,'B61301','Cyan',NULL,0),
(723,'B61302','Cyan','#000000',0),
(726,'B61303','Cyan','#000000',0),
(734,'B61304','Cyan','#000000',0),
(744,'B61306','Cyan','#000000',0),
(773,'B61307','Cyan','#000000',0);
/*!40000 ALTER TABLE `prepress_colors` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `prepress_data`
--

DROP TABLE IF EXISTS `prepress_data`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8mb4 */;
CREATE TABLE `prepress_data` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `job_number` varchar(20) NOT NULL,
  `supplier` varchar(32) DEFAULT NULL,
  `sc_approval_image_path` varchar(255) DEFAULT NULL,
  `comments` text DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT current_timestamp() ON UPDATE current_timestamp(),
  `working_on_job_study` tinyint(1) DEFAULT 0,
  `sc_sent_to_sales` tinyint(1) DEFAULT 0,
  `sc_sent_to_qc` tinyint(1) DEFAULT 0,
  `working_on_cromalin` tinyint(1) DEFAULT 0,
  `cromalin_qc_check` tinyint(1) DEFAULT 0,
  `cromalin_ready` tinyint(1) DEFAULT 0,
  `working_on_repro` tinyint(1) DEFAULT 0,
  `plates_received` tinyint(1) DEFAULT 0,
  `sc_image_url` varchar(255) DEFAULT NULL,
  `handler_id` int(11) DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `job_number` (`job_number`),
  KEY `fk_handler_user` (`handler_id`),
  CONSTRAINT `fk_handler_user` FOREIGN KEY (`handler_id`) REFERENCES `users` (`id`),
  CONSTRAINT `prepress_data_ibfk_1` FOREIGN KEY (`job_number`) REFERENCES `jobs` (`job_number`)
) ENGINE=InnoDB AUTO_INCREMENT=45 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `prepress_data`
--

LOCK TABLES `prepress_data` WRITE;
/*!40000 ALTER TABLE `prepress_data` DISABLE KEYS */;
INSERT INTO `prepress_data` VALUES
(1,'B52201','elite',NULL,'','2025-05-24 06:23:12',0,0,0,0,0,0,0,1,NULL,NULL),
(2,'B52301','tarkhan',NULL,'','2025-05-24 07:49:48',0,0,0,0,0,0,0,1,NULL,NULL),
(3,'B52401','tarkhan',NULL,NULL,'2025-06-02 14:12:06',0,0,0,0,0,0,1,0,NULL,NULL),
(4,'B52501','elite',NULL,'','2025-05-25 07:33:54',0,0,0,0,0,1,0,0,NULL,NULL),
(5,'B52502','elite',NULL,NULL,'2025-06-03 11:42:01',0,0,0,0,0,0,0,1,NULL,NULL),
(6,'B52601','elite',NULL,'','2025-05-27 10:19:19',0,0,1,0,0,0,0,0,NULL,NULL),
(7,'B52702','elite',NULL,'','2025-05-28 12:47:51',0,0,1,0,0,0,0,0,NULL,NULL),
(8,'B53001','elite',NULL,'','2025-05-30 11:52:02',0,0,0,0,0,0,0,1,NULL,NULL),
(9,'B50509','elite',NULL,'Need to fix colorsNeed to populate approved IMGNeed to populate Plies','2025-05-31 12:52:41',0,0,0,0,1,0,0,0,NULL,NULL),
(10,'B53104','tarkhan',NULL,NULL,'2025-06-02 14:14:35',1,0,0,0,0,0,0,0,NULL,NULL),
(11,'B60102','tarkhan',NULL,NULL,'2025-06-03 11:08:53',1,0,0,0,0,0,0,0,NULL,NULL),
(12,'B60101','tarkhan',NULL,NULL,'2025-06-03 11:28:04',1,0,0,0,0,0,0,0,NULL,NULL),
(16,'B60202','tarkhan',NULL,NULL,'2025-06-03 06:07:53',1,0,0,0,0,0,0,0,NULL,NULL),
(17,'B60201','tarkhan',NULL,NULL,'2025-06-03 11:25:48',0,1,0,0,0,0,0,0,NULL,NULL),
(18,'B60203','tarkhan',NULL,NULL,'2025-06-04 05:20:41',1,0,0,0,0,0,0,0,NULL,NULL),
(19,'B53101',NULL,NULL,NULL,'2025-06-03 11:27:32',0,0,0,0,0,0,0,0,NULL,NULL),
(20,'B60401',NULL,NULL,NULL,'2025-06-04 05:50:23',0,0,0,0,0,0,0,0,NULL,NULL),
(21,'B60402',NULL,NULL,NULL,'2025-06-04 10:21:15',0,0,0,0,0,0,0,0,NULL,NULL),
(22,'B60403',NULL,NULL,NULL,'2025-06-04 06:53:23',0,0,0,0,0,0,0,0,NULL,NULL),
(23,'B60404','elite',NULL,NULL,'2025-06-04 16:21:25',0,0,1,0,0,0,0,0,NULL,NULL),
(24,'B60705','elite',NULL,NULL,'2025-06-07 10:15:29',0,0,1,0,0,0,0,0,'/uploads/sc-approval-B60705-1749291290141.jpg',NULL),
(25,'B60704','tarkhan',NULL,NULL,'2025-06-07 11:59:18',0,0,0,0,0,0,0,1,'/uploads/sc-approval-B60704-1749297332183.jpg',NULL),
(26,'b60802',NULL,NULL,NULL,'2025-06-08 12:19:41',0,0,0,0,0,0,0,1,'/uploads/sc-approval-b60802-1749359953010.jpg',NULL),
(27,'b60803','elite',NULL,NULL,'2025-06-10 07:22:49',0,0,0,0,0,0,0,1,'/uploads/sc-approval-b60803-1749383535272.jpg',3),
(28,'B60901','elite',NULL,'prepress','2025-06-10 10:44:39',0,0,0,0,0,0,0,1,'/uploads/sc-approval-B60901-1749469302520.jpg',23),
(29,'B61002','elite',NULL,NULL,'2025-06-12 10:12:53',0,0,0,0,0,0,1,0,'/uploads/sc-approval-B61002-1749553260040.jpg',23),
(30,'B61001',NULL,NULL,NULL,'2025-06-11 07:10:16',0,1,0,0,0,0,0,0,'/uploads/sc-approval-B61001-1749625816966.jpg',2),
(31,'B61101',NULL,NULL,NULL,'2025-06-12 04:49:08',0,0,0,0,0,0,0,0,'/uploads/sc-approval-B61101-1749703748618.jpg',2),
(32,'B61201','elite',NULL,NULL,'2025-06-12 10:50:30',0,0,0,0,0,0,0,0,'/uploads/sc-approval-B61201-1749716325351.jpg',23),
(34,'B61203',NULL,NULL,NULL,'2025-06-12 15:54:48',0,0,1,0,0,0,0,0,NULL,NULL),
(35,'B61301',NULL,NULL,NULL,'2025-06-13 11:38:46',0,0,1,0,0,0,0,0,'/uploads/sc-approval-B61301-1749814726455.jpg',23),
(38,'B61302',NULL,NULL,NULL,'2025-06-13 15:04:51',0,1,0,0,0,0,0,0,NULL,23),
(39,'B61303',NULL,NULL,NULL,'2025-06-13 15:43:16',0,1,0,0,0,0,0,0,NULL,23),
(40,'B61304',NULL,NULL,NULL,'2025-06-13 16:03:29',0,1,1,0,0,0,0,0,NULL,23),
(41,'B61305',NULL,NULL,NULL,'2025-06-13 16:36:40',0,1,1,0,0,0,0,0,NULL,NULL),
(43,'B61306',NULL,NULL,NULL,'2025-06-14 04:59:50',0,1,0,1,0,0,0,0,NULL,23),
(44,'B61307',NULL,NULL,NULL,'2025-06-14 06:57:24',0,1,1,1,1,0,1,0,NULL,23);
/*!40000 ALTER TABLE `prepress_data` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `qc_data`
--

DROP TABLE IF EXISTS `qc_data`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8mb4 */;
CREATE TABLE `qc_data` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `job_number` varchar(20) NOT NULL,
  `sc_checked` tinyint(1) DEFAULT 0,
  `cromalin_checked` tinyint(1) DEFAULT 0,
  `plates_received` tinyint(1) DEFAULT 0,
  `plates_checked` tinyint(1) DEFAULT 0,
  `comments` text DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT current_timestamp() ON UPDATE current_timestamp(),
  PRIMARY KEY (`id`),
  KEY `job_number` (`job_number`),
  CONSTRAINT `qc_data_ibfk_1` FOREIGN KEY (`job_number`) REFERENCES `jobs` (`job_number`)
) ENGINE=InnoDB AUTO_INCREMENT=25 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `qc_data`
--

LOCK TABLES `qc_data` WRITE;
/*!40000 ALTER TABLE `qc_data` DISABLE KEYS */;
INSERT INTO `qc_data` VALUES
(1,'B52201',1,1,1,1,'eeeee ergegege 3g4h6hy','2025-05-24 07:43:50'),
(2,'B52301',0,1,1,0,'','2025-05-24 07:49:55'),
(3,'B52401',1,1,1,0,'','2025-05-24 11:17:53'),
(4,'B52502',1,1,1,1,'','2025-05-26 05:47:36'),
(5,'B52702',0,0,0,1,'','2025-05-28 12:48:15'),
(6,'B53001',1,0,0,1,'','2025-05-30 11:51:58'),
(7,'B50509',0,0,0,1,'','2025-05-31 12:50:44'),
(8,'B53104',1,0,0,0,'','2025-05-31 12:54:50'),
(9,'B60101',1,0,0,0,'','2025-06-02 11:43:49'),
(10,'B60203',0,1,0,0,'','2025-06-03 11:19:44'),
(11,'B60404',1,0,0,0,'','2025-06-04 11:23:33'),
(12,'B60403',1,1,0,0,'','2025-06-04 11:22:58'),
(13,'B60704',1,0,0,0,'','2025-06-07 11:59:42'),
(14,'B60901',1,1,1,1,'44444','2025-06-10 10:12:06'),
(15,'B61101',0,0,1,1,'','2025-06-11 10:41:49'),
(16,'B61203',1,0,0,0,'','2025-06-12 15:55:09'),
(17,'B61301',1,0,0,0,'','2025-06-13 11:20:07'),
(18,'B61302',1,0,0,0,'','2025-06-13 13:05:54'),
(19,'B61304',1,0,0,0,'','2025-06-13 16:34:32'),
(20,'B61305',1,0,0,0,'','2025-06-13 16:39:09'),
(22,'B61306',1,0,0,0,'','2025-06-13 18:20:38'),
(23,'B61307',1,1,0,0,'','2025-06-14 05:28:02');
/*!40000 ALTER TABLE `qc_data` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `status_types`
--

DROP TABLE IF EXISTS `status_types`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8mb4 */;
CREATE TABLE `status_types` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `department` enum('sales','prepress','qc','finance','production','planning') NOT NULL,
  `status_name` varchar(50) NOT NULL,
  `display_name` varchar(50) NOT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `department` (`department`,`status_name`)
) ENGINE=InnoDB AUTO_INCREMENT=19 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `status_types`
--

LOCK TABLES `status_types` WRITE;
/*!40000 ALTER TABLE `status_types` DISABLE KEYS */;
INSERT INTO `status_types` VALUES
(1,'sales','financial_approval','Financially Approved'),
(2,'sales','technical_approval','Technically Approved'),
(3,'sales','on_hold','On Hold'),
(4,'prepress','sc_sent_to_sales','Need SC Approval'),
(5,'prepress','sc_sent_to_qc','SC Under QC Check'),
(6,'prepress','working_on_cromalin','Working on Cromalin'),
(7,'prepress','cromalin_qc_check','Cromalin Under QC Check'),
(8,'prepress','cromalin_ready','Need Cromalin Approval'),
(9,'prepress','working_on_repro','Working on Repro'),
(10,'prepress','plates_ready','Ready for Press'),
(11,'qc','sc_checked','SC Checked'),
(12,'qc','cromalin_checked','Cromalin Checked'),
(13,'qc','plates_received','Plates Received'),
(14,'qc','plates_checked','Plates Checked'),
(16,'planning','working_on_softcopy','Working on softcopy'),
(17,'qc','sc_checked_cromalin','SC Checked, Need Cromalin'),
(18,'qc','sc_checked_plates','SC Checked, Need Plates');
/*!40000 ALTER TABLE `status_types` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `user_groups`
--

DROP TABLE IF EXISTS `user_groups`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8mb4 */;
CREATE TABLE `user_groups` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `name` varchar(50) NOT NULL,
  `description` text DEFAULT NULL,
  `created_at` timestamp NULL DEFAULT current_timestamp(),
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=9 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `user_groups`
--

LOCK TABLES `user_groups` WRITE;
/*!40000 ALTER TABLE `user_groups` DISABLE KEYS */;
INSERT INTO `user_groups` VALUES
(1,'General Admin','Full system access','2025-05-09 15:07:44'),
(2,'Sales Admin','Full access to Sales section','2025-05-09 15:07:44'),
(3,'Prepress Admin','Full access to AW section','2025-05-09 15:07:44'),
(4,'Planning Admin','Full access to Planning section','2025-05-09 15:07:44'),
(5,'Salesman','Access to own sales data','2025-05-09 15:07:44'),
(6,'Prepress Specialist','Access to own AW data','2025-05-09 15:07:44'),
(7,'Planning Specialist','Access to own planning data','2025-05-09 15:07:44'),
(8,'Maintenance','Full system access (maintenance)','2025-06-09 06:02:24');
/*!40000 ALTER TABLE `user_groups` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `users`
--

DROP TABLE IF EXISTS `users`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8mb4 */;
CREATE TABLE `users` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `username` varchar(50) NOT NULL,
  `password` varchar(255) NOT NULL,
  `group_id` int(11) NOT NULL,
  `full_name` varchar(100) DEFAULT NULL,
  `email` varchar(100) DEFAULT NULL,
  `Department` varchar(255) DEFAULT NULL,
  `created_at` timestamp NULL DEFAULT current_timestamp(),
  PRIMARY KEY (`id`),
  UNIQUE KEY `username` (`username`),
  KEY `group_id` (`group_id`),
  CONSTRAINT `users_ibfk_1` FOREIGN KEY (`group_id`) REFERENCES `user_groups` (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=24 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `users`
--

LOCK TABLES `users` WRITE;
/*!40000 ALTER TABLE `users` DISABLE KEYS */;
INSERT INTO `users` VALUES
(1,'admin','$2a$10$N9qo8uLOickgx2ZMRZoMy.MH/r7r6LJ5Lf2CJQH/.8Z3z2YdWOuE6',1,'Administrator','sales.order.sys@taweelholdings.com',NULL,'2025-05-10 13:10:04'),
(2,'mahmoud_khadary','$2a$10$N9qo8uLOickgx2ZMRZoMy.MH/r7r6LJ5Lf2CJQH/.8Z3z2YdWOuE6',2,'Mahmoud Khadary','designer3@taweelholdings.com',NULL,'2025-05-10 13:10:39'),
(3,'raed_tanbouz','$2a$10$N9qo8uLOickgx2ZMRZoMy.MH/r7r6LJ5Lf2CJQH/.8Z3z2YdWOuE6',2,'Raed Tanbouz','Designer1@taweelholdings.com',NULL,'2025-05-10 13:10:39'),
(4,'aref_wafaay','$2a$10$N9qo8uLOickgx2ZMRZoMy.MH/r7r6LJ5Lf2CJQH/.8Z3z2YdWOuE6',2,'Aref Wafaay','designer2@taweelholdings.com',NULL,'2025-05-10 13:10:39'),
(5,'hashem_a_shaker','$2a$10$N9qo8uLOickgx2ZMRZoMy.MH/r7r6LJ5Lf2CJQH/.8Z3z2YdWOuE6',1,'Hashem Abou Shaker','h.abushaker@taweelholdings.com',NULL,'2025-05-10 13:10:39'),
(6,'faraj_taweel','$2a$10$N9qo8uLOickgx2ZMRZoMy.MH/r7r6LJ5Lf2CJQH/.8Z3z2YdWOuE6',1,'Faraj Al-Taweel','faraj.taweel@taweelholdings.com',NULL,'2025-05-10 13:10:39'),
(7,'kais_taweel','$2a$10$N9qo8uLOickgx2ZMRZoMy.MH/r7r6LJ5Lf2CJQH/.8Z3z2YdWOuE6',1,'Kais Al-Taweel','kais.taweel@taweelholdings.com',NULL,'2025-05-10 13:10:39'),
(8,'hatem_taweel','$2a$10$N9qo8uLOickgx2ZMRZoMy.MH/r7r6LJ5Lf2CJQH/.8Z3z2YdWOuE6',1,'Hatem Al-Taweel','htaweel@taweelholdings.com',NULL,'2025-05-10 13:10:39'),
(9,'jad_taweel','$2a$10$N9qo8uLOickgx2ZMRZoMy.MH/r7r6LJ5Lf2CJQH/.8Z3z2YdWOuE6',1,'Jad Al-Taweel',NULL,NULL,'2025-05-10 13:10:39'),
(10,'saif_taweel','$2a$10$N9qo8uLOickgx2ZMRZoMy.MH/r7r6LJ5Lf2CJQH/.8Z3z2YdWOuE6',1,'Saif Al-Taweel','staweel@taweelholdings.com',NULL,'2025-05-10 13:10:39'),
(11,'ebtihal','$2a$10$N9qo8uLOickgx2ZMRZoMy.MH/r7r6LJ5Lf2CJQH/.8Z3z2YdWOuE6',3,'Ebtihal','qchse.jsp@taweelholdings.com',NULL,'2025-05-10 13:10:39'),
(12,'raghad','$2a$10$N9qo8uLOickgx2ZMRZoMy.MH/r7r6LJ5Lf2CJQH/.8Z3z2YdWOuE6',3,'Raghad','qclab.jsp@taweelholdings.com',NULL,'2025-05-10 13:10:39'),
(13,'zakaria','$2a$10$N9qo8uLOickgx2ZMRZoMy.MH/r7r6LJ5Lf2CJQH/.8Z3z2YdWOuE6',3,'Zakaria','qa.jsp@taweelholdings.com',NULL,'2025-05-10 13:10:39'),
(14,'ahmed_syam','$2a$10$N9qo8uLOickgx2ZMRZoMy.MH/r7r6LJ5Lf2CJQH/.8Z3z2YdWOuE6',3,'Ahmed-Syam','qcinspector.jsp@taweelholdings.com',NULL,'2025-05-10 13:10:39'),
(15,'bahaa','$2a$10$N9qo8uLOickgx2ZMRZoMy.MH/r7r6LJ5Lf2CJQH/.8Z3z2YdWOuE6',4,'Bahaa','bshamalti@taweelholdings.com',NULL,'2025-05-10 13:10:39'),
(16,'qasem','$2a$10$N9qo8uLOickgx2ZMRZoMy.MH/r7r6LJ5Lf2CJQH/.8Z3z2YdWOuE6',4,'Qasem','planner.jsp@taweelholdings.com',NULL,'2025-05-10 13:10:39'),
(17,'amjad_samara','$2a$10$N9qo8uLOickgx2ZMRZoMy.MH/r7r6LJ5Lf2CJQH/.8Z3z2YdWOuE6',5,'Amjad','amjad.samara@taweelholdings.com',NULL,'2025-05-10 13:10:39'),
(18,'Alaa_khalil','$2a$10$N9qo8uLOickgx2ZMRZoMy.MH/r7r6LJ5Lf2CJQH/.8Z3z2YdWOuE6',5,'Alaa Al-Allary','akhalil@taweelholdings.com',NULL,'2025-05-10 13:10:39'),
(19,'Rami_qatani','$2a$10$N9qo8uLOickgx2ZMRZoMy.MH/r7r6LJ5Lf2CJQH/.8Z3z2YdWOuE6',5,'Rami','r.qatani@taweelholdings.com',NULL,'2025-05-10 13:10:39'),
(20,'Duha','$2a$10$N9qo8uLOickgx2ZMRZoMy.MH/r7r6LJ5Lf2CJQH/.8Z3z2YdWOuE6',5,'Duha','duha.obidy@taweelholdings.com',NULL,'2025-05-10 13:10:39'),
(21,'mahmoud_aref','$2a$10$N9qo8uLOickgx2ZMRZoMy.MH/r7r6LJ5Lf2CJQH/.8Z3z2YdWOuE6',6,'Mahmoud Aref',NULL,NULL,'2025-05-10 13:10:39'),
(22,'mohammed_samara','$2a$10$N9qo8uLOickgx2ZMRZoMy.MH/r7r6LJ5Lf2CJQH/.8Z3z2YdWOuE6',7,'Mohammed Samara',NULL,NULL,'2025-05-10 13:10:39'),
(23,'maintenance','$2a$10$N9qo8uLOickgx2ZMRZoMy.MH/r7r6LJ5Lf2CJQH/.8Z3z2YdWOuE6',8,'Maintenance User',NULL,NULL,'2025-06-09 06:02:58');
/*!40000 ALTER TABLE `users` ENABLE KEYS */;
UNLOCK TABLES;
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2025-06-14 10:00:37
