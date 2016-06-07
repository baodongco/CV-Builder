CREATE DATABASE CVBuilder;

use CVBuilder;

CREATE TABLE user (
  id int PRIMARY KEY AUTO_INCREMENT,
  username varchar(100) NOT NULL,
  email varchar(100) NOT NULL,
  password varchar(100) NOT NULL,
  role varchar(10) DEFAULT 'user',
  activationCode varchar(50),
  resetPassCode varchar(50),
  codeStartDate TIMESTAMP NOT NULL DEFAULT NOW(),
  isDisabled tinyint(1) DEFAULT 0
);

CREATE TABLE template (
  id int PRIMARY KEY AUTO_INCREMENT,
  name varchar(30) NOT NULL
);

CREATE TABLE resume (
  id int PRIMARY KEY AUTO_INCREMENT,
  title VARCHAR(20) NOT NULL,
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
  templateId int NOT NULL,
  FOREIGN KEY (userId) REFERENCES user(id),
  FOREIGN KEY (templateId) REFERENCES template(id)
);

CREATE TABLE skill (
  id int PRIMARY KEY AUTO_INCREMENT,
  name VARCHAR(100),
  expertise VARCHAR(100),
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

-- Insert default super admin account
INSERT INTO user(username, email, password, role) VALUES (
  'admin',
  'admin@admin.com',
  '$2a$08$Tbv4/2.0JQCJ0iK2IkMF3e1PQn4V/u6CmZr2f.d4ysEp0.qX5BdfC',
  'super'
);

INSERT INTO template(name) VALUES (
  'default'
), ('default 2'), ('default 3'), ('default 4');

-- Store Procedure: activate account
DELIMITER $$
CREATE PROCEDURE SP_ACTIVATE_ACCOUNT(IN activation_code varchar(50), IN ttl INT)
BEGIN
	
	DECLARE created_time TIMESTAMP;

  DECLARE created_time_milis BIGINT;
  DECLARE now_time_milis BIGINT;
  DECLARE ttl_milis BIGINT;
  DECLARE distance_time_milis BIGINT;

  DECLARE now_time TIMESTAMP;

  DECLARE message VARCHAR(500);
  DECLARE uuid VARCHAR(50);

  DECLARE usr VARCHAR(50);
  DECLARE mail VARCHAR(50);

  SET ttl_milis = ttl * 60;
  SELECT unix_timestamp(now()) INTO now_time_milis;
  SELECT NOW() INTO now_time;

  SELECT codeStartDate INTO created_time FROM `user` WHERE activationCode = activation_code;
  SELECT unix_timestamp(created_time) INTO created_time_milis;

  SET distance_time_milis = now_time_milis - created_time_milis;

  IF (created_time IS NULL) THEN
    
      SIGNAL SQLSTATE '45000'
      SET MESSAGE_TEXT = 'The link is no longer valid!!';

  ELSEIF (distance_time_milis > ttl_milis) THEN
      
      SELECT UUID() INTO uuid;
      UPDATE `user` SET activationCode = uuid, codeStartDate = now_time WHERE activationCode = activation_code;
      SELECT username, email INTO usr, mail FROM `user` WHERE activationCode = uuid;
      
      SELECT CONCAT(uuid, ":", usr, ":", mail) INTO message;

      SIGNAL SQLSTATE '46000'
      SET MESSAGE_TEXT = message;

  ELSE
    
      UPDATE `user` SET activationCode = NULL
      WHERE activationCode = activation_code;
  
  END IF;


END; $$
DELIMITER ;

-- Store Procedure: reset password
DELIMITER $$
CREATE PROCEDURE SP_RESET_PASSWORD(IN email_address VARCHAR(100))
BEGIN
   
  DECLARE uuid VARCHAR(50);
  DECLARE now_time TIMESTAMP;

  DECLARE email_address_exist VARCHAR(100);
  DECLARE activation_code VARCHAR(50);

  SELECT UUID() INTO uuid;
  SELECT NOW() INTO now_time;

  SELECT email INTO email_address_exist FROM `user` WHERE email = email_address;

  IF (email_address_exist IS NULL) THEN
    
    SIGNAL SQLSTATE '47000'
    SET MESSAGE_TEXT = 'Email address doesn\'t exist!!';

  ELSE

    SELECT activationCode INTO activation_code FROM `user` WHERE email = email_address;
    
    IF (activation_code IS NOT NULL) THEN

        SIGNAL SQLSTATE '48000'
        SET MESSAGE_TEXT = 'Your account must be activated!!';
    
    ELSE
        
        UPDATE `user` set resetPassCode = uuid, codeStartDate = now_time
        WHERE email = email_address;
        
        SELECT uuid;
        SELECT username FROM `user` where resetPassCode = uuid;
    
    END IF;

  END IF;
  
END; $$
DELIMITER ;

-- Stored Procedure: reset-password-complete
DELIMITER $$
CREATE PROCEDURE SP_RESET_PASSWORD_COMPLETE(IN guid VARCHAR(50), IN ttl INT)
BEGIN
   
  DECLARE created_time TIMESTAMP;

  DECLARE created_time_milis BIGINT;
  DECLARE now_time_milis BIGINT;
  DECLARE ttl_milis BIGINT;
  DECLARE distance_time_milis BIGINT;

  DECLARE status_code INT;

  DECLARE uuid VARCHAR(50);

  DECLARE message varchar(500);
  DECLARE usr VARCHAR(50);
  DECLARE mail VARCHAR(50);

  DECLARE now_time TIMESTAMP;

  SET status_code = 200;

  SELECT NOW() INTO now_time;

  SET ttl_milis = ttl * 60;
  SELECT unix_timestamp(now()) INTO now_time_milis;

  SELECT codeStartDate INTO created_time FROM `user` WHERE resetPassCode = guid;
  SELECT unix_timestamp(created_time) INTO created_time_milis;

  SET distance_time_milis = now_time_milis - created_time_milis;

  IF (created_time IS NULL) THEN
    
      SIGNAL SQLSTATE '48000'
      SET MESSAGE_TEXT = 'The link is no longer valid !';

  ELSEIF (distance_time_milis > ttl_milis) THEN
      
      SELECT UUID() INTO uuid;
      UPDATE `user` SET resetPassCode = uuid, codeStartDate = now_time WHERE resetPassCode = guid;
      SELECT username, email INTO usr, mail FROM `user` WHERE resetPassCode = uuid;

      SELECT CONCAT(uuid ,':',usr, ':',mail) INTO message;

      SIGNAL SQLSTATE '49000'
      SET MESSAGE_TEXT = message;

  ELSE

      SELECT guid;
      SELECT status_code;
  
  END IF;


END; $$
DELIMITER ;

-- User defined store procedure getAllResumeData
DELIMITER $$
CREATE PROCEDURE udsp_getAllResumeData(IN _resId INT)
BEGIN
   
  SELECT * FROM resume WHERE id = _resID;

  SELECT * FROM certification WHERE resId = _resID ORDER BY date DESC;

  SELECT * FROM education WHERE resId = _resID ORDER BY endTime DESC;

  SELECT * FROM experience WHERE resId = _resID ORDER BY endTime DESC;

  SELECT * FROM project WHERE resId = _resID ORDER BY endTime DESC;
  
  SELECT * FROM skill WHERE resId = _resID ORDER BY lastUsed DESC;

END; $$
DELIMITER ;

-- User define store procedure deleteResume
DELIMITER $$
CREATE PROCEDURE udsp_deleteResume(IN _resId INT)
BEGIN
   
  DELETE FROM skill WHERE resId = _resId;
  DELETE FROM education WHERE resId = _resId;
  DELETE FROM experience WHERE resId = _resId;
  DELETE FROM certification WHERE resId = _resId;
  DELETE FROM project WHERE resId = _resId;
  DELETE FROM resume WHERE id = _resId;

END; $$
DELIMITER ;
