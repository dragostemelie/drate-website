<?php

class Metadata
{

  private $pdo;

  public function __construct($pdo)
  {
    $this->pdo = $pdo;
  }

  public function getByUrl($url)
  {
    $query = "SELECT created, url, title, description, image, author FROM meta where url = :url;";
    $stmt = $this->pdo->prepare($query);
    $stmt->execute(array(":url" => $url));
    return $stmt->fetch(PDO::FETCH_ASSOC);
  }
}
