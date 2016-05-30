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
  codeStartDate TIMESTAMP,
  isDisabled tinyint(1) DEFAULT 0
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

-- Store Procedure: activate account
DELIMITER $$
CREATE PROCEDURE SP_ACTIVATE_ACCOUNT(IN activation_code varchar(50), IN ttl INT)
BEGIN
	
	DECLARE created_time TIMESTAMP;

	DECLARE created_time_milis BIGINT;
	DECLARE now_time_milis BIGINT;
	DECLARE ttl_milis BIGINT;
	DECLARE distance_time_milis BIGINT;

	SET ttl_milis = ttl * 60;
	SELECT unix_timestamp(now()) INTO now_time_milis;

	SELECT codeStartDate INTO created_time FROM `user` WHERE activationCode = activation_code;
	SELECT unix_timestamp(created_time) INTO created_time_milis;

	SET distance_time_milis = now_time_milis - created_time_milis;

	IF (created_time IS NULL) THEN
		
			SIGNAL SQLSTATE '45000'
			SET MESSAGE_TEXT = 'Already activated!!';

	ELSEIF (distance_time_milis > ttl_milis) THEN

			SIGNAL SQLSTATE '46000'
			SET MESSAGE_TEXT = 'Expired link to activate your account!!';

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