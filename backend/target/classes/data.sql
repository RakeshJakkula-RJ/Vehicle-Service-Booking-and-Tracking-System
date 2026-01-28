-- Clean up some tables if needed (careful with this in production! but for project dev it's fine)
SET FOREIGN_KEY_CHECKS = 0;
TRUNCATE TABLE booking;
TRUNCATE TABLE users;
TRUNCATE TABLE mechanic;
TRUNCATE TABLE service_center;
TRUNCATE TABLE service_type;
SET FOREIGN_KEY_CHECKS = 1;

-- Inserting different service types (using IGNORE to skip duplicates)
INSERT IGNORE INTO service_type (id, description, price) VALUES (1, 'General Service', 2500.00);
INSERT IGNORE INTO service_type (id, description, price) VALUES (2, 'Oil Change', 1200.00);
INSERT IGNORE INTO service_type (id, description, price) VALUES (3, 'Brake Inspection', 500.00);
INSERT IGNORE INTO service_type (id, description, price) VALUES (4, 'Tire Rotation', 400.00);
INSERT IGNORE INTO service_type (id, description, price) VALUES (5, 'AC Servicing', 1800.00);
INSERT IGNORE INTO service_type (id, description, price) VALUES (6, 'Full Interior Cleaning', 1500.00);

-- Inserting Service Centers
INSERT IGNORE INTO service_center (id, name, location, contact) VALUES (1, 'City Auto Care', 'Downtown', '9876543210');
INSERT IGNORE INTO service_center (id, name, location, contact) VALUES (2, 'Highway Fixers', 'North Highway', '9876543211');
INSERT IGNORE INTO service_center (id, name, location, contact) VALUES (3, 'Premium Auto Works', 'Downtown Mumbai', '9876543212');
INSERT IGNORE INTO service_center (id, name, location, contact) VALUES (4, 'Elite Car Service', 'Bandra West', '9876543213');
INSERT IGNORE INTO service_center (id, name, location, contact) VALUES (5, 'Quick Fix Garage', 'Andheri East', '9876543214');
INSERT IGNORE INTO service_center (id, name, location, contact) VALUES (6, 'Speedy Motors', 'Powai', '9876543215');
INSERT IGNORE INTO service_center (id, name, location, contact) VALUES (7, 'AutoCare Plus', 'Thane West', '9876543216');

-- Inserting Mechanics (Updated to match new centers roughly)
INSERT IGNORE INTO mechanic (id, name, expertise, service_center_id) VALUES (1, 'John Doe', 'Engine Specialist', 1);
INSERT IGNORE INTO mechanic (id, name, expertise, service_center_id) VALUES (2, 'Mike Ross', 'Brake Expert', 2);
INSERT IGNORE INTO mechanic (id, name, expertise, service_center_id) VALUES (3, 'Sarah Connor', 'AC Technician', 3);
INSERT IGNORE INTO mechanic (id, name, expertise, service_center_id) VALUES (4, 'James Bond', 'Transmission Specialist', 4);
INSERT IGNORE INTO mechanic (id, name, expertise, service_center_id) VALUES (5, 'Bruce Wayne', 'Electrical Expert', 5);
INSERT IGNORE INTO mechanic (id, name, expertise, service_center_id) VALUES (6, 'Clark Kent', 'Full Body Painting', 6);
INSERT IGNORE INTO mechanic (id, name, expertise, service_center_id) VALUES (7, 'Tony Stark', 'Tech Upgrades', 7);

-- Insert an Admin User
INSERT IGNORE INTO users (id, name, email, phone, address, password_hash, role) 
VALUES (1, 'System Admin', 'admin@vehicle.com', '9999999999', 'Main Street 1', 'admin123', 'ADMIN');

-- Insert Providers for each Service Center
INSERT IGNORE INTO users (id, name, email, phone, address, password_hash, role, service_center_id) 
VALUES (2, 'Provider City', 'city@provider.com', '9876543210', 'Downtown', '123456', 'PROVIDER', 1);

INSERT IGNORE INTO users (id, name, email, phone, address, password_hash, role, service_center_id) 
VALUES (3, 'Provider Highway', 'highway@provider.com', '9876543211', 'North Highway', '123456', 'PROVIDER', 2);

INSERT IGNORE INTO users (id, name, email, phone, address, password_hash, role, service_center_id) 
VALUES (4, 'Provider Premium', 'premium@provider.com', '9876543212', 'Downtown Mumbai', '123456', 'PROVIDER', 3);

INSERT IGNORE INTO users (id, name, email, phone, address, password_hash, role, service_center_id) 
VALUES (5, 'Provider Elite', 'elite@provider.com', '9876543213', 'Bandra West', '123456', 'PROVIDER', 4);

INSERT IGNORE INTO users (id, name, email, phone, address, password_hash, role, service_center_id) 
VALUES (6, 'Provider Quick', 'quick@provider.com', '9876543214', 'Andheri East', '123456', 'PROVIDER', 5);

INSERT IGNORE INTO users (id, name, email, phone, address, password_hash, role, service_center_id) 
VALUES (7, 'Provider Speedy', 'speedy@provider.com', '9876543215', 'Powai', '123456', 'PROVIDER', 6);

INSERT IGNORE INTO users (id, name, email, phone, address, password_hash, role, service_center_id) 
VALUES (8, 'Provider AutoCare', 'autocare@provider.com', '9876543216', 'Thane West', '123456', 'PROVIDER', 7);
