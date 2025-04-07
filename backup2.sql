-- MySQL dump 10.13  Distrib 8.0.41, for Win64 (x86_64)
--
-- Host: localhost    Database: vanakdatabase
-- ------------------------------------------------------
-- Server version	8.0.41

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
-- Table structure for table `api_customuser`
--

DROP TABLE IF EXISTS `api_customuser`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `api_customuser` (
  `id` bigint NOT NULL AUTO_INCREMENT,
  `password` varchar(128) NOT NULL,
  `last_login` datetime(6) DEFAULT NULL,
  `is_superuser` tinyint(1) NOT NULL,
  `username` varchar(50) NOT NULL,
  `first_name` varchar(50) NOT NULL,
  `last_name` varchar(50) NOT NULL,
  `role` varchar(20) NOT NULL,
  `is_active` tinyint(1) NOT NULL,
  `is_staff` tinyint(1) NOT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `username` (`username`)
) ENGINE=InnoDB AUTO_INCREMENT=6 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `api_customuser`
--

LOCK TABLES `api_customuser` WRITE;
/*!40000 ALTER TABLE `api_customuser` DISABLE KEYS */;
INSERT INTO `api_customuser` VALUES (1,'pbkdf2_sha256$600000$KXLWJQnFp3GPpGaRjd3mzE$cd693GvBXbBI2qLyh5bqnX81Z1sr64oFkjG/u1mmXpc=','2025-02-22 07:13:07.676171',1,'admin','saba','shafiee','admin',1,1);
/*!40000 ALTER TABLE `api_customuser` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `api_customuser_groups`
--

DROP TABLE IF EXISTS `api_customuser_groups`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `api_customuser_groups` (
  `id` bigint NOT NULL AUTO_INCREMENT,
  `customuser_id` bigint NOT NULL,
  `group_id` int NOT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `api_customuser_groups_customuser_id_group_id_d5b0c2ab_uniq` (`customuser_id`,`group_id`),
  KEY `api_customuser_groups_group_id_f049027c_fk_auth_group_id` (`group_id`),
  CONSTRAINT `api_customuser_group_customuser_id_9eb4b783_fk_api_custo` FOREIGN KEY (`customuser_id`) REFERENCES `api_customuser` (`id`),
  CONSTRAINT `api_customuser_groups_group_id_f049027c_fk_auth_group_id` FOREIGN KEY (`group_id`) REFERENCES `auth_group` (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `api_customuser_groups`
--

LOCK TABLES `api_customuser_groups` WRITE;
/*!40000 ALTER TABLE `api_customuser_groups` DISABLE KEYS */;
/*!40000 ALTER TABLE `api_customuser_groups` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `api_customuser_user_permissions`
--

DROP TABLE IF EXISTS `api_customuser_user_permissions`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `api_customuser_user_permissions` (
  `id` bigint NOT NULL AUTO_INCREMENT,
  `customuser_id` bigint NOT NULL,
  `permission_id` int NOT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `api_customuser_user_perm_customuser_id_permission_9deacd8d_uniq` (`customuser_id`,`permission_id`),
  KEY `api_customuser_user__permission_id_8735d73e_fk_auth_perm` (`permission_id`),
  CONSTRAINT `api_customuser_user__customuser_id_5365c9ba_fk_api_custo` FOREIGN KEY (`customuser_id`) REFERENCES `api_customuser` (`id`),
  CONSTRAINT `api_customuser_user__permission_id_8735d73e_fk_auth_perm` FOREIGN KEY (`permission_id`) REFERENCES `auth_permission` (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `api_customuser_user_permissions`
--

LOCK TABLES `api_customuser_user_permissions` WRITE;
/*!40000 ALTER TABLE `api_customuser_user_permissions` DISABLE KEYS */;
/*!40000 ALTER TABLE `api_customuser_user_permissions` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `auth_group`
--

DROP TABLE IF EXISTS `auth_group`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `auth_group` (
  `id` int NOT NULL AUTO_INCREMENT,
  `name` varchar(150) NOT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `name` (`name`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `auth_group`
--

LOCK TABLES `auth_group` WRITE;
/*!40000 ALTER TABLE `auth_group` DISABLE KEYS */;
/*!40000 ALTER TABLE `auth_group` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `auth_group_permissions`
--

DROP TABLE IF EXISTS `auth_group_permissions`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `auth_group_permissions` (
  `id` bigint NOT NULL AUTO_INCREMENT,
  `group_id` int NOT NULL,
  `permission_id` int NOT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `auth_group_permissions_group_id_permission_id_0cd325b0_uniq` (`group_id`,`permission_id`),
  KEY `auth_group_permissio_permission_id_84c5c92e_fk_auth_perm` (`permission_id`),
  CONSTRAINT `auth_group_permissio_permission_id_84c5c92e_fk_auth_perm` FOREIGN KEY (`permission_id`) REFERENCES `auth_permission` (`id`),
  CONSTRAINT `auth_group_permissions_group_id_b120cbf9_fk_auth_group_id` FOREIGN KEY (`group_id`) REFERENCES `auth_group` (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `auth_group_permissions`
--

LOCK TABLES `auth_group_permissions` WRITE;
/*!40000 ALTER TABLE `auth_group_permissions` DISABLE KEYS */;
/*!40000 ALTER TABLE `auth_group_permissions` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `auth_permission`
--

DROP TABLE IF EXISTS `auth_permission`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `auth_permission` (
  `id` int NOT NULL AUTO_INCREMENT,
  `name` varchar(255) NOT NULL,
  `content_type_id` int NOT NULL,
  `codename` varchar(100) NOT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `auth_permission_content_type_id_codename_01ab375a_uniq` (`content_type_id`,`codename`),
  CONSTRAINT `auth_permission_content_type_id_2f476e4b_fk_django_co` FOREIGN KEY (`content_type_id`) REFERENCES `django_content_type` (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=105 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `auth_permission`
--

LOCK TABLES `auth_permission` WRITE;
/*!40000 ALTER TABLE `auth_permission` DISABLE KEYS */;
INSERT INTO `auth_permission` VALUES (1,'Can add log entry',1,'add_logentry'),(2,'Can change log entry',1,'change_logentry'),(3,'Can delete log entry',1,'delete_logentry'),(4,'Can view log entry',1,'view_logentry'),(5,'Can add permission',2,'add_permission'),(6,'Can change permission',2,'change_permission'),(7,'Can delete permission',2,'delete_permission'),(8,'Can view permission',2,'view_permission'),(9,'Can add group',3,'add_group'),(10,'Can change group',3,'change_group'),(11,'Can delete group',3,'delete_group'),(12,'Can view group',3,'view_group'),(13,'Can add user',4,'add_user'),(14,'Can change user',4,'change_user'),(15,'Can delete user',4,'delete_user'),(16,'Can view user',4,'view_user'),(17,'Can add content type',5,'add_contenttype'),(18,'Can change content type',5,'change_contenttype'),(19,'Can delete content type',5,'delete_contenttype'),(20,'Can view content type',5,'view_contenttype'),(21,'Can add session',6,'add_session'),(22,'Can change session',6,'change_session'),(23,'Can delete session',6,'delete_session'),(24,'Can view session',6,'view_session'),(25,'Can add auth group',7,'add_authgroup'),(26,'Can change auth group',7,'change_authgroup'),(27,'Can delete auth group',7,'delete_authgroup'),(28,'Can view auth group',7,'view_authgroup'),(29,'Can add auth group permissions',8,'add_authgrouppermissions'),(30,'Can change auth group permissions',8,'change_authgrouppermissions'),(31,'Can delete auth group permissions',8,'delete_authgrouppermissions'),(32,'Can view auth group permissions',8,'view_authgrouppermissions'),(33,'Can add auth permission',9,'add_authpermission'),(34,'Can change auth permission',9,'change_authpermission'),(35,'Can delete auth permission',9,'delete_authpermission'),(36,'Can view auth permission',9,'view_authpermission'),(37,'Can add auth user',10,'add_authuser'),(38,'Can change auth user',10,'change_authuser'),(39,'Can delete auth user',10,'delete_authuser'),(40,'Can view auth user',10,'view_authuser'),(41,'Can add auth user groups',11,'add_authusergroups'),(42,'Can change auth user groups',11,'change_authusergroups'),(43,'Can delete auth user groups',11,'delete_authusergroups'),(44,'Can view auth user groups',11,'view_authusergroups'),(45,'Can add auth user user permissions',12,'add_authuseruserpermissions'),(46,'Can change auth user user permissions',12,'change_authuseruserpermissions'),(47,'Can delete auth user user permissions',12,'delete_authuseruserpermissions'),(48,'Can view auth user user permissions',12,'view_authuseruserpermissions'),(49,'Can add devices',13,'add_devices'),(50,'Can change devices',13,'change_devices'),(51,'Can delete devices',13,'delete_devices'),(52,'Can view devices',13,'view_devices'),(53,'Can add django admin log',14,'add_djangoadminlog'),(54,'Can change django admin log',14,'change_djangoadminlog'),(55,'Can delete django admin log',14,'delete_djangoadminlog'),(56,'Can view django admin log',14,'view_djangoadminlog'),(57,'Can add django content type',15,'add_djangocontenttype'),(58,'Can change django content type',15,'change_djangocontenttype'),(59,'Can delete django content type',15,'delete_djangocontenttype'),(60,'Can view django content type',15,'view_djangocontenttype'),(61,'Can add django migrations',16,'add_djangomigrations'),(62,'Can change django migrations',16,'change_djangomigrations'),(63,'Can delete django migrations',16,'delete_djangomigrations'),(64,'Can view django migrations',16,'view_djangomigrations'),(65,'Can add django session',17,'add_djangosession'),(66,'Can change django session',17,'change_djangosession'),(67,'Can delete django session',17,'delete_djangosession'),(68,'Can view django session',17,'view_djangosession'),(69,'Can add inputcream',18,'add_inputcream'),(70,'Can change inputcream',18,'change_inputcream'),(71,'Can delete inputcream',18,'delete_inputcream'),(72,'Can view inputcream',18,'view_inputcream'),(73,'Can add outputmilk',19,'add_outputmilk'),(74,'Can change outputmilk',19,'change_outputmilk'),(75,'Can delete outputmilk',19,'delete_outputmilk'),(76,'Can view outputmilk',19,'view_outputmilk'),(77,'Can add processreport',20,'add_processreport'),(78,'Can change processreport',20,'change_processreport'),(79,'Can delete processreport',20,'delete_processreport'),(80,'Can view processreport',20,'view_processreport'),(81,'Can add custom user',21,'add_customuser'),(82,'Can change custom user',21,'change_customuser'),(83,'Can delete custom user',21,'delete_customuser'),(84,'Can view custom user',21,'view_customuser'),(85,'Can add Token',22,'add_token'),(86,'Can change Token',22,'change_token'),(87,'Can delete Token',22,'delete_token'),(88,'Can view Token',22,'view_token'),(89,'Can add Token',23,'add_tokenproxy'),(90,'Can change Token',23,'change_tokenproxy'),(91,'Can delete Token',23,'delete_tokenproxy'),(92,'Can view Token',23,'view_tokenproxy'),(93,'Can add users',24,'add_users'),(94,'Can change users',24,'change_users'),(95,'Can delete users',24,'delete_users'),(96,'Can view users',24,'view_users'),(97,'Can add device name buffer',25,'add_devicenamebuffer'),(98,'Can change device name buffer',25,'change_devicenamebuffer'),(99,'Can delete device name buffer',25,'delete_devicenamebuffer'),(100,'Can view device name buffer',25,'view_devicenamebuffer'),(101,'Can add supplier names',26,'add_suppliernames'),(102,'Can change supplier names',26,'change_suppliernames'),(103,'Can delete supplier names',26,'delete_suppliernames'),(104,'Can view supplier names',26,'view_suppliernames');
/*!40000 ALTER TABLE `auth_permission` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `auth_user`
--

DROP TABLE IF EXISTS `auth_user`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `auth_user` (
  `id` int NOT NULL AUTO_INCREMENT,
  `password` varchar(128) NOT NULL,
  `last_login` datetime(6) DEFAULT NULL,
  `is_superuser` tinyint(1) NOT NULL,
  `username` varchar(150) NOT NULL,
  `first_name` varchar(150) NOT NULL,
  `last_name` varchar(150) NOT NULL,
  `email` varchar(254) NOT NULL,
  `is_staff` tinyint(1) NOT NULL,
  `is_active` tinyint(1) NOT NULL,
  `date_joined` datetime(6) NOT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `username` (`username`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `auth_user`
--

LOCK TABLES `auth_user` WRITE;
/*!40000 ALTER TABLE `auth_user` DISABLE KEYS */;
/*!40000 ALTER TABLE `auth_user` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `auth_user_groups`
--

DROP TABLE IF EXISTS `auth_user_groups`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `auth_user_groups` (
  `id` bigint NOT NULL AUTO_INCREMENT,
  `user_id` int NOT NULL,
  `group_id` int NOT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `auth_user_groups_user_id_group_id_94350c0c_uniq` (`user_id`,`group_id`),
  KEY `auth_user_groups_group_id_97559544_fk_auth_group_id` (`group_id`),
  CONSTRAINT `auth_user_groups_group_id_97559544_fk_auth_group_id` FOREIGN KEY (`group_id`) REFERENCES `auth_group` (`id`),
  CONSTRAINT `auth_user_groups_user_id_6a12ed8b_fk_auth_user_id` FOREIGN KEY (`user_id`) REFERENCES `auth_user` (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `auth_user_groups`
--

LOCK TABLES `auth_user_groups` WRITE;
/*!40000 ALTER TABLE `auth_user_groups` DISABLE KEYS */;
/*!40000 ALTER TABLE `auth_user_groups` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `auth_user_user_permissions`
--

DROP TABLE IF EXISTS `auth_user_user_permissions`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `auth_user_user_permissions` (
  `id` bigint NOT NULL AUTO_INCREMENT,
  `user_id` int NOT NULL,
  `permission_id` int NOT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `auth_user_user_permissions_user_id_permission_id_14a6b632_uniq` (`user_id`,`permission_id`),
  KEY `auth_user_user_permi_permission_id_1fbb5f2c_fk_auth_perm` (`permission_id`),
  CONSTRAINT `auth_user_user_permi_permission_id_1fbb5f2c_fk_auth_perm` FOREIGN KEY (`permission_id`) REFERENCES `auth_permission` (`id`),
  CONSTRAINT `auth_user_user_permissions_user_id_a95ead1b_fk_auth_user_id` FOREIGN KEY (`user_id`) REFERENCES `auth_user` (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `auth_user_user_permissions`
--

LOCK TABLES `auth_user_user_permissions` WRITE;
/*!40000 ALTER TABLE `auth_user_user_permissions` DISABLE KEYS */;
/*!40000 ALTER TABLE `auth_user_user_permissions` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `authtoken_token`
--

DROP TABLE IF EXISTS `authtoken_token`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `authtoken_token` (
  `key` varchar(40) NOT NULL,
  `created` datetime(6) NOT NULL,
  `user_id` bigint NOT NULL,
  PRIMARY KEY (`key`),
  UNIQUE KEY `user_id` (`user_id`),
  CONSTRAINT `authtoken_token_user_id_35299eff_fk_api_customuser_id` FOREIGN KEY (`user_id`) REFERENCES `api_customuser` (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `authtoken_token`
--

LOCK TABLES `authtoken_token` WRITE;
/*!40000 ALTER TABLE `authtoken_token` DISABLE KEYS */;
/*!40000 ALTER TABLE `authtoken_token` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `devicenamebuffer`
--

DROP TABLE IF EXISTS `devicenamebuffer`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `devicenamebuffer` (
  `id` int NOT NULL AUTO_INCREMENT,
  `name` varchar(255) NOT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `name` (`name`)
) ENGINE=InnoDB AUTO_INCREMENT=12 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `devicenamebuffer`
--

LOCK TABLES `devicenamebuffer` WRITE;
/*!40000 ALTER TABLE `devicenamebuffer` DISABLE KEYS */;
INSERT INTO `devicenamebuffer` VALUES (1,'D1'),(2,'D2'),(3,'D3'),(4,'D4'),(5,'D5'),(6,'D6'),(7,'D7'),(8,'D8'),(9,'D9'),(10,'F1'),(11,'F2');
/*!40000 ALTER TABLE `devicenamebuffer` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `devices`
--

DROP TABLE IF EXISTS `devices`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `devices` (
  `ID` int NOT NULL AUTO_INCREMENT,
  `BatchID` int DEFAULT NULL,
  `TestDevice` varchar(255) DEFAULT NULL,
  `SampleName` varchar(255) DEFAULT NULL,
  `SampleWeight` int DEFAULT NULL,
  `ColiformCount` varchar(255) DEFAULT NULL,
  `EColiCount` varchar(255) DEFAULT NULL,
  `MoldYeastCount` varchar(255) DEFAULT NULL,
  `ColdCount` varchar(255) DEFAULT NULL,
  PRIMARY KEY (`ID`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `devices`
--

LOCK TABLES `devices` WRITE;
/*!40000 ALTER TABLE `devices` DISABLE KEYS */;
/*!40000 ALTER TABLE `devices` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `devices_recordsinfo`
--

DROP TABLE IF EXISTS `devices_recordsinfo`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `devices_recordsinfo` (
  `BatchID` int NOT NULL AUTO_INCREMENT,
  `FullName` varchar(255) DEFAULT NULL,
  `Date` varchar(10) DEFAULT NULL,
  `GDate` date DEFAULT NULL,
  `CountPerBatch` int DEFAULT NULL,
  PRIMARY KEY (`BatchID`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `devices_recordsinfo`
--

LOCK TABLES `devices_recordsinfo` WRITE;
/*!40000 ALTER TABLE `devices_recordsinfo` DISABLE KEYS */;
/*!40000 ALTER TABLE `devices_recordsinfo` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `django_admin_log`
--

DROP TABLE IF EXISTS `django_admin_log`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `django_admin_log` (
  `id` int NOT NULL AUTO_INCREMENT,
  `action_time` datetime(6) NOT NULL,
  `object_id` longtext,
  `object_repr` varchar(200) NOT NULL,
  `action_flag` smallint unsigned NOT NULL,
  `change_message` longtext NOT NULL,
  `content_type_id` int DEFAULT NULL,
  `user_id` int NOT NULL,
  PRIMARY KEY (`id`),
  KEY `django_admin_log_content_type_id_c4bce8eb_fk_django_co` (`content_type_id`),
  KEY `django_admin_log_user_id_c564eba6_fk_auth_user_id` (`user_id`),
  CONSTRAINT `django_admin_log_content_type_id_c4bce8eb_fk_django_co` FOREIGN KEY (`content_type_id`) REFERENCES `django_content_type` (`id`),
  CONSTRAINT `django_admin_log_user_id_c564eba6_fk_auth_user_id` FOREIGN KEY (`user_id`) REFERENCES `auth_user` (`id`),
  CONSTRAINT `django_admin_log_chk_1` CHECK ((`action_flag` >= 0))
) ENGINE=InnoDB AUTO_INCREMENT=10 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `django_admin_log`
--

LOCK TABLES `django_admin_log` WRITE;
/*!40000 ALTER TABLE `django_admin_log` DISABLE KEYS */;
/*!40000 ALTER TABLE `django_admin_log` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `django_content_type`
--

DROP TABLE IF EXISTS `django_content_type`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `django_content_type` (
  `id` int NOT NULL AUTO_INCREMENT,
  `app_label` varchar(100) NOT NULL,
  `model` varchar(100) NOT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `django_content_type_app_label_model_76bd3d3b_uniq` (`app_label`,`model`)
) ENGINE=InnoDB AUTO_INCREMENT=27 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `django_content_type`
--

LOCK TABLES `django_content_type` WRITE;
/*!40000 ALTER TABLE `django_content_type` DISABLE KEYS */;
INSERT INTO `django_content_type` VALUES (1,'admin','logentry'),(7,'api','authgroup'),(8,'api','authgrouppermissions'),(9,'api','authpermission'),(10,'api','authuser'),(11,'api','authusergroups'),(12,'api','authuseruserpermissions'),(21,'api','customuser'),(25,'api','devicenamebuffer'),(13,'api','devices'),(14,'api','djangoadminlog'),(15,'api','djangocontenttype'),(16,'api','djangomigrations'),(17,'api','djangosession'),(18,'api','inputcream'),(19,'api','outputmilk'),(20,'api','processreport'),(26,'api','suppliernames'),(24,'api','users'),(3,'auth','group'),(2,'auth','permission'),(4,'auth','user'),(22,'authtoken','token'),(23,'authtoken','tokenproxy'),(5,'contenttypes','contenttype'),(6,'sessions','session');
/*!40000 ALTER TABLE `django_content_type` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `django_migrations`
--

DROP TABLE IF EXISTS `django_migrations`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `django_migrations` (
  `id` bigint NOT NULL AUTO_INCREMENT,
  `app` varchar(255) NOT NULL,
  `name` varchar(255) NOT NULL,
  `applied` datetime(6) NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=27 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `django_migrations`
--

LOCK TABLES `django_migrations` WRITE;
/*!40000 ALTER TABLE `django_migrations` DISABLE KEYS */;
INSERT INTO `django_migrations` VALUES (1,'contenttypes','0001_initial','2025-02-17 07:32:48.091956'),(2,'auth','0001_initial','2025-02-17 07:32:48.697744'),(3,'admin','0001_initial','2025-02-17 07:32:48.845645'),(4,'admin','0002_logentry_remove_auto_add','2025-02-17 07:32:48.853375'),(5,'admin','0003_logentry_add_action_flag_choices','2025-02-17 07:32:48.861843'),(6,'contenttypes','0002_remove_content_type_name','2025-02-17 07:32:48.968741'),(7,'auth','0002_alter_permission_name_max_length','2025-02-17 07:32:49.031588'),(8,'auth','0003_alter_user_email_max_length','2025-02-17 07:32:49.053178'),(9,'auth','0004_alter_user_username_opts','2025-02-17 07:32:49.060678'),(10,'auth','0005_alter_user_last_login_null','2025-02-17 07:32:49.122926'),(11,'auth','0006_require_contenttypes_0002','2025-02-17 07:32:49.126583'),(12,'auth','0007_alter_validators_add_error_messages','2025-02-17 07:32:49.144742'),(13,'auth','0008_alter_user_username_max_length','2025-02-17 07:32:49.215428'),(14,'auth','0009_alter_user_last_name_max_length','2025-02-17 07:32:49.284494'),(15,'auth','0010_alter_group_name_max_length','2025-02-17 07:32:49.303681'),(16,'auth','0011_update_proxy_permissions','2025-02-17 07:32:49.311392'),(17,'auth','0012_alter_user_first_name_max_length','2025-02-17 07:32:49.382900'),(18,'sessions','0001_initial','2025-02-17 07:32:49.424375'),(19,'api','0001_initial','2025-02-19 11:50:11.128954'),(20,'authtoken','0001_initial','2025-02-22 07:04:10.769411'),(21,'authtoken','0002_auto_20160226_1747','2025-02-22 07:04:10.794126'),(22,'authtoken','0003_tokenproxy','2025-02-22 07:04:10.805690'),(23,'authtoken','0004_alter_tokenproxy_options','2025-02-22 07:04:10.822534'),(24,'api','0002_devices','2025-02-22 10:57:03.203475'),(25,'api','0002_alter_devicenamebuffer_options','2025-03-09 06:13:08.094732'),(26,'api','0003_suppliernames_alter_devicenamebuffer_table','2025-03-09 06:13:08.101757');
/*!40000 ALTER TABLE `django_migrations` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `django_session`
--

DROP TABLE IF EXISTS `django_session`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `django_session` (
  `session_key` varchar(40) NOT NULL,
  `session_data` longtext NOT NULL,
  `expire_date` datetime(6) NOT NULL,
  PRIMARY KEY (`session_key`),
  KEY `django_session_expire_date_a5c62663` (`expire_date`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `django_session`
--

LOCK TABLES `django_session` WRITE;
/*!40000 ALTER TABLE `django_session` DISABLE KEYS */;
INSERT INTO `django_session` VALUES ('227hftbrq01wcio368pyouklt7dqvm2y','.eJxVjDsOwyAQBe9CHSF-Bpwyvc-AYHcJTiKQjF1FuXtsyUXSzsx7bxbitpawdVrCjOzKJLv8shThSfUQ-Ij13ji0ui5z4kfCT9v51JBet7P9Oyixl309Dl6C8157NWiNkrzJepQOXVKIUVAC5wSg2kGymWwGzNkCJDQqC8M-X91wONA:1tljhD:WT2579QGrgaZSMoHiV1RQBjWnoQAx68Tt9c-__JjktE','2025-03-08 07:13:07.686153');
/*!40000 ALTER TABLE `django_session` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `inputcream`
--

DROP TABLE IF EXISTS `inputcream`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `inputcream` (
  `ID` int NOT NULL AUTO_INCREMENT,
  `BatchID` int DEFAULT NULL,
  `Supplier` varchar(255) NOT NULL,
  `PH` float DEFAULT NULL,
  `Acid` float DEFAULT NULL,
  `Fat` float DEFAULT NULL,
  `SNF` float DEFAULT NULL,
  `Weight` float NOT NULL,
  `serial` int DEFAULT NULL,
  `warehouse` varchar(255) DEFAULT NULL,
  `barnameh` int DEFAULT NULL,
  `purchase_document` int DEFAULT NULL,
  `cream_weight` int DEFAULT NULL,
  `butter_weight` int DEFAULT NULL,
  `consumption` tinyint(1) DEFAULT NULL,
  PRIMARY KEY (`ID`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `inputcream`
--

LOCK TABLES `inputcream` WRITE;
/*!40000 ALTER TABLE `inputcream` DISABLE KEYS */;
/*!40000 ALTER TABLE `inputcream` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `inputcream_recordsinfo`
--

DROP TABLE IF EXISTS `inputcream_recordsinfo`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `inputcream_recordsinfo` (
  `BatchID` int NOT NULL AUTO_INCREMENT,
  `FullName` varchar(255) DEFAULT NULL,
  `Date` varchar(10) DEFAULT NULL,
  `GDate` date DEFAULT NULL,
  `CountPerBatch` int DEFAULT NULL,
  PRIMARY KEY (`BatchID`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `inputcream_recordsinfo`
--

LOCK TABLES `inputcream_recordsinfo` WRITE;
/*!40000 ALTER TABLE `inputcream_recordsinfo` DISABLE KEYS */;
/*!40000 ALTER TABLE `inputcream_recordsinfo` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `inputcream_recordsinfo2`
--

DROP TABLE IF EXISTS `inputcream_recordsinfo2`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `inputcream_recordsinfo2` (
  `BatchID` int NOT NULL AUTO_INCREMENT,
  `reportnumber` int DEFAULT NULL,
  `Date` varchar(10) DEFAULT NULL,
  `GDate` date DEFAULT NULL,
  `isreportcompleted` tinyint(1) DEFAULT NULL,
  `FullName` varchar(255) DEFAULT NULL,
  PRIMARY KEY (`BatchID`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `inputcream_recordsinfo2`
--

LOCK TABLES `inputcream_recordsinfo2` WRITE;
/*!40000 ALTER TABLE `inputcream_recordsinfo2` DISABLE KEYS */;
/*!40000 ALTER TABLE `inputcream_recordsinfo2` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `outputmilk`
--

DROP TABLE IF EXISTS `outputmilk`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `outputmilk` (
  `ID` int NOT NULL AUTO_INCREMENT,
  `BatchID` int NOT NULL DEFAULT '0',
  `Supplier` varchar(255) NOT NULL,
  `PH` float DEFAULT NULL,
  `Acid` float DEFAULT NULL,
  `Fat` float DEFAULT NULL,
  `SNF` float DEFAULT NULL,
  `Weight` float NOT NULL,
  PRIMARY KEY (`ID`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `outputmilk`
--

LOCK TABLES `outputmilk` WRITE;
/*!40000 ALTER TABLE `outputmilk` DISABLE KEYS */;
/*!40000 ALTER TABLE `outputmilk` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `outputmilk_recordsinfo`
--

DROP TABLE IF EXISTS `outputmilk_recordsinfo`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `outputmilk_recordsinfo` (
  `BatchID` int NOT NULL AUTO_INCREMENT,
  `FullName` varchar(255) DEFAULT NULL,
  `Date` varchar(10) DEFAULT NULL,
  `GDate` date DEFAULT NULL,
  `CountPerBatch` int DEFAULT NULL,
  PRIMARY KEY (`BatchID`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `outputmilk_recordsinfo`
--

LOCK TABLES `outputmilk_recordsinfo` WRITE;
/*!40000 ALTER TABLE `outputmilk_recordsinfo` DISABLE KEYS */;
/*!40000 ALTER TABLE `outputmilk_recordsinfo` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `processreport`
--

DROP TABLE IF EXISTS `processreport`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `processreport` (
  `ID` int NOT NULL AUTO_INCREMENT,
  `BatchID` int NOT NULL DEFAULT '0',
  `Color` varchar(50) DEFAULT NULL,
  `PalletNumber` int DEFAULT NULL,
  `Supplier` varchar(255) DEFAULT NULL,
  `FatButter` float DEFAULT NULL,
  `TankNumber` int DEFAULT NULL,
  `AcidButter` float DEFAULT NULL,
  `SNFButtermilk` float DEFAULT NULL,
  `FatButtermilk` float DEFAULT NULL,
  `AcidButtermilk` float DEFAULT NULL,
  `PHButtermilk` float DEFAULT NULL,
  PRIMARY KEY (`ID`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `processreport`
--

LOCK TABLES `processreport` WRITE;
/*!40000 ALTER TABLE `processreport` DISABLE KEYS */;
/*!40000 ALTER TABLE `processreport` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `processreport_recordsinfo`
--

DROP TABLE IF EXISTS `processreport_recordsinfo`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `processreport_recordsinfo` (
  `BatchID` int NOT NULL AUTO_INCREMENT,
  `FullName` varchar(255) DEFAULT NULL,
  `Date` varchar(10) DEFAULT NULL,
  `GDate` date DEFAULT NULL,
  `CountPerBatch` int DEFAULT NULL,
  PRIMARY KEY (`BatchID`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `processreport_recordsinfo`
--

LOCK TABLES `processreport_recordsinfo` WRITE;
/*!40000 ALTER TABLE `processreport_recordsinfo` DISABLE KEYS */;
/*!40000 ALTER TABLE `processreport_recordsinfo` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `suppliernames`
--

DROP TABLE IF EXISTS `suppliernames`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `suppliernames` (
  `id` int NOT NULL AUTO_INCREMENT,
  `name` varchar(255) NOT NULL,
  `agreement_fat` decimal(10,2) DEFAULT '0.00',
  `code` varchar(255) NOT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `supplier_code` (`code`),
  UNIQUE KEY `code` (`code`)
) ENGINE=InnoDB AUTO_INCREMENT=60 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `suppliernames`
--

LOCK TABLES `suppliernames` WRITE;
/*!40000 ALTER TABLE `suppliernames` DISABLE KEYS */;
INSERT INTO `suppliernames` VALUES (1,'نيكان زرگل پارسيان',0.00,'21142'),(2,'نفری آقای',0.00,'21496'),(3,'مهدی بصيری',0.00,'20536'),(4,'مجتمع کارخانجات کشت و صنعت شمال(لتکا)',0.00,'20382'),(5,'مجتمع صنايع غذايي بهپودر اصفهان',0.00,'20552'),(6,'مجتمع توليدي یزد سپار',0.00,'21314'),(7,'لبنيات کالبر',0.00,'20367'),(8,'کره برادران(جيرانپور)',0.00,'20336'),(9,'قنادي نغمه',0.00,'21531'),(10,'قاسمي علي',0.00,'20512'),(11,'فروشگاه رحماني',0.00,'20497'),(12,'فرآورده هاي لبني دلوا',0.00,'21563'),(13,'فراورده هاي لبنی یکتا شير سامان',0.00,'21582'),(14,'عليدوستي (مشهد) .',0.00,'20847'),(15,'ضيايي(زرين شاد) آقای مهندس',0.00,'21170'),(16,'صنايع غذائی دامون زاگرس بروجرد',0.00,'21267'),(17,'شير خشک نوزاد پگاه شهركرد',0.00,'20273'),(18,'شير پاستوريزه ارمغان',0.00,'20372'),(19,'شركت یزد سپار(دامكي)',0.00,'21633'),(20,'شركت مصباح اصفهان زاينده رود',0.00,'21317'),(21,'شركت مرواريد سحر',0.00,'21569'),(22,'شركت گلشاد مشهد(اقاي ميرحسيني)',0.00,'20252'),(23,'شركت گلچين لبن سپاهان',0.00,'21226'),(24,'شركت کيميا پودرسازان آسيا',0.00,'20886'),(25,'شركت فرآورده هاي لبني نوشه',0.00,'21486'),(26,'شركت عطر و طعم ديارا',0.00,'21289'),(27,'شركت طلاي ناب کيهان زرناب',0.00,'21567'),(28,'شركت طلاي ناب كيهان',0.00,'21283'),(29,'شركت شيكا(نورافشان)',0.00,'20170'),(30,'شركت شير پاستوريزه پگاه فارس',0.00,'20589'),(31,'شركت شير پاستوريزه پگاه خوزستان',0.00,'20627'),(32,'شركت زرين لبن پارس( حجاريان )',0.00,'20621'),(33,'شركت زرين شاد سپاهان',0.00,'20620'),(34,'شركت روغن نباتی گلناز',0.00,'21364'),(35,'شركت داريو لبن یزد',0.00,'21296'),(36,'شركت جهان کالا فيدار شمس',0.00,'21421'),(37,'شركت توليد نهاده ها و فرآورده های دامی کيميای وحدت اسپادان',0.00,'21197'),(38,'شركت تنديس سلامت وطن',0.00,'21290'),(39,'شركت پيشگامان توزيع آفتاب',0.00,'21067'),(40,'شركت پگاه لرستان',0.00,'20583'),(41,'شركت پگاه كرمان',0.00,'20610'),(42,'شركت بهروران پيشرو اقتصاد سديد',0.00,'21499'),(43,'شركت بستني رامک بيتا',0.00,'20580'),(44,'شركت آرتا فيدار کيا',0.00,'21461'),(45,'شركت آراسلولز فارس',0.00,'20184'),(46,'سحر گاه لبن',0.00,'20144'),(47,'زرين تجارت معروف',0.00,'21561'),(48,'رهروان تجارت كهن',0.00,'21324'),(49,'دايان تجارت راستين',0.00,'21605'),(50,'داريو لبن',0.00,'21413'),(51,'حميدرضا پيشرو',0.00,'21287'),(52,'تجارت گستران بارمان آراز',0.00,'21275'),(53,'آقاي ميرزائي(تيران)',0.00,'21297'),(54,'آقاي  دليری',0.00,'21344'),(55,'آريان لبن نقش جهان',0.00,'20548'),(56,'امين مهر آسمان(خامه)',0.00,'21611'),(57,'اکبريه',0.00,'20007'),(58,'(کارمزدی) آقای صادقی',0.00,'21506'),(59,'(سحرگاه لبن) احمدی',0.00,'21588');
/*!40000 ALTER TABLE `suppliernames` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `users`
--

DROP TABLE IF EXISTS `users`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `users` (
  `FirstName` varchar(225) NOT NULL,
  `LastName` varchar(225) NOT NULL,
  `UserName` varchar(225) NOT NULL,
  `Password` varchar(255) NOT NULL,
  `Role` enum('admin','lab_supervisor','inventory_manager','production_manager') NOT NULL,
  `is_active` tinyint(1) NOT NULL DEFAULT '1',
  `is_staff` tinyint(1) NOT NULL DEFAULT '0',
  `is_superuser` tinyint(1) NOT NULL DEFAULT '0',
  `last_login` datetime DEFAULT NULL,
  PRIMARY KEY (`UserName`),
  UNIQUE KEY `UserName_UNIQUE` (`UserName`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `users`
--

LOCK TABLES `users` WRITE;
/*!40000 ALTER TABLE `users` DISABLE KEYS */;
INSERT INTO `users` VALUES ('ادمین','ادمین','admin','pbkdf2_sha256$600000$nEhHf0U0S31JhL4rfiHyRf$BPq6dyLwQgSNwNWvcb4Qee8iGx392Ri39rU5Ospk0vw=','admin',1,0,0,NULL),('name_aaaa','last_name_aaaa','admin_user','pbkdf2_sha256$600000$vZtAmrYBbplMWkIAvjJBSr$JuQAJ3eniid/FyfBerP0Ggl8sEQ4rX8HxDa9XTePuVQ=','admin',1,1,1,NULL),('name_iiii','last_name_iiii','inventory_manager','pbkdf2_sha256$600000$vZtAmrYBbplMWkIAvjJBSr$JuQAJ3eniid/FyfBerP0Ggl8sEQ4rX8HxDa9XTePuVQ=','inventory_manager',1,0,0,NULL),('name_llll','last_name_llll','lab_manager','pbkdf2_sha256$600000$vZtAmrYBbplMWkIAvjJBSr$JuQAJ3eniid/FyfBerP0Ggl8sEQ4rX8HxDa9XTePuVQ=','lab_supervisor',1,0,0,NULL),('name_pppp','last_name_pppp','production_manager','pbkdf2_sha256$600000$vZtAmrYBbplMWkIAvjJBSr$JuQAJ3eniid/FyfBerP0Ggl8sEQ4rX8HxDa9XTePuVQ=','production_manager',1,0,0,NULL);
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

-- Dump completed on 2025-04-06 16:13:29
