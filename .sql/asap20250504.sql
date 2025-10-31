-- MySQL dump 10.13  Distrib 8.0.41, for Linux (x86_64)
--
-- Host: localhost    Database: asap
-- ------------------------------------------------------
-- Server version	8.0.41-0ubuntu0.20.04.1

/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!50503 SET NAMES utf8mb4 */;
/*!40103 SET @OLD_TIME_ZONE=@@TIME_ZONE */;
/*!40103 SET TIME_ZONE='+00:00' */;
/*!40014 SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0 */;
/*!40014 SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0 */;
/*!40101 SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='NO_AUTO_VALUE_ON_ZERO' */;
/*!40111 SET @OLD_SQL_NOTES=@@SQL_NOTES, SQL_NOTES=0 */;

--
-- Table structure for table `admin_list`
--

DROP TABLE IF EXISTS `admin_list`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `admin_list` (
  `id` int NOT NULL AUTO_INCREMENT,
  `user_id` varchar(128) NOT NULL,
  `password` varchar(512) NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=3 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `admin_list`
--

LOCK TABLES `admin_list` WRITE;
/*!40000 ALTER TABLE `admin_list` DISABLE KEYS */;
INSERT INTO `admin_list` VALUES (2,'asap','e69901634b8109c76604ce7d9b771006');
/*!40000 ALTER TABLE `admin_list` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `auth_temp_password`
--

DROP TABLE IF EXISTS `auth_temp_password`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `auth_temp_password` (
  `id` int NOT NULL AUTO_INCREMENT,
  `user_id` varchar(256) NOT NULL,
  `temp_password` varchar(256) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci NOT NULL,
  `created` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `auth_temp_password`
--

LOCK TABLES `auth_temp_password` WRITE;
/*!40000 ALTER TABLE `auth_temp_password` DISABLE KEYS */;
/*!40000 ALTER TABLE `auth_temp_password` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `banner`
--

DROP TABLE IF EXISTS `banner`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `banner` (
  `type` varchar(255) NOT NULL,
  `banner_image` varchar(2000) NOT NULL,
  `link` varchar(2000) DEFAULT NULL,
  PRIMARY KEY (`type`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `banner`
--

LOCK TABLES `banner` WRITE;
/*!40000 ALTER TABLE `banner` DISABLE KEYS */;
/*!40000 ALTER TABLE `banner` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `email_certification`
--

DROP TABLE IF EXISTS `email_certification`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `email_certification` (
  `id` int NOT NULL AUTO_INCREMENT,
  `user_id` varchar(256) NOT NULL,
  `serial` varchar(256) NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=5 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `email_certification`
--

LOCK TABLES `email_certification` WRITE;
/*!40000 ALTER TABLE `email_certification` DISABLE KEYS */;
INSERT INTO `email_certification` VALUES (3,'test1989','nx7mu3zg9f');
/*!40000 ALTER TABLE `email_certification` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `estimate_list`
--

DROP TABLE IF EXISTS `estimate_list`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `estimate_list` (
  `id` int NOT NULL AUTO_INCREMENT,
  `estimate_request_id` int NOT NULL,
  `writer` varchar(256) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci NOT NULL,
  `requestor` varchar(512) NOT NULL,
  `provider_company` varchar(1024) NOT NULL,
  `provider_address` varchar(1024) NOT NULL,
  `provider_phone` varchar(1024) NOT NULL,
  `estimate_product_name` varchar(1024) NOT NULL,
  `estimate_amount` varchar(1024) NOT NULL,
  `estimate_price` varchar(1024) NOT NULL,
  `estimate_total` varchar(1024) NOT NULL,
  `condition_pay_date` varchar(1024) NOT NULL,
  `condition_validity` varchar(1024) NOT NULL,
  `condition_option` varchar(1024) NOT NULL,
  `created` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=3 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `estimate_list`
--

LOCK TABLES `estimate_list` WRITE;
/*!40000 ALTER TABLE `estimate_list` DISABLE KEYS */;
INSERT INTO `estimate_list` VALUES (1,3,'djae88','vincenzo','13','231','123','1231','3213','1231','231','312','13213','1231','2024-03-13 13:35:36'),(2,4,'reengineer','djae88','ffff','eee','fff','fff','fff','ff','ff','ff','ff','fff','2024-03-13 13:48:58');
/*!40000 ALTER TABLE `estimate_list` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `estimate_request_list`
--

DROP TABLE IF EXISTS `estimate_request_list`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `estimate_request_list` (
  `id` int NOT NULL AUTO_INCREMENT,
  `writer` varchar(512) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci NOT NULL,
  `category` varchar(512) DEFAULT NULL,
  `product_name` varchar(2048) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci NOT NULL DEFAULT '품명',
  `amount` int NOT NULL DEFAULT '0',
  `pay_date` varchar(1024) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci NOT NULL DEFAULT '일자',
  `deadline` varchar(1024) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci NOT NULL DEFAULT '마감기한',
  `memo` varchar(4096) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci NOT NULL DEFAULT '비고',
  `thumbnail` varchar(1024) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci NOT NULL DEFAULT 'default.png',
  `attachment` varchar(1024) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci DEFAULT NULL,
  `view_count` int NOT NULL DEFAULT '0',
  `created` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=11 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `estimate_request_list`
--

LOCK TABLES `estimate_request_list` WRITE;
/*!40000 ALTER TABLE `estimate_request_list` DISABLE KEYS */;
INSERT INTO `estimate_request_list` VALUES (7,'reengineer',NULL,'전동킥보드用 모터 구매합니다',0,'2024. 03','2024.04','모터 업체 또는 개발 가능업체 찾습니다.','KakaoTalk_20231117_095811276-1710422368557.png',NULL,0,'2024-03-14 13:19:28'),(8,'reengineer',NULL,'차량 내부 운전저 인식 카메라 개발 가능 업체 ',0,'24. 1사분기','','차량 내부 운전저 인식 카메라 개발 가능 업체 연락 바랍니다.','KakaoTalk_20231031_141114446-1710422477827.png',NULL,0,'2024-03-14 13:21:18'),(9,'reengineer',NULL,'현대차 협력업체, 파워모듈 3kw 구매',0,'24.04.12','24.04.30','현대차 협력업체, 파워모듈 3kw 구매','파워케이스_190621-1710422623666.jpg',NULL,0,'2024-03-14 13:23:45'),(10,'reengineer',NULL,'리틀휴즈 견적',0,'24.04','','리틀휴즈 공급 가능하신 분? ','default.png',NULL,0,'2024-03-28 23:56:11');
/*!40000 ALTER TABLE `estimate_request_list` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `estimate_request_scrap_list`
--

DROP TABLE IF EXISTS `estimate_request_scrap_list`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `estimate_request_scrap_list` (
  `id` int NOT NULL AUTO_INCREMENT,
  `user_id` varchar(256) NOT NULL,
  `estimate_request_id` int NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=2 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `estimate_request_scrap_list`
--

LOCK TABLES `estimate_request_scrap_list` WRITE;
/*!40000 ALTER TABLE `estimate_request_scrap_list` DISABLE KEYS */;
/*!40000 ALTER TABLE `estimate_request_scrap_list` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `message_list`
--

DROP TABLE IF EXISTS `message_list`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `message_list` (
  `id` int NOT NULL AUTO_INCREMENT,
  `type` varchar(256) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci NOT NULL,
  `sender` varchar(256) NOT NULL,
  `receiver` varchar(256) NOT NULL,
  `content` varchar(4096) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci DEFAULT NULL,
  `image` varchar(1024) DEFAULT NULL,
  `attachment` varchar(1024) DEFAULT NULL,
  `estimate_id` int DEFAULT NULL,
  `created` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=11 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `message_list`
--

LOCK TABLES `message_list` WRITE;
/*!40000 ALTER TABLE `message_list` DISABLE KEYS */;
INSERT INTO `message_list` VALUES (1,'estimate','djae88','vincenzo',NULL,NULL,NULL,1,'2024-03-13 13:35:37'),(2,'text','reengineer','djae88','ffff',NULL,NULL,NULL,'2024-03-13 13:42:42'),(3,'text','reengineer','djae88','fff',NULL,NULL,NULL,'2024-03-13 13:43:01'),(4,'estimate','reengineer','djae88',NULL,NULL,NULL,2,'2024-03-13 13:48:59'),(5,'text','','djae88','ㄹㄹㄹ',NULL,NULL,NULL,'2024-03-14 04:49:56'),(6,'text','','djae88','ddd',NULL,NULL,NULL,'2024-03-14 04:54:59'),(7,'text','','djae88','123123',NULL,NULL,NULL,'2024-03-14 04:56:12'),(8,'text','','djae88','234234243',NULL,NULL,NULL,'2024-03-14 04:56:32'),(9,'text','','djae88','ffff',NULL,NULL,NULL,'2024-03-14 07:05:59'),(10,'text','reengineer','djae88','ffff',NULL,NULL,NULL,'2024-03-14 09:25:38');
/*!40000 ALTER TABLE `message_list` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `solution_list`
--

DROP TABLE IF EXISTS `solution_list`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `solution_list` (
  `id` int NOT NULL AUTO_INCREMENT,
  `writer` varchar(256) NOT NULL,
  `category` varchar(256) NOT NULL,
  `title` varchar(512) NOT NULL,
  `content` mediumblob NOT NULL,
  `attachment` varchar(1024) DEFAULT NULL,
  `view_count` int NOT NULL DEFAULT '0',
  `created` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=23 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `solution_list`
--

LOCK TABLES `solution_list` WRITE;
/*!40000 ALTER TABLE `solution_list` DISABLE KEYS */;
INSERT INTO `solution_list` VALUES (14,'reengineer','건축/건설/토목','가설재 임대 대여 ',_binary '<p><img src=\"/upload/board/filename-1710422743284.png\"></p><p>가설재 / 유로폼/ 거푸집/ 아시바(강관비계)/ 비티아시바/ 써포트 임대 대여 </p>',NULL,0,'2024-03-14 13:26:15'),(15,'reengineer','전기/전자','국내 40군데 납품하고 있는 LED컨버터 개발업체, 제조업체입니다.',_binary '<p><img src=\"/upload/board/filename-1710422842949.png\"></p><p></p><p>LED 컨버터 개발 및 제조업체입니다.</p><p>국내 40여개 회사에 납품하고 있습니다.</p>',NULL,0,'2024-03-14 13:28:25'),(17,'reengineer','전기/전자','삼성LED, 오스람LED 각종 LED 칩 재고 70% 할인 ',_binary '<customimage src=\"/upload/board/filename-1710669724624.png\" width=\"374\" height=\"289\"></customimage><p>삼성LED, 오스람LED 각종 LED 칩 재고 70% 할인 </p>',NULL,0,'2024-03-17 10:03:14'),(18,'reengineer','전기/전자','전기차 충전기 개발/제조 회사, 출시 기념 특가 및 판매처 모집',_binary '<p>전기차 충전기 개발/제조 회사, 출시 기념 특가 및 판매처 모집</p><p></p><customimage src=\"/upload/board/filename-1710670116706.png\" width=\"320\" height=\"223\"></customimage><p></p>',NULL,0,'2024-03-17 10:08:48'),(19,'reengineer','전기/전자','바이드뮬러 부품, SPD 재고 떨이 70%',_binary '<p>바이드뮬러 SPD 재고가 너무 많아서 시세가 보다 79% 할인해 판매합니다.</p>',NULL,0,'2024-03-17 10:44:11'),(20,'reengineer','화학/재료/소재','비건 음식 제조 스타트업, 판매 대리점 모집 ',_binary '<customimage src=\"/upload/board/filename-1710672396246.png\"></customimage><p></p>',NULL,0,'2024-03-17 10:46:41'),(22,'ruledes3030','IT/SW','웹사이트, 홈페이지 최저가로 만들어 드립니다.',_binary '<p>정말 싸게 만들어 드립니다.</p><customimage src=\"/upload/board/filename-1746352185306.png\"></customimage><p></p>',NULL,0,'2025-05-04 09:49:49');
/*!40000 ALTER TABLE `solution_list` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `solution_scrap_list`
--

DROP TABLE IF EXISTS `solution_scrap_list`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `solution_scrap_list` (
  `id` int NOT NULL AUTO_INCREMENT,
  `user_id` varchar(256) NOT NULL,
  `solution_id` int NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `solution_scrap_list`
--

LOCK TABLES `solution_scrap_list` WRITE;
/*!40000 ALTER TABLE `solution_scrap_list` DISABLE KEYS */;
/*!40000 ALTER TABLE `solution_scrap_list` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `user_info`
--

DROP TABLE IF EXISTS `user_info`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `user_info` (
  `id` int NOT NULL AUTO_INCREMENT,
  `user_id` varchar(255) NOT NULL,
  `nickname` varchar(255) DEFAULT NULL,
  `password` varchar(500) NOT NULL,
  `email` varchar(255) NOT NULL,
  `profile_image` varchar(500) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci NOT NULL DEFAULT 'default_m1.png',
  `type` varchar(255) NOT NULL DEFAULT '사용자',
  `status` varchar(256) NOT NULL,
  `created` datetime NOT NULL DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=5 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `user_info`
--

LOCK TABLES `user_info` WRITE;
/*!40000 ALTER TABLE `user_info` DISABLE KEYS */;
INSERT INTO `user_info` VALUES (1,'djae88',NULL,'1000dfd9ed7ab0a567ef89bebb67c924','widjae88@naver.com','default_m1.png','사용자','인증완료','2024-03-13 22:25:51'),(2,'reengineer',NULL,'85df572646baf62d53e5f9accac59a86','keynes30@naver.com','default_m1.png','사용자','인증완료','2024-03-13 22:39:56'),(3,'test1989',NULL,'aaaf78c96331c73a939ef4b7e504633b','test@test.com','default_m1.png','사용자','미인증','2024-03-21 02:07:43'),(4,'ruledes3030',NULL,'85df572646baf62d53e5f9accac59a86','ruledes3030@gmail.com','default_m1.png','사용자','인증완료','2025-05-01 01:35:52');
/*!40000 ALTER TABLE `user_info` ENABLE KEYS */;
UNLOCK TABLES;
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2025-05-04 10:14:58
