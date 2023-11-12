<?php
$database = require './utils/db.php';

//CREATE USERS TABLE   
$query = "CREATE TABLE IF NOT exists `users` (
  `id` int(20) NOT NULL AUTO_INCREMENT,
  `created` datetime NOT NULL DEFAULT current_timestamp(),
  `uuid` varchar(200) NOT NULL,
  `guid` varchar(200) NOT NULL,
  `displayName` varchar(200) NOT NULL,
  `avatar` text NOT NULL,
  `email` varchar(200),
  `password` varchar(200),
  `title` varchar(200),
  `about` text,
  `isAuthor` TINYINT(1) DEFAULT 0,
  `lastSeen` datetime NOT NULL DEFAULT current_timestamp(),
   PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;";

$database->runQuery($query);

//CREATE AVATARS TABLE   
$query = "CREATE TABLE IF NOT exists `avatars` (
  `id` int(20) NOT NULL AUTO_INCREMENT,
  `url` varchar(200) NOT NULL,
  `name` varchar(200) NOT NULL,
  `sex` varchar(200) NOT NULL,
   PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;";

$database->runQuery($query);

//CREATE POSTS TABLE   
$query = "CREATE TABLE IF NOT exists `posts` (
  `id` int(20) NOT NULL AUTO_INCREMENT,
  `created` datetime NOT NULL DEFAULT current_timestamp(),
  `author` varchar(200) NOT NULL,
  `title` varchar(200) NOT NULL,
  `excerpt` text NOT NULL,
  `content` text,
  `topic` varchar(200) NOT NULL,
  `tag` varchar(200) NOT NULL,
  `post_parent` TINYINT(1) DEFAULT 0,
  `is_published` TINYINT(1) DEFAULT 0,
   PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;";

$database->runQuery($query);

//CREATE COMMENTS TABLE   
$query = "CREATE TABLE IF NOT exists `comments` (
  `id` int(20) NOT NULL AUTO_INCREMENT,
  `created` datetime NOT NULL DEFAULT current_timestamp(),
  `post` varchar(200) NOT NULL,
  `user` varchar(200) NOT NULL,
  `comment` text NOT NULL,
  `repliedTo` varchar(200),
   PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;";

$database->runQuery($query);


//CREATE LIKES TABLE   
$query = "CREATE TABLE IF NOT exists `likes` (
  `id` int(20) NOT NULL AUTO_INCREMENT,
  `created` datetime NOT NULL DEFAULT current_timestamp(),
  `user` varchar(200) NOT NULL,
  `post` varchar(200) NOT NULL,
  `comment` varchar(200) NOT NULL,
   PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;";

$database->runQuery($query);

//CREATE SAVED TABLE   
$query = "CREATE TABLE IF NOT exists `saved` (
  `id` int(20) NOT NULL AUTO_INCREMENT,
  `created` datetime NOT NULL DEFAULT current_timestamp(),
  `user` varchar(200) NOT NULL,
  `post` varchar(200) NOT NULL,
   PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;";

$database->runQuery($query);

//CREATE MESSAGES TABLE   
$query = "CREATE TABLE IF NOT exists `messages` (
  `id` int(20) NOT NULL AUTO_INCREMENT,
  `created` datetime NOT NULL DEFAULT current_timestamp(),
  `from` varchar(200),
  `to` varchar(200),
  `message` text,
   PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;";

$database->runQuery($query);

//CREATE META TABLE   
$query = "CREATE TABLE IF NOT exists `meta` (
  `id` int(20) NOT NULL AUTO_INCREMENT,
  `created` datetime NOT NULL DEFAULT current_timestamp(),
  `url` varchar(200),
  `title` varchar(200),
  `description` varchar(400),
  `image` varchar(200),
  `author` varchar(200),
   PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;";

$database->runQuery($query);

//CREATE STATS TABLE   
$query = "CREATE TABLE IF NOT exists `stats` (
  `id` int(20) NOT NULL AUTO_INCREMENT,
  `created` datetime NOT NULL DEFAULT current_timestamp(),
  `guid` varchar(200),
  `ip` varchar(200),
  `browser` varchar(200),
  `os` varchar(200),
  `country` varchar(200),
  `url` text,
   PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;";

$database->runQuery($query);
