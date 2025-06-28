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
) ENGINE=InnoDB AUTO_INCREMENT=56 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;
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
(55,'Molfix','23','2025-05-14 05:32:45','2025-05-14 05:32:45');
/*!40000 ALTER TABLE `customers` ENABLE KEYS */;
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
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `job_status_history`
--

LOCK TABLES `job_status_history` WRITE;
/*!40000 ALTER TABLE `job_status_history` DISABLE KEYS */;
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
  `flip_direction` varchar(255) DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `customer_id` (`customer_id`),
  KEY `idx_job_number` (`job_number`),
  KEY `fk_job_creator` (`created_by`),
  CONSTRAINT `fk_job_creator` FOREIGN KEY (`created_by`) REFERENCES `users` (`id`),
  CONSTRAINT `jobs_ibfk_1` FOREIGN KEY (`customer_id`) REFERENCES `customers` (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=199 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `jobs`
--

LOCK TABLES `jobs` WRITE;
/*!40000 ALTER TABLE `jobs` DISABLE KEYS */;
INSERT INTO `jobs` VALUES
(14,10,'Administrator','2025-05-04','B50403','First Job Ever',99.00,'1000bags','4 Side',NULL,NULL,NULL,NULL,'Central Drum','Surface','B',NULL,'2025-05-04 13:24:27','2025-05-26 06:42:01',1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL),
(15,11,'Ramy','2025-05-04','b50404','EEEEEEE',99.00,'1000bags','4 Side',NULL,NULL,NULL,NULL,'Stack Type','Surface','B',NULL,'2025-05-04 13:25:35','2025-05-26 06:42:01',1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL),
(16,12,'Administrator','2025-05-05','B50501','Nescafe',555.00,'kg','4 Side',NULL,NULL,NULL,NULL,'Central Drum','Reverse','C',NULL,'2025-05-05 06:17:50','2025-05-26 06:42:01',1,0,0,1,0,0,0,0,0,0,0,0,0,0,0,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL),
(17,13,'Administrator','2025-05-05','B50502','Oxi Jordan 250 gm',555.00,'kg','Center Seal',NULL,NULL,NULL,NULL,'Central Drum','Reverse','C',NULL,'2025-05-05 06:19:38','2025-05-26 06:42:01',1,0,1,0,0,0,0,0,0,0,0,0,0,0,0,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL),
(18,14,'Administrator','2025-05-05','B50503','Rice 1kg',11.00,'1000bags','Center Seal',NULL,NULL,NULL,NULL,'Central Drum','Reverse','C',NULL,'2025-05-05 06:26:24','2025-05-26 06:42:01',1,1,0,0,0,0,0,0,0,0,0,0,0,0,0,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL),
(19,15,'Mahmoud','2025-05-05','B50504','Kitty Sand 2kg',11.00,'1000bags','Flat Bottom',NULL,NULL,NULL,NULL,'Central Drum','Reverse','C',NULL,'2025-05-05 06:32:36','2025-05-26 06:42:01',1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL),
(20,16,'Administrator','2025-05-05','B50505','Petrabet 2KG',11.00,'1000bags','Flat Bottom',NULL,NULL,NULL,NULL,'Central Drum','Reverse','C',NULL,'2025-05-05 06:36:07','2025-05-26 06:42:01',1,0,1,0,0,0,0,0,0,0,0,0,0,0,0,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL),
(21,17,'Alaa','2025-05-05','b50506','Coffee Bag',11.00,'1000bags','Shopping Bag',NULL,NULL,NULL,NULL,'Stack Type','Reverse','C',NULL,'2025-05-05 06:38:12','2025-05-26 06:42:01',1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL),
(22,18,'Mahmoud','2025-05-05','B50507','Mask Bag',11.00,'bags','Center Seal',NULL,NULL,NULL,NULL,'Central Drum','Surface','C',NULL,'2025-05-05 07:53:42','2025-05-26 06:42:01',1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL),
(23,19,'Hatem','2025-05-05','B50508','Fine Fluffy',11.00,'bags','Normal Bag',NULL,NULL,NULL,NULL,'Central Drum','Surface','C',NULL,'2025-05-05 07:55:55','2025-05-26 06:42:01',1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL),
(24,20,'Hatem','2025-05-05','B50509','Silva Hammas',11.00,'bags','Normal Bag',NULL,NULL,NULL,NULL,'Central Drum','Reverse','C',NULL,'2025-05-05 09:57:15','2025-05-26 06:42:01',1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL),
(25,21,'Alaa','2025-05-05','B50510','Abou Tafesh Nuts 180 gm',55.00,'kg','Center Seal',NULL,NULL,NULL,NULL,'Central Drum','Reverse','B',NULL,'2025-05-05 10:02:59','2025-05-26 06:42:01',1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL),
(29,25,'Mahmoud','2025-05-06','B50601','Cold Alex Okra Zero',44.00,'bags','3 Side',NULL,NULL,NULL,NULL,'Central Drum','Reverse','B',NULL,'2025-05-06 04:37:13','2025-05-26 06:42:01',1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL),
(30,26,'Hatem','2025-05-06','B50602','Oxi Gel Black',555.00,'bags','3 Side Stand Up',NULL,NULL,NULL,NULL,'Central Drum','Surface','D',NULL,'2025-05-06 05:19:12','2025-05-26 06:42:01',1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL),
(31,27,'Ramy','2025-05-06','B50603','Al Wazir  250gm',555.00,'bags','3 Side Stand Up',NULL,NULL,NULL,NULL,'Central Drum','Surface','D',NULL,'2025-05-06 05:21:16','2025-05-26 06:42:01',1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL),
(55,28,'Hatem','2025-05-06','B50605','Nescafe Gold 250gm',11.00,'kg','3 Side',NULL,NULL,NULL,NULL,'Central Drum','Reverse','B',NULL,'2025-05-06 08:57:05','2025-05-26 06:42:01',1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL),
(56,32,'Duha','2025-05-06','B50606','Kitty Sand 2kg',11.00,'1000bags','3 Side',NULL,NULL,NULL,NULL,'Central Drum','Reverse','B',NULL,'2025-05-06 09:01:56','2025-05-26 06:42:01',1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL),
(97,28,'Hatem','2025-05-06','B50607','Nescafe Gold 1kg',555.00,'bags','3 Side',NULL,NULL,NULL,NULL,'Central Drum','Reverse','A',NULL,'2025-05-06 10:53:35','2025-05-26 06:42:01',1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL),
(111,28,'Hatem','2025-05-06','B50608','Nescafe Gold 1kg',555.00,'bags','3 Side',NULL,NULL,NULL,NULL,'Central Drum','Reverse','A',NULL,'2025-05-06 11:27:05','2025-05-26 06:42:01',1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL),
(113,28,'Hatem','2025-05-06','B50610','Nescafe Gold 2kg',555.00,'bags','3 Side',NULL,NULL,NULL,NULL,'Central Drum','Reverse','A',NULL,'2025-05-06 11:29:03','2025-05-26 06:42:01',1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL),
(114,34,'Duha','2025-05-07','B50701','Fine Fluffy 550 Green',11.00,'bags','Normal Bag',NULL,NULL,NULL,NULL,'Central Drum','Reverse','A',NULL,'2025-05-07 05:02:49','2025-05-26 06:42:01',1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL),
(116,35,'Amjad','2025-05-07','B50703','Cold Alex Corn 800gm',11.00,'bags','Normal Bag',NULL,NULL,NULL,NULL,'Central Drum','Reverse','A',NULL,'2025-05-07 05:07:46','2025-05-26 06:42:01',1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL),
(117,36,'Amjad','2025-05-07','B50704','Fine Adult Diaper',11.00,'bags','Normal Bag',22.00,33.00,11.00,7.00,'Central Drum','Reverse','A',NULL,'2025-05-07 05:19:49','2025-05-26 06:42:01',1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL),
(120,37,'Ramy','2025-05-07','B50705','Dax Green 5kg',555.00,'1000bags','3 Side',22.00,33.00,NULL,NULL,'Central Drum','Reverse','C',NULL,'2025-05-07 13:40:15','2025-05-26 06:42:01',1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL),
(121,38,'Alaa','2025-05-07','b50706','Tazweed Bag',555.00,'1000bags','3 Side',22.00,33.00,NULL,NULL,'Stack Type','Reverse','C',NULL,'2025-05-07 13:42:06','2025-05-26 06:42:01',1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL),
(122,39,'Amjad','2025-05-07','b50707','Letwal Orange',555.00,'1000bags','4 Side',22.00,33.00,12.00,NULL,'Stack Type','Reverse','C',NULL,'2025-05-07 13:44:09','2025-05-26 06:42:01',1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL),
(124,41,'Hatem','2025-05-09','B50902','Coffee Bag',555.00,'bags','2 Side',22.00,11.00,NULL,NULL,'Central Drum','Reverse','B',NULL,'2025-05-09 13:15:58','2025-05-26 06:42:01',1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL),
(131,42,'Hatem','2025-05-09','B50903','Oxi Jordan 250 gm',555.00,'bags','3 Side K',NULL,NULL,NULL,NULL,'Central Drum','Surface','B',NULL,'2025-05-09 17:15:59','2025-05-26 06:42:01',NULL,0,0,0,0,0,0,0,0,0,0,0,0,0,0,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL),
(135,41,'Hatem','2025-05-09','B50904','Coffee Bag',555.00,'bags','2 Side',22.00,11.00,NULL,NULL,'Central Drum','Reverse','B',NULL,'2025-05-09 17:46:02','2025-05-26 06:42:01',NULL,0,0,0,0,0,0,0,0,0,0,0,0,0,0,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL),
(139,43,'Amjad','2025-05-11','B51102','Rice 1kg',11.00,'bags','3 Side',22.00,33.00,NULL,NULL,'Central Drum','Reverse','B',NULL,'2025-05-11 07:01:58','2025-05-26 06:42:01',NULL,0,0,0,0,0,0,0,0,0,0,0,0,0,0,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL),
(140,35,'Hatem','2025-05-11','B51103','Coffee Bag',11.00,'bags','2 Side',NULL,NULL,NULL,NULL,'Central Drum','Reverse','B',NULL,'2025-05-11 07:06:09','2025-05-26 06:42:01',NULL,0,0,0,0,0,0,0,0,0,0,0,0,0,0,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL),
(143,44,'Hatem','2025-05-11','B51104','Brown Rice 2kg',11.00,'bags','3 Side',NULL,NULL,NULL,NULL,'Central Drum','Surface','C',NULL,'2025-05-11 08:00:37','2025-05-26 06:42:01',NULL,0,0,0,0,0,0,0,0,0,0,0,0,0,0,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL),
(144,35,'Amjad','2025-05-11','B51105','Coffee Bag',11.00,'1000bags','3 Side',NULL,NULL,NULL,NULL,'Central Drum','Reverse','B',NULL,'2025-05-11 09:42:50','2025-05-26 06:42:01',NULL,0,0,0,0,0,0,0,0,0,0,0,0,0,0,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL),
(160,35,NULL,'2025-05-12','b51202','Coffee Bag',11.00,'bags','2 Side',NULL,NULL,NULL,NULL,'Stack Type','Reverse','B',NULL,'2025-05-12 05:02:32','2025-05-26 06:42:01',NULL,0,0,0,0,0,0,0,0,0,0,0,0,0,0,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL),
(161,35,'Raed Tanbouz','2025-05-12','B51203','Cold Alex Corn 800gm',11.00,'select-unit','Center Seal',NULL,NULL,NULL,NULL,'Central Drum','Surface','B',NULL,'2025-05-12 06:49:22','2025-05-26 06:42:01',NULL,0,0,0,0,0,0,0,0,0,0,0,0,0,0,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL),
(162,28,'Hatem Al-Taweel','2025-05-12','B51204','Nescafe Arabica 320gm',555.00,'meters','Center Seal',NULL,NULL,NULL,NULL,'Central Drum','Reverse','C',NULL,'2025-05-12 06:55:05','2025-05-26 06:42:01',NULL,0,0,0,0,0,0,0,0,0,0,0,0,0,0,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL),
(163,47,'Kais Al-Taweel','2025-05-12','B51205','Dove Jasmin 180gm',11.00,'1000bags','3 Side K',NULL,NULL,NULL,NULL,'Central Drum','Surface','B',NULL,'2025-05-12 06:59:02','2025-05-26 06:42:01',NULL,0,0,0,0,0,0,0,0,0,0,0,0,0,0,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL),
(164,47,'Kais Al-Taweel','2025-05-12','B51206','Dove Red Rose 180gm',11.00,'1000bags','3 Side K',NULL,NULL,NULL,NULL,'Central Drum','Surface','B',NULL,'2025-05-12 07:00:09','2025-05-26 06:42:01',NULL,0,0,0,0,0,0,0,0,0,0,0,0,0,0,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL),
(172,47,'Administrator','2025-05-12','B51209','Dove Lavender 180gm',11.00,'1000bags','3 Side K',NULL,NULL,NULL,NULL,'Central Drum','Surface','B',NULL,'2025-05-12 15:48:53','2025-05-26 06:42:01',NULL,0,0,0,0,0,0,0,0,0,0,0,0,0,0,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL),
(177,54,'Administrator','2025-05-12','B51210','Dove Oriental 180gm',11.00,'1000bags','3 Side K',NULL,NULL,NULL,NULL,'Central Drum','Surface','B',NULL,'2025-05-12 16:33:58','2025-05-26 06:42:01',NULL,0,0,0,0,0,0,0,0,0,0,0,0,0,0,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL),
(183,51,'Administrator','2025-05-13','B51301','Coffee Bag',44.00,'1000bags','3 Side',22.00,33.00,NULL,NULL,'Central Drum','Surface','B',NULL,'2025-05-13 11:41:35','2025-05-26 06:42:01',NULL,0,0,0,0,0,0,0,0,0,0,0,0,0,0,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL),
(184,52,'Administrator','2025-05-13','B51302','Gypsy Green 550',44.00,'1000bags','3 Side',22.00,33.00,NULL,NULL,'Central Drum','Surface','B',NULL,'2025-05-13 11:48:09','2025-05-26 06:42:01',NULL,0,0,0,0,0,0,0,0,0,0,0,0,0,0,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL),
(188,55,'Administrator','2025-05-14','B51401','Molfix Diaber Size 4',11.00,'bags','Normal Bag',NULL,NULL,NULL,NULL,'Central Drum','Reverse','A',NULL,'2025-05-14 05:32:45','2025-05-26 06:42:01',NULL,0,0,0,0,0,0,0,0,0,0,0,0,0,0,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL),
(190,55,'Administrator','2025-05-20','B52001','Molfix Diaber Size 4',11.00,'bags','Normal Bag',NULL,NULL,NULL,NULL,'Central Drum','Reverse','A',NULL,'2025-05-20 10:07:40','2025-05-26 06:42:01',NULL,0,1,0,0,0,0,0,0,0,0,0,0,0,0,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL),
(191,55,'Administrator','2025-05-21','B52101','Molfix Diaber Size 4',11.00,'bags','Normal Bag',NULL,NULL,NULL,NULL,'Central Drum','Reverse','A',NULL,'2025-05-21 10:45:10','2025-05-26 06:42:01',NULL,0,1,0,0,0,0,0,0,0,0,0,0,0,0,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL),
(192,55,'Administrator','2025-05-22','B52201','Molfix Diaber Size 4',11.00,'bags','Shopping Bag',22.00,33.00,NULL,NULL,'Central Drum','Reverse','A',NULL,'2025-05-22 05:48:28','2025-05-26 06:13:30',NULL,0,0,1,0,0,0,0,0,0,0,0,0,0,0,1,1,0,0,0,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL),
(193,55,'Administrator','2025-05-23','B52301','Molfix Diaber Size 4',11.00,'bags','Shopping Bag',22.00,33.00,11.00,NULL,'Central Drum','Reverse','A',NULL,'2025-05-23 16:59:09','2025-05-26 06:42:01',NULL,1,0,0,0,0,0,0,0,0,0,0,0,0,0,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL),
(195,32,'Administrator','2025-05-24','B52401','Kitty Sand 2kg',11.00,'1000bags','3 Side',22.00,33.00,11.00,NULL,'Central Drum','Reverse','B',NULL,'2025-05-24 11:17:36','2025-05-26 06:42:01',NULL,0,0,1,0,0,0,0,0,0,0,0,0,0,0,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL),
(196,55,'Administrator','2025-05-25','B52501','Coffee Bag',11.00,'1000bags','3 Side',33.00,22.00,NULL,NULL,'Central Drum','Reverse','B',NULL,'2025-05-25 07:26:07','2025-05-26 06:42:01',NULL,1,0,0,0,0,0,0,0,0,0,0,0,0,0,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL),
(197,55,'Administrator','2025-05-25','B52502','Test DDDDDDD',11.00,'1000bags','Shopping Bag',33.00,22.00,11.00,NULL,'Central Drum','Reverse','B',NULL,'2025-05-25 08:18:59','2025-05-26 06:50:28',NULL,1,0,0,0,0,0,0,0,0,0,0,0,0,0,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL),
(198,55,'Administrator','2025-05-26','B52601','Test DDDDDDD',11.00,'1000bags','Shopping Bag',33.00,22.00,11.00,NULL,'Central Drum','Reverse','B',NULL,'2025-05-26 06:51:55','2025-05-26 06:51:55',NULL,1,0,0,0,0,0,0,0,0,0,0,0,0,0,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL);
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
) ENGINE=InnoDB AUTO_INCREMENT=7 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `planning_data`
--

