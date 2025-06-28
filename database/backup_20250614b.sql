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
) ENGINE=InnoDB AUTO_INCREMENT=306 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `job_status_history`
--

LOCK TABLES `job_status_history` WRITE;
/*!40000 ALTER TABLE `job_status_history` DISABLE KEYS */;
INSERT INTO `job_status_history` VALUES
(1,'B61101',16,'2025-06-12 15:44:15',23,'Planning data saved'),
(305,'B61307',11,'2025-06-14 12:11:01',23,'SC approved by QC');
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
(249,60,'Maintenance User','2025-06-13','B61306','Test PLANNING CHECKBOXS 2',11.00,'bags','3 Side',22.00,34.00,11.00,NULL,'Central Drum','Reverse','A',NULL,'2025-06-13 17:38:17','2025-06-14 04:59:50',NULL,1,1,0,1,0,0,0,0,0,0,1,0,0,0,0,0,0,0,0,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,1,1,0),
(250,60,'Maintenance User','2025-06-13','B61307','Test PLANNING CHECKBOXS 2',11.00,'bags','3 Side',22.00,34.00,11.00,NULL,'Central Drum','Reverse','A',NULL,'2025-06-13 18:22:27','2025-06-14 09:11:01',NULL,0,0,0,1,0,1,0,1,1,0,1,1,0,1,0,0,0,0,0,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,1,1,0);
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
) ENGINE=InnoDB AUTO_INCREMENT=781 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `prepress_colors`
--

LOCK TABLES `prepress_colors` WRITE;
/*!40000 ALTER TABLE `prepress_colors` DISABLE KEYS */;
INSERT INTO `prepress_colors` VALUES
(103,'B52401','Cyan',NULL,0),
(780,'B61307','Cyan','#000000',0);
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
(44,'B61307','elite',NULL,NULL,'2025-06-14 08:12:27',0,1,1,1,1,0,1,1,NULL,23);
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
(23,'B61307',1,1,1,1,'','2025-06-14 09:11:01');
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
) ENGINE=InnoDB AUTO_INCREMENT=21 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;
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
(13,'qc','qc_plates_received','QC Received Plates'),
(14,'qc','plates_checked','Plates Checked'),
(16,'planning','working_on_softcopy','Working on softcopy'),
(17,'qc','sc_checked_cromalin','SC Checked, Need Cromalin'),
(18,'qc','sc_checked_plates','SC Checked, Need Plates'),
(19,'prepress','prepress_plates_received','Prepress Received Plates'),
(20,'sales','plates_checked','Ready for Press');
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

-- Dump completed on 2025-06-14 12:11:46
