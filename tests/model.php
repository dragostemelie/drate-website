<!DOCTYPE html>
<html lang="en">

<?php
require_once "./helpers/functions.php";
require_once "./config/db.php";

$meta = setPageMeta($pdo);
?>

<head>
  <!-- HTML Meta -->
  <meta charset="UTF-8" />
  <meta name="theme-color" content="#000000" />
  <meta name="viewport" content="width=device-width, initial-scale=1.0" />
  <meta name="description" content="<?php echo $meta["created"] ?>" />
  <!-- Facebook Meta -->
  <meta property="og:url" content="<?php echo $meta["url"] ?>" />
  <meta property="og:type" content="website" />
  <meta property="og:title" content="<?php echo $meta["title"] ?>" />
  <meta property="og:description" content="<?php echo $meta["description"] ?>" />
  <meta property="og:image" itemProp="image" content="<?php echo $meta["image"] ?>" />
  <!-- Twitter Meta -->
  <meta name="twitter:card" content="summary_large_image" />
  <meta property="twitter:domain" content="drate.net" />
  <meta property="twitter:url" content="<?php echo $meta["url"] ?>" />
  <meta name="twitter:title" content="<?php echo $meta["title"] ?>" />
  <meta name="twitter:description" content="<?php echo $meta["description"] ?>" />
  <meta name="twitter:image" content="<?php echo $meta["image"] ?>" />
  <!-- Resources -->
  <link rel="icon" type="image/svg+xml" href="/drate.svg" />
  <title><?php echo $meta["title"]; ?></title>
  <style>
    body {
      background: #000000;
    }
  </style>
  <script type="module" crossorigin src="/assets/index-8865ca1d.js"></script>
  <link rel="stylesheet" href="/assets/index-c418435a.css">
</head>

<body>
  <div id="root"></div>

</body>

</html>