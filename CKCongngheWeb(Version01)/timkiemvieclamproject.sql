-- phpMyAdmin SQL Dump
-- version 5.2.1
-- https://www.phpmyadmin.net/
--
-- Host: 127.0.0.1
-- Generation Time: Apr 28, 2025 at 06:03 AM
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
-- Database: `timkiemvieclamproject`
--

-- --------------------------------------------------------

--
-- Table structure for table `table_chitietnguoidung`
--

CREATE TABLE `table_chitietnguoidung` (
  `id` int(11) NOT NULL,
  `nguoidung_id` int(11) NOT NULL,
  `hoten` varchar(200) NOT NULL,
  `ngaysinh` date NOT NULL,
  `quequan` varchar(200) NOT NULL,
  `sodienthoai` int(11) NOT NULL,
  `cccd` int(11) NOT NULL,
  `diachithuongtru` varchar(200) NOT NULL,
  `nghenghiep` varchar(200) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `table_chitietnguoidung`
--

INSERT INTO `table_chitietnguoidung` (`id`, `nguoidung_id`, `hoten`, `ngaysinh`, `quequan`, `sodienthoai`, `cccd`, `diachithuongtru`, `nghenghiep`) VALUES
(2, 2, 'sinvien01', '2025-04-17', 'dưa', 222, 222, 'ss', 'ss'),
(3, 3, 'fff', '2025-04-09', 'd', 33333, 3322, 'fff', 'fff'),
(4, 4, 'Sv2', '2025-04-18', 'fff', 33, 333, 'd', 'd');

-- --------------------------------------------------------

--
-- Table structure for table `table_hosonhatuyendung`
--

CREATE TABLE `table_hosonhatuyendung` (
  `id` int(11) NOT NULL,
  `nguoidung_id` int(11) NOT NULL,
  `anhdaidien` varchar(225) NOT NULL,
  `tencongty` varchar(200) DEFAULT NULL,
  `nguoidaidien` varchar(200) DEFAULT NULL,
  `sonamhoatdong` int(11) DEFAULT NULL,
  `emailcongty` varchar(100) DEFAULT NULL,
  `sodienthoaicongty` int(11) DEFAULT NULL,
  `linkwebsite` text DEFAULT NULL,
  `gioithieucongty` text DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `table_hosonhatuyendung`
--

INSERT INTO `table_hosonhatuyendung` (`id`, `nguoidung_id`, `anhdaidien`, `tencongty`, `nguoidaidien`, `sonamhoatdong`, `emailcongty`, `sodienthoaicongty`, `linkwebsite`, `gioithieucongty`) VALUES
(1, 3, 'https://th.bing.com/th/id/R.bfc8f6753076990fb521795f090d05f4?rik=PKfX9EjiOUUGzg&riu=http%3a%2f%2fthicao.com%2fwp-content%2fuploads%2f2019%2f03%2fFPT_01.jpg&ehk=dpUh5JwlyPjyUzLTnbpi%2fkVLhouK0kbb9FiAb0GDxE8%3d&risl=&pid=ImgRaw', 'Công ty ABC v', 'Hồ Quốc Việt', 5, 'congtyabc@gmail.com', 120216987, 'https://example.com/congtyabc', 'Không có giới thiệu gì');

-- --------------------------------------------------------

--
-- Table structure for table `table_hososinhvien`
--

CREATE TABLE `table_hososinhvien` (
  `id` int(11) NOT NULL,
  `nguoidung_id` int(11) NOT NULL,
  `anhdaidien` varchar(225) NOT NULL,
  `tentruong` varchar(200) DEFAULT NULL,
  `nganhhoc` varchar(200) DEFAULT NULL,
  `namtotnghiep` int(11) DEFAULT NULL,
  `trangthaitotnghiep` varchar(50) DEFAULT NULL,
  `linkcv` text DEFAULT NULL,
  `gioithieubanthan` text DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `table_hososinhvien`
--

INSERT INTO `table_hososinhvien` (`id`, `nguoidung_id`, `anhdaidien`, `tentruong`, `nganhhoc`, `namtotnghiep`, `trangthaitotnghiep`, `linkcv`, `gioithieubanthan`) VALUES
(1, 2, 'https://haycafe.vn/wp-content/uploads/2022/10/anhavatar-nguoi-que-cute-doi-vuong-mien.jpg', 'Tên Trường SV1', 'Ngành Học', 2024, 'Chưa tốt nghiệp', 'https://example.com/cv.pdf', 'Giới thiệu bản thân ở đây...'),
(2, 4, '', NULL, NULL, NULL, NULL, NULL, NULL);

-- --------------------------------------------------------

--
-- Table structure for table `table_nguoidung`
--

CREATE TABLE `table_nguoidung` (
  `id` int(11) NOT NULL,
  `tendangnhap` varchar(100) NOT NULL,
  `matkhau` varchar(100) NOT NULL,
  `email` varchar(100) NOT NULL,
  `loainguoidung` varchar(50) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `table_nguoidung`
--

INSERT INTO `table_nguoidung` (`id`, `tendangnhap`, `matkhau`, `email`, `loainguoidung`) VALUES
(2, 'sinhvien01', '123', 'sinhvien01@gmail.com', 'sinhvien'),
(3, 'nhatuyendung01', '123', 'nhatuyendung01@gmail.com', 'nhatuyendung'),
(4, 'sinhvien02', '123', 'sinhvien02@gmail.com', 'sinhvien');

--
-- Indexes for dumped tables
--

--
-- Indexes for table `table_chitietnguoidung`
--
ALTER TABLE `table_chitietnguoidung`
  ADD PRIMARY KEY (`id`),
  ADD KEY `nguoidung_id` (`nguoidung_id`);

--
-- Indexes for table `table_hosonhatuyendung`
--
ALTER TABLE `table_hosonhatuyendung`
  ADD PRIMARY KEY (`id`),
  ADD KEY `nguoidung_id` (`nguoidung_id`);

--
-- Indexes for table `table_hososinhvien`
--
ALTER TABLE `table_hososinhvien`
  ADD PRIMARY KEY (`id`),
  ADD KEY `nguoidung_id` (`nguoidung_id`);

--
-- Indexes for table `table_nguoidung`
--
ALTER TABLE `table_nguoidung`
  ADD PRIMARY KEY (`id`);

--
-- AUTO_INCREMENT for dumped tables
--

--
-- AUTO_INCREMENT for table `table_chitietnguoidung`
--
ALTER TABLE `table_chitietnguoidung`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=5;

--
-- AUTO_INCREMENT for table `table_hosonhatuyendung`
--
ALTER TABLE `table_hosonhatuyendung`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=2;

--
-- AUTO_INCREMENT for table `table_hososinhvien`
--
ALTER TABLE `table_hososinhvien`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=3;

--
-- AUTO_INCREMENT for table `table_nguoidung`
--
ALTER TABLE `table_nguoidung`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=5;

--
-- Constraints for dumped tables
--

--
-- Constraints for table `table_chitietnguoidung`
--
ALTER TABLE `table_chitietnguoidung`
  ADD CONSTRAINT `table_chitietnguoidung_ibfk_1` FOREIGN KEY (`nguoidung_id`) REFERENCES `table_nguoidung` (`id`) ON DELETE CASCADE ON UPDATE CASCADE;

--
-- Constraints for table `table_hosonhatuyendung`
--
ALTER TABLE `table_hosonhatuyendung`
  ADD CONSTRAINT `table_hosonhatuyendung_ibfk_1` FOREIGN KEY (`nguoidung_id`) REFERENCES `table_nguoidung` (`id`) ON DELETE CASCADE ON UPDATE CASCADE;

--
-- Constraints for table `table_hososinhvien`
--
ALTER TABLE `table_hososinhvien`
  ADD CONSTRAINT `table_hososinhvien_ibfk_1` FOREIGN KEY (`nguoidung_id`) REFERENCES `table_nguoidung` (`id`) ON DELETE CASCADE ON UPDATE CASCADE;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
