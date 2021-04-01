DROP DATABASE IF EXISTS `testjenkins`;
CREATE DATABASE `testjenkins`;
USE `testjenkins`;

DROP TABLE IF EXISTS `messages`;
CREATE TABLE `messages` (
  `id` int(11) NOT NULL,
  `message` varchar(255) NOT NULL,
  `sender` int(11) NOT NULL,
  `receiver` int(11) NOT NULL,
  `date` datetime NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;


INSERT INTO `messages` (`id`, `message`, `sender`, `receiver`, `date`) VALUES
(19, 'whatup admin', 3, 1, '2021-03-31 11:13:46'),
(20, 'what up Aahmad', 4, 3, '2021-03-31 11:14:11'),
(73, 'helo asmar', 3, 4, '2021-03-31 12:58:31'),
(74, 'helo aahmad', 4, 1, '2021-03-31 12:58:41'),
(75, 'helo aahmad`\n`', 4, 3, '2021-03-31 12:58:59');

DROP TABLE IF EXISTS `users`;
CREATE TABLE `users` (
  `id` int(11) NOT NULL,
  `username` varchar(255) NOT NULL,
  `password` varchar(255) NOT NULL,
  `role` varchar(255) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;


INSERT INTO `users` (`id`, `username`, `password`, `role`) VALUES
(1, 'admin', '17af9a2a5ce9c3b6c35619eedb747fa254382578', 'admin'),
(2, 'mahmoud', '17af9a2a5ce9c3b6c35619eedb747fa254382578', 'regular'),
(3, 'aahmad', '17af9a2a5ce9c3b6c35619eedb747fa254382578', 'regular'),
(4, 'asmar', '17af9a2a5ce9c3b6c35619eedb747fa254382578', 'regular'),
(5, 'joe', '17af9a2a5ce9c3b6c35619eedb747fa254382578', 'regular');


ALTER TABLE `messages`
  ADD PRIMARY KEY (`id`),
  ADD KEY `receiver` (`receiver`),
  ADD KEY `sender` (`sender`);

ALTER TABLE `users`
  ADD PRIMARY KEY (`id`);


ALTER TABLE `messages`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=0;

ALTER TABLE `users`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=0;


ALTER TABLE `messages`
  ADD CONSTRAINT `messages_ibfk_1` FOREIGN KEY (`receiver`) REFERENCES `users` (`id`) ON DELETE CASCADE,
  ADD CONSTRAINT `messages_ibfk_2` FOREIGN KEY (`sender`) REFERENCES `users` (`id`) ON DELETE CASCADE;
COMMIT;

