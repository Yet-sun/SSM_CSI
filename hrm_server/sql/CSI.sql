-- --------------------------------------------------------
-- 主机:                           127.0.0.1
-- 服务器版本:                        10.3.13-MariaDB - mariadb.org binary distribution
-- 服务器操作系统:                      Win64
-- HeidiSQL 版本:                  9.5.0.5196
-- --------------------------------------------------------

/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET NAMES utf8 */;
/*!50503 SET NAMES utf8mb4 */;
/*!40014 SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0 */;
/*!40101 SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='NO_AUTO_VALUE_ON_ZERO' */;


-- 导出 shixun 的数据库结构
CREATE DATABASE IF NOT EXISTS `shixun` /*!40100 DEFAULT CHARACTER SET latin1 */;
USE `shixun`;

-- 导出  表 shixun.dept_inf 结构
CREATE TABLE IF NOT EXISTS `dept_inf` (
  `ID` int(11) NOT NULL,
  `NAME` varchar(50) NOT NULL,
  `REMARK` varchar(300) NOT NULL,
  PRIMARY KEY (`ID`)
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

-- 数据导出被取消选择。
-- 导出  表 shixun.document_inf 结构
CREATE TABLE IF NOT EXISTS `document_inf` (
  `ID` int(11) NOT NULL AUTO_INCREMENT,
  `TITLE` varchar(50) DEFAULT NULL,
  `Filename` varchar(300) DEFAULT NULL,
  `REMARK` varchar(300) DEFAULT NULL,
  `CREATE_DATE` timestamp NOT NULL DEFAULT current_timestamp(),
  `USER_ID` int(11) DEFAULT NULL,
  PRIMARY KEY (`ID`)
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

-- 数据导出被取消选择。
-- 导出  表 shixun.facekey_inf 结构
CREATE TABLE IF NOT EXISTS `facekey_inf` (
  `Id` int(11) NOT NULL,
  `appID` varchar(32) NOT NULL,
  `apiKey` varchar(32) NOT NULL,
  `secretKey` varchar(32) NOT NULL,
  `threshold` int(3) NOT NULL,
  PRIMARY KEY (`Id`)
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

-- 数据导出被取消选择。
-- 导出  表 shixun.imployee inf 结构
CREATE TABLE IF NOT EXISTS `imployee inf` (
  `ID` int(11) NOT NULL,
  `DEPT_ID` int(11) NOT NULL,
  `JOB_ID` int(11) NOT NULL,
  `NAME` varchar(20) DEFAULT NULL,
  `CARD_ID` varchar(18) DEFAULT NULL,
  `ADDRESS` varchar(50) DEFAULT NULL,
  `POST_CODE` varchar(50) DEFAULT NULL,
  `TEL` varchar(16) DEFAULT NULL,
  `PHONE` varchar(11) DEFAULT NULL,
  `QQ_NUM` varchar(10) DEFAULT NULL,
  `EMAIL` varchar(50) DEFAULT NULL,
  `SEX` int(11) DEFAULT NULL,
  `PARTY` varchar(10) DEFAULT NULL,
  `BIRTHDAY` datetime DEFAULT NULL,
  `RACE` varchar(100) DEFAULT NULL,
  `EDUCATION` varchar(10) DEFAULT NULL,
  `ESPECILITY` varchar(20) DEFAULT NULL,
  `HOBBY` varchar(100) DEFAULT NULL,
  `REMARK` varchar(500) DEFAULT NULL,
  `CREATE_DATE` timestamp NULL DEFAULT NULL,
  PRIMARY KEY (`ID`,`DEPT_ID`,`JOB_ID`)
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

-- 数据导出被取消选择。
-- 导出  表 shixun.job_inf 结构
CREATE TABLE IF NOT EXISTS `job_inf` (
  `ID` int(11) NOT NULL,
  `NAME` varchar(50) NOT NULL,
  `REMARK` varchar(300) NOT NULL,
  PRIMARY KEY (`ID`)
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

-- 数据导出被取消选择。
-- 导出  表 shixun.notice_inf 结构
CREATE TABLE IF NOT EXISTS `notice_inf` (
  `ID` int(11) NOT NULL,
  `TITLE` varchar(50) NOT NULL,
  `CONTENT` varchar(50) NOT NULL,
  `CREATE_DAT` timestamp NOT NULL DEFAULT current_timestamp() ON UPDATE current_timestamp(),
  `USER_ID` int(11) NOT NULL,
  PRIMARY KEY (`ID`)
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

-- 数据导出被取消选择。
-- 导出  表 shixun.user_inf 结构
CREATE TABLE IF NOT EXISTS `user_inf` (
  `ID` int(11) NOT NULL,
  `Loginname` varchar(20) NOT NULL,
  `PASSWORD` varchar(32) NOT NULL,
  `STATUS` int(11) NOT NULL,
  `Createdate` timestamp NOT NULL DEFAULT current_timestamp() ON UPDATE current_timestamp(),
  `Username` varchar(20) NOT NULL,
  `Faceurl` varchar(255) NOT NULL,
  `Facepath` varchar(255) NOT NULL,
  PRIMARY KEY (`ID`)
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

-- 数据导出被取消选择。
/*!40101 SET SQL_MODE=IFNULL(@OLD_SQL_MODE, '') */;
/*!40014 SET FOREIGN_KEY_CHECKS=IF(@OLD_FOREIGN_KEY_CHECKS IS NULL, 1, @OLD_FOREIGN_KEY_CHECKS) */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
