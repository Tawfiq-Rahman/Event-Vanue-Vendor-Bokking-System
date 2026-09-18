-- phpMyAdmin SQL Dump
-- version 5.2.1
-- https://www.phpmyadmin.net/
--
-- Host: 127.0.0.1
-- Generation Time: Sep 18, 2026 at 11:14 PM
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
-- Database: `event_booking_system`
--

-- --------------------------------------------------------

--
-- Table structure for table `announcements`
--

CREATE TABLE `announcements` (
  `id` int(11) NOT NULL,
  `title` varchar(255) NOT NULL,
  `message` text NOT NULL,
  `target_role` enum('all','customer','venue_owner','vendor') DEFAULT 'all',
  `created_at` timestamp NOT NULL DEFAULT current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `announcements`
--

INSERT INTO `announcements` (`id`, `title`, `message`, `target_role`, `created_at`) VALUES
(1, 'Alert ( Security concern )', 'Don\'t Share your Password to anyone or don\'t save it while browsing it on different browser ', 'all', '2026-09-18 20:13:32'),
(2, 'Upgade Notice ', 'Time to time update the app to see the new categories', 'customer', '2026-09-18 20:30:54');

-- --------------------------------------------------------

--
-- Table structure for table `bookings`
--

CREATE TABLE `bookings` (
  `id` int(11) NOT NULL,
  `customer_id` int(11) NOT NULL,
  `venue_id` int(11) DEFAULT NULL,
  `event_date` date NOT NULL,
  `guest_count` int(11) NOT NULL,
  `total_amount` decimal(10,2) NOT NULL,
  `advance_paid` decimal(10,2) DEFAULT 0.00,
  `booking_status` enum('pending','confirmed','cancelled','completed') DEFAULT 'pending',
  `created_at` timestamp NOT NULL DEFAULT current_timestamp(),
  `customer_seen` tinyint(1) DEFAULT 0
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `bookings`
--

INSERT INTO `bookings` (`id`, `customer_id`, `venue_id`, `event_date`, `guest_count`, `total_amount`, `advance_paid`, `booking_status`, `created_at`, `customer_seen`) VALUES
(1, 10, 7, '2026-09-24', 200, 5000.00, 0.00, 'cancelled', '2026-09-17 20:57:01', 1),
(2, 10, 12, '2026-09-23', 100, 2800.00, 2800.00, 'completed', '2026-09-18 18:00:12', 0),
(3, 10, NULL, '2026-09-24', 10, 25.00, 25.00, 'completed', '2026-09-18 18:35:36', 0);

-- --------------------------------------------------------

--
-- Table structure for table `booking_vendors`
--

CREATE TABLE `booking_vendors` (
  `id` int(11) NOT NULL,
  `booking_id` int(11) NOT NULL,
  `vendor_id` int(11) NOT NULL,
  `service_status` enum('pending','accepted','declined','preparing','ready') DEFAULT 'pending',
  `cost` decimal(10,2) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `booking_vendors`
--

INSERT INTO `booking_vendors` (`id`, `booking_id`, `vendor_id`, `service_status`, `cost`) VALUES
(1, 3, 8, 'ready', 25.00);

-- --------------------------------------------------------

--
-- Table structure for table `categories`
--

CREATE TABLE `categories` (
  `id` int(11) NOT NULL,
  `name` varchar(50) NOT NULL,
  `description` text DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- --------------------------------------------------------

--
-- Table structure for table `messages`
--

CREATE TABLE `messages` (
  `id` int(11) NOT NULL,
  `sender_id` int(11) NOT NULL,
  `receiver_id` int(11) NOT NULL,
  `message` text NOT NULL,
  `sent_at` timestamp NOT NULL DEFAULT current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `messages`
--

INSERT INTO `messages` (`id`, `sender_id`, `receiver_id`, `message`, `sent_at`) VALUES
(1, 4, 6, 'hello', '2026-09-17 17:06:44'),
(2, 4, 6, 'hi ', '2026-09-17 17:06:49'),
(3, 10, 6, 'hello', '2026-09-17 20:59:57'),
(4, 10, 5, 'Hello', '2026-09-17 21:46:45'),
(5, 5, 10, 'Hii', '2026-09-17 21:48:12'),
(6, 10, 6, 'kire', '2026-09-17 22:19:41'),
(7, 9, 5, 'Hiii ', '2026-09-18 16:47:38'),
(8, 5, 12, 'Hi', '2026-09-18 17:01:31'),
(9, 12, 5, 'Hellooo....', '2026-09-18 17:07:02'),
(10, 6, 10, 'Hiii', '2026-09-18 20:15:07'),
(11, 8, 10, 'Heyy', '2026-09-18 20:32:18');

-- --------------------------------------------------------

--
-- Table structure for table `reviews`
--

CREATE TABLE `reviews` (
  `id` int(11) NOT NULL,
  `customer_id` int(11) NOT NULL,
  `venue_id` int(11) DEFAULT NULL,
  `vendor_id` int(11) DEFAULT NULL,
  `rating` int(11) DEFAULT NULL CHECK (`rating` between 1 and 5),
  `comment` text DEFAULT NULL,
  `created_at` timestamp NOT NULL DEFAULT current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `reviews`
--

INSERT INTO `reviews` (`id`, `customer_id`, `venue_id`, `vendor_id`, `rating`, `comment`, `created_at`) VALUES
(1, 10, 3, NULL, 5, '4', '2026-09-18 18:46:09'),
(2, 10, 2, NULL, 5, '5', '2026-09-18 18:46:20');

-- --------------------------------------------------------

--
-- Table structure for table `system_settings`
--

CREATE TABLE `system_settings` (
  `id` int(11) NOT NULL,
  `commission_rate` decimal(5,2) DEFAULT 10.00,
  `cancellation_rules` text DEFAULT NULL,
  `updated_at` timestamp NOT NULL DEFAULT current_timestamp() ON UPDATE current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `system_settings`
--

INSERT INTO `system_settings` (`id`, `commission_rate`, `cancellation_rules`, `updated_at`) VALUES
(1, 10.00, 'Default cancellation policy applies.', '2026-09-17 16:32:29');

-- --------------------------------------------------------

--
-- Table structure for table `users`
--

CREATE TABLE `users` (
  `id` int(11) NOT NULL,
  `name` varchar(100) NOT NULL,
  `email` varchar(120) NOT NULL,
  `password` varchar(255) NOT NULL,
  `role` enum('admin','venue_owner','vendor','customer') NOT NULL,
  `status` enum('pending','approved','rejected') DEFAULT 'pending',
  `phone` varchar(20) DEFAULT NULL,
  `created_at` timestamp NOT NULL DEFAULT current_timestamp(),
  `dob` date DEFAULT NULL,
  `address` text DEFAULT NULL,
  `profile_picture` text DEFAULT NULL,
  `government_id` varchar(255) DEFAULT NULL,
  `business_license_id` varchar(255) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `users`
--

INSERT INTO `users` (`id`, `name`, `email`, `password`, `role`, `status`, `phone`, `created_at`, `dob`, `address`, `profile_picture`, `government_id`, `business_license_id`) VALUES
(4, 'John Bolder', 'jh@gmail.com', '$2b$10$GBBAq7ECtlAqV.xCqZZlseQYd7kqN5rwGrAhA3vnmfJA1KBZ9alju', 'customer', 'approved', '', '2026-09-17 15:54:40', NULL, NULL, NULL, NULL, NULL),
(5, 'Rafael Simiouni', 'ra@gmail.com', '$2b$10$g3OR/0upducsVLkq.6GjsucgaXw1434hahaf6JsKSDsS7tR.b0F..', 'venue_owner', 'approved', '', '2026-09-17 16:19:14', NULL, NULL, NULL, '112233', '443322'),
(6, 'Pisiuke Batler', 'pi@gmail.com', '$2b$10$Y2nwTVPdokC09Fp9OjXfM.o50CHB.TfCTiyrdKr7Uq1JxJZLNjUUO', 'vendor', 'approved', '', '2026-09-17 16:24:11', NULL, NULL, NULL, '998811', '545454'),
(7, 'Tony Stark', 'to@gmail.com', '$2b$10$IsOTMeIx7T9rxXaepKeWheXZ8bm5Ha.I9byFRFDq4B6Wp7iM4ecqW', 'venue_owner', 'approved', '', '2026-09-17 19:00:48', NULL, NULL, NULL, '662211', '558800'),
(8, 'Steve Rogger', 'st@gmail.com', '$2b$10$oQCQKp/hYvzdyxXN/cK6YOYzOfpRqtviX04niTSH/D/w9sghzc98i', 'venue_owner', 'approved', '', '2026-09-17 19:02:05', NULL, NULL, NULL, '001122', '535353'),
(9, 'lumanof Fring', 'lu@gmail.com', '$2b$10$Z/P51V61aDKDc6abNw27WOYxGtJMdkntIR9yY7xam2KOvL6Bw7I5W', 'vendor', 'approved', '', '2026-09-17 19:03:22', NULL, NULL, NULL, '787822', '121212'),
(10, 'Tawfiq Rahman', 'ta@gmail.com', '$2b$10$/LZuWN2zNaT5G.tQk.FlNeJUpk0pn3AaDbTKje.Llw1aF2SHWGBfm', 'customer', 'approved', '', '2026-09-17 19:04:17', NULL, NULL, NULL, NULL, NULL),
(11, 'Hamim Rahman', 'ha@gmail.com', '$2b$10$BUbsTXRRJLCviKY9iQapLOGBtRnPs2zdM8ZaNWj0qYEfLqAz/..sq', 'customer', 'approved', '', '2026-09-17 19:04:46', NULL, NULL, NULL, NULL, NULL),
(12, 'Neymar Junior', 'ne@gmail.com', '$2b$10$iQ.g69qhDtZYwWi3uBYxQ.etvLYaioS1TelmO/56l.3L8HOjhWxym', 'vendor', 'approved', '', '2026-09-17 19:21:28', NULL, NULL, NULL, '00663311', '91916789');

-- --------------------------------------------------------

--
-- Table structure for table `vendors`
--

CREATE TABLE `vendors` (
  `id` int(11) NOT NULL,
  `user_id` int(11) DEFAULT NULL,
  `title` varchar(255) DEFAULT NULL,
  `service_type` enum('catering','decoration','photography','other') NOT NULL,
  `portfolio_description` text DEFAULT NULL,
  `starting_rate` decimal(10,2) NOT NULL,
  `image_url` text DEFAULT NULL,
  `rating` decimal(2,1) DEFAULT 0.0,
  `location` varchar(255) DEFAULT 'Available Nationwide'
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `vendors`
--

INSERT INTO `vendors` (`id`, `user_id`, `title`, `service_type`, `portfolio_description`, `starting_rate`, `image_url`, `rating`, `location`) VALUES
(4, 6, 'Lens & Light Pro', 'photography', 'We bring a portable studio.', 500.00, 'https://images.unsplash.com/photo-1519741497674-611481863552?q=80&w=800', 4.8, 'Available Nationwide'),
(5, NULL, 'Cinematic Memories', 'photography', 'Videography and photography.', 600.00, 'https://images.unsplash.com/photo-1537368910025-700350fe46c7?q=80&w=800', 4.9, 'Available Nationwide'),
(6, NULL, 'Aperture Studios', 'photography', 'Aperture Studios comes from a traditional portrait background.', 450.00, 'https://images.unsplash.com/photo-1511285560929-80b456fea0bc?q=80&w=800', 4.6, 'Available Nationwide'),
(7, NULL, 'Candid Moments', 'photography', 'Documentary coverage, nothing posed.', 550.00, 'https://images.unsplash.com/photo-1520854221256-17451cc331bf?q=80&w=800', 4.8, 'Available Nationwide'),
(8, 12, 'Gourmet Delights', 'catering', 'Gourmet food catering.', 25.00, 'https://images.unsplash.com/photo-1555939594-58d7cb561ad1?q=80&w=800', 4.9, 'Available Nationwide'),
(9, NULL, 'Urban Feast', 'catering', 'Urban food truck style feast.', 18.00, 'https://images.unsplash.com/photo-1414235077428-338989a2e8c0?q=80&w=800', 4.7, 'Available Nationwide'),
(10, 12, 'Savory & Sweet', 'catering', 'Best desserts and savory dishes.', 30.00, 'https://images.unsplash.com/photo-1481931098730-318b6f776db0?q=80&w=800', 4.8, 'Available Nationwide'),
(12, 9, 'Elegant Blooms', 'decoration', 'Elegant Blooms is a florist first.', 800.00, 'https://images.unsplash.com/photo-1478146896981-b80fe463b330?q=80&w=800', 5.0, 'Available Nationwide'),
(13, NULL, 'Luxe Aesthetics', 'decoration', 'Large-format staging and lighting design.', 1200.00, 'https://images.unsplash.com/photo-1519225421980-715cb0215aed?q=80&w=800', 4.7, 'Available Nationwide'),
(14, 9, 'Floral Symphonies', 'decoration', 'Sculptural floral work at scale.', 950.00, 'https://images.unsplash.com/photo-1464366400600-7168b8af9bc3?q=80&w=800', 5.0, 'Available Nationwide'),
(15, NULL, 'Vintage Charm', 'decoration', 'Period furniture and warm, lived-in styling.', 700.00, 'https://images.unsplash.com/photo-1532712938310-34cb3982ef74?q=80&w=800', 4.7, 'Available Nationwide'),
(16, NULL, 'Culinary Magic', 'catering', 'Exceptional culinary experiences.', 22.00, 'https://images.unsplash.com/photo-1555244162-803834f70033?q=80&w=800', 4.9, 'Available Nationwide');

-- --------------------------------------------------------

--
-- Table structure for table `venues`
--

CREATE TABLE `venues` (
  `id` int(11) NOT NULL,
  `owner_id` int(11) DEFAULT NULL,
  `title` varchar(150) NOT NULL,
  `description` text DEFAULT NULL,
  `location` varchar(200) NOT NULL,
  `capacity` int(11) NOT NULL,
  `price_per_day` decimal(10,2) NOT NULL,
  `image_url` text DEFAULT NULL,
  `created_at` timestamp NOT NULL DEFAULT current_timestamp(),
  `packages` text DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `venues`
--

INSERT INTO `venues` (`id`, `owner_id`, `title`, `description`, `location`, `capacity`, `price_per_day`, `image_url`, `created_at`, `packages`) VALUES
(1, 5, 'Grand Plaza Resort', 'Grand Plaza Resort pairs a 500-capacity ballroom with an attached hotel, which is why it is a regular choice for multi-day conferences and weddings with travelling guests. The room divides into three sections, so a smaller event does not rattle around in an empty hall.', 'Downtown City Center', 500, 1200.00, 'https://images.unsplash.com/photo-1519167758481-83f550bb49b3?q=80&w=600&auto=format&fit=crop', '2026-09-17 19:29:19', NULL),
(2, NULL, 'The Glass House', 'The Glass House is a glazed pavilion on the riverside with light on three sides. Couples book it precisely because it needs so little dressing: the water, the glass and the sunset do most of the work, and the retractable roof means an outdoor ceremony has a built-in wet-weather plan.', 'Riverside District', 300, 2500.00, 'https://images.unsplash.com/photo-1464366400600-7168b8af9bc3?q=80&w=600&auto=format&fit=crop', '2026-09-17 19:29:19', NULL),
(3, NULL, 'Heritage Banquet', 'Heritage Banquet occupies a restored nineteenth-century hall with the original timber floor and plasterwork intact. It is the most affordable room in our listings without feeling like a budget choice, and its Old Town Square address means guests can walk in from nearby hotels.', 'Old Town Square', 200, 850.00, 'https://images.unsplash.com/photo-1511795409834-ef04bbd61622?q=80&w=600&auto=format&fit=crop', '2026-09-17 19:29:19', NULL),
(4, NULL, 'Crystal Pavilion', 'Crystal Pavilion is a thousand-capacity hall with rigging points, three-phase power and a loading dock, which makes it the only venue in our listings that can take a full production build. Conferences, award ceremonies and large weddings all run here without compromise.', 'Uptown Business Park', 1000, 3200.00, 'https://images.unsplash.com/photo-1519225421980-715cb0215aed?q=80&w=600&auto=format&fit=crop', '2026-09-17 19:29:19', NULL),
(5, NULL, 'Sapphire Lounge', 'Sapphire Lounge is a marina-side room built for evenings rather than all-day events. Low lighting, a long bar and a terrace over the water make it a natural fit for launch parties, engagement drinks and milestone birthdays of around a hundred guests.', 'Westside Marina', 150, 950.00, 'https://images.unsplash.com/photo-1414235077428-338989a2e8c0?q=80&w=600&auto=format&fit=crop', '2026-09-17 19:29:19', NULL),
(6, NULL, 'Emerald Estate', 'Emerald Estate sits on open grounds outside the city, with a marquee lawn, a walled garden and uninterrupted views at sunset. It is the venue couples pick when they want the ceremony outdoors and the reception under canvas, with enough land that neighbouring noise limits are not a factor.', 'Outskirts Countryside', 400, 1800.00, 'https://images.unsplash.com/photo-1519741497674-611481863552?auto=format&fit=crop&q=80&w=600', '2026-09-17 19:29:19', NULL),
(7, 5, 'UIU', 'Pera r pera', 'madani avanue', 400, 5000.00, 'https://images.unsplash.com/photo-1518640467707-6811f4a6ab73?auto=format&fit=crop&q=80&w=600', '2026-09-17 20:00:02', 'kno package nai fail korle retake tk o same '),
(8, 8, 'Sunset Garden Villa', 'A beautiful open-air villa with sunset views, perfect for intimate outdoor ceremonies and corporate retreats.', 'Coastal Heights', 150, 1800.00, 'https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?auto=format&fit=crop&q=80&w=600', '2026-09-17 20:31:15', NULL),
(9, NULL, 'The Industrial Loft', 'Exposed brick walls, high ceilings, and modern amenities make this downtown loft ideal for creative events and parties.', 'Arts District', 250, 2200.00, 'https://images.unsplash.com/photo-1497366216548-37526070297c?auto=format&fit=crop&q=80&w=600', '2026-09-17 20:31:15', NULL),
(10, 7, 'Majestic Ballroom', 'Step into royalty with our Majestic Ballroom featuring crystal chandeliers, grand staircases, and premium catering.', 'City Center', 600, 6000.00, 'https://images.unsplash.com/photo-1519710164239-da123dc03ef4?auto=format&fit=crop&q=80&w=600', '2026-09-17 20:31:15', NULL),
(11, NULL, 'Oceanview Terrace', 'A breathtaking terrace overlooking the ocean. Includes an indoor glass pavilion for weather protection.', 'South Beach', 300, 5500.00, 'https://images.unsplash.com/photo-1499793983690-e29da59ef1c2?auto=format&fit=crop&q=80&w=600', '2026-09-17 20:31:15', NULL),
(12, 8, 'Vintage Vineyard', 'Host your event amidst rolling hills and grapevines. Includes wine tasting packages and rustic barn access.', 'Napa Valley', 400, 2800.00, 'https://images.unsplash.com/photo-1506126613408-eca07ce68773?auto=format&fit=crop&q=80&w=600', '2026-09-17 20:31:15', NULL);

--
-- Indexes for dumped tables
--

--
-- Indexes for table `announcements`
--
ALTER TABLE `announcements`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `bookings`
--
ALTER TABLE `bookings`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `unique_venue_date` (`venue_id`,`event_date`),
  ADD KEY `customer_id` (`customer_id`);

--
-- Indexes for table `booking_vendors`
--
ALTER TABLE `booking_vendors`
  ADD PRIMARY KEY (`id`),
  ADD KEY `booking_id` (`booking_id`),
  ADD KEY `vendor_id` (`vendor_id`);

--
-- Indexes for table `categories`
--
ALTER TABLE `categories`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `name` (`name`);

--
-- Indexes for table `messages`
--
ALTER TABLE `messages`
  ADD PRIMARY KEY (`id`),
  ADD KEY `sender_id` (`sender_id`),
  ADD KEY `receiver_id` (`receiver_id`);

--
-- Indexes for table `reviews`
--
ALTER TABLE `reviews`
  ADD PRIMARY KEY (`id`),
  ADD KEY `customer_id` (`customer_id`),
  ADD KEY `venue_id` (`venue_id`),
  ADD KEY `vendor_id` (`vendor_id`);

--
-- Indexes for table `system_settings`
--
ALTER TABLE `system_settings`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `users`
--
ALTER TABLE `users`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `email` (`email`);

--
-- Indexes for table `vendors`
--
ALTER TABLE `vendors`
  ADD PRIMARY KEY (`id`),
  ADD KEY `user_id` (`user_id`);

--
-- Indexes for table `venues`
--
ALTER TABLE `venues`
  ADD PRIMARY KEY (`id`),
  ADD KEY `owner_id` (`owner_id`);

--
-- AUTO_INCREMENT for dumped tables
--

--
-- AUTO_INCREMENT for table `announcements`
--
ALTER TABLE `announcements`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=3;

--
-- AUTO_INCREMENT for table `bookings`
--
ALTER TABLE `bookings`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=4;

--
-- AUTO_INCREMENT for table `booking_vendors`
--
ALTER TABLE `booking_vendors`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=2;

--
-- AUTO_INCREMENT for table `categories`
--
ALTER TABLE `categories`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `messages`
--
ALTER TABLE `messages`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=12;

--
-- AUTO_INCREMENT for table `reviews`
--
ALTER TABLE `reviews`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=3;

--
-- AUTO_INCREMENT for table `system_settings`
--
ALTER TABLE `system_settings`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=2;

--
-- AUTO_INCREMENT for table `users`
--
ALTER TABLE `users`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=14;

--
-- AUTO_INCREMENT for table `vendors`
--
ALTER TABLE `vendors`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=17;

--
-- AUTO_INCREMENT for table `venues`
--
ALTER TABLE `venues`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=13;

--
-- Constraints for dumped tables
--

--
-- Constraints for table `bookings`
--
ALTER TABLE `bookings`
  ADD CONSTRAINT `bookings_ibfk_1` FOREIGN KEY (`customer_id`) REFERENCES `users` (`id`) ON DELETE CASCADE,
  ADD CONSTRAINT `bookings_ibfk_2` FOREIGN KEY (`venue_id`) REFERENCES `venues` (`id`) ON DELETE CASCADE;

--
-- Constraints for table `booking_vendors`
--
ALTER TABLE `booking_vendors`
  ADD CONSTRAINT `booking_vendors_ibfk_1` FOREIGN KEY (`booking_id`) REFERENCES `bookings` (`id`) ON DELETE CASCADE,
  ADD CONSTRAINT `booking_vendors_ibfk_2` FOREIGN KEY (`vendor_id`) REFERENCES `vendors` (`id`) ON DELETE CASCADE;

--
-- Constraints for table `messages`
--
ALTER TABLE `messages`
  ADD CONSTRAINT `messages_ibfk_1` FOREIGN KEY (`sender_id`) REFERENCES `users` (`id`) ON DELETE CASCADE,
  ADD CONSTRAINT `messages_ibfk_2` FOREIGN KEY (`receiver_id`) REFERENCES `users` (`id`) ON DELETE CASCADE;

--
-- Constraints for table `reviews`
--
ALTER TABLE `reviews`
  ADD CONSTRAINT `reviews_ibfk_1` FOREIGN KEY (`customer_id`) REFERENCES `users` (`id`) ON DELETE CASCADE,
  ADD CONSTRAINT `reviews_ibfk_2` FOREIGN KEY (`venue_id`) REFERENCES `venues` (`id`) ON DELETE CASCADE,
  ADD CONSTRAINT `reviews_ibfk_3` FOREIGN KEY (`vendor_id`) REFERENCES `vendors` (`id`) ON DELETE CASCADE;

--
-- Constraints for table `vendors`
--
ALTER TABLE `vendors`
  ADD CONSTRAINT `vendors_ibfk_1` FOREIGN KEY (`user_id`) REFERENCES `users` (`id`) ON DELETE CASCADE;

--
-- Constraints for table `venues`
--
ALTER TABLE `venues`
  ADD CONSTRAINT `venues_ibfk_1` FOREIGN KEY (`owner_id`) REFERENCES `users` (`id`) ON DELETE CASCADE;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
