CREATE USER 'user'@'%' IDENTIFIED BY 'pass';
CREATE DATABASE todoapp;
GRANT ALL PRIVILEGES ON todoapp.* to 'user'@'%';
USE todoapp;
CREATE TABLE todos (id int AUTO_INCREMENT PRIMARY KEY, content VARCHAR(45), done BOOLEAN);