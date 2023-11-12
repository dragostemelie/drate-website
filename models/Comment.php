<?php

class Comment
{

  private $pdo;

  public function __construct($pdo)
  {
    $this->pdo = $pdo;
  }

  public function getAll()
  {
    $query = "SELECT id, created, CAST(post as UNSIGNED) as post, user, comment, repliedTo FROM comments;";
    $stmt = $this->pdo->prepare($query);
    $stmt->execute();
    return $stmt->fetchAll(PDO::FETCH_ASSOC);
  }

  public function getByPostId($postId)
  {
    $query = "SELECT id, created, CAST(post as UNSIGNED) as post, user, comment, repliedTo FROM comments where post = :post and isnull(repliedTo);";
    $stmt = $this->pdo->prepare($query);
    $stmt->execute(array(":post" => $postId));
    return $stmt->fetchAll(PDO::FETCH_ASSOC);
  }

  public function getReplies($commentId)
  {
    $query = "SELECT id, created, CAST(post as UNSIGNED) as post, user, comment, CAST(repliedTo as UNSIGNED) as repliedTo FROM comments where repliedTo = :comment and not isnull(repliedTo);";
    $stmt = $this->pdo->prepare($query);
    $stmt->execute(array(":comment" => $commentId));
    return $stmt->fetchAll(PDO::FETCH_ASSOC);
  }

  public function create($data)
  {
    $query = "INSERT INTO comments (post, user, comment, repliedTo) VALUES (:post, :user, :comment, :repliedTo)";
    $stmt = $this->pdo->prepare($query);
    $stmt->execute(array(
      ":post" => $data["post"],
      ":user" => $data["user"],
      ":comment" => $data["comment"],
      ":repliedTo" => $data["repliedTo"]
    ));
    $id = $this->pdo->lastInsertId();
    $stmt = $this->pdo->prepare("SELECT * FROM comments WHERE id = :id");
    $stmt->execute(array(":id" => $id));
    return $stmt->fetch(PDO::FETCH_ASSOC);
  }

  public function update($data)
  {
    $query = "UPDATE comments SET comment = :comment WHERE id = :id";
    $stmt = $this->pdo->prepare($query);
    $stmt->execute(array(
      ":id" => $data["id"],
      ":comment" => $data["comment"],
    ));

    $stmt = $this->pdo->prepare("SELECT * FROM comments WHERE id = :id");
    $stmt->execute(array(":id" => $data["id"]));
    return $stmt->fetch(PDO::FETCH_ASSOC);
  }

  public function delete($data)
  {
    $query = "DELETE FROM comments WHERE id = :id";
    $stmt = $this->pdo->prepare($query);
    $stmt->execute(array(":id" => $data["id"]));
  }
}
