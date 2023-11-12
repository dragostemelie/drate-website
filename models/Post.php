<?php

class Post
{

  private $pdo;

  public function __construct($pdo)
  {
    $this->pdo = $pdo;
  }

  public function getAll()
  {
    $query = "SELECT id, created, author, title, excerpt, content, topic, tag, post_parent FROM posts";
    $stmt = $this->pdo->prepare($query);
    $stmt->execute();
    return $stmt->fetchAll(PDO::FETCH_ASSOC);
  }

  public function getPublished()
  {
    $query = "SELECT id, created, author, title, excerpt, content, topic, tag FROM posts where is_published = 1;";
    $stmt = $this->pdo->prepare($query);
    $stmt->execute();
    return $stmt->fetchAll(PDO::FETCH_ASSOC);
  }

  public function create($data)
  {
    $query = "INSERT INTO posts (author, title, excerpt, content, topic, tag, is_published, post_parent) VALUES (:author, :title, :excerpt, :content, :topic, :tag, :is_published, :post_parent)";
    $stmt = $this->pdo->prepare($query);
    $stmt->execute(array(
      ":author" => $data["author"],
      ":title" => $data["title"],
      ":excerpt" => $data["excerpt"],
      ":content" => $data["content"],
      ":topic" => $data["topic"],
      ":tag" => $data["tag"],
      ":is_published" => $data["is_published"],
      ":post_parent" => $data["post_parent"]
    ));
    $id = $this->pdo->lastInsertId();
    $stmt = $this->pdo->prepare("SELECT * FROM posts WHERE id = :id");
    $stmt->execute(array(":id" => $id));
    return $stmt->fetch(PDO::FETCH_ASSOC);
  }
}
