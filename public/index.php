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

    <!-- Bundled CSS -->
    <link rel="stylesheet" href="build/app.min.css">

    <!--[if lt IE 9]>
      <script src="//cdnjs.cloudflare.com/ajax/libs/respond.js/1.4.2/respond.js"></script>
    <![endif]-->

  </head>

  <body class="no-touch">

    <header class="menu">

      <h1 class="banner"><span>Chris Zarate</span></h1>

      <ul class="elsewhere">
        <li class="service">
          <h4 class="username">&#099;&#104;&#114;&#105;&#115;&#064;&#122;&#097;&#114;&#097;&#116;&#101;&#046;&#111;&#114;&#103;</h4>
          <a class="link icon-mail" href="mailto:&#099;&#104;&#114;&#105;&#115;&#064;&#122;&#097;&#114;&#097;&#116;&#101;&#046;&#111;&#114;&#103;"><span>E-mail</span></a>
        </li>
        <li class="service">
          <h4 class="username">chriszarate</h4>
          <a class="link icon-github-1" href="https://github.com/chriszarate"><span>Github</span></a>
        </li>
        <li class="service">
          <h4 class="username">chriszarate</h4>
          <a class="link icon-flickr-1" href="http://flickr.com/photos/chriszarate"><span>Flickr</span></a>
        </li>
        <li class="service">
          <h4 class="username">chrzrt</h4>
          <a class="link icon-twitter-1" href="http://twitter.com/chrzrt"><span>Twitter</span></a>
        </li>
        <li class="service">
          <h4 class="username">chrzrt</h4>
          <a class="link icon-instagram" href="http://instagram.com/chrzrt"><span>Instagram</span></a>
        </li>
      </ul>

    </header>

    <div class="introduction">

      <p>I make things for me and for the Web. Here are a few things I made recently:</p>

      <ul class="bullets">
        <li><a href="http://tilde.club/~zarate">tilde.club/~zarate</a> –  a Web page on a UNIX computer</li>
        <li><a href="http://maryhelenspecht.com">maryhelenspecht.com</a> – a site for author Mary Helen Specht</li>
        <li><a href="http://bikeshare.me">bikeshare.me</a> – a <em>fast</em> glance at your favorite bike share stations</li>
        <li><a href="https://github.com/chriszarate/grunt-load-options">grunt-load-options</a> – a Grunt plugin to modularize your Gruntfile</li>
        <li><a href="http://chriszarate.github.io/sheetrock/">jquery.sheetrock</a> – quickly connect to, query, and lazy-load data from Google Spreadsheets</li>
        <li><a href="http://supergenpass.com">supergenpass</a> – a bookmarklet password generator</li>
      </ul>

    </div>

    <div class="main">

      <h3 class="photos-head icon-camera">Some recent photos</h3>

<?php for ( $i = 0; $i < count($flickr_data); $i++): ?>
      <div class="photo">
        <p><a href="http://www.flickr.com/photos/<?= $flickr_data[$i]['ownername'] ?>/<?= $flickr_data[$i]['id'] ?>/"><img src="<?= $flickr_data[$i]['url_l'] ?>" alt="<?= $flickr_data[$i]['title'] ?>"></a></p>
      </div>
<?php endfor; ?>

    </div>

    <p>See more at <a class="inline-link icon-flickr-1" href="http://flickr.com/photos/chriszarate">Flickr</a> and <a class="inline-link icon-instagram" href="http://instagram.com/chrzrt">Instagram</a>.</p>

  </body>

</html>
