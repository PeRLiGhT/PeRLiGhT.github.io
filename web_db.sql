-- phpMyAdmin SQL Dump
-- version 5.2.1
-- https://www.phpmyadmin.net/
--
-- Host: 127.0.0.1
-- Generation Time: Oct 26, 2024 at 12:38 PM
-- Server version: 10.4.32-MariaDB
-- PHP Version: 8.0.30

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Database: `web_db`
--

-- --------------------------------------------------------

--
-- Table structure for table `admin`
--

CREATE TABLE `admin` (
  `id` int(11) NOT NULL,
  `username` varchar(100) NOT NULL,
  `password` varchar(100) NOT NULL,
  `role` varchar(100) NOT NULL,
  `login` int(11) NOT NULL DEFAULT 0,
  `create_at` timestamp NOT NULL DEFAULT current_timestamp() ON UPDATE current_timestamp(),
  `edit_at` timestamp NULL DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `admin`
--

INSERT INTO `admin` (`id`, `username`, `password`, `role`, `login`, `create_at`, `edit_at`) VALUES
(1, 'admin', '$2b$10$NooSCImCiMbpY.NtJqUwBeBxsGwEo7iNqlNwUWXZzJ8IztRG.ksH.', 'superadmin', 0, '2024-10-21 16:57:53', '2024-10-21 16:57:53');

-- --------------------------------------------------------

--
-- Table structure for table `carousel`
--

CREATE TABLE `carousel` (
  `id` int(11) NOT NULL,
  `name` varchar(100) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `carousel`
--

INSERT INTO `carousel` (`id`, `name`) VALUES
(1, 'Battlefield 2042'),
(2, 'Call of Duty: Black Ops 6'),
(3, 'Minecraft');

-- --------------------------------------------------------

--
-- Table structure for table `cart`
--

CREATE TABLE `cart` (
  `id` int(11) NOT NULL,
  `username` varchar(100) NOT NULL,
  `cart` varchar(100) NOT NULL,
  `quantity` int(11) NOT NULL DEFAULT 1,
  `price` float NOT NULL,
  `paid` int(11) NOT NULL DEFAULT 0,
  `create_at` timestamp NOT NULL DEFAULT current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `cart`
--

INSERT INTO `cart` (`id`, `username`, `cart`, `quantity`, `price`, `paid`, `create_at`) VALUES
(7, 'user1', 'Warhammer 40000: Space Marine 2', 1, 53.62, 1, '2024-10-18 11:03:46'),
(8, 'user1', 'Silent Hill 2', 1, 53.1, 1, '2024-10-18 11:03:49'),
(10, 'user1', 'Dragonball: Sparking! Zero', 1, 51.69, 1, '2024-10-19 08:16:48'),
(11, 'user1', 'Starfield', 1, 43.14, 1, '2024-10-19 08:16:51'),
(12, 'user2', 'Black Myth: Wukong', 1, 44.46, 1, '2024-10-19 08:18:52'),
(13, 'user2', 'Silent Hill 2', 1, 53.1, 1, '2024-10-19 08:18:55'),
(15, 'user2', 'Baldur\'s Gate 3', 1, 22.09, 1, '2024-10-19 09:23:32'),
(19, 'user1', 'Black Myth: Wukong', 1, 44.46, 1, '2024-10-19 20:45:04'),
(20, 'user1', 'Silent Hill 2', 1, 53.1, 1, '2024-10-19 20:46:36'),
(21, 'user1', 'Warhammer 40000: Space Marine 2', 10, 53.62, 1, '2024-10-19 20:48:32'),
(22, 'user2', 'The Crew 2', 1, 7.17, 1, '2024-10-20 05:36:53'),
(23, 'user2', 'Puyo Puyo Tetris 2', 1, 12.07, 1, '2024-10-20 05:36:59'),
(24, 'user2', 'Hitman III', 1, 27.39, 1, '2024-10-20 05:37:02'),
(27, 'user2', 'Black Myth: Wukong', 1, 44.46, 0, '2024-10-20 13:11:44'),
(28, 'user1', 'Black Myth: Wukong', 1, 44.46, 1, '2024-10-22 19:18:08'),
(29, 'user1', 'The Crew 2', 1, 7.17, 0, '2024-10-23 06:16:06');

-- --------------------------------------------------------

--
-- Table structure for table `contact`
--

CREATE TABLE `contact` (
  `id` int(11) NOT NULL,
  `name` varchar(100) NOT NULL,
  `email` varchar(100) NOT NULL,
  `phone` int(11) NOT NULL,
  `message` varchar(500) NOT NULL,
  `reply` int(11) NOT NULL DEFAULT 0,
  `create_at` timestamp NOT NULL DEFAULT current_timestamp() ON UPDATE current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `contact`
--

INSERT INTO `contact` (`id`, `name`, `email`, `phone`, `message`, `reply`, `create_at`) VALUES
(1, 'Pream', 'test1@gmail.com', 123456789, 'พรีม', 0, '2024-10-25 16:13:01'),
(2, 'Pream', 'test2@gmail.com', 123456789, 'test', 0, '2024-10-25 12:38:33'),
(3, 'Pream', 'test3@gmail.com', 123456789, 'พรีม', 0, '2024-10-25 12:38:41');

-- --------------------------------------------------------

--
-- Table structure for table `game`
--

CREATE TABLE `game` (
  `id` int(11) NOT NULL,
  `name` varchar(100) NOT NULL,
  `price` float NOT NULL,
  `discount` int(11) NOT NULL,
  `category` varchar(100) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `game`
--

INSERT INTO `game` (`id`, `name`, `price`, `discount`, `category`) VALUES
(1, 'Black Myth: Wukong', 55.57, 20, 'Action'),
(2, 'Silent Hill 2', 53.1, 0, 'Horror'),
(3, 'Warhammer 40000: Space Marine 2', 53.62, 0, 'Action'),
(4, 'Baldur\'s Gate 3', 22.09, 0, 'Adventure'),
(5, 'Dragonball: Sparking! Zero', 51.69, 0, 'Fighting'),
(6, 'Starfield', 46.89, 8, 'Adventure'),
(9, 'Sid Meier\'s Civilization VI', 5.05, 0, 'Strategy '),
(10, 'Destiny 2', 17.18, 0, 'Action & Shooting'),
(11, 'FIFA 23', 76.1, 72, 'Sports'),
(12, 'The Crew 2', 65.22, 89, 'Racing'),
(13, 'Microsoft Flight Simulator', 65.22, 61, 'Simulator'),
(14, 'Stardew Valley', 15.21, 0, 'Indie'),
(15, 'Cities: Skylines', 9.45, 0, 'Economy'),
(16, 'The Elder Scrolls V: Skyrim', 43.48, 72, 'RPG'),
(17, 'Hitman III', 65.22, 58, 'Stealth'),
(18, 'Puyo Puyo Tetris 2', 32.61, 63, 'Arcade');

-- --------------------------------------------------------

--
-- Table structure for table `history`
--

CREATE TABLE `history` (
  `id` int(11) NOT NULL,
  `username` varchar(100) NOT NULL,
  `list` varchar(100) NOT NULL,
  `quantity` int(11) NOT NULL DEFAULT 1,
  `price` float NOT NULL,
  `payment` varchar(100) NOT NULL,
  `cancel` int(11) NOT NULL DEFAULT 0,
  `confirm` int(11) NOT NULL DEFAULT 0,
  `create_at` timestamp NOT NULL DEFAULT current_timestamp(),
  `cancel_at` timestamp NULL DEFAULT NULL,
  `confirm_at` timestamp NULL DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `history`
--

INSERT INTO `history` (`id`, `username`, `list`, `quantity`, `price`, `payment`, `cancel`, `confirm`, `create_at`, `cancel_at`, `confirm_at`) VALUES
(4, 'user1', 'Black Myth: Wukong', 1, 44.46, 'Credit Card', 0, 0, '2024-10-18 18:49:47', NULL, NULL),
(5, 'user1', 'Silent Hill 2', 1, 53.1, 'Credit Card', 0, 0, '2024-10-18 18:49:47', NULL, NULL),
(6, 'user1', 'Warhammer 40000: Space Marine 2', 1, 53.62, 'Credit Card', 0, 0, '2024-10-18 18:49:47', NULL, NULL),
(7, 'user1', 'Dragonball: Sparking! Zero', 1, 51.69, 'Prompt Pay', 0, 0, '2024-10-19 08:16:58', NULL, NULL),
(8, 'user1', 'Starfield', 1, 43.14, 'Prompt Pay', 0, 0, '2024-10-19 08:16:58', NULL, NULL),
(9, 'user2', 'Black Myth: Wukong', 1, 44.46, 'Credit Card', 0, 0, '2024-10-19 08:19:16', NULL, NULL),
(10, 'user2', 'Silent Hill 2', 1, 53.1, 'Credit Card', 0, 0, '2024-10-19 08:19:16', NULL, NULL),
(11, 'user2', 'Baldur\'s Gate 3', 1, 22.09, 'Prompt Pay', 1, 0, '2024-10-19 10:49:11', '2024-10-20 12:12:05', NULL),
(12, 'user1', 'Black Myth: Wukong', 1, 44.46, 'Prompt Pay', 0, 0, '2024-10-19 20:51:15', NULL, NULL),
(13, 'user1', 'Silent Hill 2', 1, 53.1, 'Prompt Pay', 0, 0, '2024-10-19 20:51:15', NULL, NULL),
(14, 'user1', 'Warhammer 40000: Space Marine 2', 10, 53.62, 'Prompt Pay', 0, 0, '2024-10-19 20:51:15', NULL, NULL),
(15, 'user2', 'The Crew 2', 1, 7.17, 'Credit Card', 0, 0, '2024-10-20 05:37:17', NULL, NULL),
(16, 'user2', 'Hitman III', 1, 27.39, 'Credit Card', 0, 0, '2024-10-20 05:37:17', NULL, NULL),
(17, 'user2', 'Puyo Puyo Tetris 2', 10, 12.07, 'Credit Card', 0, 0, '2024-10-20 05:37:17', NULL, NULL),
(19, 'user1', 'Black Myth: Wukong', 1, 44.46, 'Credit Card', 0, 1, '2024-10-23 05:33:41', NULL, NULL);

-- --------------------------------------------------------

--
-- Table structure for table `review`
--

CREATE TABLE `review` (
  `id` int(11) NOT NULL,
  `username` varchar(100) NOT NULL,
  `game` varchar(100) NOT NULL,
  `text` varchar(500) NOT NULL,
  `star` int(11) NOT NULL,
  `create_at` timestamp NOT NULL DEFAULT current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `review`
--

INSERT INTO `review` (`id`, `username`, `game`, `text`, `star`, `create_at`) VALUES
(1, 'user1', 'Black Myth: Wukong', 'test', 5, '2024-10-26 08:44:19'),
(8, 'user1', 'starfield', 'test2', 5, '2024-10-26 08:44:19');

-- --------------------------------------------------------

--
-- Table structure for table `users`
--

CREATE TABLE `users` (
  `id` int(11) NOT NULL,
  `username` varchar(100) NOT NULL,
  `password` varchar(100) NOT NULL,
  `email` varchar(100) NOT NULL,
  `role` varchar(4) NOT NULL DEFAULT 'user',
  `create_at` timestamp NOT NULL DEFAULT current_timestamp(),
  `edit_at` timestamp NULL DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `users`
--

INSERT INTO `users` (`id`, `username`, `password`, `email`, `role`, `create_at`, `edit_at`) VALUES
(1, 'user1', '$2b$10$Jgzgpx11shr3wIg35PhIz.H5cSHw4b1DMFszcmCCVVHDOrnRES2sC', 'test@gmail.com', 'user', '2024-10-16 08:42:39', '2024-10-17 08:35:18'),
(2, 'user2', '$2b$10$FBgaKfatukXrhSJueCulo.07jD3v5gN8f3jRYvzwkWh4qFQ5SNfb6', 'test2@gmail.com', 'user', '2024-10-17 08:29:16', NULL);

-- --------------------------------------------------------

--
-- Table structure for table `wishlist`
--

CREATE TABLE `wishlist` (
  `id` int(11) NOT NULL,
  `username` varchar(100) NOT NULL,
  `list` varchar(100) NOT NULL,
  `enable` int(11) NOT NULL DEFAULT 1,
  `create_at` timestamp NOT NULL DEFAULT current_timestamp(),
  `edit_at` timestamp NULL DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `wishlist`
--

INSERT INTO `wishlist` (`id`, `username`, `list`, `enable`, `create_at`, `edit_at`) VALUES
(1, 'user1', 'Black Myth: Wukong', 1, '2024-10-17 19:34:03', '2024-10-18 06:21:37'),
(2, 'user1', 'Silent Hill 2', 1, '2024-10-17 19:38:45', '2024-10-18 11:03:42'),
(3, 'user1', 'Warhammer 40000: Space Marine 2', 1, '2024-10-17 19:40:05', '2024-10-18 06:21:32'),
(4, 'user1', 'Baldur\'s Gate 3', 0, '2024-10-17 20:06:14', '2024-10-19 20:49:01'),
(5, 'user1', 'Starfield', 0, '2024-10-18 05:31:17', '2024-10-18 05:35:35'),
(6, 'user1', 'Sid Meier\'s Civilization VI', 0, '2024-10-18 10:24:33', '2024-10-18 12:03:28'),
(7, 'user2', 'Sid Meier\'s Civilization VI', 0, '2024-10-19 09:08:47', '2024-10-20 12:44:22'),
(8, 'user2', 'Black Myth: Wukong', 1, '2024-10-20 12:44:15', NULL);

--
-- Indexes for dumped tables
--

--
-- Indexes for table `admin`
--
ALTER TABLE `admin`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `carousel`
--
ALTER TABLE `carousel`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `cart`
--
ALTER TABLE `cart`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `contact`
--
ALTER TABLE `contact`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `game`
--
ALTER TABLE `game`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `history`
--
ALTER TABLE `history`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `review`
--
ALTER TABLE `review`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `users`
--
ALTER TABLE `users`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `wishlist`
--
ALTER TABLE `wishlist`
  ADD PRIMARY KEY (`id`);

--
-- AUTO_INCREMENT for dumped tables
--

--
-- AUTO_INCREMENT for table `admin`
--
ALTER TABLE `admin`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=3;

--
-- AUTO_INCREMENT for table `carousel`
--
ALTER TABLE `carousel`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=4;

--
-- AUTO_INCREMENT for table `cart`
--
ALTER TABLE `cart`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=30;

--
-- AUTO_INCREMENT for table `contact`
--
ALTER TABLE `contact`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=4;

--
-- AUTO_INCREMENT for table `game`
--
ALTER TABLE `game`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=19;

--
-- AUTO_INCREMENT for table `history`
--
ALTER TABLE `history`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=20;

--
-- AUTO_INCREMENT for table `review`
--
ALTER TABLE `review`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=9;

--
-- AUTO_INCREMENT for table `users`
--
ALTER TABLE `users`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=3;

--
-- AUTO_INCREMENT for table `wishlist`
--
ALTER TABLE `wishlist`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=9;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
