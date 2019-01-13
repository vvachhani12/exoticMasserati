DROP DATABASE IF EXISTS exotic_Cars_DB;

CREATE DATABASE exotic_Cars_DB;
USE exotic_Cars_DB;

CREATE TABLE cars (
    id INT NOT NULL AUTO_INCREMENT,
    car_Year YEAR NOT NULL,
    car_Make VARCHAR(255) NOT NULL,
    car_Model VARCHAR(255) NOT NULL,
    transmission_Type VARCHAR(255) NOT NULL,
    start_DA DATE,
    end_DA DATE,
    car_Miles INT NOT NULL,
    car_Availabilty BOOLEAN DEFAULT true,
    car_Rates INT,
    car_Condition VARCHAR(255),
    car_ImageURL VARCHAR(255),
    car_Spare1 VARCHAR(255),
    PRIMARY KEY (id)
);

CREATE TABLE users (
    Id INT NOT NULL AUTO_INCREMENT,
    Password VARCHAR(255) NOT NULL,
    Name VARCHAR(255) NOT NULL,
    Lastname VARCHAR(255) NOT NULL,
    Email VARCHAR(255) NOT NULL,
    PRIMARY KEY (id)
);

CREATE TABLE users (
    Id INT NOT NULL AUTO_INCREMENT,
    Password VARCHAR(255) NOT NULL,
    Name VARCHAR(255) NOT NULL,
    Lastname VARCHAR(255) NOT NULL,
    Email VARCHAR(255) NOT NULL,
    PRIMARY KEY (id)
);
