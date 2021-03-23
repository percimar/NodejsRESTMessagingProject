
DROP DATABASE IF EXISTS jenkins;
CREATE DATABASE jenkins;

DROP TABLE IF EXISTS users;
CREATE TABLE users
(
  id INT NOT NULL,
  username VARCHAR(64) NOT NULL,
  password VARCHAR(64) NOT NULL,
  role VARCHAR(64) NOT NULL,
  PRIMARY KEY (id)
);

DROP TABLE IF EXISTS messages;
CREATE TABLE messages
(
  id INT NOT NULL,
  from_user INT NOT NULL,
  to_user INT NOT NULL,
  user_message VARCHAR(512) NOT NULL,
  sent_at DATETIME NOT NULL,
  PRIMARY KEY (id),
  FOREIGN KEY (from_user) REFERENCES users(id) ON DELETE CASCADE,
  FOREIGN KEY (to_user) REFERENCES users(id) ON DELETE CASCADE
);

INSERT INTO users (id, username, password, role) VALUES 
(1, 'Admin', '2e150d98a463a6b6c86582a38791c6341117be6f', 'admin'),
(2, 'Aahmad', '17af9a2a5ce9c3b6c35619eedb747fa254382578', 'regular'),
(3, 'Asmar', '17af9a2a5ce9c3b6c35619eedb747fa254382578', 'regular'),
(4, 'Mahmoud', '17af9a2a5ce9c3b6c35619eedb747fa254382578', 'regular');