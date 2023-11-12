<?php

require_once '../../../config/db.php';
require_once '../../../models/Post.php';
require_once '../../../models/User.php';
require_once '../../../models/Comment.php';
require_once '../../../models/Like.php';

try {
  $post = new Post($pdo);
  $user = new User($pdo);
  $comment = new Comment($pdo);
  $like = new Like($pdo);

  $posts = [];
  $data = $post->getAll();

  if (is_array($data)) {
    $posts = $data;
  }

  $results = [];
  foreach ($posts as $index => $post) {
    // AUTHOR
    $author = $user->getByUuid($post["author"]);

    // COMMENTS
    $comments = [];
    $data = $comment->getByPostId($post["id"]);
    if (is_array($data)) {
      $comments = $data;
    }
    foreach ($comments as $index => $item) {
      // COMMENT REPLIES
      $replies = [];
      $data = $comment->getReplies($item["id"]);
      if (is_array($data)) {
        foreach ($data as $reply) {
          array_push($replies, $reply);
        }
      }
      $comments[$index]["replies"] = $replies;

      // COMMENT LIKES
      $likes = [];
      $data = $like->getByCommentId($item["id"]);
      if (is_array($data)) {
        foreach ($data as $item) {
          array_push($likes, $item['user']);
        }
      }
      $comments[$index]["likes"] = $likes;
    }

    // LIKES
    $likes = [];
    $data = $like->getByPostId($post["id"]);
    if (is_array($data)) {
      $likes = $data;
      foreach ($data as $item) {
        array_push($likes, $item['user']);
      }
    }

    $result = $post;
    $result["author"] = $author;
    $result["comments"] = $comments;
    $result["likes"] = $likes;
    array_push($results, $result);
  }

  http_response_code(200);
  echo json_encode($results);
} catch (PDOException $e) {
  http_response_code(500);
  echo json_encode(array("message" => "Unable to get posts list: " . $e->getMessage()));
}
