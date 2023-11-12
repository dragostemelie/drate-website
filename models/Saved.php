<?php

class Saved
{

  private $pdo;

  public function __construct($pdo)
  {
    $this->pdo = $pdo;
  }

  public function getByUuid($uuid)
  {
    $query = 'SELECT CAST(post as UNSIGNED) as post FROM saved WHERE user = :user';
    $stmt = $this->pdo->prepare($query);
    $stmt->execute(array(":user" => $uuid));
    return $stmt->fetchAll(PDO::FETCH_ASSOC);
  }

  public function create($data)
  {
    $query = "INSERT INTO saved (post, user) VALUES (:post, :user)";
    $stmt = $this->pdo->prepare($query);
    $stmt->execute(array(
      ":user" => $data["uuid"],
      ":post" => $data["post"]
    ));
    $id = $this->pdo->lastInsertId();
    $stmt = $this->pdo->prepare("SELECT CAST(post as UNSIGNED) as post, user FROM saved WHERE id = :id");
    $stmt->execute(array(":id" => $id));
    return $stmt->fetch(PDO::FETCH_ASSOC);
  }

  public function delete($data)
  {
    $query = "DELETE FROM saved WHERE user = :user AND post = :post";
    $stmt = $this->pdo->prepare($query);
    $stmt->execute(array(
      ":user" => $data['uuid'],
      ":post" => $data['post']
    ));
  }
}
