-- phpMyAdmin SQL Dump
-- version 4.8.5
-- https://www.phpmyadmin.net/
--
-- Servidor: 127.0.0.1:3306
-- Tiempo de generación: 18-11-2019 a las 09:06:34
-- Versión del servidor: 5.7.26
-- Versión de PHP: 7.2.18

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
SET AUTOCOMMIT = 0;
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Base de datos: `my_app`
--

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `restaurants`
--

DROP TABLE IF EXISTS `restaurants`;
CREATE TABLE IF NOT EXISTS `restaurants` (
  `id_restaurant` int(11) NOT NULL AUTO_INCREMENT,
  `name` varchar(50) NOT NULL,
  `address` varchar(150) NOT NULL,
  `lat` varchar(12) NOT NULL,
  `lng` varchar(12) NOT NULL,
  `kind_food` set('Vegetariano','Mexicano','Mediterraneo','China','Japonesa','Pizza','Bar de Tapas','Española') NOT NULL,
  PRIMARY KEY (`id_restaurant`)
) ENGINE=MyISAM AUTO_INCREMENT=11 DEFAULT CHARSET=utf8;

--
-- Volcado de datos para la tabla `restaurants`
--

INSERT INTO `restaurants` (`id_restaurant`, `name`, `address`, `lat`, `lng`, `kind_food`) VALUES
(1, 'Tequila Cantina Mexicana', 'Carrer de Bilbao, 13, 08005 Barcelona', '41.40086400', '2.20624000', 'Mexicano'),
(2, 'Obon', 'Plaça de Maragall, 13, 08027 Barcelona', '41.42063000', '2.18108500', 'Vegetariano,Mexicano,Mediterraneo'),
(3, 'Restaurant L\'Ona', 'Carretera Km. 638.5 N-II', '41.491766700', '2.36899800', 'Vegetariano,Mediterraneo'),
(4, 'Honestfood', 'Carrer de la Llacuna, 118, 08018 Barcelona', '41.40378000', '2.19559000', 'Vegetariano,Pizza'),
(5, 'Restaurante Chang Feng', 'Avinguda Diagonal, 145, 08018 Barcelona', '41.40614000', '2.19775000', 'China'),
(6, 'Neko Sushi Take-away & Delivery', 'Carrer de Pujades, 121, 08005 Barcelona', '41.39932000', '2.19740000', 'Vegetariano,Japonesa'),
(7, 'Restaurante L\'Aldilà', 'Carrer de la Llacuna, 106, 08018 Barcelona', '41.40353000', '2.19592000', 'Vegetariano,Pizza'),
(8, 'Bar L\'Enxaneta', 'Carrer de Sancho de Ávila, 163, 08018 Barcelona', '41.40353000', '2.19623000', 'Bar de Tapas'),
(9, 'El Duende', 'Carrer de Bolívia, 95, 08018 Barcelona', '41.40555000', '2.19443000', 'Bar de Tapas'),
(10, 'Can Bigotis', 'Carrer de Badajoz, 36, 08005 Barcelona', '41.39600000', '2.19905000', 'Española');
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