LOCK TABLES `planning_data` WRITE;
/*!40000 ALTER TABLE `planning_data` DISABLE KEYS */;
INSERT INTO `planning_data` VALUES
(1,'B52201','',1,1,0,1,0,0,'','2025-05-26 06:13:39',NULL,NULL),
(2,'B52301','Centarl 210',1,1,0,1,0,1,'','2025-05-25 08:16:41',NULL,NULL),
(3,'B52401','',1,1,0,0,0,0,'','2025-05-25 08:19:56',NULL,NULL),
(4,'B52501','',1,1,1,1,0,0,'','2025-05-25 08:11:22',NULL,NULL),
(5,'B52502','',1,1,0,0,0,0,'','2025-05-26 06:50:31',NULL,NULL),
(6,'B52601','',1,1,0,0,0,0,'','2025-05-26 06:52:03',NULL,NULL);
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
  `color_code` varchar(20) NOT NULL,
  `position` int(11) NOT NULL DEFAULT 0,
  PRIMARY KEY (`id`),
  KEY `job_number` (`job_number`),
  CONSTRAINT `prepress_colors_ibfk_1` FOREIGN KEY (`job_number`) REFERENCES `jobs` (`job_number`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `prepress_colors`
--

LOCK TABLES `prepress_colors` WRITE;
/*!40000 ALTER TABLE `prepress_colors` DISABLE KEYS */;
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
  `plates_ready` tinyint(1) DEFAULT 0,
  `sc_image_url` varchar(255) DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `job_number` (`job_number`),
  CONSTRAINT `prepress_data_ibfk_1` FOREIGN KEY (`job_number`) REFERENCES `jobs` (`job_number`)
) ENGINE=InnoDB AUTO_INCREMENT=6 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `prepress_data`
--

