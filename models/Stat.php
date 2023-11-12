<?php

class Stat
{

  private $pdo;

  public function __construct($pdo)
  {
    $this->pdo = $pdo;
  }

  public function getAll()
  {
    $query = "SELECT T1.guid, T3.avatar, T3.displayName, T1.lastSeen, T2.ip, T2.browser, T2.os, T2.country, T4.visits, T5.comments, T6.likes  FROM (
      SELECT guid, MAX(createdAt) as lastSeen  FROM stats 
      GROUP BY guid  
    ) T1
    LEFT JOIN (
      SELECT guid, createdAt, ip, os, country, browser  FROM stats
    )  T2 on T1.guid = T2.guid and T1.lastSeen = T2.createdAt 
    LEFT JOIN (
      SELECT guid, uuid, avatar, displayName  FROM users
    )  T3 on T1.guid = T3.guid 
    LEFT JOIN (
      SELECT guid, COUNT(url) as visits  FROM stats
	  GROUP BY guid
    )  T4 on T1.guid = T4.guid
    LEFT JOIN (
      SELECT user, COUNT(id) as comments  FROM comments
	  GROUP BY user
    )  T5 on T3.uuid = T5.user   
    LEFT JOIN (
      SELECT user, COUNT(id) as likes  FROM likes
	  GROUP BY user
    )  T6 on T3.uuid = T6.user     
    ORDER BY T1.lastSeen desc";
    $stmt = $this->pdo->prepare($query);
    $stmt->execute();
    return $stmt->fetchAll(PDO::FETCH_ASSOC);
  }

  public function getByGuid($guid)
  {
    $query = "SELECT guid, createdAt, url, browser FROM stats WHERE guid = :guid ORDER BY createdAt DESC;";
    $stmt = $this->pdo->prepare($query);
    $stmt->execute(array(":guid" => $guid));
    return $stmt->fetchAll(PDO::FETCH_ASSOC);
  }

  public function create($guid, $ip, $os, $browser, $country, $url)
  {
    $query = "INSERT INTO stats (guid, ip, os, browser, country, url) VALUES(:guid, :ip, :os, :browser, :country, :url)";
    $stmt = $this->pdo->prepare($query);
    $stmt->execute(array(
      ":guid" => $guid,
      ":ip" => $ip,
      ":os" => $os,
      ":browser" => $browser,
      ":country" => $country,
      ":url" => $url
    ));
    $id = $this->pdo->lastInsertId();
    $stmt = $this->pdo->prepare("SELECT * FROM stats WHERE id = :id");
    $stmt->execute(array(":id" => $id));
    return $stmt->fetch(PDO::FETCH_ASSOC);
  }
}
