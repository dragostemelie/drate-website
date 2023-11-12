<?php

class Like
{

  private $pdo;

  public function __construct($pdo)
  {
    $this->pdo = $pdo;
  }

  public function getAll()
  {
    $query = "SELECT * FROM likes;";
    $stmt = $this->pdo->prepare($query);
    $stmt->execute();
    return $stmt->fetchAll(PDO::FETCH_ASSOC);
  }

  public function getByUserUuid($uuid)
  {
    $query = "SELECT post, comment FROM likes where user = :user;";
    $stmt = $this->pdo->prepare($query);
    $stmt->execute(array(":user" => $uuid));
    return $stmt->fetchAll(PDO::FETCH_ASSOC);
  }

  public function getByPostId($postId)
  {
    $query = "SELECT user FROM likes where post = :post;";
    $stmt = $this->pdo->prepare($query);
    $stmt->execute(array(":post" => $postId));
    return $stmt->fetchAll(PDO::FETCH_ASSOC);
  }

  public function getByCommentId($commentId)
  {
    $query = "SELECT user FROM likes where comment = :comment;";
    $stmt = $this->pdo->prepare($query);
    $stmt->execute(array(":comment" => $commentId));
    return $stmt->fetchAll(PDO::FETCH_ASSOC);
  }

  public function create($data)
  {
    $query = "INSERT INTO likes (user, post, comment) VALUES (:user, :post, :comment);";
    $stmt = $this->pdo->prepare($query);
    $stmt->execute(array(
      ":user" => $data["user"],
      ":post" => $data["post"],
      ":comment" => $data["comment"]
    ));
    $id = $this->pdo->lastInsertId();
    $stmt = $this->pdo->prepare("SELECT * FROM likes WHERE id = :id");
    $stmt->execute(array(":id" => $id));
    return $stmt->fetch(PDO::FETCH_ASSOC);
  }

  public function delete($data)
  {
    $query = "DELETE FROM likes WHERE user = :user AND post = :post AND comment = :comment";
    $stmt = $this->pdo->prepare($query);
    $stmt->execute(array(
      ":user" => $data["user"],
      ":post" => $data["post"],
      ":comment" => $data["comment"]
    ));
  }
}
