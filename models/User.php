<?php

class User
{

  private $pdo;

  public function __construct($pdo)
  {
    $this->pdo = $pdo;
  }

  public function getAll()
  {
    $query = "SELECT id, created, uuid, displayName, avatar, title, about, isAuthor, 
      (SELECT COUNT(*) FROM comments WHERE comments.user  = uuid) AS comments,
      (SELECT COUNT(*) FROM posts WHERE posts.author  = uuid) AS posts,
      (SELECT COUNT(distinct topic) FROM posts WHERE posts.author = uuid) AS topics,
      lastSeen
    FROM users;";
    $stmt = $this->pdo->prepare($query);
    $stmt->execute();
    return $stmt->fetchAll(PDO::FETCH_ASSOC);
  }

  public function getByUuid($uuid)
  {
    $query = "SELECT uuid, displayName, avatar FROM users where uuid = :uuid;";
    $stmt = $this->pdo->prepare($query);
    $stmt->execute(array(":uuid" => $uuid));
    return $stmt->fetch(PDO::FETCH_ASSOC);
  }

  public function getByGuid($guid)
  {
    $query = "SELECT uuid, guid, displayName, avatar, lastSeen FROM users where guid = :guid;";
    $stmt = $this->pdo->prepare($query);
    $stmt->execute(array(":guid" => $guid));
    return $stmt->fetch(PDO::FETCH_ASSOC);
  }

  public function getByEmail($email)
  {
    $query = "SELECT guid, avatar, displayName, title, about, password FROM users where email = :email;";
    $stmt = $this->pdo->prepare($query);
    $stmt->execute(array(":email" => $email));
    return $stmt->fetch(PDO::FETCH_ASSOC);
  }

  public function create($user)
  {
    $query = "INSERT INTO `users` (`uuid`, `guid`, `displayName`, `avatar`, `lastSeen`) VALUES ( :uuid, :guid, :displayName, :avatar, :lastSeen )";
    $stmt = $this->pdo->prepare($query);
    $stmt->execute(array(
      ":uuid" => $user["uuid"],
      ":guid" => $user["guid"],
      ":displayName" => $user["displayName"],
      ":avatar" => $user["avatar"],
      ":lastSeen" => date('Y-m-d H:i:s')
    ));
    $id = $this->pdo->lastInsertId();
    $stmt = $this->pdo->prepare("SELECT uuid, guid, displayName, avatar, lastSeen FROM users WHERE id = :id");
    $stmt->execute(array(":id" => $id));
    return $stmt->fetch(PDO::FETCH_ASSOC);
  }

  public function update($user)
  {
    $query = "UPDATE users U SET uuid = :uuid, displayName = :displayName, avatar = :avatar, lastSeen = :lastSeen WHERE U.guid = :guid";
    $stmt = $this->pdo->prepare($query);
    $stmt->execute(array(
      ":uuid" => $user["uuid"],
      ":guid" => $user["guid"],
      ":displayName" => $user["displayName"],
      ":avatar" => $user["avatar"],
      ":lastSeen" => date('Y-m-d H:i:s')
    ));
    $stmt = $this->pdo->prepare("SELECT uuid, guid, displayName, avatar, lastSeen FROM users WHERE guid = :guid");
    $stmt->execute(array(":guid" => $user["guid"]));
    return $stmt->fetch(PDO::FETCH_ASSOC);
  }
}
