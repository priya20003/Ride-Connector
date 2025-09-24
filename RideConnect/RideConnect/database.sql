-- database.sql - schema + seed data for RideConnect
CREATE DATABASE IF NOT EXISTS rideconnect;
USE rideconnect;

DROP TABLE IF EXISTS rides;
DROP TABLE IF EXISTS users;

CREATE TABLE users (
  id INT AUTO_INCREMENT PRIMARY KEY,
  name VARCHAR(100),
  email VARCHAR(100) UNIQUE,
  password VARCHAR(255),
  role ENUM('admin','user') DEFAULT 'user'
);

CREATE TABLE rides (
  id INT AUTO_INCREMENT PRIMARY KEY,
  origin VARCHAR(255),
  destination VARCHAR(255),
  date DATETIME,
  seats INT,
  user_id INT,
  FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE SET NULL
);

-- NOTE: Replace 'hashed_password_here' with actual bcrypt hashes if you want to log in directly.
INSERT INTO users (name, email, password, role) VALUES
('Priya Kumari', 'priya@example.com', 'hashed_password_here', 'admin'),
('Test User', 'user@example.com', 'hashed_password_here', 'user');

INSERT INTO rides (origin, destination, date, seats, user_id) VALUES
('Delhi', 'Noida', '2025-09-25 10:00:00', 3, 1),
('Noida', 'Gurgaon', '2025-09-26 09:00:00', 2, 2);
