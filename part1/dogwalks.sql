DROP DATABASE IF EXISTS DogWalkService;
CREATE DATABASE DogWalkService;
USE DogWalkService;
CREATE TABLE Users (
    user_id INT AUTO_INCREMENT PRIMARY KEY,
    username VARCHAR(50) UNIQUE NOT NULL,
    email VARCHAR(100) UNIQUE NOT NULL,
    password_hash VARCHAR(255) NOT NULL,
    role ENUM('owner', 'walker') NOT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE Dogs (
    dog_id INT AUTO_INCREMENT PRIMARY KEY,
    owner_id INT NOT NULL,
    name VARCHAR(50) NOT NULL,
    size ENUM('small', 'medium', 'large') NOT NULL,
    FOREIGN KEY (owner_id) REFERENCES Users(user_id)
);

CREATE TABLE WalkRequests (
    request_id INT AUTO_INCREMENT PRIMARY KEY,
    dog_id INT NOT NULL,
    requested_time DATETIME NOT NULL,
    duration_minutes INT NOT NULL,
    location VARCHAR(255) NOT NULL,
    status ENUM('open', 'accepted', 'completed', 'cancelled') DEFAULT 'open',
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (dog_id) REFERENCES Dogs(dog_id)
);

CREATE TABLE WalkApplications (
    application_id INT AUTO_INCREMENT PRIMARY KEY,
    request_id INT NOT NULL,
    walker_id INT NOT NULL,
    applied_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    status ENUM('pending', 'accepted', 'rejected') DEFAULT 'pending',
    FOREIGN KEY (request_id) REFERENCES WalkRequests(request_id),
    FOREIGN KEY (walker_id) REFERENCES Users(user_id),
    CONSTRAINT unique_application UNIQUE (request_id, walker_id)
);

CREATE TABLE WalkRatings (
    rating_id INT AUTO_INCREMENT PRIMARY KEY,
    request_id INT NOT NULL,
    walker_id INT NOT NULL,
    owner_id INT NOT NULL,
    rating INT CHECK (rating BETWEEN 1 AND 5),
    comments TEXT,
    rated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (request_id) REFERENCES WalkRequests(request_id),
    FOREIGN KEY (walker_id) REFERENCES Users(user_id),
    FOREIGN KEY (owner_id) REFERENCES Users(user_id),
    CONSTRAINT unique_rating_per_walk UNIQUE (request_id)
);


INSERT INTO Users (username, email, password_hash, role)
VALUES
('alice123', 'alice@example.com', 'hashed123', 'owner'),
('bobwalker', 'bob@example.com', 'hashed456', 'walker'),
('carol123', 'carol@example.com', 'hashed789', 'owner'),
('timmy000', 'timbo@example.com', 'hashed159', 'walker'),
('shadowcat11', 'cathy@example.com', 'hashed357', 'owner');

INSERT INTO Dogs (name, size, owner_id)
SELECT
    'Max', 'medium', user_id
FROM Users where username like 'alice123';

INSERT INTO Dogs (name, size, owner_id)
SELECT
    'Bella', 'small', user_id
FROM Users where username like 'carol123';

INSERT INTO Dogs (name, size, owner_id)
SELECT
    'Goofy', 'large', user_id
FROM Users where username like 'alice123';

INSERT INTO Dogs (name, size, owner_id)
SELECT
    'Sora', 'small', user_id
FROM Users where username like 'shadowcat11';

INSERT INTO Dogs (name, size, owner_id)
SELECT
    'Hades', 'large', user_id
FROM Users where username like 'shadowcat11';

INSERT INTO WalkRequests (dog_id, requested_time, duration_minutes, location, status)
SELECT
    dog_id, '2025-06-10 08:00:00', '30', 'Parklands', 'open'
FROM Dogs where name like 'Max';

INSERT INTO WalkRequests (dog_id, requested_time, duration_minutes, location, status)
SELECT
    dog_id, '2025-06-10 09:30:00', '45', 'Beachside Ave', 'accepted'
FROM Dogs where name like 'Bella';

INSERT INTO WalkRequests (dog_id, requested_time, duration_minutes, location, status)
SELECT
    dog_id, '2025-06-10 08:00:00', '30', 'Parklands', 'open'
FROM Dogs where name like 'Goofy';

INSERT INTO WalkRequests (dog_id, requested_time, duration_minutes, location, status)
SELECT
    dog_id, '2025-06-11 07:00:00', '60', 'Byroden Blvd', 'open'
FROM Dogs where name like 'Sora';

INSERT INTO WalkRequests (dog_id, requested_time, duration_minutes, location, status)
SELECT
    dog_id, '2025-06-11 07:00:00', '60', 'Byroden Blvd', 'open'
FROM Dogs where name like 'Hades';



SELECT
    Users.username AS walker_username,
    (SELECT COUNT(*)
    FROM WalkRatings INNER JOIN Users
    ON WalkRatings.walker_id = Users.username) AS total_ratings,
    (SELECT AVG(WalkRatings.rating)
    FROM WalkRatings INNER JOIN Users
    ON WalkRatings.walker_id = Users.username) AS average_rating,
    (SELECT COUNT(*)
    FROM WalkRatings
    INNER JOIN WalkApplications ON WalkRequests.request_id = WalkApplications.request_id



    FROM WalkApplications
    INNER JOIN WalkRequests ON  =
    INNER JOIN Users ON
    )
FROM Users
WHERE Users.role = 'walker';