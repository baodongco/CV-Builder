# CV Builder

## Getting started
-   Open MySQL and type this SQL to create database for this project:
```
CREATE DATABASE CVBuilder;

CREATE TABLE `users` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `username` varchar(100) NOT NULL,
  `email` varchar(50) NOT NULL DEFAULT '',
  `password` varchar(100) NOT NULL DEFAULT '',
  `role` varchar(10) DEFAULT 'user',
  `activationCode` varchar(50) DEFAULT '',
  `changePassCode` varchar(50) DEFAULT NULL,
  `passCodeStartDate` timestamp NULL DEFAULT NULL,
  `isDisabled` tinyint(1) DEFAULT '0',
  PRIMARY KEY (`id`),
  UNIQUE KEY `username` (`email`)
) ENGINE=InnoDB AUTO_INCREMENT=46 DEFAULT CHARSET=latin1;
```
-   Open Terminal/Command Prompt/Powershell, direct to project's folder and type this to run:
```
$ npm start
```
