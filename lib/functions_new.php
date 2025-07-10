<?php
/**
 * @package WordPress
 * @subpackage BYP
 */


remove_action( 'wp_head', 'print_emoji_detection_script', 7 );
remove_action( 'wp_print_styles', 'print_emoji_styles' );


//add_filter('show_admin_bar', '__return_false');


/*** register menus ***/
function register_menus() {
  register_nav_menus(
    array(
      'main_menu' => __( 'BYP Supreme Main Menu' ),
      'secondary_menu' => __( 'BYP Supreme Secondary Menu' ),
	  'social_menu' => __( 'BYP Supreme Social Media List' ),
	  'about_menu' => __( 'BYP Supreme About Sub-menu' )
    )
  );
}
add_action( 'init', 'register_menus' );


/*** enable featured image ***/
add_theme_support( 'post-thumbnails' );


/*** enable svg support ***/
add_filter('upload_mimes', function( $mimes ) {
	$mimes['svg'] = 'image/svg+xml';
	$mimes['svgz'] = 'image/svg+xml';
	return $mimes;
});


require_once('aq_resizer.php');


/*** custom image sizes ***/
add_image_size( 'storyblock-thumb', 600, 350, true );
add_image_size( 'featured-block-image', 1300, 895, true );
add_image_size( 'category-block-image', 1270, 630, true );
add_image_size( 'hero-image', 1300, 465, true );


/*** body id: ***/
function custom_bodyid() {
	if (is_front_page()) {
		echo 'homepage';
	}
	elseif (is_home()) {
	   echo 'homepage';
	}
	elseif (is_single()) {
	   echo 'single';
	}
	elseif (is_category()) {
		echo 'archive';
	}
	elseif (is_page()) {
		echo 'pagepage';
	}
	elseif (is_search()) {
		echo 'searchpage';
	}
	elseif (is_404()) {
		echo '404page';
	}
	else {
	   echo 'pagepage';
	}
}


/*** remove WP generated jquery ***/
add_action('wp_enqueue_scripts', 'no_more_jquery');
function no_more_jquery(){
    wp_deregister_script('jquery');
    wp_register_script('jquery', "http" . 
    ($_SERVER['SERVER_PORT'] == 443 ? "s" : "") . 
    "://code.jquery.com/jquery-latest.min.js", false, null);
    wp_enqueue_script('jquery');
}


/*** exclude pages from search results: ***/
function SearchFilter($query) {
	if ($query->is_search) {
		$query->set('post_type', 'post');
	}
	return $query;
}
add_filter('pre_get_posts','SearchFilter');


/*** change excerpt length by character e.g. <?php echo get_excerpt(125); ?> ***/
function get_excerpt($limit, $source = null){

    if($source == "content" ? ($excerpt = get_the_content()) : ($excerpt = get_the_excerpt()));
    $excerpt = preg_replace(" (\[.*?\])",'',$excerpt);
    $excerpt = strip_shortcodes($excerpt);
    $excerpt = strip_tags($excerpt);
    $excerpt = substr($excerpt, 0, $limit);
    $excerpt = substr($excerpt, 0, strripos($excerpt, " "));
    $excerpt = trim(preg_replace( '/\s+/', ' ', $excerpt));
    $excerpt = $excerpt.'... <a href="'.get_permalink($post->ID).'">more</a>';
    return $excerpt;
}


/*** modify related posts (jetpack plugin) ***/
function jetpackme_remove_rp() {
    if ( class_exists( 'Jetpack_RelatedPosts' ) ) {
        $jprp = Jetpack_RelatedPosts::init();
        $callback = array( $jprp, 'filter_add_target_to_dom' );
        remove_filter( 'the_content', $callback, 40 );
    }
}
add_filter( 'wp', 'jetpackme_remove_rp', 20 );

add_filter( 'jetpack_implode_frontend_css', '__return_false' );
function jeherve_remove_all_jp_css() {
	wp_deregister_style( 'jetpack_related-posts' ); //Related Posts
}
add_action('wp_print_styles', 'jeherve_remove_all_jp_css' );


/*** resize up if image is smaller than defined dimensions (add_image_size) ***/
if(!function_exists('mit_thumbnail_upscale')) {
	function mit_thumbnail_upscale( $default, $orig_w, $orig_h, $new_w, $new_h, $crop ){

	    if ( !$crop ) return null; // let the wordpress default function handle this

	    $aspect_ratio = $orig_w / $orig_h;
	    $size_ratio = max($new_w / $orig_w, $new_h / $orig_h);

	    $crop_w = round($new_w / $size_ratio);
	    $crop_h = round($new_h / $size_ratio);

	    $s_x = floor( ($orig_w - $crop_w) / 2 );
	    $s_y = floor( ($orig_h - $crop_h) / 2 );

	    return array( 0, 0, (int) $s_x, (int) $s_y, (int) $new_w, (int) $new_h, (int) $crop_w, (int) $crop_h );
	}
}
add_filter( 'image_resize_dimensions', 'mit_thumbnail_upscale', 10, 6 );

function register_issue_post_type() {
  register_post_type('issue', array(
    'labels' => array(
      'name'               => 'Issues',
      'singular_name'      => 'Issue',
      'menu_name'          => 'Issues',
      'name_admin_bar'     => 'Issue',
      'add_new'            => 'Add Issue',
      'add_new_item'       => 'Add New Issue',
      'new_item'           => 'New Issue',
      'edit_item'          => 'Edit Issue',
      'view_item'          => 'View Issue',
      'all_items'          => 'All Issues',
      'search_items'       => 'Search Issues',
      'not_found'          => 'No Issues found',
      'not_found_in_trash' => 'No Issues found in Trash',
    ),
    'public'             => true,
    'has_archive'        => true,
    'rewrite'            => array('slug' => 'issue'),
    'show_in_rest'       => true, // enables REST API support
    'supports'           => array('title', 'editor', 'thumbnail'), // use 'editor' for Overview
    'menu_position'      => 5,
    'menu_icon'          => 'dashicons-book-alt',
  ));
}
add_action('init', 'register_issue_post_type');

?>