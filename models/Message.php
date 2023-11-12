<?php

class Message
{

  private $pdo;

  public function __construct($pdo)
  {
    $this->pdo = $pdo;
  }

  public function getAll()
  {
    $query = "SELECT  M.created, M.message, U.avatar, U.displayName, M.from, M.to FROM messages M 
	    LEFT JOIN (SELECT uuid, avatar, displayName  FROM users)  U on M.from = U.uuid;";
    $stmt = $this->pdo->prepare($query);
    $stmt->execute();
    return $stmt->fetchAll(PDO::FETCH_ASSOC);
  }

  public function create($data)
  {
    $query = "INSERT INTO messages (`from`, `to`, `message`) VALUES (:from, :to, :message);";
    $stmt = $this->pdo->prepare($query);
    $stmt->execute(array(
      ":from" => $data["uuid"],
      ":to" => $data["author"],
      ":message" => $data["message"]
    ));
    $id = $this->pdo->lastInsertId();
    $stmt = $this->pdo->prepare("SELECT * FROM messages WHERE id = :id");
    $stmt->execute(array(":id" => $id));
    return $stmt->fetch(PDO::FETCH_ASSOC);
  }
}