LOCK TABLES `prepress_data` WRITE;
/*!40000 ALTER TABLE `prepress_data` DISABLE KEYS */;
INSERT INTO `prepress_data` VALUES
(1,'B52201','elite',NULL,'','2025-05-24 06:23:12',0,0,0,0,0,0,0,1,NULL),
(2,'B52301','tarkhan',NULL,'','2025-05-24 07:49:48',0,0,0,0,0,0,0,1,NULL),
(3,'B52401','tarkhan',NULL,'','2025-05-25 07:10:54',0,0,0,0,0,0,1,0,NULL),
(4,'B52501','elite',NULL,'','2025-05-25 07:33:54',0,0,0,0,0,1,0,0,NULL),
(5,'B52502','elite',NULL,'','2025-05-26 06:43:56',0,0,0,0,0,0,0,1,NULL);
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
) ENGINE=InnoDB AUTO_INCREMENT=5 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;
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
(4,'B52502',1,1,1,1,'','2025-05-26 05:47:36');
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
  `department` enum('sales','prepress','qc','finance','production') NOT NULL,
  `status_name` varchar(50) NOT NULL,
  `display_name` varchar(50) NOT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `department` (`department`,`status_name`)
) ENGINE=InnoDB AUTO_INCREMENT=15 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;
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
(14,'qc','plates_checked','Plates Checked');
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
) ENGINE=InnoDB AUTO_INCREMENT=8 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;
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
(7,'Planning Specialist','Access to own planning data','2025-05-09 15:07:44');
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
) ENGINE=InnoDB AUTO_INCREMENT=23 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;
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
(18,'Alaa_khalil','$2a$10$N9qo8uLOickgx2ZMRZoMy.MH/r7r6LJ5Lf2CJQH/.8Z3z2YdWOuE6',5,'Alaa','akhalil@taweelholdings.com',NULL,'2025-05-10 13:10:39'),
(19,'Rami_qatani','$2a$10$N9qo8uLOickgx2ZMRZoMy.MH/r7r6LJ5Lf2CJQH/.8Z3z2YdWOuE6',5,'Rami','r.qatani@taweelholdings.com',NULL,'2025-05-10 13:10:39'),
(20,'Duha','$2a$10$N9qo8uLOickgx2ZMRZoMy.MH/r7r6LJ5Lf2CJQH/.8Z3z2YdWOuE6',5,'Duha','duha.obidy@taweelholdings.com',NULL,'2025-05-10 13:10:39'),
(21,'mahmoud_aref','$2a$10$N9qo8uLOickgx2ZMRZoMy.MH/r7r6LJ5Lf2CJQH/.8Z3z2YdWOuE6',6,'Mahmoud Aref',NULL,NULL,'2025-05-10 13:10:39'),
(22,'mohammed_samara','$2a$10$N9qo8uLOickgx2ZMRZoMy.MH/r7r6LJ5Lf2CJQH/.8Z3z2YdWOuE6',7,'Mohammed Samara',NULL,NULL,'2025-05-10 13:10:39');
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

-- Dump completed on 2025-05-26  9:54:33
