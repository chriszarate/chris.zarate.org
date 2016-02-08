<?php

# Config
  $flickr_cache_file = 'cache/blog.txt';
  $flickr_max_cache_age = 86400;

# Get photos
  if ( file_exists ( $flickr_cache_file ) && time () - filemtime ( $flickr_cache_file ) < $flickr_max_cache_age ):
    $flickr_data = unserialize ( file_get_contents ( $flickr_cache_file ) );
  else:
    require ( 'blog.php' );
  endif;

?>
<!DOCTYPE html>
<html class="no-js">

  <head>

    <meta charset="utf-8">
    <meta name="viewport" content="width=device-width, initial-scale=1">

    <title>Chris Zarate</title>

    <link rel="stylesheet" href="//brick.a.ssl.fastly.net/Karla:400,700">
    <link rel="stylesheet" href="/build/main.css">

  </head>

  <body class="no-touch page-home">

    <nav class="masthead">

      <span class="bubble bubble-red"></span>
      <span class="bubble bubble-yellow"></span>
      <span class="bubble bubble-green"></span>

      <a class="tab tab-home tab-active" href="#">Chris Zarate</a>
      <a class="tab tab-photos" href="#photos"><span class="icon icon-camera">Recent photos</span></a>

    </nav>

    <main class="content">

      <div class="introduction">
        <p>My name is Chris and I <a class="inline-link icon-github-1" href="https://github.com/chriszarate">make things</a> for me and for the Web. I take <a class="inline-link icon-flickr-1" href="http://flickr.com/photos/chriszarate">photos</a> and <a class="inline-link icon-instagram" href="http://instagram.com/chrzrt">latergrams</a>. I <a class="inline-link icon-twitter-1" href="http://twitter.com/chrzrt">never tweet</a>. E-mail me at <a class="inline-link icon-mail" href="mailto:&#099;&#104;&#114;&#105;&#115;&#064;&#122;&#097;&#114;&#097;&#116;&#101;&#046;&#111;&#114;&#103;">&#099;&#104;&#114;&#105;&#115;&#064;&#122;&#097;&#114;&#097;&#116;&#101;&#046;&#111;&#114;&#103;</a>.</p>
      </div>

      <div class="photos">

<?php for ( $i = 0; $i < count($flickr_data); $i++): ?>
        <div class="photo">
          <p><a href="http://www.flickr.com/photos/<?= $flickr_data[$i]['ownername'] ?>/<?= $flickr_data[$i]['id'] ?>/"><img src="<?= $flickr_data[$i]['url_l'] ?>" alt="<?= $flickr_data[$i]['title'] ?>"></a></p>
        </div>
<?php endfor; ?>

        <p>See more at <a class="inline-link icon-flickr-1" href="http://flickr.com/photos/chriszarate">Flickr</a> and <a class="inline-link icon-instagram" href="http://instagram.com/chrzrt">Instagram</a>.</p>

      </div>

    </main>

    <script src="/build/main.js"></script>

  </body>

</html>
