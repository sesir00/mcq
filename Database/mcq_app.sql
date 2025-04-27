-- phpMyAdmin SQL Dump
-- version 5.2.1
-- https://www.phpmyadmin.net/
--
-- Host: 127.0.0.1
-- Generation Time: Jan 31, 2025 at 08:59 AM
-- Server version: 10.4.32-MariaDB
-- PHP Version: 8.2.12

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Database: `mcq_app`
--

-- --------------------------------------------------------

--
-- Table structure for table `form`
--

CREATE TABLE `form` (
  `id` int(11) NOT NULL,
  `email` varchar(255) NOT NULL,
  `gender` enum('male','female','other') NOT NULL,
  `name` varchar(100) NOT NULL,
  `password` varchar(255) NOT NULL,
  `subscription` tinyint(1) NOT NULL,
  `role` varchar(255) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `form`
--

INSERT INTO `form` (`id`, `email`, `gender`, `name`, `password`, `subscription`, `role`) VALUES
(1, 'ccr@gmail.com', 'male', 'John Doe', '$2b$10$fOctr5/rInaTaK3AI7KzmueOqrC2MV1CCAtOZdj/CYzrm1TFX.B2m', 0, 'admin'),
(2, 'hello@gmail.com', 'male', 'hello123', '$2b$10$Ps4Y4xWEsuP2zkrS78djn.TvvgGkBxwAjdZalbnD/virC/albSj0q', 0, 'admin'),
(3, 'test@gmail.com', 'female', 'test00', '$2b$10$p0jTqbPCwnhaJYBXkWeLfOj0FzZ3p8aVSnJ4wDcXcnQ5Tposcyb3G', 0, 'user'),
(4, 'aswik@gmail.com', 'male', 'aswik1', '$2b$10$u.LOZhdnGokHN9GilybEfegVxJzUFnEU4yiG8x3hLknJbrswNsLwa', 0, 'user'),
(5, 'aswik1@gmail.com', 'male', 'aswik12', '$2b$10$nQyoAIKiELwg9e3df5m2FudFCuNSjdsMccrIwA410Rfx7gQPKl8i6', 0, 'user'),
(6, 'hari12@gmail.com', 'male', 'hari124', '$2b$10$J8Ee64T7kMfSN/gV1O98tOxelybs49FArRu3bqFpGoCA1JHgwTuZK', 0, 'user'),
(7, 'hari11@gmail.com', 'male', 'hari', '$2b$10$3Dz3R3GiYfC0u/jApww2KuEF2PrOSkQ0LDF6mDL/CSW5ar9JWpgpW', 0, 'admin'),
(11, 'admin@gmail.com', 'male', 'admin123', '$2b$10$.CCv.Hb8kDg3DWLLTzX46epGzLOeTQLEJU6hSIsSxuTRD4auI5A3K', 0, 'superadmin'),
(13, 'dd1@gmail.com', 'male', 'dddd111', '$2b$10$HbRUSdzShEW35J/DGyLEvO0MZHjcKq9Q7ICdLYZOmXAnGZjO2FWxW', 0, 'user');

-- --------------------------------------------------------

--
-- Table structure for table `options`
--

CREATE TABLE `options` (
  `option_id` int(11) NOT NULL,
  `question_id` int(11) DEFAULT NULL,
  `option_text` varchar(255) NOT NULL,
  `is_correct` tinyint(1) DEFAULT 0
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `options`
--

INSERT INTO `options` (`option_id`, `question_id`, `option_text`, `is_correct`) VALUES
(2060, 590, 'User interfaces', 1),
(2061, 591, 'Cardroom', 0),
(2062, 591, 'Checkroom', 0),
(2063, 591, 'Library', 1),
(2064, 591, 'Clubroom', 0),
(2065, 592, 'Clubhouse', 0),
(2066, 592, 'Aviary', 0),
(2067, 592, 'Rink', 0),
(2068, 592, 'Architecture', 1),
(2069, 593, 'Period', 0),
(2070, 593, 'Components', 1),
(2071, 593, 'First period', 0),
(2072, 593, 'Middle', 0),
(2073, 594, 'Writing implement', 0),
(2074, 594, 'Beater', 0),
(2075, 594, 'Tool', 1),
(2076, 594, 'Iron', 0),
(2077, 595, 'React', 1),
(2078, 596, 'Web applications', 1),
(2079, 597, 'Ram', 1),
(2080, 597, 'Random-access memory', 0),
(2081, 598, 'Momo', 1),
(2082, 599, 'Hari', 1),
(2083, 600, 'Apple', 1),
(2084, 600, 'Pear', 0),
(2085, 600, 'Quince', 0),
(2086, 601, 'Momo', 1),
(2087, 602, 'Hari', 1),
(2088, 603, 'Cricket', 1),
(2089, 603, 'Grasshopper', 0),
(2090, 604, 'Gefilte fish', 0),
(2091, 604, 'Pizza', 1),
(2092, 604, 'Salisbury steak', 0),
(2093, 604, 'Jambalaya', 0),
(2094, 605, 'Pushball', 0),
(2095, 605, 'Cricket', 0),
(2096, 605, 'Ball game', 0),
(2097, 605, 'Football', 1);

-- --------------------------------------------------------

--
-- Table structure for table `questions`
--

CREATE TABLE `questions` (
  `question_id` int(11) NOT NULL,
  `question_text` varchar(255) NOT NULL,
  `submission_id` varchar(36) DEFAULT NULL,
  `operations` varchar(5) DEFAULT NULL,
  `created_at` datetime DEFAULT current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `questions`
--

INSERT INTO `questions` (`question_id`, `question_text`, `submission_id`, `operations`, `created_at`) VALUES
(590, 'What is React used for?', '089015db-74da-4673-b6d8-803d837e9790', NULL, '2025-01-20 21:27:49'),
(591, 'What is React?', '089015db-74da-4673-b6d8-803d837e9790', NULL, '2025-01-20 21:27:49'),
(592, 'React leverages a component-based what?', '089015db-74da-4673-b6d8-803d837e9790', NULL, '2025-01-20 21:27:50'),
(593, 'What is ui broken down into?', '089015db-74da-4673-b6d8-803d837e9790', NULL, '2025-01-20 21:27:50'),
(594, 'React is a powerful and flexible what?', '089015db-74da-4673-b6d8-803d837e9790', NULL, '2025-01-20 21:27:50'),
(595, 'What is a popular javascript library for building user interfaces?', '089015db-74da-4673-b6d8-803d837e9790', NULL, '2025-01-20 21:27:50'),
(596, 'React is used for creating dynamic and interactive what?', '089015db-74da-4673-b6d8-803d837e9790', NULL, '2025-01-20 21:27:50'),
(597, 'Who is eating mom?', '0fe3ea49-0dc5-4fca-9fb7-fc0dbb0d67d6', NULL, '2025-01-20 21:59:31'),
(598, 'What is Ram eating?', '0fe3ea49-0dc5-4fca-9fb7-fc0dbb0d67d6', NULL, '2025-01-20 21:59:31'),
(599, 'What is the name of the person who eats apples?', 'd638c7a5-54ed-447c-be37-599faf7cf8d4', 'show', '2025-01-20 22:08:19'),
(600, 'What fruit does Hari eat?', 'd638c7a5-54ed-447c-be37-599faf7cf8d4', 'show', '2025-01-20 22:08:19'),
(601, 'What does Hari eat?', '037f8bc8-6f8c-4624-b451-f3370f02987b', 'show', '2025-01-29 21:34:18'),
(602, 'Who plays cricket?', '037f8bc8-6f8c-4624-b451-f3370f02987b', 'show', '2025-01-29 21:34:22'),
(603, 'What sport does Hari play?', '037f8bc8-6f8c-4624-b451-f3370f02987b', 'show', '2025-01-29 21:34:22'),
(604, 'What is a good example of a good food item?', '0bd2d8d3-d1be-4299-8824-b753f41edb8d', 'hide', '2025-01-29 21:43:47'),
(605, 'Pizza is good for what sport?', '0bd2d8d3-d1be-4299-8824-b753f41edb8d', 'hide', '2025-01-29 21:43:50');

-- --------------------------------------------------------

--
-- Table structure for table `submissions`
--

CREATE TABLE `submissions` (
  `submission_id` varchar(40) DEFAULT NULL,
  `score` decimal(5,2) DEFAULT NULL,
  `uid` int(11) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `submissions`
--

INSERT INTO `submissions` (`submission_id`, `score`, `uid`) VALUES
('be3e86d1-8d72-4606-8be1-77038dbf3c13', NULL, 7),
('4a87e3ac-6d5a-4652-aecb-72412d5a3164', NULL, 7),
('157ce337-f17a-417d-8066-32a24e8e9bc6', 66.67, 7),
('b5b7adfc-8527-4337-8077-ee1b3d6e1be4', NULL, 7),
('0fe3ea49-0dc5-4fca-9fb7-fc0dbb0d67d6', 0.00, 7),
('037f8bc8-6f8c-4624-b451-f3370f02987b', 100.00, 7);

--
-- Indexes for dumped tables
--

--
-- Indexes for table `form`
--
ALTER TABLE `form`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `email` (`email`);

--
-- Indexes for table `options`
--
ALTER TABLE `options`
  ADD PRIMARY KEY (`option_id`),
  ADD KEY `question_id` (`question_id`);

--
-- Indexes for table `questions`
--
ALTER TABLE `questions`
  ADD PRIMARY KEY (`question_id`);

--
-- AUTO_INCREMENT for dumped tables
--

--
-- AUTO_INCREMENT for table `form`
--
ALTER TABLE `form`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=14;

--
-- AUTO_INCREMENT for table `options`
--
ALTER TABLE `options`
  MODIFY `option_id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=2098;

--
-- AUTO_INCREMENT for table `questions`
--
ALTER TABLE `questions`
  MODIFY `question_id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=606;

--
-- Constraints for dumped tables
--

--
-- Constraints for table `options`
--
ALTER TABLE `options`
  ADD CONSTRAINT `options_ibfk_1` FOREIGN KEY (`question_id`) REFERENCES `questions` (`question_id`) ON DELETE CASCADE;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
