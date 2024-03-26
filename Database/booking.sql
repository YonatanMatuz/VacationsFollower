-- phpMyAdmin SQL Dump
-- version 5.2.1
-- https://www.phpmyadmin.net/
--
-- Host: 127.0.0.1
-- Generation Time: May 28, 2023 at 11:37 AM
-- Server version: 10.4.28-MariaDB
-- PHP Version: 8.2.4

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Database: `booking`
--
CREATE DATABASE IF NOT EXISTS `booking` DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_bin;
USE `booking`;

-- --------------------------------------------------------

--
-- Table structure for table `roles`
--

CREATE TABLE `roles` (
  `roleId` int(11) NOT NULL,
  `roleName` varchar(20) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_bin;

--
-- Dumping data for table `roles`
--

INSERT INTO `roles` (`roleId`, `roleName`) VALUES
(1, 'Admin'),
(2, 'User');

-- --------------------------------------------------------

--
-- Table structure for table `users`
--

CREATE TABLE `users` (
  `userId` int(11) NOT NULL,
  `firstName` varchar(20) NOT NULL,
  `lastName` varchar(20) NOT NULL,
  `email` varchar(50) NOT NULL,
  `password` varchar(128) NOT NULL,
  `roleId` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_bin;

--
-- Dumping data for table `users`
--

INSERT INTO `users` (`userId`, `firstName`, `lastName`, `email`, `password`, `roleId`) VALUES
(11, 'Admin', 'Official', 'admin@gmail.com', '6d62461617ece48ee85e7fe3881482ed9f53caad16cb261648c208e2e42160ee79b647a51fb274748849b4cc333695bc8f6abcf41f821f813b27508334e15ed7', 1),
(12, 'Tester 1', 'Testing', 'tester1@gmail.com', '40d60340d9694ec16b4e6c5dc7627b0063937d0458b460e5afc55fb0addd034271ab04cbd8fb38d4f2db69b4c34e5fd811976d0dc68f6b5d8d2789fa48ac42aa', 2),
(13, 'tester 2', 'testing', 'tester@gmail.com', '6d62461617ece48ee85e7fe3881482ed9f53caad16cb261648c208e2e42160ee79b647a51fb274748849b4cc333695bc8f6abcf41f821f813b27508334e15ed7', 2),
(14, 'tester 3', 'testing', 'tester3@gmail.com', '6d62461617ece48ee85e7fe3881482ed9f53caad16cb261648c208e2e42160ee79b647a51fb274748849b4cc333695bc8f6abcf41f821f813b27508334e15ed7', 2);

-- --------------------------------------------------------

--
-- Table structure for table `vacationFollowers`
--

CREATE TABLE `vacationFollowers` (
  `userId` int(11) NOT NULL,
  `vacationId` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_bin;

--
-- Dumping data for table `vacationFollowers`
--

INSERT INTO `vacationFollowers` (`userId`, `vacationId`) VALUES
(12, 11),
(12, 13),
(12, 16),
(13, 11),
(13, 16),
(13, 18),
(13, 19),
(14, 16),
(14, 17);

-- --------------------------------------------------------

--
-- Table structure for table `vacations`
--

CREATE TABLE `vacations` (
  `vacationId` int(11) NOT NULL,
  `destination` varchar(30) NOT NULL,
  `description` varchar(500) NOT NULL,
  `start` date NOT NULL,
  `end` date NOT NULL,
  `price` decimal(7,2) NOT NULL,
  `imageName` varchar(255) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_bin;

--
-- Dumping data for table `vacations`
--

INSERT INTO `vacations` (`vacationId`, `destination`, `description`, `start`, `end`, `price`, `imageName`) VALUES
(9, 'Sydney', 'It\'s time to pack your suitcase and unwind by the ocean on a Sydney vacation. Pretty coastal vistas are bountiful on a trip to Sydney — Bondi Beach (4 miles (7 km) away) is an excellent example. We recommend basing yourself close by. If you\'re looking for more options, loads of sightseers also book Sydney packages close to Manly Beach and Coogee Beach.', '2023-06-06', '2023-06-20', 830.00, '68c11ddb-5f8f-43fc-9827-49d74d13c7b9.jpg'),
(10, 'Romania', 'From the bears and lynxes of the Carpathian Mountains to the Danube Delta’s vibrant birdlife, this nation’s incredible wildlife attracts many travelers — though even more are lured by the myths of Transylvania.', '2023-06-12', '2023-06-15', 497.00, 'f09a8dc5-ac07-444a-9eec-60dca4e66384.jpg'),
(11, 'Poland', 'From its stunning architecture and fabulous food to its pretty lakes and forests, Poland is full of surprises. This central European nation is home to vibrant cities and ancient towns bursting with history, as well as vast tracts of wilderness that will satisfy any nature lover. ', '2023-06-22', '2023-06-26', 998.00, '08c5905e-5e1b-45e6-a5a1-c46f23611671.jpg'),
(12, 'Peru', 'Peru offers the visitor on a Peru vacation an extraordinary array of wonders both historical and geographical. The country is divided into three regions. There is the coastal Pacific plain on which the capital, Lima is located, the Altiplano of the Andean mountain range and the jungle which covers approximately half of Peru in the Amazonian Rainforest.', '2023-06-01', '2023-06-06', 732.00, '69e3d1ce-f1ec-46e2-afad-57706e6b22df.jpg'),
(13, 'Mexico', 'Head across the border and make Mexico your next vacation destination. With cuisine as colorful as the culture, and scenery as spellbinding as the ancient Mayan sites, there is so much to see and do. For a cheap Mexico vacation package, head to Cancun for its popular nightlife and relaxing days on white sandy beaches.', '2023-06-14', '2023-06-28', 520.00, '675b71b5-fd8d-4a22-a574-9e81bf0e0734.jpg'),
(14, 'Italy', 'Universally adored, Italy is food, is weather, is history. There’s always something different to fall head over heels for in the boot-shaped nation. Travel packages to Italy tend to start in the historic cities—Rome, Florence, Venice or Milan—where elegant design, Roman architecture, and sophisticated hotels reign supreme. From there, Italy family vacation packages could wander to the pretty Puglian beaches or into the rolling Tuscan countryside.', '2023-06-05', '2023-06-08', 500.00, 'd6fd2760-9e91-427d-9c61-9f565f99a771.jpg'),
(15, 'Greece', 'Get away to Greece on a vacation full of beautiful beaches, awesome ancient history, and taste bud-tantalizing cuisine. This laidback Mediterranean gem, one-time home to thinkers Aristotle and Hippocrates, can be a relaxed beach vacation or an educational family adventure on an Athens vacation package.', '2023-07-05', '2023-07-11', 589.00, '91bced52-d8d7-4321-92e4-11d0c715ce42.jpg'),
(16, 'Germany', 'From medieval castles to glittering skyscrapers, the fairy-tale splendor of the Alps to the forest-fringed coastline of the Baltic Sea, Germany is a sightseer’s paradise.', '2023-05-22', '2023-05-30', 905.00, 'feefc42e-ae49-4c22-af5d-2a80cb3eb5e4.jpg'),
(17, 'Florida', 'The Sunshine State, soaked in sun all year round, Florida is a 365-day summer escape. Or close enough! An Orlando Florida vacation package puts a smile on everyone’s faces with easy access to the Disney World® adventures and family-friendly theme parks right there.', '2023-05-11', '2023-05-17', 9821.00, '8e114fe0-66bb-4c8d-8941-60dc5eed1789.jpg'),
(18, 'Brazil', 'The fifth-biggest country in the world and the largest in South America, Brazil is bursting with attractions. From the mighty Amazon Rainforest and pulsing rhythms of Rio Carnival to iconic Ipanema beach, this extraordinary nation is a feast for the senses.', '2023-05-27', '2023-05-31', 832.00, 'b4cb223e-6c4d-4ddc-9767-cce03d83554a.jpg'),
(19, 'Perth', 'It\'s time to take a break and kick back seaside on a Perth vacation. Pretty coastal vistas are in plentiful supply on a trip to Perth — Cottesloe Beach (7 miles (11 km) away) is a well-known example. It\'s a great idea to book a hotel close by. If you need more options, loads of sightseers also book Perth vacation deals in the vicinity of Scarborough Beach and Sorrento Beach.', '2023-05-29', '2023-05-31', 1023.00, 'bb597efd-ae5c-4b29-8688-05953720cfc6.jpg'),
(20, 'Egypt', 'Live like a pharaoh with an Egypt vacation package: Tour the father of African rivers, the Nile, see the pyramids up close, relax in 5-star style in cosmopolitan Cairo. Or set history aside and pack your bags for a Sharm el Sheikh Egypt vacation package where the diving is some of the best in the world.', '2023-06-28', '2023-06-29', 209.00, '3d04e288-b000-4696-bf06-72213d38a475.jpg');

--
-- Indexes for dumped tables
--

--
-- Indexes for table `roles`
--
ALTER TABLE `roles`
  ADD PRIMARY KEY (`roleId`);

--
-- Indexes for table `users`
--
ALTER TABLE `users`
  ADD PRIMARY KEY (`userId`),
  ADD KEY `roleId` (`roleId`);

--
-- Indexes for table `vacationFollowers`
--
ALTER TABLE `vacationFollowers`
  ADD PRIMARY KEY (`userId`,`vacationId`);

--
-- Indexes for table `vacations`
--
ALTER TABLE `vacations`
  ADD PRIMARY KEY (`vacationId`);

--
-- AUTO_INCREMENT for dumped tables
--

--
-- AUTO_INCREMENT for table `roles`
--
ALTER TABLE `roles`
  MODIFY `roleId` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=3;

--
-- AUTO_INCREMENT for table `users`
--
ALTER TABLE `users`
  MODIFY `userId` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=18;

--
-- AUTO_INCREMENT for table `vacations`
--
ALTER TABLE `vacations`
  MODIFY `vacationId` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=47;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
