-- init.sql - This will run when the MySQL container initializes for the first time only

-- Create the database if it doesn't exist
CREATE DATABASE IF NOT EXISTS `microservices`;

-- Use the database
USE `microservices`;

-- Ensure the user has all needed privileges
GRANT ALL PRIVILEGES ON `microservices`.* TO 'raihan'@'%';
FLUSH PRIVILEGES;