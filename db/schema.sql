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
    car_Spare2 VARCHAR(255),
    car_Spare3 VARCHAR(255),
    car_Spare4 VARCHAR(255),
    car_Spare5 INT,
    car_Spare6 INT,
    car_Spare7 INT,
    PRIMARY KEY (id)
);
