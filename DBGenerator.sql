CREATE DATABASE CVBuilder;

use CVBuilder;

CREATE TABLE user (
  id int PRIMARY KEY AUTO_INCREMENT,
  username varchar(100) NOT NULL,
  email varchar(100) NOT NULL,
  password varchar(100) NOT NULL,
  role varchar(10) DEFAULT 'user',
  activationCode varchar(50),
  changePassCode varchar(50),
  passCodeStartDate TIMESTAMP,
  isDisabled tinyint(1) DEFAULT '0'
);

CREATE TABLE resume (
  id int PRIMARY KEY AUTO_INCREMENT,
  firstName VARCHAR(100) NOT NULL,
  lastName VARCHAR(100),
  email VARCHAR(100) NOT NULL,
  phone VARCHAR(50),
  website VARCHAR(300),
  address VARCHAR(300),
  sumHeadline VARCHAR(500),
  sumContent VARCHAR(500),
  photoUrl VARCHAR(300),
  publicLink VARCHAR(300),
  userId int,
  FOREIGN KEY (userId) REFERENCES user(id)
);

CREATE TABLE skill (
  id int PRIMARY KEY AUTO_INCREMENT,
  name VARCHAR(100),
  expertise int,
  experience VARCHAR(100),
  lastUsed DATE,
  resId int,
  FOREIGN KEY (resId) REFERENCES resume(id)
);

CREATE TABLE project (
  id int PRIMARY KEY AUTO_INCREMENT,
  title VARCHAR(200),
  url VARCHAR(300),
  startTime DATE,
  endTime DATE,
  detail TEXT,
  resId int,
  FOREIGN KEY (resId) REFERENCES resume(id)
);

CREATE TABLE certification (
  id int PRIMARY KEY AUTO_INCREMENT,
  title VARCHAR(100),
  authority VARCHAR(100),
  date DATE,
  detail TEXT,
  resId int,
  FOREIGN KEY (resId) REFERENCES resume(id)
);

CREATE TABLE experience (
  id int PRIMARY KEY AUTO_INCREMENT,
  company VARCHAR(50),
  designation VARCHAR(100),
  startTime DATE,
  endTime DATE,
  detail TEXT,
  resId int,
  FOREIGN KEY (resId) REFERENCES resume(id)
);

CREATE TABLE education (
  id int PRIMARY KEY AUTO_INCREMENT,
  institute VARCHAR(100),
  degree VARCHAR(100),
  startTime DATE,
  endTime DATE,
  detail TEXT,
  resId int,
  FOREIGN KEY (resId) REFERENCES resume(id)
);

-- Insert default admin account
INSERT INTO user(username, email, password, role) VALUES (
  'admin',
  'admin@admin.com',
  '$2a$08$Tbv4/2.0JQCJ0iK2IkMF3e1PQn4V/u6CmZr2f.d4ysEp0.qX5BdfC',
  'admin'
);