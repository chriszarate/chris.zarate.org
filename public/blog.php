<?php

/*
  Flickr Tag Blog
	Requires http://github.com/chriszarate/flickr-wormhole
*/


# Include Flickr config and functions:
  require_once ('photos/flickr_config.php');
  require_once ('photos/flickr_include.php');


# Flickr tag(s) to poll (space delimited):
  $flickr_tags = 'blog';


# Flickr user information:
  $flickr_user_id = '85822877@N00';


# Initialize REST parameter array:
  $rest_params  = Array();


# Gather request variables and set parameters:

  $rest_params['api_key']  = $flickr_api_key;
  $rest_params['method']   = 'flickr.photos.search';
  $rest_params['format']   = 'php_serial';

  $rest_params['tags']     = $flickr_tags;
  $rest_params['user_id']  = $flickr_user_id;

  $rest_params['sort']     = 'date-posted-desc';
  $rest_params['per_page'] = '5';
  $rest_params['extras']   = 'date_taken,date_upload,owner_name,o_dims,url_l';


# Get list of photos:
  $flickr_data = unserialize(FlickrCall($rest_params, false, false, true));
  $flickr_data = $flickr_data['photos']['photo'];


# Write to disk:
  file_put_contents($flickr_cache_file, serialize($flickr_data));


?>
