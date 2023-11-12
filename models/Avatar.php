<?php

class Avatar
{

  private $pdo;

  public function __construct($pdo)
  {
    $this->pdo = $pdo;
  }

  public function getAll()
  {
    $query = "SELECT url, name, sex FROM avatars;";
    $stmt = $this->pdo->prepare($query);
    $stmt->execute();
    return $stmt->fetchAll(PDO::FETCH_ASSOC);
  }

  public function create($data)
  {
    $query = "INSERT INTO avatars (name, sex, url) VALUES(:name, :sex, :url)";
    $stmt = $this->pdo->prepare($query);
    $stmt->execute(array(
      ":name" => $data["name"],
      ":sex" => $data["sex"],
      ":url" => $data["url"]
    ));
    $id = $this->pdo->lastInsertId();
    $stmt = $this->pdo->prepare("SELECT * FROM avatars WHERE id = :id");
    $stmt->execute(array(":id" => $id));
    return $stmt->fetch(PDO::FETCH_ASSOC);
  }
}
